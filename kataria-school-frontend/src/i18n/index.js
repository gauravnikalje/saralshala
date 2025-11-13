import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import mrTranslations from './locales/mr.json';

// Browser language detection with Marathi support
const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        // Check localStorage first for persisted language
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            callback(savedLanguage);
            return;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;

        if (browserLang.startsWith('mr')) {
            callback('mr');
        } else if (browserLang.startsWith('en')) {
            callback('en');
        } else {
            // Default to English for unsupported languages
            callback('en');
        }
    },
    init: () => { },
    cacheUserLanguage: (lng) => {
        localStorage.setItem('language', lng);
    }
};

const resources = {
    en: {
        translation: enTranslations
    },
    mr: {
        translation: mrTranslations
    }
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;