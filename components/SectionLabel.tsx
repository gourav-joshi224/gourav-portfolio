type SectionLabelProps = {
  label: string;
};

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-accent">
      {`// ${label}`}
      <span className="h-px w-12 bg-[rgba(0,255,135,0.28)]" />
    </div>
  );
}
