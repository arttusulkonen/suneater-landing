import type { CSSProperties } from 'react';

interface LabelPlaceholderProps {
  accentColor: string;
  title: string;
}

/** Абстрактная развёртка этикетки в цвете вкуса, пока нет финального файла. */
export function LabelPlaceholder({ accentColor, title }: LabelPlaceholderProps) {
  const style = { '--accent': accentColor } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(110deg,color-mix(in_srgb,var(--accent)_35%,#0a0a0c)_0%,var(--accent)_50%,color-mix(in_srgb,var(--accent)_35%,#0a0a0c)_100%)]"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(25%-1px),rgba(255,255,255,0.08)_calc(25%-1px),rgba(255,255,255,0.08)_25%)]" />
      <div className="absolute inset-x-0 top-[12%] h-px bg-white/15" />
      <div className="absolute inset-x-0 bottom-[12%] h-px bg-white/15" />
      <div className="relative flex flex-col items-center gap-3 sm:gap-5">
        <svg viewBox="0 0 64 64" className="h-8 w-8 sm:h-14 sm:w-14" focusable="false">
          <circle cx="32" cy="32" r="22" fill="none" stroke="#d9a441" strokeWidth="1.5" />
          <circle cx="38" cy="28" r="20" fill={accentColor} />
        </svg>
        <span className="font-display text-sm tracking-[0.35em] text-white/85 sm:text-2xl">{title}</span>
      </div>
    </div>
  );
}
