import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import the actual school images
import img1 from '../../assets/20231026_105702.jpg';
import img2 from '../../assets/20231026_112113.jpg';
import img3 from '../../assets/IMG-20250926-WA0039.jpg';
import img4 from '../../assets/IMG-20250926-WA0041.jpg';
import img5 from '../../assets/IMG-20251016-WA0054.jpg';

export const Academics = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [img1, img2, img3, img4, img5];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  useEffect(() => {
    if (!autoPlay) {
      const timer = setTimeout(() => setAutoPlay(true), 5000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Academics & Student Life
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our vibrant campus, talented students, and dedicated staff at Kataria English Medium School.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative h-96 md:h-[500px] bg-black overflow-hidden">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Kataria School event ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-4 right-4 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          <div className="flex justify-center gap-2 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            {images.map((_, index) => {
              const isActive = index === currentIndex;
              const dotClasses = isActive ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400 w-3';
              return (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setAutoPlay(false);
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${dotClasses}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Celebrating Success</h3>
            <p className="text-gray-600">Honoring the achievements of our talented students and dedicated staff.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Creative Expression</h3>
            <p className="text-gray-600">Fostering creativity and teamwork through hands-on activities and crafts.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community & Assembly</h3>
            <p className="text-gray-600">Building a strong school community through shared events and assemblies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
