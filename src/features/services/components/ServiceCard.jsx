import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative glass-card rounded-2xl p-6 lg:p-7 cursor-pointer overflow-hidden
                 border border-white/[0.06] hover:border-primary/30 transition-colors duration-400"
      style={{ transition: "border-color 0.4s ease, transform 0.3s ease" }}
    >
      {/* Glow wash on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,59,59,0.07) 0%, transparent 70%)" }} />

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5
                     group-hover:bg-primary/20 group-hover:shadow-[0_0_16px_rgba(255,59,59,0.25)] transition-all duration-400"
        >
          <Icon size={22} className="text-primary" />
        </motion.div>

        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-base font-semibold font-heading text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
            {title}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                       transition-all duration-300 shrink-0 mt-0.5"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
