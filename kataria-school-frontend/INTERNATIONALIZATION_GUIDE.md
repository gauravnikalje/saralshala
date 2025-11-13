# Internationalization (i18n) Implementation Guide

This document provides a comprehensive guide for the language toggle system implemented using react-i18next for the Kataria School frontend application.

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Translation Key Naming Convention](#translation-key-naming-convention)
4. [How to Add New Translation Keys](#how-to-add-new-translation-keys)
5. [Adding New Languages](#adding-new-languages)
6. [RTL Support](#rtl-support)
7. [Pluralization](#pluralization)
8. [Development Guidelines](#development-guidelines)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)

## Overview

The application uses **react-i18next** as the internationalization framework, supporting:
- English (en) - Default language
- Marathi (mr) - Secondary language
- Browser language detection
- localStorage persistence
- RTL support (ready for future RTL languages)

## Key Features

### ✅ Language Toggle Component
- Dropdown selector with country flags
- Real-time language switching
- Persistent language selection
- Responsive design with mobile support

### ✅ Automatic Language Detection
- Browser language detection on first visit
- Fallback to English for unsupported languages
- localStorage persistence

### ✅ RTL Support
- Dynamic text direction (ltr/rtl)
- RTL-aware positioning utilities
- Responsive layout adjustments

### ✅ Comprehensive Translations
- All UI elements mapped to translation keys
- Structured translation files
- Easy maintenance and updates

## Translation Key Naming Convention

### Structure
```
domain.section.item.subItem
```

### Domain Categories
- `common` - General UI elements (buttons, forms, validation)
- `navigation` - Navigation menu items
- `header` - Header-specific content
- `hero` - Hero section content
- `about`, `academics`, `admissions`, `contact` - Page-specific content
- `forms` - Form-related text
- `errors` - Error messages
- `messages` - Success/info messages
- `rankers` - Rankers page content
- `footer` - Footer content

### Examples
```json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "login": "Login"
  },
  "hero": {
    "welcomeTo": "Welcome to",
    "applyForAdmission": "Apply for Admission"
  },
  "forms": {
    "placeholders": {
      "name": "Enter your name",
      "email": "Enter your email"
    },
    "validation": {
      "required": "This field is required",
      "email": "Please enter a valid email address"
    }
  }
}
```

## How to Add New Translation Keys

### Step 1: Add Key to Translation Files
1. Open `src/i18n/locales/en.json` (English)
2. Add your new key with the English translation
3. Open `src/i18n/locales/mr.json` (Marathi)
4. Add the corresponding Marathi translation

**Example: Adding a new button label**
```json
// In en.json
{
  "common": {
    "submit": "Submit",
    "myNewButton": "My New Button"  // New key added here
  }
}

// In mr.json
{
  "common": {
    "submit": "सबमिट करा",
    "myNewButton": "माझे नवीन बटण"  // Corresponding Marathi translation
  }
}
```

### Step 2: Update Component
```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <button>
      {t('common.myNewButton')}
    </button>
  );
}
```

## Adding New Languages

### Step 1: Create Translation File
1. Create `src/i18n/locales/[language-code].json`
2. Copy structure from `en.json`
3. Translate all values

### Step 2: Update i18n Configuration
```javascript
// In src/i18n/index.js
import newLangTranslations from './locales/new-lang.json';

const resources = {
  en: { translation: enTranslations },
  mr: { translation: mrTranslations },
  newLang: { translation: newLangTranslations }, // Add new language
};
```

### Step 3: Update Language Toggle Component
```javascript
// In src/components/ui/LanguageToggle.jsx
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'newLang', name: 'New Language', nativeName: 'नवी भाषा' },
];
```

## RTL Support

The application includes comprehensive RTL (Right-to-Left) support using a custom React hook:

### Using the RTL Hook
```jsx
import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';

function MyComponent() {
  const { t } = useTranslation();
  const { isRTL, direction, leftClass, rightClass } = useRTL();
  
  return (
    <div style={{ direction }}>
      <div className={`absolute ${rightClass}-6 top-28`}>
        {t('hero.admissionsDescription')}
      </div>
    </div>
  );
}
```

### RTL-Aware Classes
```javascript
// Available RTL utilities
- isRTL: boolean - true for RTL languages
- direction: 'rtl' | 'ltr' - text direction
- leftClass: 'left' | 'right' - RTL-aware positioning
- rightClass: 'right' | 'left' - RTL-aware positioning
- marginLeft: 'ml-2' | 'mr-2' - RTL-aware margins
- marginRight: 'mr-2' | 'ml-2' - RTL-aware margins
```

### RTL Positioning Example
```jsx
// RTL-aware floating element
<div className={`absolute ${isRTL ? 'left-6' : 'right-6'} top-28`}>
  Content
</div>
```

## Pluralization

react-i18next supports advanced pluralization:

### Basic Pluralization
```json
// In translation files
{
  "messages": {
    "item_count": {
      "zero": "No items",
      "one": "{{count}} item",
      "other": "{{count}} items"
    }
  }
}
```

### Usage in Components
```jsx
const { t, i18n } = useTranslation();

// Basic pluralization
t('messages.item_count', { count: 0 }); // "No items"
t('messages.item_count', { count: 1 }); // "1 item"
t('messages.item_count', { count: 5 }); // "5 items"

// With interpolation
t('messages.welcome_user', { name: 'John' });
```

## Development Guidelines

### Code Standards
1. **Always use translation keys** - Never hardcode text in components
2. **Consistent naming** - Follow the established naming convention
3. **Context-aware keys** - Use descriptive, hierarchical keys
4. **Complete translations** - Ensure all languages have matching keys

### File Organization
```
src/
├── i18n/
│   ├── index.js              # i18n configuration
│   └── locales/
│       ├── en.json           # English translations
│       └── mr.json           # Marathi translations
├── components/
│   └── ui/
│       └── LanguageToggle.jsx # Language selector
├── hooks/
│   └── useRTL.js             # RTL support utilities
```

### Import Guidelines
```jsx
// ✅ Good: Import hooks and use translation
import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';

// ❌ Avoid: Direct i18n usage
import i18n from 'i18next';
```

## Testing

### Manual Testing
1. **Language Switching**: Test toggle functionality
2. **Persistence**: Verify localStorage saves language preference
3. **Browser Detection**: Test with different browser languages
4. **RTL Layout**: Test layout with RTL languages
5. **Translation Coverage**: Ensure all text uses translation keys

### Automated Testing
```javascript
// Example test for language toggle
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import LanguageToggle from '../components/ui/LanguageToggle';

test('language toggle switches language', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LanguageToggle />
    </I18nextProvider>
  );
  
  const toggleButton = screen.getByRole('button', { name: /language selector/i });
  fireEvent.click(toggleButton);
  
  const marathiOption = screen.getByText('मराठी');
  fireEvent.click(marathiOption);
  
  expect(i18n.language).toBe('mr');
});
```

## Troubleshooting

### Common Issues

#### 1. Missing Translation Keys
**Problem**: Translation shows as `t('key.name')` instead of translated text
**Solution**: 
- Check if key exists in all language files
- Verify key path is correct in component
- Restart development server after adding new keys

#### 2. Language Not Persisting
**Problem**: Language resets on page reload
**Solution**: 
- Check localStorage availability
- Verify i18n initialization in main.jsx
- Clear localStorage and test again

#### 3. RTL Layout Issues
**Problem**: Elements appear in wrong positions for RTL languages
**Solution**: 
- Use the `useRTL` hook for positioning
- Add RTL-aware CSS classes
- Test with both ltr and rtl languages

#### 4. Performance Issues
**Problem**: Language switch is slow
**Solution**: 
- Optimize translation file structure
- Use React.memo for large components
- Consider lazy loading for large translation files

### Debug Mode
Enable debug mode in development:
```javascript
// In src/i18n/index.js
i18n.init({
  debug: true, // Enable console logs
  // ... other config
});
```

### Console Commands
```javascript
// Check current language
console.log(i18n.language);

// Manually change language
i18n.changeLanguage('mr');

// Check loaded languages
console.log(i18n.services.resourceStore.data);

// Debug translation
console.log(t('hero.welcomeTo'));
```

## Best Practices

### Translation Management
1. **Version Control**: Keep translation files in version control
2. **Team Coordination**: Establish processes for updating translations
3. **Automated Testing**: Include translation tests in CI/CD
4. **Performance**: Lazy load large translation files
5. **Validation**: Validate translation completeness

### Development Workflow
1. **Add keys first**: Define translation keys before writing components
2. **Test all languages**: Verify UI works in all supported languages
3. **Monitor coverage**: Regular audits of translation completeness
4. **User feedback**: Collect feedback from native speakers
5. **Documentation**: Keep this guide updated

This implementation provides a robust, scalable internationalization system that can easily accommodate new languages, RTL support, and advanced i18n features as the application grows.