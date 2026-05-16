import { motion } from "framer-motion";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TeamCard } from "@/features/about";
import { TEAM, VALUES, STATS } from "@/features/about";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function AboutPage() {
  useDocumentMeta("About Us");
  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="py-10 lg:py-14 relative">
        <div className="absolute inset-0 gradient-red-subtle opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading mt-3 leading-tight"
          >
            Building Intelligent{" "}
            <span className="text-primary">Digital Experiences</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto text-base leading-relaxed"
          >
            Neuronix Technology is a modern software development company specializing in
            Artificial Intelligence, Web Development, Mobile Applications, and Enterprise
            Solutions. We help startups and businesses transform innovative ideas into
            scalable digital products.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vision */}
            <SectionReveal>
              <div className="glass-card rounded-2xl p-8 lg:p-10 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Eye size={22} className="text-primary" />
                </div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
                  Vision
                </span>
                <h3 className="text-2xl font-bold font-heading mt-2 mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become a globally recognized technology company delivering intelligent
                  and impactful software solutions.
                </p>
              </div>
            </SectionReveal>

            {/* Mission */}
            <SectionReveal delay={0.1}>
              <div className="glass-card rounded-2xl p-8 lg:p-10 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Target size={22} className="text-primary" />
                </div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
                  Mission
                </span>
                <h3 className="text-2xl font-bold font-heading mt-2 mb-5">Our Mission</h3>
                <ul className="space-y-3">
                  {MISSION_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                      <CheckCircle2 size={17} className="text-primary mt-0.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-10 lg:py-14 relative">
        <div className="absolute inset-0 gradient-red-subtle opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
              Core Values
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3">
              What <span className="text-primary">Drives Us</span>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {VALUES.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6 text-center h-full
                                border border-white/[0.06] hover:border-primary/25
                                transition-colors duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                                  mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <v.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-base font-semibold font-heading mb-2 group-hover:text-primary transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-10 lg:p-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat) => (
                <AnimatedCounter key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team — hidden for now, do not delete */}
      <section className="hidden py-10 lg:py-14 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
              Our Team
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3">
              Meet the <span className="text-primary">Minds</span> Behind Neuronix
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} {...member} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
