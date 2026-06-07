import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SERVICES } from "@/features/services";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function ServicesPage() {
  useDocumentMeta("Services");
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-10 lg:py-14 relative">
        <div className="absolute inset-0 gradient-orange-subtle opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading mt-3"
          >
            Solutions That <span className="text-primary">Scale</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto text-base"
          >
            End-to-end technology services designed to accelerate your digital transformation
            and drive measurable business outcomes.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {SERVICES.map((service) => (
            <SectionReveal key={service.title}>
              <div className="glass-card rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <service.icon size={26} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold font-heading mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={14} className="text-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-4">
              Ready to Get <span className="text-primary">Started</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Let's discuss your project and find the perfect solution for your business needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl glow-orange hover:scale-105 transition-transform duration-300 text-sm"
            >
              Get a Free Consultation <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
