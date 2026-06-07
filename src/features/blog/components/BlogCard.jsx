import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { onImgError } from "@/lib/utils";

export function BlogCard({ title, excerpt, category, image, author, readTime, index = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          onError={onImgError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/80 text-primary-foreground text-xs backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span>{author}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readTime} min read
          </span>
        </div>
        <h3 className="text-base font-semibold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{excerpt}</p>
        <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium group-hover:gap-2 transition-all">
          Read More <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}
