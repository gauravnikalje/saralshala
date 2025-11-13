import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';

const About = () => {
  const { t } = useTranslation();
  const { isRTL, direction, textAlign } = useRTL();

  return (
    <section
      id="about"
      className="py-16 px-4"
      style={{ direction, textAlign: textAlign.includes('right') ? 'right' : 'left' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-primary mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-text-dark max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-brand-primary">
              {t('about.mission.title', 'Our Mission')}
            </h2>
            <p className="text-text-dark">
              {t('about.mission.description', 'To provide quality education that nurtures students\' overall development and prepares them for future challenges.')}
            </p>

            <h2 className="text-2xl font-semibold text-brand-primary mt-8">
              {t('about.vision.title', 'Our Vision')}
            </h2>
            <p className="text-text-dark">
              {t('about.vision.description', 'To be a leading educational institution that empowers students with knowledge, values, and skills to become responsible global citizens.')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-brand-secondary/10 to-brand-accent/10 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold text-brand-primary mb-4">
              {t('about.values.title', 'Our Core Values')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                <span>{t('about.values.integrity', 'Integrity')}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                <span>{t('about.values.excellence', 'Excellence')}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                <span>{t('about.values.respect', 'Respect')}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                <span>{t('about.values.responsibility', 'Responsibility')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
