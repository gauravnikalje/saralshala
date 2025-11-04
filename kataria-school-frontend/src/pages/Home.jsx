import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import MissionVision from "../components/sections/MissionVision";
import PrincipalMessage from "../components/sections/PrincipalMessage";
import Testimonials from "../components/sections/Testimonials";
import EnquiryForm from "../components/sections/EnquiryForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <MissionVision />
      <PrincipalMessage />
      <Testimonials />
      <EnquiryForm />
    </div>
  );
}
