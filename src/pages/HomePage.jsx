import { useDocumentMeta } from "@/hooks/use-document-meta";
import {
  HeroSection,
  ServicesPreview,
  AboutSection,
  WhyChooseSection,
  TestimonialsSection,
  CTABanner,
} from "@/features/home";

export default function HomePage() {
  useDocumentMeta();
  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      <AboutSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}
