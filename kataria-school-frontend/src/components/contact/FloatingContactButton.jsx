import { useState } from 'react';

export default function FloatingContactButton() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isMouseOverTab, setIsMouseOverTab] = useState(false);
  const [isMouseOverForm, setIsMouseOverForm] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const handleTabMouseEnter = () => {
    setIsMouseOverTab(true);
    // Clear any existing timeout to prevent premature hiding
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(1000);
    }
    setIsFormVisible(true);
  };

  const handleTabMouseLeave = () => {
    setIsMouseOverTab(false);
    // Only hide if mouse is not over form either AND form is not active
    if (!isMouseOverForm && !isFormActive) {
      const timeout = setTimeout(() => {
        setIsFormVisible(false);
      }, 2000); // 2 seconds delay as requested
      setHoverTimeout(timeout);
    }
  };

  const handleFormMouseEnter = () => {
    setIsMouseOverForm(true);
    setIsFormActive(true);
    // Clear closing timeout when mouse enters form
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleFormMouseLeave = () => {
    setIsMouseOverForm(false);
    // Only hide if mouse is not over tab either AND form is not active
    if (!isMouseOverTab && !isFormActive) {
      const timeout = setTimeout(() => {
        setIsFormVisible(false);
      }, 2000); // 2 seconds delay as requested
      setHoverTimeout(timeout);
    }
  };

  const handleFormFocus = () => {
    // When form field is focused, mark form as active
    setIsFormActive(true);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleFormBlur = () => {
    // When form field loses focus, check if we should hide
    setIsFormActive(false);
    if (!isMouseOverTab && !isMouseOverForm) {
      const timeout = setTimeout(() => {
        setIsFormVisible(false);
      }, 2000); // 2 seconds delay as requested
      setHoverTimeout(timeout);
    }
  };

  const handleTabClick = () => {
    // Toggle form visibility on click
    setIsFormVisible(prev => !prev);
    // Clear any hiding timeout since user is interacting
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setIsFormActive(false);
  };

  const HANDLE_FORM_SUBMIT = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', { name: e.target.name?.value, email: e.target.email?.value, message: e.target.message?.value });
    // Reset form and close
    e.target.reset();
    setIsFormVisible(false);
    setIsFormActive(false);
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
      <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2 transform">
        {/* Vertical Contact Tab */}
        <button
          onClick={handleTabClick}
          onMouseEnter={handleTabMouseEnter}
          onMouseLeave={handleTabMouseLeave}
          className="flex h-32 w-10 cursor-pointer items-center justify-center rounded-l-lg bg-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-900/90 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
          aria-label="Quick Contact Form"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          <span className="font-semibold tracking-wider text-white transform rotate-180">
            Contact Us
          </span>
        </button>

        {/* Slide-out Contact Form */}
        <div
          className={`absolute right-full top-0 mr-2 transition-all duration-500 ${isFormVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
            }`}
          onMouseEnter={handleFormMouseEnter}
          onMouseLeave={handleFormMouseLeave}
        >
          <div
            className="w-80 rounded-lg bg-white p-6 shadow-2xl"
            onMouseEnter={() => setIsFormActive(true)}
            onMouseLeave={() => setIsFormActive(false)}
          >
            {/* Form Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary-text">Quick Contact</h3>
              <button
                onClick={closeForm}
                className="rounded-md p-1 text-secondary-text transition-colors hover:bg-base-light-gray hover:text-primary-text focus:outline-none focus:ring-2 focus:ring-blue-900"
                aria-label="Close form"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Simple Contact Form */}
            <form
              className="space-y-4"
              onBlur={handleFormBlur}
              onSubmit={HANDLE_FORM_SUBMIT}
              onKeyDown={HANDLE_KEY_PRESS}
              onMouseEnter={() => setIsFormActive(true)}
              onMouseLeave={() => setIsFormActive(false)}
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-primary-text">
                  Name
                </label>
                <input
                  type="text"
                  onFocus={handleFormFocus}
                  className="w-full rounded-lg border border-secondary-text/40 px-3 py-2 text-sm text-primary-text shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-primary-gray">
                  Email
                </label>
                <input
                  type="email"
                  onFocus={handleFormFocus}
                  className="w-full rounded-lg border border-secondary-gray/50 px-3 py-2 text-sm text-primary-gray shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-primary-gray">
                  Message
                </label>
                <textarea
                  rows={3}
                  onFocus={handleFormFocus}
                  className="w-full rounded-lg border border-secondary-gray/50 px-3 py-2 text-sm text-primary-gray shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-accent-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-red/90 focus:outline-none focus:ring-2 focus:ring-accent-red focus:ring-offset-2"
              >
                Send Message
              </button>
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
