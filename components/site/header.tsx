'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { primaryNav, type NavItem } from '@/config/site';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change + lock body scroll for mobile overlay
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setMobileOpen(false), setOpenMenu(null));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => href !== '/' && pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
        'fixed inset-x-0 top-[var(--promo-h,0px)] z-50 transition-all duration-[var(--dur-slow)] ease-[var(--ease-out-expo)]',
        scrolled
          ? 'border-b border-line bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-avz flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <NavEntry
              key={item.title}
              item={item}
              active={isActive(item.href)}
              open={openMenu === item.title}
              onOpen={() => setOpenMenu(item.title)}
              onClose={() => setOpenMenu((cur) => (cur === item.title ? null : cur))}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="/contact" size="sm" withArrow>
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />
    </>
  );
}

function NavEntry({
  item,
  active,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const hasMenu = !!item.children?.length;

  if (!hasMenu) {
    return (
      <Link
        href={item.href}
        className={cn(
          'relative rounded-md px-3.5 py-2 text-[0.925rem] font-medium transition-colors',
          active ? 'text-fg' : 'text-fg-secondary hover:text-fg',
        )}
      >
        {item.title}
        {active && <span className="absolute inset-x-3.5 -bottom-px h-px bg-brand-400" />}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-1 rounded-md px-3.5 py-2 text-[0.925rem] font-medium transition-colors',
          active || open ? 'text-fg' : 'text-fg-secondary hover:text-fg',
        )}
        aria-expanded={open}
      >
        {item.title}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 w-[min(46rem,90vw)] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-xl border border-line bg-ink-850/95 shadow-2xl backdrop-blur-xl">
              <div className={cn('grid gap-1 p-3', item.featured ? 'grid-cols-[1.4fr_1fr]' : 'grid-cols-2')}>
                <div className={cn('grid gap-0.5', item.featured ? 'grid-cols-1' : 'col-span-2 grid-cols-2')}>
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group rounded-lg px-3 py-2.5 transition-colors hover:bg-fill-2"
                    >
                      <div className="flex items-center gap-1.5 text-[0.9rem] font-medium text-fg">
                        {child.title}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </div>
                      {child.description && (
                        <p className="mt-0.5 text-[0.8rem] leading-snug text-fg-muted">{child.description}</p>
                      )}
                    </Link>
                  ))}
                </div>

                {item.featured && (
                  <Link
                    href={item.featured.href}
                    className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-line bg-gradient-to-br from-brand-600/20 to-ink-800 p-4"
                  >
                    <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
                    <span className="overline relative">Featured</span>
                    <div className="relative mt-6">
                      <div className="text-[0.95rem] font-semibold text-fg">{item.featured.title}</div>
                      <p className="mt-1 text-[0.8rem] leading-snug text-fg-secondary">{item.featured.description}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 top-[calc(var(--promo-h,0px)+4.5rem)] z-40 overflow-y-auto bg-ink-950/98 backdrop-blur-xl lg:hidden"
        >
          <nav className="container-avz flex flex-col gap-1 py-6" aria-label="Mobile">
            {primaryNav.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'block border-b border-line py-3.5 text-2xl font-medium',
                    isActive(item.href) ? 'text-brand-400' : 'text-fg',
                  )}
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 py-2">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={onClose} className="text-sm text-fg-muted">
                        {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            <div className="mt-6">
              <Button href="/contact" size="lg" withArrow className="w-full">
                Let&apos;s Talk
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
