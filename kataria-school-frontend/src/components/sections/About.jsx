import { useTranslation } from 'react-i18next';
import Card from "../ui/Card";

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-white py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl lg:text-5xl">
            {t('aboutSchool.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t('aboutSchool.description')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* School Image */}
          <div className="order-2 md:order-1">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/assets/20231026_112113.jpg"
                alt="Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi campus"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* School Description */}
          <div className="order-1 flex flex-col justify-center space-y-6 md:order-2">
            <Card className="border-l-4 border-blue-600 bg-blue-50">
              <h3 className="mb-3 text-xl font-semibold text-blue-900">
                {t('aboutSchool.heritage.title')}
              </h3>
              <p className="leading-relaxed text-gray-700">
                {t('aboutSchool.heritage.description')}
              </p>
            </Card>

            <Card className="border-l-4 border-orange-500 bg-orange-50">
              <h3 className="mb-3 text-xl font-semibold text-orange-900">
                {t('aboutSchool.approach.title')}
              </h3>
              <p className="leading-relaxed text-gray-700">
                {t('aboutSchool.approach.description')}
              </p>
            </Card>

            <Card className="border-l-4 border-green-600 bg-green-50">
              <h3 className="mb-3 text-xl font-semibold text-green-900">
                {t('aboutSchool.community.title')}
              </h3>
              <p className="leading-relaxed text-gray-700">
                {t('aboutSchool.community.description')}
              </p>
            </Card>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-gray-800">
              {t('aboutSchool.highlights.curriculum.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('aboutSchool.highlights.curriculum.description')}
            </p>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-gray-800">
              {t('aboutSchool.highlights.faculty.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('aboutSchool.highlights.faculty.description')}
            </p>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-gray-800">
              {t('aboutSchool.highlights.infrastructure.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('aboutSchool.highlights.infrastructure.description')}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}


