export default function Admissions() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-primary-text md:text-5xl">Admissions</h1>
        <p className="mt-4 text-lg text-secondary-text">Join our community of learners</p>
      </div>

      <div className="space-y-12">
        {/* Admission Process */}
        <section className="rounded-2xl bg-light-orange p-8">
          <h2 className="text-3xl font-semibold text-primary-text">Admission Process</h2>
          <div className="mt-8 space-y-4">
            {[
              { step: "1", title: "Registration", desc: "Parents register online or visit the school office with required documents" },
              { step: "2", title: "Interaction", desc: "Schedule a meeting with the admission counselor to discuss your child's background" },
              { step: "3", title: "Assessment", desc: "Student undergoes age-appropriate assessment for placement in the right class" },
              { step: "4", title: "Final Decision", desc: "Admission approval and confirmation of seat with fee payment" },
              { step: "5", title: "Enrollment", desc: "Complete documentation and welcome orientation for parents and students" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-gold text-lg font-bold text-primary-text">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-primary-text">{item.title}</h3>
                  <p className="mt-1 text-secondary-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="rounded-2xl bg-light-orange p-8">
          <h2 className="text-3xl font-semibold text-primary-text">Eligibility Criteria</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                class: "Nursery",
                age: "2.5 - 3.5 years",
                criteria: "Basic social skills and toilet training preferred"
              },
              {
                class: "LKG",
                age: "3.5 - 4.5 years",
                criteria: "Ability to sit in class and follow basic instructions"
              },
              {
                class: "UKG",
                age: "4.5 - 5.5 years",
                criteria: "Basic pre-primary knowledge and communication skills"
              },
              {
                class: "Class I onwards",
                age: "As per age norms",
                criteria: "Based on entrance assessment and previous academic records"
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-lg border border-primary-gold/20 bg-base-white/60 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="font-semibold text-primary-text">{item.class}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-text">Age Group:</p>
                    <p className="font-medium text-primary-text">{item.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-text">Eligibility:</p>
                    <p className="font-medium text-primary-text">{item.criteria}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Required Documents */}
        <section className="rounded-2xl bg-light-orange p-8">
          <h2 className="text-3xl font-semibold text-primary-text">Required Documents</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold text-primary-text">For Admission</h3>
              <ul className="space-y-3 text-secondary-text">
                {[
                  "Birth certificate (original + copy)",
                  "Passport or Aadhar card",
                  "Previous school transfer certificate",
                  "Previous academic records",
                  "Medical fitness certificate",
                  "Recent passport-size photographs",
                ].map((doc, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold text-primary-gold">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-primary-text">For Registration</h3>
              <ul className="space-y-3 text-secondary-text">
                {[
                  "Parent/Guardian address proof",
                  "Contact details (phone and email)",
                  "Emergency contact information",
                  "Any specific medical/learning needs",
                  "Registration fee payment",
                  "Completed admission form",
                ].map((doc, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold text-primary-gold">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="rounded-2xl border border-primary-gold/40 bg-base-white/60 p-8">
          <h2 className="text-2xl font-semibold text-primary-text">Important Notes</h2>
          <ul className="mt-6 space-y-3 text-secondary-text">
            <li className="flex gap-3">
              <span className="text-primary-gold">→</span>
              <span>Admissions are open throughout the academic year, subject to seat availability</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-gold">→</span>
              <span>Early admission for new academic session opens in December</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-gold">→</span>
              <span>Fee payment should be made within 5 days of the admission letter</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-gold">→</span>
              <span>Uniform, books, and other materials are available at the school</span>
            </li>
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="rounded-2xl bg-primary-gold p-8 text-center text-primary-text shadow-sm">
          <h2 className="text-3xl font-semibold">Ready to Join Us?</h2>
          <p className="mt-3 text-lg opacity-90">
            Contact our admission office for any queries or to schedule a campus visit
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded border border-primary-text px-8 py-3 font-semibold text-primary-text transition-colors hover:bg-primary-text hover:text-base-white"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}
