import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-avz relative text-center">
        <div className="font-display text-[8rem] font-semibold leading-none text-gradient">404</div>
        <h1 className="text-h2 mt-2 text-fg">This page has moved, or never existed.</h1>
        <p className="text-lead mx-auto mt-4 max-w-md">
          The link may be broken or the page retired. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg" withArrow>Back to home</Button>
          <Button href="/contact" size="lg" variant="secondary">Contact us</Button>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-fg-muted">
          <Link href="/capabilities" className="hover:text-fg">Capabilities</Link>
          <Link href="/solutions" className="hover:text-fg">Solutions</Link>
          <Link href="/insights" className="hover:text-fg">Insights</Link>
          <Link href="/careers" className="hover:text-fg">Careers</Link>
        </div>
      </div>
    </section>
  );
}
