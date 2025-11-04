import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-lg font-semibold text-white">
            KE
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-sky-600">
              Kataria English Medium School
            </p>
            <p className="text-xs text-slate-500">
              Daund · Affiliated to State Board
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
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="transition-colors hover:text-sky-600"
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

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm font-medium text-slate-700">
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
