import type { Lang } from '../data/content';

interface LanguageSwitcherProps {
  lang: Lang;
  label: string;
  onChange: (lang: Lang) => void;
}

const options: { value: Lang; label: string }[] = [
  { value: 'fi', label: 'FI' },
  { value: 'en', label: 'EN' },
];

export function LanguageSwitcher({ lang, label, onChange }: LanguageSwitcherProps) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1 text-xs font-medium tracking-[0.2em]">
      {options.map((option, index) => (
        <span key={option.value} className="flex items-center gap-1">
          {index > 0 && (
            <span aria-hidden="true" className="text-white/30">
              /
            </span>
          )}
          <button
            type="button"
            lang={option.value}
            aria-pressed={lang === option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-sm px-2 py-2 transition-colors ${
              lang === option.value ? 'text-honey' : 'text-white/60 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
