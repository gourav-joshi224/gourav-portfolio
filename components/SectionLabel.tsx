type SectionLabelProps = {
  label: string;
};

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="inline-block font-mono text-xs uppercase tracking-widest text-accent after:mt-1 after:block after:h-px after:w-16 after:bg-accent/30">
      {`// ${label}`}
    </div>
  );
}
