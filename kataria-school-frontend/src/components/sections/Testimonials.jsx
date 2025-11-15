import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = t('testimonials.sampleTestimonials', { returnObjects: true });

  // Add placeholder images to testimonials
  const testimonialsWithImages = testimonials.map((testimonial) => ({
    ...testimonial,
    image: "/assets/Logo.png", // Using local logo instead of placeholder
    rating: 5
  }));

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsWithImages.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsWithImages.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="bg-white py-16 px-4 md:py-24"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl lg:text-5xl">
            {t('testimonials.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonialsWithImages.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card className="mx-auto max-w-4xl border-t-4 border-blue-600 bg-white shadow-xl">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left">
                      {/* Avatar */}
                      <div className="mb-6 flex-shrink-0 md:mb-0 md:mr-8">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-24 w-24 rounded-full border-4 border-blue-100 object-cover shadow-lg"
                          />
                          {/* Quote icon */}
                          <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        {/* Rating */}
                        <div className="mb-4 flex justify-center md:justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-5 w-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="mb-6 text-lg leading-relaxed text-gray-700">
                          "{testimonial.text}"
                        </p>

                        {/* Author Info */}
                        <div>
                          <p className="font-bold text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={previousTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:-translate-x-12"
            aria-label={t('testimonials.navigation.previous')}
          >
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:translate-x-12"
            aria-label={t('testimonials.navigation.next')}
          >
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonialsWithImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-3 w-3 rounded-full transition-all ${index === currentIndex
                ? "w-8 bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={t('testimonials.navigation.goTo', { index: index + 1 })}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-lg text-gray-600">
            {t('testimonials.cta.text')}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              document.getElementById("enquiry")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {t('testimonials.cta.button')}
          </Button>
        </div>
      </div>
    </section>
  );
}

