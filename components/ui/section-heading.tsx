import { Reveal } from '@/components/primitives/reveal';
import { cn } from '@/lib/utils';

export function SectionHeading({
  overline,
  title,
  lead,
  align = 'left',
  className,
}: {
  overline?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {overline && <div className="overline mb-4">{overline}</div>}
      <h2 className="text-h2 text-balance">{title}</h2>
      {lead && <p className="text-lead mt-4">{lead}</p>}
    </Reveal>
  );
}
