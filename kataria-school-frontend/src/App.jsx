import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import MissionVision from "./components/sections/MissionVision";
import PrincipalMessage from "./components/sections/PrincipalMessage";
import Testimonials from "./components/sections/Testimonials";
import EnquiryForm from "./components/sections/EnquiryForm";

const placeholderSections = [
  {
    id: "academics",
    title: "Academic Programs",
    description:
      "From foundational learning to advanced subjects, our curriculum blends modern pedagogy with personal attention to help every learner thrive.",
  },
  {
    id: "admissions",
    title: "Admissions & Enquiry",
    description:
      "We welcome new admissions across all grades. Our forthcoming enquiry workflow will make it simple for parents to connect with the school administration.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <Hero />
      <About />
      <MissionVision />
      <PrincipalMessage />
      <Testimonials />
      <EnquiryForm />
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 md:px-6">
        {placeholderSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
          >
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {section.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              {section.description}
            </p>
          </section>
        ))}

        <section
          id="contact"
          className="rounded-2xl border border-dashed border-slate-200 bg-slate-100 p-10 text-center"
        >
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Stay tuned for the full experience
          </h2>
          <p className="mt-4 text-base text-slate-600">
            We are actively developing the new website and backend systems for Kataria
            English Medium School. This preview showcases the design direction while
            the core features are being implemented.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
