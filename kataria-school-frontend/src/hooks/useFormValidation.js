import { useState, useCallback } from 'react';

export function useFormValidation(formData) {
    const [errors, setErrorsState] = useState({});

    // Validation rules for each field
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Please enter a valid name (2-50 characters, letters only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[0-9]{10}$/,
            message: 'Please enter a valid 10-digit phone number'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 500,
            message: 'Message must be between 10 and 500 characters'
        }
    };

    // Set errors state
    const setErrors = useCallback((newErrors) => {
        setErrorsState(newErrors);
    }, []);

    // Clear all errors
    const clearErrors = useCallback(() => {
        setErrors({});
    }, [setErrors]);

    // Validate individual field
    const validateField = useCallback((fieldName, value) => {
        const rule = validationRules[fieldName];
        if (!rule) return true;

        const newErrors = { ...errors };

        // Required field check
        if (rule.required && (!value || value.trim() === '')) {
            newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            setErrors(newErrors);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') {
            delete newErrors[fieldName];
            setErrors(newErrors);
            return true;
        }

        // Length validation
        if (rule.minLength && value.trim().length < rule.minLength) {
            newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rule.minLength} characters`;
            setErrors(newErrors);
            return false;
        }

        if (rule.maxLength && value.trim().length > rule.maxLength) {
            newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${rule.maxLength} characters`;
            setErrors(newErrors);
            return false;
        }

        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value.trim())) {
            newErrors[fieldName] = rule.message;
            setErrors(newErrors);
            return false;
        }

        // Special validations
        let isValid = true;

        switch (fieldName) {
            case 'email': {
                // Additional email validation
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if (!emailRegex.test(value.trim())) {
                    newErrors[fieldName] = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            }

            case 'phone': {
                // Phone number format validation
                const cleanPhone = value.replace(/\D/g, '');
                if (cleanPhone.length !== 10) {
                    newErrors[fieldName] = 'Please enter a valid 10-digit phone number';
                    isValid = false;
                } else if (/^(\d)\1{9}$/.test(cleanPhone)) {
                    // Check for invalid patterns (all same digits)
                    newErrors[fieldName] = 'Please enter a valid phone number';
                    isValid = false;
                } else if (/0123|1234|2345|3456|4567|5678|6789/.test(cleanPhone)) {
                    // Check for sequential patterns
                    newErrors[fieldName] = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;
            }

            case 'name': {
                // Name validation - allow letters, spaces, hyphens, and apostrophes
                const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
                if (!nameRegex.test(value.trim())) {
                    newErrors[fieldName] = 'Name must contain only letters, spaces, hyphens, and apostrophes (2-50 characters)';
                    isValid = false;
                } else {
                    const words = value.trim().split(/\s+/);
                    if (words.length < 1 || words.some(word => word.length < 2)) {
                        newErrors[fieldName] = 'Please enter a valid full name';
                        isValid = false;
                    }
                }
                break;
            }

            case 'message': {
                // Message validation - check for meaningful content
                const cleanedMessage = value.replace(/[^\w\s]/gi, '').trim();
                if (cleanedMessage.split(/\s+/).length < 3) {
                    newErrors[fieldName] = 'Message must contain at least 3 meaningful words';
                    isValid = false;
                } else {
                    // Check for spam indicators
                    const spamPatterns = [
                        /(.)\1{4,}/i, // Repeated characters
                        /http[s]?:\/\//i, // URLs
                        /\$\d+/, // Money mentions
                        /click here/i, // Spam phrases
                        /free money/i,
                        /urgent/i
                    ];

                    if (spamPatterns.some(pattern => pattern.test(value))) {
                        newErrors[fieldName] = 'Message appears to contain spam content';
                        isValid = false;
                    }
                }
                break;
            }

            default:
                break;
        }

        // If validation passed, remove error
        if (isValid) {
            delete newErrors[fieldName];
        }

        setErrors(newErrors);
        return isValid;
    }, [errors, setErrors]);

    // Validate entire form
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const value = formData[fieldName];
            const rule = validationRules[fieldName];

            // Required field check
            if (rule.required && (!value || value.trim() === '')) {
                newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
                isValid = false;
                return;
            }

            // Skip other validations if field is empty and not required
            if (!value || value.trim() === '') {
                return;
            }

            // Individual field validation
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [formData, validateField, setErrors]);

    return {
        errors,
        validateField,
        validateForm,
        clearErrors,
        setErrors
    };
}