import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ServiceCard } from "@/features/services/components/ServiceCard";
import { SERVICES } from "@/features/services/constants";

export function ServicesPreview() {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute inset-0 gradient-orange-subtle opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
              Our Core Services
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              We provide end-to-end digital solutions tailored to your business needs.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        <SectionReveal className="text-center mt-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all duration-300"
          >
            Explore All Services <ArrowRight size={16} />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
