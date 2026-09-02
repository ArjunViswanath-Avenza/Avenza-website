import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function PageHero({
  overline,
  title,
  lead,
  breadcrumb,
  children,
}: {
  overline?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  breadcrumb?: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 lg:pt-40">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.25] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div
        className="pointer-events-none absolute -top-32 left-0 h-80 w-[600px] blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(242,133,0,0.16), transparent 68%)' }}
      />
      <div className="container-avz relative pb-14 lg:pb-20">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-fg-muted">
            <Link href="/" className="hover:text-fg-secondary">Home</Link>
            {breadcrumb.map((b) => (
              <span key={b.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 text-line-strong" />
                <Link href={b.href} className="hover:text-fg-secondary">{b.name}</Link>
              </span>
            ))}
          </nav>
        )}
        {overline && <div className="overline mb-4">{overline}</div>}
        <h1 className="text-h1 max-w-4xl text-balance">{title}</h1>
        {lead && <p className="text-lead mt-6 max-w-2xl">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
