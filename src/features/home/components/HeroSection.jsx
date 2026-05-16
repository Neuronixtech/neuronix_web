import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "@/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-background/80 to-transparent z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Display heading — full width */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-bold font-heading tracking-tight w-full"
        >
          <span className="block text-lg sm:text-xl md:text-2xl text-foreground/70 leading-snug mb-1">
            AI-Powered Software Solutions for
          </span>
          <span
            className="block text-primary text-glow leading-none"
            style={{ fontSize: "clamp(2.8rem, 7vw, 8.5rem)" }}
          >
            Future-Ready Businesses
          </span>
        </motion.h1>

        {/* Supporting content — constrained width */}
        <div className="max-w-2xl mt-6">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-sm sm:text-base text-muted-foreground leading-relaxed"
          >
            Neuronix Technology builds scalable AI solutions, web applications, mobile apps, and
            enterprise software tailored for startups, businesses, and organizations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-7"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl glow-red hover:scale-105 transition-transform duration-300 text-sm"
            >
              Get Free Consultation <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 glass-card text-foreground font-semibold rounded-xl hover:border-primary/30 transition-all duration-300 text-sm"
            >
              Start a Project
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="text-xs text-muted-foreground mt-4"
          >
            Reliable | Scalable | Cost-Effective Technology Solutions for Modern Businesses
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-3 text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 sm:gap-5"
          >
            <p>
              📧{" "}
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary transition-colors">
                {CONTACT_INFO.email}
              </a>
            </p>
            <p>
              📞{" "}
              <a href={`tel:${CONTACT_INFO.phoneE164}`} className="hover:text-primary transition-colors">
                +91 {CONTACT_INFO.phone}
              </a>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center gap-8 mt-10 pt-6 border-t border-white/5"
          >
            {[
              { value: "25+",  label: "Projects Done" },
              { value: "10+",  label: "Technologies" },
              { value: "6+",   label: "Developers" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-bold font-heading text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
