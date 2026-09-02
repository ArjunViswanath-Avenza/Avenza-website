export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-32" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-400" />
        <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">Loading</span>
      </div>
    </div>
  );
}
