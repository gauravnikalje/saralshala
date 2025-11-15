import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Button from "../ui/Button";
import LanguageToggle from "../ui/LanguageToggle";
import SchoolLogo from '../../assets/Logo.png';

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t('navigation.home'), href: "/" },
    { label: t('navigation.about'), href: "/about" },
    { label: t('navigation.academics'), href: "/academics" },
    { label: t('navigation.admissions'), href: "/admissions" },
    { label: t('navigation.contact'), href: "/contact" },
  ];

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-95"
      style={{ backgroundColor: 'var(--color-primary-navy)', height: '72px' }}
    >
      <nav className="relative flex items-center justify-between h-full px-2 sm:px-4 md:px-6 lg:px-8">
        {/* School Logo and Name - Absolutely Left Aligned */}
        <div className="absolute left-2 sm:left-4 md:left-6 lg:left-8 z-10 flex-shrink-0 max-w-xs sm:max-w-sm">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 transition-all duration-300 hover:opacity-90 hover:scale-105" onClick={handleHomeClick}>
            <img
              src={SchoolLogo}
              alt={`${t('header.schoolName')} Logo - Professional Educational Institution`}
              className="flex-shrink-0 drop-shadow-lg w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
              style={{
                objectFit: 'contain'
              }}
            />
            <div className="flex-1 min-w-0 hidden sm:block">
              <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide text-white truncate">
                {t('header.schoolName')}
              </p>
              <p className="text-xs text-gray-300 truncate hidden md:block">
                {t('header.schoolInfo')}
              </p>
            </div>
          </Link>
        </div>

        {/* Right side - Desktop Navigation (positioned absolutely to the right) */}
        <div id="primary-navigation" className="hidden lg:flex lg:items-center lg:gap-8 absolute right-4 md:right-6 lg:right-8">
          <ul className="flex items-center gap-6 sm:gap-7 md:gap-8 text-sm font-semibold text-white">
            {navLinks.map((link, index) => (
              <li key={link.label} className="group">
                <Link
                  to={link.href}
                  className="relative overflow-hidden px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ease-out hover:text-accent-gold hover:transform hover:scale-105 hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/0 via-accent-gold/10 to-accent-gold/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>

                  {/* Animated Underline */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left"></div>

                  {/* Sliding Text Effect */}
                  <span className="relative z-10 block transform group-hover:-translate-y-0.5 transition-transform duration-200 ease-out">
                    {link.label}
                  </span>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-accent-gold/10 blur-sm transition-opacity duration-200 ease-out -z-10"></div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a
              href="/legacy/login.html"
              style={{ textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/legacy/login.html';
              }}
            >
              <Button variant="primary-light" size="sm" className="shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:shadow-xl">
                {t('navigation.login')}
              </Button>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button (Absolutely positioned to the right) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 p-1.5 sm:p-2 md:p-2.5 text-white transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 lg:hidden backdrop-blur-sm absolute right-2 sm:right-4 md:right-6 lg:right-8 z-20"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span className="sr-only">{t('navigation.toggleNavigation')}</span>
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300"
            style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/20 lg:hidden backdrop-blur-md bg-opacity-95"
          style={{ backgroundColor: 'var(--color-primary-navy)' }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-base font-semibold text-white">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                to={link.href}
                className="group relative overflow-hidden rounded-lg px-4 py-3 transition-all duration-200 ease-out hover:bg-white/20 hover:text-accent-gold"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Sliding Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/0 via-accent-gold/20 to-accent-gold/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-out"></div>

                {/* Sliding Text Effect */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="block transform group-hover:translate-x-1 transition-transform duration-200 ease-out">
                    {link.label}
                  </span>
                  {/* Animated Arrow */}
                  <svg
                    className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 ease-out"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-accent-gold/10 blur-sm transition-opacity duration-200 ease-out -z-10"></div>
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <a
                href="/legacy/login.html"
                className="flex-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="primary-light" size="md" className="w-full shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:shadow-xl">
                  {t('navigation.login')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
