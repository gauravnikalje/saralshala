import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const CornerLanguageToggle = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', nativeName: 'Eng' },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
        setIsOpen(false);
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.corner-language-toggle')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="corner-language-toggle relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm w-12 h-12 text-xs font-bold text-gray-800 shadow-lg transition-all duration-200 ease-out hover:bg-white hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Language selector"
            >
                <span className="text-sm">
                    {currentLanguage.code === 'en' ? 'Eng' : 'मरा'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-28 rounded-lg border border-gray-200 bg-white py-1 shadow-xl z-50 backdrop-blur-sm">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => changeLanguage(language.code)}
                            className={`flex w-full items-center justify-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150 ${currentLanguage.code === language.code ? 'bg-gray-50 text-primary-blue font-medium' : ''
                                }`}
                        >
                            <span className="text-sm">
                                {language.nativeName}
                            </span>
                            {currentLanguage.code === language.code && (
                                <svg className="ml-auto h-3 w-3 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CornerLanguageToggle;