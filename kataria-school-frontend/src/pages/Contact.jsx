import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-slate-600">We'd love to hear from you. Reach out with any questions or inquiries.</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Send us a Message</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  placeholder="Your name"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="">Select a subject</option>
                  <option value="admission">Admission Inquiry</option>
                  <option value="academics">Academics</option>
                  <option value="events">Events & Activities</option>
                  <option value="facilities">Facilities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Main Contact */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600">Phone</p>
                <p className="font-medium text-slate-900">+91 (0xx) xxxx xxxx</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-medium text-slate-900">info@katariaschool.edu</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Address</p>
                <p className="font-medium text-slate-900">Kataria English Medium School, Daund</p>
                <p className="text-sm text-slate-600 mt-1">District, Maharashtra</p>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="rounded-2xl bg-blue-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Office Hours</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium">8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium">8:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </div>

          {/* Department Contacts */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Departments</h3>
            <div className="space-y-3 text-sm">
              {[
                { dept: "Admission", phone: "+91 (0xx) xxxx xxxx" },
                { dept: "Principal's Office", phone: "+91 (0xx) xxxx xxxx" },
                { dept: "Finance", phone: "+91 (0xx) xxxx xxxx" },
              ].map((item, idx) => (
                <div key={idx} className="border-b border-slate-200 pb-2 last:border-0">
                  <p className="font-medium text-slate-900">{item.dept}</p>
                  <p className="text-slate-600">{item.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="rounded-2xl bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { name: "Facebook", icon: "f" },
                { name: "Twitter", icon: "𝕏" },
                { name: "Instagram", icon: "📷" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white hover:bg-sky-700 transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Find Us on the Map</h2>
        <div className="rounded-2xl overflow-hidden shadow-lg h-96 bg-slate-200 flex items-center justify-center">
          <p className="text-slate-600">Map integration coming soon</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              q: "When is the admission process open?",
              a: "Admission process is open throughout the year, subject to seat availability. Early registrations are encouraged.",
            },
            {
              q: "Do you provide transportation?",
              a: "We have school buses available for students. Please contact the office for route and fee details.",
            },
            {
              q: "What are the payment methods accepted?",
              a: "We accept cash, check, online transfer, and card payments. Installment options are available.",
            },
            {
              q: "Are there extracurricular activities?",
              a: "Yes, we offer sports, arts, music, dance, and various club activities to develop all-round personality.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="rounded-lg bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
