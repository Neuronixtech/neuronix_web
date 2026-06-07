import { motion } from "framer-motion";
import { Layers, Brain, Zap, HeadphonesIcon, GitBranch, BadgeDollarSign } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";

const REASONS = [
  {
    icon: Layers,
    title: "Modern Tech Stack",
    description:
      "We build with React, Node.js, Python, and cloud-native tools — the same stack powering today's fastest-growing products.",
  },
  {
    icon: Brain,
    title: "AI Expertise",
    description:
      "From custom ML models to RAG pipelines and LLM integrations, AI is core to what we build — not an afterthought.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Agile sprints, clear milestones, and zero fluff. We ship production-ready features quickly without compromising quality.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description:
      "A real team that stays with you post-launch — bug fixes, updates, and growth features handled proactively.",
  },
  {
    icon: GitBranch,
    title: "Scalable Architecture",
    description:
      "Systems designed to grow with you — from MVP to enterprise scale — without costly rewrites down the road.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Pricing",
    description:
      "Transparent, startup-friendly pricing with no hidden costs. Enterprise-grade quality accessible to businesses of all sizes.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute inset-0 gradient-orange-subtle opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3">
              Why Businesses <span className="text-primary">Trust Us</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              We combine deep technical expertise with a genuine commitment to your success.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ y: -5 }}
                className="group glass-card rounded-2xl p-6 lg:p-7 overflow-hidden relative
                           border border-white/[0.06] hover:border-primary/30 transition-colors duration-400"
                style={{ transition: "border-color 0.4s ease, transform 0.3s ease" }}
              >
                {/* Radial glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,59,59,0.06) 0%, transparent 70%)" }} />

                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent
                                scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4
                                  group-hover:bg-primary/20 group-hover:shadow-[0_0_14px_rgba(255,59,59,0.22)]
                                  transition-all duration-400">
                    <Icon size={20} className="text-primary" />
                  </div>

                  <h3 className="text-base font-semibold font-heading text-foreground mb-2
                                 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
