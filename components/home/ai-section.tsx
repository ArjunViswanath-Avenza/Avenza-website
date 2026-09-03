import { Cpu, FileCode2, FileText, TestTube2, Search, GitBranch, UserCheck } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { Button } from '@/components/ui/button';

const uses = [
  { icon: FileCode2, label: 'Code analysis & conversion' },
  { icon: FileText, label: 'Documentation generation' },
  { icon: TestTube2, label: 'Test case generation' },
  { icon: Search, label: 'Knowledge retrieval' },
  { icon: GitBranch, label: 'Migration analysis' },
  { icon: Cpu, label: 'Upgrade assessment' },
];

export function AISection() {
  return (
    <section className="section relative overflow-hidden border-t border-line bg-ink-950">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[900px] -translate-x-1/2 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,154,36,0.12), transparent 70%)' }}
      />
      <div className="container-avz relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="overline mb-4">AI &amp; Engineering</div>
            <h2 className="text-h2 text-balance">
              AI is changing how banking technology gets built.
            </h2>
            <p className="text-lead mt-4">
              We use AI to accelerate implementation, modernisation and engineering — responsibly. Not
              &ldquo;AI magic,&rdquo; but human expertise amplified by intelligent engineering, with a banking
              specialist reviewing every output.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {uses.map((u, i) => (
                <Reveal key={u.label} delay={i * 50}>
                  <div className="flex items-center gap-3 rounded-lg border border-line bg-fill-1 px-4 py-3">
                    <u.icon className="h-4.5 w-4.5 shrink-0 text-teal" />
                    <span className="text-sm text-fg-secondary">{u.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-9">
              <Button href="/capabilities/ai-engineering" withArrow>
                How we use AI
              </Button>
            </div>
          </div>

          {/* Human-in-the-loop flow */}
          <Reveal className="flex items-center">
            <div className="w-full rounded-2xl border border-line bg-ink-850 p-8">
              <div className="mb-6 font-mono text-xs uppercase tracking-wider text-fg-faint">
                Human-in-the-loop pipeline
              </div>
              <div className="space-y-3">
                <FlowRow n="01" title="Banking context in" body="Real requirements, config and code from the programme." tone="brand" />
                <FlowConnector />
                <FlowRow n="02" title="AI acceleration" body="Analysis, conversion, docs and test generation, at speed." tone="teal" icon={<Cpu className="h-4 w-4" />} />
                <FlowConnector />
                <FlowRow n="03" title="Expert review" body="A certified banking engineer validates every output." tone="gold" icon={<UserCheck className="h-4 w-4" />} />
                <FlowConnector />
                <FlowRow n="04" title="Audit-grade result" body="Delivery you can put in front of a regulator." tone="brand" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FlowRow({
  n,
  title,
  body,
  tone,
  icon,
}: {
  n: string;
  title: string;
  body: string;
  tone: 'brand' | 'teal' | 'gold';
  icon?: React.ReactNode;
}) {
  const toneMap = {
    brand: 'text-brand-400 border-brand-400/30',
    teal: 'text-teal border-teal/30',
    gold: 'text-gold border-gold/30',
  }[tone];
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-ink-900 p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-fill-1 font-mono text-xs ${toneMap}`}>
        {icon ?? n}
      </div>
      <div>
        <div className="text-sm font-semibold text-fg">{title}</div>
        <div className="text-xs text-fg-muted">{body}</div>
      </div>
    </div>
  );
}

function FlowConnector() {
  return <div className="ml-9 h-4 w-px bg-line-strong" />;
}
