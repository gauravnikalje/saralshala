import { useState, useEffect, useRef } from 'react';
import { MobileContactModal } from './MobileContactModal';

export default function MobileContactButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const buttonRef = useRef(null);

    // Handle scroll behavior for auto-hide
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Auto-hide button when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
        }
        if (e.key === 'Escape' && isModalOpen) {
            setIsModalOpen(false);
        }
    };

    const handleOverlayClick = () => {
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Return focus to the button for accessibility
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    };

    return (
        <>
            {/* Mobile-First Sticky Contact Button */}
            <button
                ref={buttonRef}
                onClick={() => setIsModalOpen(true)}
                onKeyDown={handleKeyDown}
                className={`
          fixed right-4 bottom-4 z-50 transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
          md:right-6 md:bottom-6
          focus:outline-none focus:ring-4 focus:ring-blue-500/50
        `}
                style={{
                    // Mobile: Circular button with arrow icon only
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                }}
                aria-label="Open contact form"
                role="button"
                tabIndex={0}
            >
                {/* Arrow Icon for mobile, no text */}
                <svg
                    className="w-6 h-6 text-white mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            </button>

            {/* Tablet/Desktop version with text label */}
            <button
                onClick={() => setIsModalOpen(true)}
                onKeyDown={handleKeyDown}
                className={`
          hidden md:fixed md:right-6 md:bottom-6 md:z-50 transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
          focus:outline-none focus:ring-4 focus:ring-blue-500/50
        `}
                style={{
                    padding: '12px 24px',
                    borderRadius: '25px',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
                aria-label="Open contact form"
                role="button"
                tabIndex={0}
            >
                {/* Contact Icon */}
                <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
                <span className="text-white font-medium text-sm">Contact</span>
            </button>

            {/* Mobile Contact Modal */}
            <MobileContactModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onOverlayClick={handleOverlayClick}
            />
        </>
    );
}