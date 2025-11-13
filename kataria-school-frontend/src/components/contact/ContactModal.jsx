import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid 10-digit number';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Quick contact form submitted:', formData);
    setIsSubmitting(false);

    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="w-full max-w-md rounded-2xl bg-base-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.15)]">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary-text">Quick Contact Form</h2>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-secondary-text transition-colors hover:bg-base-light-gray hover:text-primary-text focus:outline-none focus:ring-2 focus:ring-blue-900"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              error={errors.phone}
              required
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-primary-text">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="How can we help you?"
                className={`w-full rounded-lg border border-secondary-text/40 px-3 py-2 text-sm text-primary-text shadow-sm transition focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/40 ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                  }`}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-primary-text text-base-white hover:bg-primary-text/90"
              isLoading={isSubmitting}
              loadingText="Sending..."
            >
              Send Message
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-secondary-text">
            We'll get back to you within 24 hours
          </p>
        </div>
      </div>
    </>
  );
}