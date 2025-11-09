import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import { Academics } from "../components/sections/Academics";
import MissionVision from "../components/sections/MissionVision";
import PrincipalMessage from "../components/sections/PrincipalMessage";
import Testimonials from "../components/sections/Testimonials";
import RankersPreview from '../components/rankers/RankersPreview';
import EnquiryForm from "../components/sections/EnquiryForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-12">
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
