import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { FeaturedEvents } from "@/components/sections/featured-events";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";
import { getPublishedEvents } from "@/lib/events";

export const revalidate = 60;

export default async function HomePage() {
  const featured = (await getPublishedEvents()).slice(0, 4);

  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedEvents events={featured} />
      <WhyUs />
      <Testimonials />
      <CtaSection />
    </>
  );
}
