import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { onImgError } from "@/lib/utils";

export function PortfolioCard({ title, category, image, description, tech, liveDemo, index = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="group flex flex-col rounded-2xl overflow-hidden glass-card
                 border border-white/[0.06] hover:border-primary/25 transition-colors duration-300"
      style={{ transition: "border-color 0.3s ease, transform 0.3s ease" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          onError={onImgError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold
                         bg-background/70 backdrop-blur-sm border border-primary/20 text-primary">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <h3 className="text-base font-semibold font-heading text-foreground
                       group-hover:text-primary transition-colors duration-300 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md glass text-xs text-muted-foreground border border-white/[0.06]"
            >
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="px-2 py-0.5 rounded-md glass text-xs text-muted-foreground border border-white/[0.06]">
              +{tech.length - 4}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06]" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={onClick}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground
                       hover:text-foreground transition-colors duration-200 group/btn"
          >
            View Details
            <ArrowRight
              size={12}
              className="group-hover/btn:translate-x-0.5 transition-transform duration-200"
            />
          </button>

          <a
            href={liveDemo || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40
                       text-primary text-xs font-medium transition-all duration-200"
          >
            <ExternalLink size={12} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}
