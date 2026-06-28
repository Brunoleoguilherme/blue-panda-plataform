import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { FeaturedEvents } from "@/components/sections/featured-events";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedEvents />
      <WhyUs />
      <Testimonials />
      <CtaSection />
    </>
  );
}
