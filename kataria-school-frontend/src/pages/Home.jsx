import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import { Academics } from "../components/sections/Academics";
import MissionVision from "../components/sections/MissionVision";
import PrincipalMessage from "../components/sections/PrincipalMessage";
import Testimonials from "../components/sections/Testimonials";
import RankersPreview from '../components/rankers/RankersPreview';
import EnquiryForm from "../components/sections/EnquiryForm";

const homeBackgroundStyle = {
  backgroundImage:
    "radial-gradient(circle at 10% 5%, rgba(242, 196, 29, 0.28), transparent 55%)," +
    "radial-gradient(circle at 90% 12%, rgba(242, 196, 29, 0.22), transparent 55%)," +
    "radial-gradient(circle at 50% 95%, rgba(242, 196, 29, 0.18), transparent 60%)," +
    "linear-gradient(180deg, #FFF4C2 0%, #FFF7D8 40%, #FFF9E8 70%, #FFFFFF 100%)",
  backgroundColor: "#FFF7DA",
};

export default function Home() {
  return (
    <div className="min-h-screen" style={homeBackgroundStyle}>
      <Hero />
      <div className="container mx-auto space-y-12 px-4 py-8">
        <section className="rankersSection">
          <RankersPreview />
        </section>
        <About />
        <PrincipalMessage />
        <MissionVision />
        <Academics />
        <Testimonials />
        <EnquiryForm />
      </div>
    </div>
  );
}
