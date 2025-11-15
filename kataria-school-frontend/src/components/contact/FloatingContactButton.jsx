import { useState, useRef, useEffect } from 'react';
import { sendContact } from '../../services/contactService';

export default function FloatingContactButton() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [position, setPosition] = useState({ top: '40%' }); // For draggable positioning

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Refs for drag functionality and click outside detection
  const dragData = useRef({ isDragging: false, startY: 0, startTop: 0 });
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle click outside to close form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFormVisible &&
        formRef.current &&
        buttonRef.current &&
        !formRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)) {
        setIsFormVisible(false);
      }
    };

    // Handle browser back button
    const handlePopState = () => {
      setIsFormVisible(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isFormVisible]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isFormVisible) {
        setIsFormVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFormVisible]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Drag functionality for vertical movement
  const handleMouseDown = (e) => {
    dragData.current = {
      isDragging: true,
      startY: e.clientY,
      startTop: parseFloat(position.top)
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!dragData.current.isDragging) return;

    const deltaY = e.clientY - dragData.current.startY;
    const windowHeight = window.innerHeight;
    const buttonHeight = 120; // Approximate height of the button
    const newTop = Math.max(10, Math.min(windowHeight - buttonHeight - 10,
      dragData.current.startTop + deltaY));

    setPosition({ top: newTop });
  };

  const handleMouseUp = () => {
    dragData.current.isDragging = false;
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    dragData.current = {
      isDragging: true,
      startY: touch.clientY,
      startTop: parseFloat(position.top)
    };
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!dragData.current.isDragging) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - dragData.current.startY;
    const windowHeight = window.innerHeight;
    const buttonHeight = 120;
    const newTop = Math.max(10, Math.min(windowHeight - buttonHeight - 10,
      dragData.current.startTop + deltaY));

    setPosition({ top: newTop });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    dragData.current.isDragging = false;
  };

  const handleTabClick = () => {
    // Toggle form visibility on click
    setIsFormVisible(prev => !prev);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const HANDLE_FORM_SUBMIT = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendContact(formData);

      if (result.ok) {
        console.log('Saved to sheet:', result.response);
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setIsFormVisible(false);
          setSubmitStatus(null); // Also clear the status message
        }, 3000); // 3 seconds to read the message
      } else {
        console.error('Save failed:', result.response);

        // Enhanced error handling for specific issues
        let errorMessage = 'Something went wrong. Please try again later.';

        if (result.response && result.response.error) {
          if (result.response.error.includes('Sheet not found')) {
            errorMessage = 'System configuration issue. Please contact support.';
          } else if (result.response.error.includes('Spreadsheet')) {
            errorMessage = 'Unable to save your message. Please try again.';
          } else if (result.response.error.includes('permission') || result.response.error.includes('unauthorized')) {
            errorMessage = 'Access denied. Please try again later.';
          }
        } else if (typeof result.response === 'string') {
          if (result.response.includes('Page not found') || result.response.includes('404')) {
            errorMessage = 'System temporarily unavailable. Please try again later.';
          } else if (result.response.includes('CORS') || result.response.includes('cors')) {
            errorMessage = 'Network issue. Please check your connection.';
          }
        }

        setSubmitStatus({
          type: 'error',
          message: errorMessage
        });
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const HANDLE_KEY_PRESS = (e) => {
    if (e.key === 'Enter' && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      // Submit form when Enter is pressed in any input field
      e.preventDefault();
      const form = e.target.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    }
  };

  return (
    <>
      {/* Professional Vertical Contact Tab with Form Container */}
      <div
        ref={buttonRef}
        className="fixed right-0 z-50 w-10 sm:w-auto select-none transition-all duration-200"
        style={{ top: position.top }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Vertical Contact Tab */}
        <button
          onClick={handleTabClick}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="flex h-28 sm:h-32 md:h-36 w-10 sm:w-11 cursor-move items-center justify-center rounded-l-xl bg-blue-900 shadow-xl transition-all duration-200 ease-in-out hover:bg-blue-900/90 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 active:bg-blue-900/80 active:scale-95"
          aria-label="Quick Contact Form"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            touchAction: 'none',
            WebkitTapHighlightColor: 'transparent',
            cursor: dragData.current.isDragging ? 'grabbing' : 'grab'
          }}
        >
          <span className="font-semibold tracking-wider text-white transform rotate-180 text-sm sm:text-base">
            Contact Us
          </span>
        </button>

        {/* Slide-out Contact Form */}
        <div
          ref={formRef}
          className={`fixed sm:absolute right-0 sm:right-full w-full sm:w-80 px-4 sm:px-0 sm:mr-2 z-50 transition-all duration-300 ease-in-out ${
            isFormVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          style={{
            top: window.innerWidth < 640 ? '50%' : position.top,
            transform: window.innerWidth < 640 ? 'translateY(-50%)' : 'none',
            height: 'auto',
            maxHeight: '90vh'
          }}
        >
          <div
            className="w-full rounded-xl bg-white p-4 sm:p-5 shadow-2xl flex flex-col max-w-md mx-auto overflow-y-auto"
            style={{ maxHeight: '85vh' }}
          >
            {/* Form Header */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-primary-text">Quick Contact</h3>
              <button
                onClick={closeForm}
                className="rounded-md p-1 text-secondary-text transition-colors hover:bg-base-light-gray hover:text-primary-text focus:outline-none focus:ring-2 focus:ring-blue-900 touch-target"
                aria-label="Close form"
                style={{ minWidth: '32px', minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Simple Contact Form */}
            <form
              className="space-y-2 flex-1 flex flex-col"
              onSubmit={HANDLE_FORM_SUBMIT}
              onKeyDown={HANDLE_KEY_PRESS}
            >
              <div>
                <label className="mb-1 block text-xs font-medium text-primary-text">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded border border-secondary-text/40 px-2 py-1.5 text-xs text-primary-text shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900/50"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-primary-gray">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded border border-secondary-gray/50 px-2 py-1.5 text-xs text-primary-gray shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900/50"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-primary-gray">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded border border-secondary-gray/50 px-2 py-1.5 text-xs text-primary-gray shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900/50"
                  placeholder="10-digit mobile"
                  maxLength="10"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-primary-gray">
                  Message
                </label>
                <textarea
                  rows={2}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full rounded border border-secondary-gray/50 px-2 py-1.5 text-xs text-primary-gray shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900/50 resize-none"
                  placeholder="How can we help?"
                  required
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div
                  className={`
                    p-2 rounded text-center text-xs
                    ${submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                    }
                  `}
                  role="alert"
                  aria-live="polite"
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button - Always visible */}
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    }
                  `}
                  style={{ minHeight: '36px', marginTop: 'auto' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>

            <p className="mt-3 text-center text-xs text-secondary-gray">
              We'll respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
