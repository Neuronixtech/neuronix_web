import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  MessageCircle, Upload, FileText, X, Paperclip,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { CONTACT_INFO } from "@/constants";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { useDocumentMeta } from "@/hooks/use-document-meta";

/* ─── Static data ─────────────────────────────────────────── */

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email Us",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    sub: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: `+91 ${CONTACT_INFO.phone}`,
    href: `tel:${CONTACT_INFO.phoneE164}`,
    sub: "Mon – Sat, 9 AM – 7 PM IST",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: `+91 ${CONTACT_INFO.phone}`,
    href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
    sub: "Chat with us instantly",
  },
  {
    icon: MapPin,
    label: "Office",
    value: CONTACT_INFO.address,
    href: "https://maps.google.com/?q=Bijapur,Karnataka,India",
    sub: "Bijapur, Karnataka 586101",
  },
];

const PROJECT_TYPES = [
  "Web Development",
  "Mobile App",
  "AI / ML Solution",
  "Generative AI / RAG",
  "UI/UX Design",
  "Enterprise Software",
  "Other",
];

const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹10,00,000",
  "₹10,00,000+",
  "Not sure yet",
];

const TIMELINES = [
  "Less than 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6 months+",
  "Flexible",
];

const INITIAL_FORM = {
  fullName: "", company: "", email: "", phone: "",
  projectType: "", budget: "", timeline: "", message: "",
};

const ACCEPT = ".pdf,.doc,.docx,.txt,.zip";
const MAX_SIZE_MB = 10;

