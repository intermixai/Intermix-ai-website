import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import OperatingSystemSection from "@/components/sections/OperatingSystemSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import ServicesSummarySection from "@/components/sections/ServicesSummarySection";
import IndustriesSummarySection from "@/components/sections/IndustriesSummarySection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import CTABanner from "@/components/shared/CTABanner";

// Note: Case Study and Testimonials sections are defined in spec 17.9/17.10
// but are deliberately suppressed here per spec Section 32.1 — no fabricated
// client names, logos, or quotes. Activate once real content exists.

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Intermix AI",
  url: "https://intermixai.com",
  description:
    "Intermix AI is an enterprise AI adoption and transformation consultancy running on the Intermix Operating System.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <ProblemSection />
      <OperatingSystemSection />
      <CapabilitiesSection />
      <ServicesSummarySection />
      <IndustriesSummarySection />
      <WhyChooseUsSection />
      <CTABanner />
    </>
  );
}
