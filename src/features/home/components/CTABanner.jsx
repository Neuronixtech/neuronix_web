import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function CTABanner() {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 gradient-red opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground/80">
                  Let's grow together
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary-foreground">
                Ready to Transform Your Business with Technology?
              </h2>
              <p className="text-primary-foreground/70 mt-4 text-sm leading-relaxed">
                Partner with Neuronix Technologies to build powerful digital solutions that improve
                efficiency, visibility, and business growth.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:scale-105 transition-transform duration-300 text-sm whitespace-nowrap"
            >
              Book Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
