import {
  HeroSection,
  ServicesPreview,
  AboutSection,
  WhyChooseSection,
  TestimonialsSection,
  CTABanner,
} from "@/features/home";

export default function HomePage() {
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
