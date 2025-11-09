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
      setHoverTimeout(null);
    }
    setIsFormVisible(true);
  };

  const handleTabMouseLeave = () => {
    setIsMouseOverTab(false);
    // Only hide if mouse is not over form either AND form is not active
    if (!isMouseOverForm && !isFormActive) {
      const timeout = setTimeout(() => {
        setIsFormVisible(false);
      }, 1000); // 1 second delay for better usability
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
      }, 1000); // 1 second delay for better usability
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
      }, 1000);
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

  return (
    <>
      {/* Professional Vertical Contact Tab with Form Container */}
      <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2 transform">
        {/* Vertical Contact Tab */}
        <button
          onClick={handleTabClick}
          onMouseEnter={handleTabMouseEnter}
          onMouseLeave={handleTabMouseLeave}
          className="flex h-32 w-10 cursor-pointer items-center justify-center rounded-l-lg bg-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
          className={`absolute right-full top-0 mr-2 transition-all duration-500 ${
            isFormVisible 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          onMouseEnter={handleFormMouseEnter}
          onMouseLeave={handleFormMouseLeave}
        >
          <div className="w-80 rounded-lg bg-white p-6 shadow-2xl">
            {/* Form Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Quick Contact</h3>
              <button
                onClick={closeForm}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close form"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Simple Contact Form */}
            <form className="space-y-4" onBlur={handleFormBlur}>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  onFocus={handleFormFocus}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  onFocus={handleFormFocus}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows={3}
                  onFocus={handleFormFocus}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-slate-500">
              We'll respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
