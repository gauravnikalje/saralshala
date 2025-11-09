export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">About Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi</h1>
        <p className="mt-4 text-lg text-slate-600">Empowering minds, building futures since establishment</p>
      </div>

      <div className="space-y-12">
        {/* School History */}
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-3xl font-semibold text-slate-900">Our History</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Late. Surajbai kisandas kataria English Medium School and Jr. College Kalewadi has been a beacon of educational excellence in Kalewadi for several decades. Founded with a vision to provide quality education grounded in values and modern pedagogy, our school has evolved to become one of the most trusted educational institutions in the region. Our commitment to nurturing well-rounded individuals who excel academically and socially remains unwavering.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl bg-blue-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              To provide a nurturing and stimulating learning environment where every student develops critical thinking, creativity, and character. We strive to empower our students with the knowledge, skills, and values necessary to become responsible global citizens who contribute positively to society.
            </p>
          </section>

          <section className="rounded-2xl bg-sky-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              To be recognized as an institution of academic excellence that develops confident, compassionate, and capable individuals equipped to face the challenges of the modern world. We envision a school where innovation meets tradition, and every student realizes their full potential.
            </p>
          </section>
        </div>

        {/* Core Values */}
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-3xl font-semibold text-slate-900">Our Core Values</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Excellence", desc: "Striving for the highest standards in all endeavors" },
              { title: "Integrity", desc: "Upholding honesty, accountability, and ethical conduct" },
              { title: "Compassion", desc: "Fostering empathy and care for others and the community" },
              { title: "Innovation", desc: "Encouraging creative thinking and embracing new ideas" },
              { title: "Discipline", desc: "Developing self-control and respect for rules and others" },
              { title: "Inclusivity", desc: "Celebrating diversity and ensuring equal opportunities for all" },
            ].map((value, idx) => (
              <div key={idx} className="rounded-lg bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities */}
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-3xl font-semibold text-slate-900">State-of-the-Art Facilities</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              "Modern classrooms with digital learning aids",
              "Well-equipped science and computer laboratories",
              "Comprehensive library with extensive collection",
              "Sports complex with multiple playing fields",
              "Auditorium for cultural and academic programs",
              "Cafeteria with nutritious meal options",
              "Medical facilities with qualified health staff",
              "Safe and secure campus with CCTV surveillance",
            ].map((facility, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-slate-700">{facility}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">Why Choose Kataria English Medium School?</h2>
          <ul className="mt-8 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <span className="font-bold text-sky-600">✓</span>
              <span>Experienced faculty with specialized qualifications and continuous professional development</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sky-600">✓</span>
              <span>Personalized attention to ensure every student reaches their potential</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sky-600">✓</span>
              <span>Integrated curriculum combining academic rigor with life skills development</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sky-600">✓</span>
              <span>Strong parent-teacher collaboration and transparent communication</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sky-600">✓</span>
              <span>Holistic development through sports, arts, and extracurricular activities</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
