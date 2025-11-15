import { useTranslation } from 'react-i18next';
import SchoolLogo from '../../assets/Logo.png';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    {
      title: t('footer.navigation.about'),
      links: [
        { label: t('footer.subLinks.ourStory'), href: "#about" },
        { label: t('footer.subLinks.mission'), href: "#mission" },
        { label: t('footer.subLinks.leadership'), href: "#leadership" },
      ],
    },
    {
      title: t('footer.navigation.academics'),
      links: [
        { label: t('footer.subLinks.curriculum'), href: "#academics" },
        { label: t('footer.subLinks.admissions'), href: "#admissions" },
        { label: t('footer.subLinks.studentLife'), href: "#student-life" },
      ],
    },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--color-primary-navy)' }} className="text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-6 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={SchoolLogo}
                alt={`${t('header.schoolName')} Logo - Professional Educational Institution`}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 object-contain flex-shrink-0 text-white"
                style={{
                  maxWidth: '80px',
                  maxHeight: '80px'
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-wide text-white truncate">
                  {t('header.schoolName')}
                </p>
                <p className="text-xs text-gray-300 truncate hidden sm:block">
                  {t('header.schoolInfo')}
                </p>
              </div>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-gray-300">
              {t('footer.description')}
            </p>
            {/* Social Links can go here */}
          </div>

          {quickLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-wide text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-gray-300 block py-1">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 text-xs text-gray-300 md:flex-row md:items-center md:justify-between">
          <p>
            {t('footer.copyright').replace('2024', new Date().getFullYear())}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href="#privacy" className="transition-colors hover:text-gray-300 block py-1" style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
              {t('footer.links.privacy')}
            </a>
            <a href="#terms" className="transition-colors hover:text-gray-300 block py-1" style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
              {t('footer.links.terms')}
            </a>
            <a href="#support" className="transition-colors hover:text-gray-300 block py-1" style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
              {t('footer.links.support')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
