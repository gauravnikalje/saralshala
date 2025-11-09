// src/hooks/useFocusTrap.js
import React from 'react';

const useFocusTrap = (ref, active) => {
  React.useEffect(() => {
    if (!active || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    firstElement?.focus();
    ref.current.addEventListener('keydown', handleTabKeyPress);

    return () => {
      ref.current?.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [active, ref]);
};

export default useFocusTrap;
