
import { useState } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: string }

  function updateField(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    // simple email check
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
      // Replace the URL below with your real backend endpoint.
      // If you don't have a backend, consider using a service like Formspree, Getform, or a simple mailto fallback.
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
    <main id="ContactPage" className="dt-contact-root">
  <section id="ContactPage" className="dt-contact-card" aria-labelledby="contact-heading">
        <div className="dt-contact-left">
          <h1 id="contact-heading">Contact DoctorTracker</h1>
          <p className="lead">Questions about integration, pricing, or help with tracking — drop us a message.</p>

          <ul className="contact-info" aria-label="Office contact information">
            <li>
              <strong>Office:</strong>
              <span>+91 78568 46471</span>
            </li>
            <li>
              <strong>Email:</strong>
              <a href="mailto:support@doctracker.example">raman.01kumar1@gmail.com</a>
            </li>
            <li>
              <strong>Address:</strong>
              <span>123 Health Park, Noida New Delhi, India</span>
            </li>
          </ul>

          <div className="socials" aria-hidden>
            <a className="btn-ghost" href="#">Twitter</a>
            <a className="btn-ghost" href="www.linkedin.com/in/raman-kumar0">LinkedIn</a>
            <a className="btn-ghost" href="https://github.com/ramansingh19">GitHub</a>
          </div>
        </div>

        <form className="dt-contact-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="label">Name</span>
            <input name="name" value={form.name} onChange={updateField} placeholder="Your full name" required />
          </label>

          <label className="field">
            <span className="label">Email</span>
            <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@domain.com" required />
          </label>

          <label className="field">
            <span className="label">Subject</span>
            <input name="subject" value={form.subject} onChange={updateField} placeholder="e.g. Integration question" />
          </label>

          <label className="field">
            <span className="label">Message</span>
            <textarea name="message" value={form.message} onChange={updateField} placeholder="How can we help?" rows={6} required />
          </label>

          {status && (
            <div className={`status ${status.type === "error" ? "err" : "ok"}`} role="status">
              {status.text}
            </div>
          )}

          <div className="actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            <button
              type="button"
              className="btn-link"
              onClick={() => {
                // mailto fallback
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

      <footer className="dt-contact-footer">
        <small>© {new Date().getFullYear()} DoctorTracker — Built for hospitals & clinics</small>
      </footer>
    </main>
  );
}


