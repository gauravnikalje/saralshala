import SchoolLogo from '../../assets/Logo.png'; // Assuming the logo is saved here

const quickLinks = [
  {
    title: "About",
    links: [
      { label: "Our Story", href: "#about" },
      { label: "Mission & Vision", href: "#mission" },
      { label: "Leadership", href: "#leadership" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Curriculum", href: "#academics" },
      { label: "Admissions", href: "#admissions" },
      { label: "Student Life", href: "#student-life" },
    ],
  },
];

export default function Footer() {
  return (
    <footer 
      className="border-t border-charcoal-light text-slate-300"
      style={{ background: 'linear-gradient(180deg, #3A3E42 0%, #1F2226 100%)' }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <img src={SchoolLogo} alt="School Logo" className="h-12 w-12" />
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
                Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi
              </p>
              <p className="text-xs text-slate-400">
                Kalewadi Choufula, Kalewadi Taluka: Daund District: Pune, 431801
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-slate-400">
            Empowering young minds with holistic education, strong values, and a future-ready mindset for over two decades.
          </p>
          <div className="mt-6 text-sm text-slate-400">
            <p className="font-heading font-semibold text-white">Campus</p>
            <p>Kalewadi Choufula, Kalewadi Taluka: Daund District: Pune, 431801</p>
            <p>Email: info@katariaschool.edu.in</p>
            <p>Phone: +91 020 4455 6677</p>
          </div>
        </div>

        {quickLinks.map((column) => (
          <div key={column.title}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-charcoal-light bg-charcoal-dark/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {new Date().getFullYear()} Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi, Kalewadi Choufula, Kalewadi Taluka: Daund District: Pune, 431801. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </a>
            <a href="#terms" className="transition-colors hover:text-gold">
              Terms of Use
            </a>
            <a href="#support" className="transition-colors hover:text-gold">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
