import type { CSSProperties } from 'react';
import { content, type Flavor, type Lang } from '../data/content';
import { FallbackImage } from './FallbackImage';
import { LabelPlaceholder } from './LabelPlaceholder';

export function FlavorCard({ flavor, lang }: { flavor: Flavor; lang: Lang }) {
  const style = { '--accent': flavor.accentColor } as CSSProperties;

  return (
    <article
      style={style}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/80 transition-[border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[0_0_80px_-30px_var(--accent)]"
    >
      <div className="overflow-hidden" style={{ aspectRatio: content.lineup.labelAspectRatio }}>
        <FallbackImage
          src={flavor.image}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
          fallback={<LabelPlaceholder accentColor={flavor.accentColor} title={flavor.title[lang]} />}
        />
      </div>

      <div className="grid gap-4 border-t border-white/10 p-6 sm:p-8 md:grid-cols-[2fr_3fr] md:gap-10 lg:p-10">
        <div>
          <h3 className="font-display text-xl font-normal tracking-[0.18em] text-white sm:text-2xl">
            {flavor.title[lang]}
          </h3>
          <p className="mt-2 font-display text-lg text-honey italic">{flavor.tagline[lang]}</p>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">{flavor.description[lang]}</p>
          <p className="mt-5 text-[0.7rem] tracking-[0.16em] text-white/60 uppercase">{flavor.specs[lang]}</p>
        </div>
      </div>
    </article>
  );
}
