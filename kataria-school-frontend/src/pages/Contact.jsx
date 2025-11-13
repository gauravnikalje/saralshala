import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('forms.validation.required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('forms.validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('forms.validation.email');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('forms.validation.required');
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t('forms.validation.phone');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('forms.validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(t('messages.sent'));
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert(t('errors.general'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Example of pluralization with dynamic count
  const [visitorCount, setVisitorCount] = useState(5);
  const visitorsText = t('contact.visitor_count', { count: visitorCount }, {
    defaultValue_zero: 'No visitors today',
    defaultValue_one: '{{count}} visitor today',
    defaultValue_other: '{{count}} visitors today'
  });

  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-primary mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-text-dark mb-4">
            {t('contact.description')}
          </p>
          <p className="text-sm text-gray-600">
            {visitorsText}
          </p>
          <button
            onClick={() => setVisitorCount(prev => prev + 1)}
            className="mt-2 text-sm text-brand-accent hover:underline"
          >
            {t('contact.increment_visitor', 'Simulate New Visitor')}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.name')} *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={t('forms.placeholders.name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.email')} *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('forms.placeholders.email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.phone')} *
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t('forms.placeholders.phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.message')} *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder={t('forms.placeholders.message')}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent ${errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {t('contact.required_fields', 'Fields marked with * are required')}
              </p>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? t('common.loading') : t('forms.submit', 'Submit')}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="font-semibold text-brand-primary mb-2">
              {t('contact.address.title', 'Our Address')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('contact.address.details', 'Kalewadi Choufula, Kalewadi Taluka: Daund District: Pune, 431801')}
            </p>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-brand-primary mb-2">
              {t('contact.phone.title', 'Phone')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('contact.phone.details', '+91 98765 43210')}
            </p>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-brand-primary mb-2">
              {t('contact.email.title', 'Email')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('contact.email.details', 'info@skkschool.edu.in')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
