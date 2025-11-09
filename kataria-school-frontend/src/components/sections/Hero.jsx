import Button from "../ui/Button";

export default function Hero() {
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

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-20 text-white"
      style={{ background: 'linear-gradient(180deg, #F2C230 0%, #C79A12 100%)' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/20 px-4 py-2 text-sm font-medium text-ivory backdrop-blur-sm animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
          Affiliated to CBSE & State Board
        </div>

        <h1 
          className="mb-6 font-heading text-4xl font-bold leading-tight text-charcoal-dark md:text-5xl lg:text-6xl animate-fade-in-up"
          style={{ textShadow: '0 10px 40px rgba(242,194,48,0.25)', animationDelay: '0.2s' }}
        >
          Welcome to{" "}
          <span className="text-gold">
            Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi
          </span>
        </h1>

        <p 
          className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-charcoal opacity-90 md:text-xl animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          Empowering young minds with holistic education, strong values, and a
          future-ready mindset.
        </p>

        <div 
          className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <Button variant="primary" size="lg" onClick={scrollToEnquiryForm}>
            Apply for Admission
          </Button>
          <Button variant="secondary" size="lg" onClick={scrollToAbout}>
            Learn More
          </Button>
        </div>

        <div 
          className="mt-12 grid grid-cols-3 gap-6 border-t border-gold/30 pt-8 text-center md:gap-8 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div>
            <p className="font-heading text-3xl font-bold md:text-4xl">20+</p>
            <p className="mt-1 text-sm text-yellow-200">Years of Excellence</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold md:text-4xl">1500+</p>
            <p className="mt-1 text-sm text-yellow-200">Happy Students</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold md:text-4xl">98%</p>
            <p className="mt-1 text-sm text-yellow-200">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

