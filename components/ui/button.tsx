import Link from 'next/link';
import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-[color:var(--on-brand)] font-semibold hover:bg-brand-500 shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_10px_30px_-12px_rgba(242,133,0,0.7)]',
  secondary:
    'border border-line-strong bg-fill-1 text-fg hover:border-brand-400/60 hover:bg-fill-3',
  ghost: 'text-fg-secondary hover:text-fg',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm rounded-md',
  md: 'h-11 px-5 text-[0.95rem] rounded-lg',
  lg: 'h-[3.25rem] px-7 text-base rounded-lg',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>;
type ButtonAsButton = CommonProps & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonAsLink | ButtonAsButton>(
  function Button({ variant = 'primary', size = 'md', withArrow, className, children, ...props }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className);
    const inner = (
      <>
        <span className="relative z-10">{children}</span>
        {withArrow && (
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        )}
      </>
    );

    if ('href' in props && props.href) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link ref={ref} href={href} className={classes} {...rest}>
          {inner}
        </Link>
      );
    }
    return (
      <button ref={ref} className={classes} {...(props as ButtonAsButton)}>
        {inner}
      </button>
    );
  },
);
