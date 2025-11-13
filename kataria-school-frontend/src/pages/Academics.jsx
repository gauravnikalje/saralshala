import { Academics as AcademicsSection } from '../components/sections/Academics';

export default function Academics() {
  return (
    <div>
      <AcademicsSection />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-primary-text md:text-5xl">Academic Excellence</h1>
          <p className="mt-4 text-lg text-secondary-text">Comprehensive curriculum designed for modern learners</p>
        </div>

        <div className="space-y-12">
          {/* Programs */}
          <section className="rounded-2xl bg-light-orange p-8">
            <h2 className="text-3xl font-semibold text-primary-text">Our Academic Programs</h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  name: "Primary Section (Classes I-V)",
                  desc: "Foundation building with focus on conceptual clarity, creative thinking, and basic life skills. Subjects include English, Mathematics, Science, Social Studies, and Regional Language.",
                },
                {
                  name: "Secondary Section (Classes VI-VIII)",
                  desc: "Transitional stage focusing on subject specialization and skill development. Comprehensive curriculum with hands-on lab work, projects, and co-curricular activities.",
                },
                {
                  name: "Senior Secondary Section (Classes IX-XII)",
                  desc: "Advanced academic programs preparing students for board exams and competitive entrance tests. Specialized streams: Science, Commerce, and Humanities available.",
                },
              ].map((program, idx) => (
                <div key={idx} className="rounded-lg border border-primary-gold/20 bg-base-white/60 p-6">
                  <h3 className="text-xl font-semibold text-primary-text">{program.name}</h3>
                  <p className="mt-3 text-secondary-text">{program.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum Highlights */}
          <section className="rounded-2xl bg-light-orange p-8">
            <h2 className="text-3xl font-semibold text-primary-text">Curriculum Highlights</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "STEM Integration across subjects",
                "Digital literacy and coding fundamentals",
                "Environmental Science and Sustainability",
                "Language arts and communication skills",
                "Mathematics for problem-solving",
                "Social and emotional learning",
                "Physical education and wellness",
                "Arts and cultural education",
                "Entrepreneurship and innovation",
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg bg-base-white/60 p-4">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-secondary-text">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Teaching Methodology */}
          <section className="rounded-2xl bg-light-orange p-8">
            <h2 className="text-3xl font-semibold text-primary-text">Teaching Methodology</h2>
            <p className="mt-4 leading-relaxed text-secondary-text">
              We employ a student-centric, multi-sensory approach to learning that caters to diverse learning styles. Our pedagogy emphasizes:
            </p>
            <ul className="mt-6 space-y-3 text-secondary-text">
              <li className="flex gap-3">
                <span className="font-semibold text-primary-gold">•</span>
                <span><strong>Active Learning:</strong> Students are engaged participants, not passive recipients</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary-gold">•</span>
                <span><strong>Project-Based Learning:</strong> Real-world application of concepts</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary-gold">•</span>
                <span><strong>Collaborative Learning:</strong> Group work and peer interaction</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary-gold">•</span>
                <span><strong>Critical Thinking:</strong> Analysis and problem-solving over rote learning</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary-gold">•</span>
                <span><strong>Technology Integration:</strong> Smart classrooms and digital tools</span>
              </li>
            </ul>
          </section>

          {/* Assessment */}
          <section className="rounded-2xl bg-light-orange p-8">
            <h2 className="text-3xl font-semibold text-primary-text">Assessment & Evaluation</h2>
            <p className="mt-4 leading-relaxed text-secondary-text">
              We follow a continuous and comprehensive evaluation system (CCE) that assesses both scholastic and co-scholastic aspects of student development:
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-base-white/60 p-6">
                <h3 className="mb-3 font-semibold text-primary-text">Scholastic Evaluation</h3>
                <ul className="space-y-2 text-sm text-secondary-text">
                  <li>• Quarterly examinations</li>
                  <li>• Monthly tests and quizzes</li>
                  <li>• Class participation and assignments</li>
                  <li>• Project-based assessments</li>
                </ul>
              </div>
              <div className="rounded-lg bg-base-white/60 p-6">
                <h3 className="mb-3 font-semibold text-primary-text">Co-Scholastic Evaluation</h3>
                <ul className="space-y-2 text-sm text-secondary-text">
                  <li>• Life skills development</li>
                  <li>• Sports and athletics</li>
                  <li>• Co-curricular activities</li>
                  <li>• Character and behavior assessment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="rounded-2xl bg-light-orange p-8">
            <h2 className="text-3xl font-semibold text-primary-text">Our Achievements</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { stat: "95%+", label: "Pass Rate in Board Exams" },
                { stat: "50+", label: "Merit Awards Annually" },
                { stat: "100%", label: "Student Placement" },
              ].map((achievement, idx) => (
                <div key={idx} className="rounded-lg bg-base-white/60 p-6 text-center">
                  <div className="text-4xl font-bold text-primary-gold">{achievement.stat}</div>
                  <p className="mt-2 text-secondary-text">{achievement.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
