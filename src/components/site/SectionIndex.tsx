export function SectionIndex({ n, label, className = "" }: { n: string; label: string; className?: string }) {
  return (
    <p className={`label-meta flex items-center gap-4 ${className}`}>
      <span>{n}</span>
      <span className="h-px w-10 bg-current opacity-40" />
      <span>{label}</span>
    </p>
  );
}
