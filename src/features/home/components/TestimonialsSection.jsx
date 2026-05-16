import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";

const testimonials = [
  {
    name: "Adiyogi International",
    role: "Client",
    content:
      "Neuronix Technologies delivered exactly what our business needed with a scalable and efficient solution.",
    rating: 5,
  },
  {
    name: "AICS Bijapur",
    role: "Educational Institution",
    content:
      "Their team understood our requirements clearly and built a reliable system that improved our operations.",
    rating: 5,
  },
  {
    name: "Prashant Clinic",
    role: "Healthcare",
    content:
      "Excellent service and timely delivery. The solution helped streamline our daily workflow efficiently.",
    rating: 5,
  },
  {
    name: "Survya Clinic",
    role: "Healthcare",
    content: "Very professional team. Their technical expertise made a huge difference in our digital setup.",
    rating: 5,
  },
  {
    name: "HR Constructions",
    role: "Construction",
    content:
      "We received a powerful and user-friendly system that improved our business processes significantly.",
    rating: 5,
  },
  {
    name: "Indra Constructions",
    role: "Construction",
    content: "Neuronix Technologies provided a reliable and scalable solution tailored to our needs.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3">
              What Our <span className="text-primary">Clients</span> Say
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-2xl p-6 lg:p-8 relative"
            >
              <Quote size={28} className="text-primary/20 absolute top-6 right-6" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm font-heading">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
