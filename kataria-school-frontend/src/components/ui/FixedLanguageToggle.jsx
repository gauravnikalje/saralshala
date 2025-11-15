import { useTranslation } from 'react-i18next';

const FixedLanguageToggle = () => {
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language || 'en';
    const nextLanguage = currentLanguage === 'en' ? 'mr' : 'en';

    const toggleLanguage = () => {
        i18n.changeLanguage(nextLanguage);
        localStorage.setItem('language', nextLanguage);
    };

    const getLanguageText = (langCode) => {
        return langCode === 'mr' ? 'मराठी' : 'English';
    };

    const getAriaLabel = () => {
        const currentText = getLanguageText(currentLanguage);
        const nextText = getLanguageText(nextLanguage);
        return `Switch language from ${currentText} to ${nextText}`;
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-20 right-4 z-[9999] flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/95 backdrop-blur-md border border-brand-secondary/20 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/30 focus:ring-offset-2"
            aria-label={getAriaLabel()}
            title={`Switch to ${getLanguageText(nextLanguage)}`}
        >
            <span className="text-sm sm:text-xs md:text-sm font-bold text-brand-primary transition-colors duration-200 hover:text-brand-secondary">
                {getLanguageText(nextLanguage)}
            </span>
        </button>
    );
};

export default FixedLanguageToggle;