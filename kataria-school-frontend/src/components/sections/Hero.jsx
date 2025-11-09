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
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-sky-600 via-sky-700 to-slate-900 px-4 py-20 text-white"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400 bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
          Affiliated to Maharashtra State Board
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
            Kataria English Medium School
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-sky-100 md:text-xl">
          Empowering young minds with holistic education, strong values, and a
          future-ready mindset in Daund, Pune District.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" onClick={scrollToEnquiryForm}>
            Apply for Admission
          </Button>
          <Button variant="outline" size="lg" onClick={scrollToAbout}>
            Learn More
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-sky-400/30 pt-8 text-center md:gap-8">
          <div>
            <p className="text-3xl font-bold md:text-4xl">20+</p>
            <p className="mt-1 text-sm text-sky-200">Years of Excellence</p>
          </div>
          <div>
            <p className="text-3xl font-bold md:text-4xl">1500+</p>
            <p className="mt-1 text-sm text-sky-200">Happy Students</p>
          </div>
          <div>
            <p className="text-3xl font-bold md:text-4xl">98%</p>
            <p className="mt-1 text-sm text-sky-200">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

