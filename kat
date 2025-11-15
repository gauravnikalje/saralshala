import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

// Custom hook for RTL support
export const useRTL = () => {
    const { i18n } = useTranslation();

    const isRTL = useMemo(() => {
        // Currently Marathi doesn't require RTL, but this can be extended
        // for languages like Arabic, Hebrew, etc.
        return i18n.language === 'ar' || i18n.language === 'he' || i18n.language === 'fa';
    }, [i18n.language]);

    const direction = useMemo(() => {
        return isRTL ? 'rtl' : 'ltr';
    }, [isRTL]);

    const textAlign = useMemo(() => {
        return isRTL ? 'text-right' : 'text-left';
    }, [isRTL]);

    const marginLeft = useMemo(() => {
        return isRTL ? 'mr-2' : 'ml-2';
    }, [isRTL]);

    const marginRight = useMemo(() => {
        return isRTL ? 'ml-2' : 'mr-2';
    }, [isRTL]);

    const paddingLeft = useMemo(() => {
        return isRTL ? 'pr-2' : 'pl-2';
    }, [isRTL]);

    const paddingRight = useMemo(() => {
        return isRTL ? 'pl-2' : 'pr-2';
    }, [isRTL]);

    return {
        isRTL,
        direction,
        textAlign,
        marginLeft,
        marginRight,
        paddingLeft,
        paddingRight,
        // For responsive positioning adjustments
        leftClass: isRTL ? 'left' : 'right',
        rightClass: isRTL ? 'right' : 'left',
    };
};

// CSS classes for RTL support
export const rtlClasses = {
    container: 'flex flex-col',
    text: 'text-left',
    button: 'flex items-center justify-center',
    dropdown: 'origin-top-right right-0',
    dropdownRTL: 'origin-top-left left-0',
    margin: 'ml-2',
    marginRTL: 'mr-2',
    padding: 'pl-4',
    paddingRTL: 'pr-4',
};

// RTL-aware positioning utilities
export const getRTLPosition = (classes) => {
    return {
        position: classes.includes('right') ? 'left' : 'right'
    };
};

// Utility function to get RTL-aware class names
export const getRTLAwareClass = (baseClass, rtlClass) => {
    return `${baseClass} ${rtlClass}`;
};