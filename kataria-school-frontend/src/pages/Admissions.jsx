export default function Admissions() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Admissions</h1>
        <p className="mt-4 text-lg text-slate-600">Join our community of learners</p>
      </div>

      <div className="space-y-12">
        {/* Admission Process */}
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-3xl font-semibold text-slate-900">Admission Process</h2>
          <div className="mt-8 space-y-4">
            {[
              { step: "1", title: "Registration", desc: "Parents register online or visit the school office with required documents" },
              { step: "2", title: "Interaction", desc: "Schedule a meeting with the admission counselor to discuss your child's background" },
              { step: "3", title: "Assessment", desc: "Student undergoes age-appropriate assessment for placement in the right class" },
              { step: "4", title: "Final Decision", desc: "Admission approval and confirmation of seat with fee payment" },
              { step: "5", title: "Enrollment", desc: "Complete documentation and welcome orientation for parents and students" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-3xl font-semibold text-slate-900">Eligibility Criteria</h2>
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
              <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.class}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Age Group:</p>
                    <p className="font-medium text-slate-900">{item.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Eligibility:</p>
                    <p className="font-medium text-slate-900">{item.criteria}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Required Documents */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">Required Documents</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">For Admission</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "Birth certificate (original + copy)",
                  "Passport or Aadhar card",
                  "Previous school transfer certificate",
                  "Previous academic records",
                  "Medical fitness certificate",
                  "Recent passport-size photographs",
                ].map((doc, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold text-sky-600">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">For Registration</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "Parent/Guardian address proof",
                  "Contact details (phone and email)",
                  "Emergency contact information",
                  "Any specific medical/learning needs",
                  "Registration fee payment",
                  "Completed admission form",
                ].map((doc, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold text-sky-600">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-3xl font-semibold text-slate-900">Fee Structure</h2>
          <p className="mt-4 text-slate-600 mb-6">
            Our fee structure is transparent and competitively priced. Fees are payable in quarterly installments or annually at a discount.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Class</th>
                  <th className="px-4 py-3 font-semibold">Monthly Fee</th>
                  <th className="px-4 py-3 font-semibold">Annual Fee</th>
                  <th className="px-4 py-3 font-semibold">Registration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { class: "Nursery - UKG", monthly: "₹3,500", annual: "₹35,000", reg: "₹5,000" },
                  { class: "Class I - V", monthly: "₹4,500", annual: "₹45,000", reg: "₹7,500" },
                  { class: "Class VI - VIII", monthly: "₹6,000", annual: "₹60,000", reg: "₹10,000" },
                  { class: "Class IX - X", monthly: "₹8,000", annual: "₹80,000", reg: "₹15,000" },
                  { class: "Class XI - XII", monthly: "₹10,000", annual: "₹100,000", reg: "₹20,000" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.class}</td>
                    <td className="px-4 py-3 text-slate-600">{row.monthly}</td>
                    <td className="px-4 py-3 text-slate-600">{row.annual}</td>
                    <td className="px-4 py-3 text-slate-600">{row.reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-slate-600 italic">
            * Scholarships available for merit-based and economically disadvantaged students. Please contact the admission office for details.
          </p>
        </section>

        {/* Important Notes */}
        <section className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Important Notes</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="text-sky-600">→</span>
              <span>Admissions are open throughout the academic year, subject to seat availability</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600">→</span>
              <span>Early admission for new academic session opens in December</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600">→</span>
              <span>Fee payment should be made within 5 days of the admission letter</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600">→</span>
              <span>Uniform, books, and other materials are available at the school</span>
            </li>
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 p-8 text-center text-white">
          <h2 className="text-3xl font-semibold">Ready to Join Us?</h2>
          <p className="mt-3 text-lg opacity-90">
            Contact our admission office for any queries or to schedule a campus visit
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-sky-600 transition-transform hover:scale-105"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}
