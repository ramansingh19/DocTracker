import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  function updateField(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Please enter a valid email.";
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

      setStatus({ type: "success", text: "Message sent — we will get back to you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Something went wrong. Try again or email support@doctracker.example" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="ContactPage" className="font-sans text-slate-900 bg-gradient-to-br from-slate-50 to-slate-200 py-20 px-12 box-border md:px-4 sm:p-4">
      <section id="ContactPage" className="max-w-[1100px] mx-auto bg-white grid grid-cols-2 gap-8 p-9 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-black/5 md:grid-cols-1 md:p-6 md:gap-6 sm:p-5 sm:rounded-xl" aria-labelledby="contact-heading">
        <div className="px-4 md:px-0">
          <h1 id="contact-heading" className="text-2xl font-bold text-gray-900 m-0 mb-2 sm:text-xl">Contact DocTracker</h1>
          <p className="text-gray-500 mb-5 text-base sm:text-sm">Questions about integration, pricing, or help with tracking — drop us a message.</p>

          <ul className="list-none p-0 m-0 mb-5" aria-label="Office contact information">
            <li className="flex gap-2 items-start py-1.5 sm:flex-col sm:gap-1 sm:text-sm">
              <strong>Office:</strong>
              <span>+91 78568 46471</span>
            </li>
            <li className="flex gap-2 items-start py-1.5 sm:flex-col sm:gap-1 sm:text-sm">
              <strong>Email:</strong>
              <a href="mailto:support@doctracker.example" className="text-blue-600 no-underline">raman.01kumar1@gmail.com</a>
            </li>
            <li className="flex gap-2 items-start py-1.5 sm:flex-col sm:gap-1 sm:text-sm">
              <strong>Address:</strong>
              <span>123 Health Park, Noida New Delhi, India</span>
            </li>
          </ul>

          <div className="flex gap-2 sm:flex-wrap" aria-hidden>
            <a className="border-2 border-indigo-500/20 px-4 py-2 rounded-xl no-underline text-sm font-medium text-indigo-600 hover:bg-indigo-500/10 transition-colors" href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className="border-2 border-indigo-500/20 px-4 py-2 rounded-xl no-underline text-sm font-medium text-indigo-600 hover:bg-indigo-500/10 transition-colors" href="https://www.linkedin.com/in/raman-kumar0" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="border-2 border-indigo-500/20 px-4 py-2 rounded-xl no-underline text-sm font-medium text-indigo-600 hover:bg-indigo-500/10 transition-colors" href="https://github.com/ramansingh19" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <form className="flex flex-col gap-3 px-4 md:px-0" onSubmit={handleSubmit} noValidate>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Name</span>
            <input name="name" value={form.name} onChange={updateField} placeholder="Your full name" required className="border-2 border-gray-200 px-4 py-3 rounded-xl text-base outline-none transition-all focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Email</span>
            <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@domain.com" required className="border-2 border-gray-200 px-4 py-3 rounded-xl text-base outline-none transition-all focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Subject</span>
            <input name="subject" value={form.subject} onChange={updateField} placeholder="e.g. Integration question" className="border-2 border-gray-200 px-4 py-3 rounded-xl text-base outline-none transition-all focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Message</span>
            <textarea name="message" value={form.message} onChange={updateField} placeholder="How can we help?" rows={6} required className="border-2 border-gray-200 px-4 py-3 rounded-xl text-base outline-none transition-all focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] resize-y min-h-[140px]" />
          </label>

          {status && (
            <div className={`px-4 py-3 rounded-xl text-sm font-medium ${status.type === "error" ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`} role="status">
              {status.text}
            </div>
          )}

          <div className="flex gap-3 items-center mt-4 sm:flex-col sm:items-stretch sm:gap-3">
            <button type="submit" className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl border-0 font-semibold cursor-pointer transition-all duration-300 shadow-[0_8px_25px_rgba(102,126,234,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(102,126,234,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none sm:w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            <button
              type="button"
              className="bg-transparent border-0 text-indigo-600 cursor-pointer font-medium hover:text-indigo-700 transition-colors sm:text-center sm:py-2"
              onClick={() => {
                window.location.href = `mailto:support@doctracker.example?subject=${encodeURIComponent(form.subject || "Contact from DoctorTracker site")}&body=${encodeURIComponent(
                  `Name: ${form.name}\n\n${form.message}`
                )}`;
              }}
            >
              Email us instead
            </button>
          </div>
        </form>
      </section>

      <footer className="text-center mt-8 text-slate-500 text-sm">
        <small>© {new Date().getFullYear()} DocTracker — Built for hospitals & clinics</small>
      </footer>
    </main>
  );
}
