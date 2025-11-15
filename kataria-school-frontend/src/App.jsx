import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import FloatingContactButton from "./components/contact/FloatingContactButton";
import RankersPage from "./pages/RankersPage";
import FixedLanguageToggle from "./components/ui/FixedLanguageToggle";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/rankers" element={<RankersPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <FloatingContactButton />
        <FixedLanguageToggle />
      </div>
    </Router>
  );
}
