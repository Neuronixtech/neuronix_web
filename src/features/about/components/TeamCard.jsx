import { motion } from "framer-motion";

export function TeamCard({ name, role, image, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group glass-card rounded-2xl p-6 text-center"
    >
      <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-base font-semibold font-heading text-foreground">{name}</h3>
      <p className="text-sm text-primary mt-1">{role}</p>
    </motion.div>
  );
}
