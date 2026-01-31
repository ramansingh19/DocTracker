import { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";


export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: "error", text: err });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("https://formspree.io/f/meovjgjz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      setStatus({
        type: "success",
        text: "Message sent — we will get back to you shortly.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        text: "Something went wrong. Try again or email support@doctracker.example",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      id="ContactPage"
      className="relative font-sans text-slate-900 bg-slate-50 py-24 px-6 overflow-hidden"
    >
      {/* Modern Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <section className="relative max-w-6xl mx-auto bg-white/70 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white overflow-hidden">
        {/* Left Side: Contact Information Panel */}
        <div className="bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Abstract Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-6 tracking-tight">
              Let's build the <br />
              <span className="text-indigo-400">future of care.</span>
            </h1>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md">
              Ready to streamline your clinic? Our team usually responds within
              2 hours during business hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Call Us
                  </p>
                  <p className="text-lg font-medium">+91 78568 46471</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Email Us
                  </p>
                  <p className="text-lg font-medium">
                    raman.01kumar1@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Connect with us
            </p>
            <div className="flex gap-4">
              {[
                {
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/in/raman-kumar0/",
                  icon: <FaLinkedin />,
                },
                {
                  name: "GitHub",
                  url: "https://github.com/ramansingh19",
                  icon: <FaGithub />,
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 text-white text-lg"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="p-12 md:p-8 bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  placeholder="Your name"
                  className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                Subject
              </label>
              <select className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none appearance-none">
                <option>General Inquiry</option>
                <option>Enterprise Pricing</option>
                <option>Technical Support</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-300 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]"
            >
              {loading ? "Transmitting..." : "Send Message"}
            </button>

            <p className="text-center text-slate-400 text-sm">
              By sending this message, you agree to our{" "}
              <a
                href="#"
                className="underline decoration-indigo-500/30 underline-offset-4 hover:text-indigo-600 transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </section>

      <footer className="text-center mt-12 text-slate-400 font-medium tracking-wide">
        <p>
          © {new Date().getFullYear()} DOCTRACKER SYSTEMS. BUILT FOR PRECISION.
        </p>
      </footer>
    </main>
  );
}
