import Card from "../ui/Card";

export default function MissionVision() {
  const values = [
    {
      id: 1,
      title: "Our Mission",
      icon: (
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      description:
        "To provide holistic, values-based education that nurtures young minds, develops critical thinking, and prepares students to become responsible global citizens who contribute positively to society.",
      bgColor: "bg-blue-50",
      borderColor: "border-primary-blue",
      iconColor: "text-primary-blue",
    },
    {
      id: 2,
      title: "Our Vision",
      icon: (
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      description:
        "To be recognized as a leading educational institution in the region, known for academic excellence, innovative teaching methodologies, and producing well-rounded individuals equipped for the challenges of tomorrow.",
      bgColor: "bg-blue-50",
      borderColor: "border-primary-blue",
      iconColor: "text-primary-blue",
    },
    {
      id: 3,
      title: "Our Values",
      icon: (
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      description:
        "Integrity, Excellence, Respect, Innovation, and Compassion form the cornerstone of our educational philosophy. We instill these values in every student, fostering an environment of mutual respect, continuous learning, and ethical behavior.",
      bgColor: "bg-blue-50",
      borderColor: "border-primary-blue",
      iconColor: "text-primary-blue",
    },
  ];

  return (
    <section
      id="mission-vision"
      className="bg-white py-16 px-4 md:py-24"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-text md:text-4xl lg:text-5xl">
            Our Mission, Vision & Values
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-secondary-text">
            Guiding principles that drive our commitment to excellence in
            education and holistic student development
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <Card
              key={value.id}
              className={`flex flex-col items-center border-t-4 ${value.borderColor} ${value.bgColor} text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div
                className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-base-white shadow-lg ${value.iconColor}`}
              >
                {value.icon}
              </div>
              <h3 className="mb-3 text-2xl font-bold text-primary-text">
                {value.title}
              </h3>
              <p className="leading-relaxed text-secondary-text">
                {value.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-secondary-text">
            Join us in our journey towards educational excellence
          </p>
        </div>
      </div>
    </section>
  );
}

