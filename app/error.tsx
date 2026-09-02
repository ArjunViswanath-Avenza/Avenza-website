'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Phase 6 wires this to the error-reporting provider (e.g. Sentry).
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center pt-32">
      <div className="container-avz text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/15">
          <AlertTriangle className="h-8 w-8 text-danger" />
        </div>
        <h1 className="text-h2 mt-6 text-fg">Something went wrong.</h1>
        <p className="text-lead mx-auto mt-4 max-w-md">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        {error.digest && <p className="mt-3 font-mono text-xs text-fg-faint">Ref: {error.digest}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} size="lg">Try again</Button>
          <Button href="/" size="lg" variant="secondary">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
