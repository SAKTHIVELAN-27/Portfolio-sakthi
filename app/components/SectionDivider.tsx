interface SectionDividerProps {
  index: string;
  label: string;
  className?: string;
}

export default function SectionDivider({ index, label, className = '' }: SectionDividerProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        paddingBottom: '3rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-mono, monospace)',
          fontSize: '0.6875rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}
      >
        {index}
      </span>
      <div className="section-divider" style={{ flex: 1 }} />
      <span
        style={{
          fontFamily: 'var(--font-geist-mono, monospace)',
          fontSize: '0.6875rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        {label}
      </span>
    </div>
  );
}
