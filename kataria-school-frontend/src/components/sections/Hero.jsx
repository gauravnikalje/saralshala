import { useTranslation } from 'react-i18next';
import Button from "../ui/Button";
import SchoolLogo from '../../assets/Logo.png';

export default function Hero() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  // Check if current language is Marathi for RTL support
  const isMarathi = i18n.language === 'mr';

  const scrollToEnquiryForm = () => {
    const enquirySection = document.getElementById("enquiry");
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroStyle = {
    background: 'linear-gradient(180deg, rgba(255, 244, 194, 0.94) 0%, rgba(255, 248, 214, 0.96) 45%, rgba(255, 252, 234, 0.97) 70%, rgba(255, 255, 255, 0.99) 100%)',
    direction: isMarathi ? 'rtl' : 'ltr'
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-20"
      style={heroStyle}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <img
          src={SchoolLogo}
          alt=""
          className="absolute inset-0 -translate-y-[25%] m-auto h-auto w-3/5 max-w-2xl object-contain opacity-[0.28]"
        />
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-brand-secondary/15 blur-3xl"></div>
        <div className="absolute -bottom-28 -right-28 h-[480px] w-[480px] rounded-full bg-brand-secondary/15 blur-3xl"></div>
      </div>

      {/* Floating admissions highlight card removed as per user request */}

      <div className="relative z-10 mx-auto w-full text-center px-4">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-secondary bg-brand-secondary/20 px-4 py-2 text-sm font-medium text-brand-primary backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-brand-accent"></span>
          {t('hero.affiliation')}
        </div>

        <h1 className="mb-6 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          <div className="text-blue-900 font-black w-full" style={{ fontFamily: 'Cinzel, serif', fontWeight: '700', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            <div className="leading-tight text-center whitespace-pre-line">{t('hero.heroTitle')}</div>
          </div>
        </h1>

        <p className="mx-auto mb-16 max-w-2xl text-lg leading-relaxed text-text-dark md:text-xl">
          {t('hero.tagline')}
        </p>

        <div className="mt-16 mb-8 flex flex-wrap justify-center gap-6">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-8 py-4 text-lg font-semibold text-yellow-300 transition-all duration-200 ease-in-out hover:bg-blue-800 hover:text-yellow-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={scrollToEnquiryForm}
          >
            {t('hero.enquiryAboutAdmission')}
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-8 py-4 text-lg font-semibold text-yellow-300 transition-all duration-200 ease-in-out hover:bg-blue-800 hover:text-yellow-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={scrollToAbout}
          >
            {t('hero.learnMore')}
          </button>
        </div>

        <div className="relative mt-12 border-t border-brand-secondary/30 pt-12">
          <div className="absolute inset-0 -z-20 flex items-center justify-center">
            <div className="h-28 w-full max-w-2xl rounded-full bg-brand-secondary/25 blur-3xl"></div>
          </div>
          <div className="relative z-10 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div className="rounded-2xl bg-white/60 p-6 shadow-level-1 backdrop-blur">
              <p className="font-heading text-3xl font-bold text-brand-primary md:text-4xl">20+</p>
              <p className="mt-1 text-sm text-secondary-text opacity-80">{t('hero.stats.preIncubators')}</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-6 shadow-level-1 backdrop-blur">
              <p className="font-heading text-3xl font-bold text-brand-primary md:text-4xl">1500+</p>
              <p className="mt-1 text-sm text-secondary-text opacity-80">{t('hero.stats.happyStudents')}</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-6 shadow-level-1 backdrop-blur">
              <p className="font-heading text-3xl font-bold text-brand-primary md:text-4xl">98%</p>
              <p className="mt-1 text-sm text-secondary-text opacity-80">{t('hero.stats.successRate')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