/* ─── Reusable select ─────────────────────────────────────── */

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-md px-3 text-sm bg-secondary/50 border border-white/5
                   focus:border-primary/30 focus:outline-none text-foreground
                   appearance-none cursor-pointer transition-colors duration-200"
      >
        <option value="" disabled className="bg-background">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-background">{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function ContactPage() {
  useDocumentMeta("Contact Us");
  const [form, setForm]                   = useState(INITIAL_FORM);
  const [loading, setLoading]             = useState(false);
  const [submitted, setSubmitted]         = useState(false);
  const [files, setFiles]                 = useState([]);
  const [dragging, setDragging]           = useState(false);
  const [proposalSent, setProposalSent]   = useState(false);
  const [proposalLoading, setProposalLoading] = useState(false);
  const fileInputRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value ?? e }));

  /* Contact form submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) {
      toast.error("Please fill in Name, Email, and Message");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch (err) {
      toast.error("Could not send message. Please email us directly at " + CONTACT_INFO.email);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setSubmitted(false); setForm(INITIAL_FORM); };

  /* File helpers */
  const addFiles = (incoming) => {
    const valid = Array.from(incoming).filter((f) => {
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${f.name} exceeds ${MAX_SIZE_MB} MB`);
        return false;
      }
      return true;
    });
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...valid.filter((f) => !names.has(f.name))];
    });
  };

  const removeFile = (name) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  /* Proposal submit */
  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) { toast.error("Please attach at least one file"); return; }
    setProposalLoading(true);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      await api.post("/proposals", formData);
      setProposalSent(true);
      toast.success("Proposal received! We'll review and respond within 48 hours.");
    } catch (err) {
      toast.error("Could not upload proposal. Please email us directly at " + CONTACT_INFO.email);
    } finally {
      setProposalLoading(false);
    }
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="pt-20">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 relative">
        <div className="absolute inset-0 gradient-orange-subtle opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest"
          >
            Contact Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading mt-3 leading-tight"
          >
            Let's Build Something{" "}
            <span className="text-primary">Amazing Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-xl mx-auto text-base leading-relaxed"
          >
            Have a project in mind? Reach out and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info Cards ────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_ITEMS.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.08}>
                <a
                  href={item.href}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group glass-card rounded-2xl p-6 text-center h-full flex flex-col items-center
                             border border-white/[0.06] hover:border-primary/25 transition-colors duration-300 block"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4
                                  group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold font-heading mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="text-sm text-foreground/90 font-medium">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                </a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ───────────────────────────────────── */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Contact Form */}
            <SectionReveal>
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={handleReset} variant="ghost" className="text-primary">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold font-heading mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">

                      {/* Row 1: Full Name + Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <Input
                            value={form.fullName}
                            onChange={set("fullName")}
                            placeholder="John Doe"
                            className="bg-secondary/50 border-white/5 focus:border-primary/30 h-11"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">
                            Company Name
                          </label>
                          <Input
                            value={form.company}
                            onChange={set("company")}
                            placeholder="Acme Inc."
                            className="bg-secondary/50 border-white/5 focus:border-primary/30 h-11"
                          />
                        </div>
                      </div>

                      {/* Row 2: Email + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">
                            Email <span className="text-primary">*</span>
                          </label>
                          <Input
                            type="email"
                            value={form.email}
                            onChange={set("email")}
                            placeholder="john@example.com"
                            className="bg-secondary/50 border-white/5 focus:border-primary/30 h-11"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">
                            Phone
                          </label>
                          <Input
                            type="tel"
                            value={form.phone}
                            onChange={set("phone")}
                            placeholder="+91 98765 43210"
                            className="bg-secondary/50 border-white/5 focus:border-primary/30 h-11"
                          />
                        </div>
                      </div>

                      {/* Row 3: Project Type + Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                          label="Project Type"
                          value={form.projectType}
                          onChange={(v) => setForm((f) => ({ ...f, projectType: v }))}
                          options={PROJECT_TYPES}
                          placeholder="Select type…"
                        />
                        <SelectField
                          label="Budget Range"
                          value={form.budget}
                          onChange={(v) => setForm((f) => ({ ...f, budget: v }))}
                          options={BUDGETS}
                          placeholder="Select budget…"
                        />
                      </div>

                      {/* Row 4: Timeline */}
                      <SelectField
                        label="Timeline"
                        value={form.timeline}
                        onChange={(v) => setForm((f) => ({ ...f, timeline: v }))}
                        options={TIMELINES}
                        placeholder="Select timeline…"
                      />

                      {/* Message */}
                      <div>
                        <label className="text-sm text-muted-foreground mb-1.5 block">
                          Message <span className="text-primary">*</span>
                        </label>
                        <Textarea
                          value={form.message}
                          onChange={set("message")}
                          placeholder="Describe your project, goals, and any specific requirements…"
                          rows={4}
                          className="bg-secondary/50 border-white/5 focus:border-primary/30 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground h-12 text-sm font-semibold glow-orange-sm hover:scale-[1.02] transition-transform duration-200"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <> Send Message <Send size={15} className="ml-2" /> </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </SectionReveal>

            {/* Map */}
            <SectionReveal delay={0.15}>
              <div className="glass-card rounded-2xl overflow-hidden h-full min-h-[520px] flex flex-col">
                <div className="flex-1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30434.33551278744!2d75.69408!3d16.83073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5e40b4d2c5e8b%3A0x4f2a8f8a8f8a8f8a!2sBijapur%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      minHeight: "360px",
                      display: "block",
                      filter: "invert(90%) hue-rotate(180deg) brightness(0.75) contrast(1.2)",
                    }}
                    loading="lazy"
                    title="Neuronix Location — Bijapur, Karnataka"
                  />
                </div>
                <div className="p-6 border-t border-white/[0.06]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold font-heading text-foreground">
                        Neuronix Technologies
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ── Proposal Submission ───────────────────────────── */}
      <section className="py-16 pb-28 relative">
        <div className="absolute inset-0 gradient-orange-subtle opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionReveal className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
              Project Proposal
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3">
              Send Your <span className="text-primary">Project Requirements</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-lg mx-auto">
              Have a detailed brief, wireframe, or requirement document? Upload it here and our
              team will review and respond with a tailored proposal within 48 hours.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            {proposalSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Proposal Received!</h3>
                <p className="text-muted-foreground text-sm">
                  We've received your documents and will review them within 48 hours.
                </p>
                <Button
                  onClick={() => { setProposalSent(false); setFiles([]); }}
                  variant="ghost"
                  className="mt-6 text-primary"
                >
                  Submit Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="glass-card rounded-2xl p-8 lg:p-10 space-y-6">

                {/* Drag & Drop Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed
                              cursor-pointer p-10 transition-all duration-300 select-none
                              ${dragging
                                ? "border-primary bg-primary/5"
                                : "border-white/10 hover:border-primary/40 hover:bg-primary/[0.03]"
                              }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Upload size={24} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {dragging ? "Drop files here" : "Drag & drop your files here"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or <span className="text-primary underline underline-offset-2">browse to upload</span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground/60">
                    Accepted: PDF, DOC, DOCX, TXT, ZIP — max {MAX_SIZE_MB} MB each
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPT}
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    {files.map((file) => (
                      <li
                        key={file.name}
                        className="flex items-center justify-between gap-3 rounded-lg
                                   bg-secondary/40 border border-white/[0.06] px-4 py-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText size={16} className="text-primary shrink-0" />
                          <span className="text-sm text-foreground truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground shrink-0">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.name)}
                          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                          aria-label={`Remove ${file.name}`}
                        >
                          <X size={15} />
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}

                {/* Optional note */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Additional Notes <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <Textarea
                    placeholder="Any additional context about your requirements, deadlines, or references…"
                    rows={3}
                    className="bg-secondary/50 border-white/5 focus:border-primary/30 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={proposalLoading || files.length === 0}
                  className="w-full bg-primary text-primary-foreground h-12 text-sm font-semibold
                             glow-orange-sm hover:scale-[1.02] transition-transform duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {proposalLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <> <Paperclip size={15} className="mr-2" /> Submit Proposal </>
                  )}
                </Button>

              </form>
            )}
          </SectionReveal>
        </div>
      </section>

    </div>
  );
}
