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
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-lg font-semibold text-white">
              KE
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
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
            <p className="font-semibold text-slate-200">Campus</p>
            <p>Kalewadi Choufula, Kalewadi Taluka: Daund District: Pune, 431801</p>
            <p>Email: info@katariaschool.edu.in</p>
            <p>Phone: +91 020 4455 6677</p>
          </div>
        </div>

        {quickLinks.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-sky-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {new Date().getFullYear()} Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi, Kalewadi Choufula, Kalewadi Taluka: Daund District: Pune, 431801. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#privacy" className="transition-colors hover:text-sky-400">
              Privacy Policy
            </a>
            <a href="#terms" className="transition-colors hover:text-sky-400">
              Terms of Use
            </a>
            <a href="#support" className="transition-colors hover:text-sky-400">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
