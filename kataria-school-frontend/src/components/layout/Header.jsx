import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import SchoolLogo from '../../assets/logo.png'; // Assuming the logo is saved here

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 bg-ivory transition-shadow duration-fast ${hasScrolled ? 'shadow-scroll' : ''}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={handleHomeClick}>
          <img src={SchoolLogo} alt="School Logo" className="h-12 w-12" />
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-sky-600">
              Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi
            </p>
            <p className="text-xs text-slate-500">
              Kalewadi Choufula, Kalewadi Taluka: Daund District: Pune, 431801 · Affiliated to CBSE & State Board
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div id="primary-navigation" className="hidden lg:flex lg:items-center lg:gap-8">
          <ul className="flex items-center gap-6 text-sm font-semibold text-charcoal-dark">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`relative rounded-md px-3 py-2 transition-colors hover:text-gold hover:bg-gold-tint ${location.pathname === link.href ? 'text-gold' : ''} after:absolute after:bottom-[-6px] after:left-0 after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-gold-deep after:rounded-full after:transition-transform hover:after:scale-x-100`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href="/legacy/login.html"
              style={{ textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/legacy/login.html';
              }}
            >
              <Button variant="outline" size="sm">
                Login
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t border-slate-200 bg-ivory lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-base font-semibold text-charcoal-dark">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block rounded-md px-2 py-2 transition-colors hover:bg-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <a
                href="/legacy/login.html"
                className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-center text-xs font-semibold uppercase text-slate-600 transition-colors hover:border-sky-500 hover:text-sky-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
