import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import { Academics } from "../components/sections/Academics";
import MissionVision from "../components/sections/MissionVision";
import PrincipalMessage from "../components/sections/PrincipalMessage";
import Testimonials from "../components/sections/Testimonials";
import RankersPreview from '../components/rankers/RankersPreview';
import EnquiryForm from "../components/sections/EnquiryForm";

const homeBackgroundStyle = {
  backgroundImage: `
    radial-gradient(circle at 10% 15%, rgba(242, 196, 29, 0.2), transparent 40%),
    radial-gradient(circle at 90% 20%, rgba(242, 196, 29, 0.15), transparent 45%),
    radial-gradient(circle at 50% 95%, rgba(242, 196, 29, 0.25), transparent 50%)
  `,
  backgroundColor: '#FFFDF5', // A very light, warm cream fallback
};

export default function Home() {
  return (
    <div style={homeBackgroundStyle}>
      <Hero />
      <div className="container mx-auto space-y-24 px-4 py-16">
        <RankersPreview />
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
