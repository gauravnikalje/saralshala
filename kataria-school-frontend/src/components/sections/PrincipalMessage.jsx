import { useTranslation } from 'react-i18next';
import Card from "../ui/Card";

export default function PrincipalMessage() {
  const { t } = useTranslation();

  return (
    <section
      id="principal-message"
      className="bg-white py-16 px-4 md:py-24"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl lg:text-5xl">
            {t('principalMessage.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t('principalMessage.description')}
          </p>
        </div>

        {/* Message Content */}
        <div className="grid gap-12 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
          {/* Principal's Photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border-4 border-blue-100 shadow-xl">
                <img
                  src="/assets/20231026_105702.jpg"
                  alt="Principal of Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi"
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-blue-200 to-orange-200"></div>
            </div>
          </div>

          {/* Message Text */}
          <div className="flex flex-col justify-center space-y-6">
            <Card className="border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-white">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-blue-900">
                  {t('principalMessage.principalName')}
                </h3>
                <p className="text-sm font-medium text-orange-600">
                  {t('principalMessage.position')}
                </p>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-gray-900">
                  {t('principalMessage.message.greeting')}
                </p>

                <p>
                  {t('principalMessage.message.paragraph1')}
                </p>

                <p>
                  {t('principalMessage.message.paragraph2')}
                </p>

                <p>
                  {t('principalMessage.message.paragraph3')}
                </p>

                <p className="font-semibold text-blue-900">
                  {t('principalMessage.message.closing')}
                </p>
              </div>

              {/* Signature */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-900">{t('principalMessage.signature.greeting')}</p>
                <p className="mt-1 text-2xl font-bold text-blue-900 italic">
                  {t('principalMessage.signature.name')}
                </p>
              </div>
            </Card>

            {/* Additional Info Card */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-orange-50 border-l-4 border-orange-500">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <svg
                      className="h-6 w-6"
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
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Ph.D. in Education
                    </p>
                    <p className="text-xs text-gray-600">
                      University of Pune
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-50 border-l-4 border-green-600">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      25+ Years Experience
                    </p>
                    <p className="text-xs text-gray-600">
                      Educational Leadership
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

