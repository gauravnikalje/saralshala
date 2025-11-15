import { useState, useEffect, useRef } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { sendContact } from '../../services/contactService';

export function MobileContactModal({ isOpen, onClose, onOverlayClick }) {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const firstInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    // Custom hook for form validation
    const {
        errors,
        validateField,
        validateForm,
        setErrors
    } = useFormValidation(formData);

    // Focus trapping and accessibility
    useEffect(() => {
        if (isOpen && firstInputRef.current) {
            // Focus first input when modal opens
            firstInputRef.current.focus();
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Handle input changes with real-time validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        validateField(name, value);

        // Check if form is ready for submission
        setIsSubmitEnabled(validateForm());
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus({
                type: 'error',
                message: 'Please fix the errors above before submitting.'
            });
            return;
        }

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
                    setErrors({});
                    onClose();
                }, 3000); // 3 seconds to read the message
            } else {
                console.error('Save failed:', result.response);
                setSubmitStatus({
                    type: 'error',
                    message: 'Something went wrong. Please try again later.'
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

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            onOverlayClick();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay with backdrop blur */}
            <div
                ref={overlayRef}
                onClick={handleOverlayClick}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                aria-hidden="true"
            />

            {/* Slide-in Modal from Right */}
            <div
                ref={modalRef}
                className={`
          fixed right-0 top-0 h-full w-full max-w-md z-50
          bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                aria-describedby="contact-modal-description"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <div>
                            <h2 id="contact-modal-title" className="text-lg font-bold">
                                Contact Us
                            </h2>
                            <p id="contact-modal-description" className="text-sm text-blue-100">
                                We'd love to hear from you
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                            aria-label="Close contact form"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <form onSubmit={handleSubmit} noValidate>
                            {/* Name Field */}
                            <div className="mb-4">
                                <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    ref={firstInputRef}
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={`
                    w-full px-3 py-2 text-sm border rounded-lg
                    focus:outline-none focus:ring-2 transition-colors
                    ${errors.name
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                                        }
                  `}
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                    required
                                />
                                {errors.name && (
                                    <p id="name-error" className="mt-1 text-xs text-red-600" role="alert">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="mb-4">
                                <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className={`
                    w-full px-3 py-2 text-sm border rounded-lg
                    focus:outline-none focus:ring-2 transition-colors
                    ${errors.email
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                                        }
                  `}
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                    required
                                />
                                {errors.email && (
                                    <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="mb-4">
                                <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="contact-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="10-digit mobile number"
                                    maxLength="10"
                                    className={`
                    w-full px-3 py-2 text-sm border rounded-lg
                    focus:outline-none focus:ring-2 transition-colors
                    ${errors.phone
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                                        }
                  `}
                                    aria-invalid={errors.phone ? 'true' : 'false'}
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    required
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="mt-1 text-xs text-red-600" role="alert">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div className="mb-6">
                                <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Your Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="How can we help you?"
                                    maxLength={500}
                                    className={`
                    w-full px-3 py-2 text-sm border rounded-lg resize-none
                    focus:outline-none focus:ring-2 transition-colors
                    ${errors.message
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                                        }
                  `}
                                    aria-invalid={errors.message ? 'true' : 'false'}
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                    required
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {errors.message ? (
                                        <p id="message-error" className="text-xs text-red-600" role="alert">
                                            {errors.message}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-500">Minimum 10 characters</p>
                                    )}
                                    <span className="text-xs text-gray-500">
                                        {formData.message.length}/500
                                    </span>
                                </div>
                            </div>

                            {/* Submit Status */}
                            {submitStatus && (
                                <div
                                    className={`
                    mb-4 p-3 rounded-lg flex items-center
                    ${submitStatus.type === 'success'
                                            ? 'bg-green-50 text-green-800 border border-green-200'
                                            : 'bg-red-50 text-red-800 border border-red-200'
                                        }
                  `}
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {submitStatus.type === 'success' ? (
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <span className="text-sm font-medium">{submitStatus.message}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isSubmitEnabled || isSubmitting}
                                className={`
                  w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200
                  focus:outline-none focus:ring-4 focus:ring-blue-500/50
                  ${isSubmitEnabled && !isSubmitting
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }
                `}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-center text-xs text-gray-600">
                            We'll respond within 24 hours
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}