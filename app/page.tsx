import { Hero } from '@/components/home/hero';
import { TrustStrip } from '@/components/home/trust-strip';
import { Dashboard } from '@/components/home/dashboard';
import { WhatWeSolve } from '@/components/home/what-we-solve';
import { CapabilitiesSection } from '@/components/home/capabilities-section';
import { DeliveryLifecycle } from '@/components/home/delivery-lifecycle';
import { AcceleratorsTeaser } from '@/components/home/accelerators-teaser';
import { AISection } from '@/components/home/ai-section';
import { WhyAvenza } from '@/components/home/why-avenza';
import { InsightsTeaser } from '@/components/home/insights-teaser';
import { CtaBand } from '@/components/site/cta-band';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Dashboard />
      <WhatWeSolve />
      <CapabilitiesSection />
      <DeliveryLifecycle />
      <AcceleratorsTeaser />
      <AISection />
      <WhyAvenza />
      <InsightsTeaser />
      <CtaBand />
    </>
  );
}
