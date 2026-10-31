import { content, type Lang } from '../data/content';
import { FlavorCard } from './FlavorCard';

export function Lineup({ lang }: { lang: Lang }) {
  const flavors = content.flavors.filter((flavor) => flavor.enabled);

  return (
    <section id="lineup" aria-labelledby="lineup-heading" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2
          id="lineup-heading"
          className="text-center text-xs font-medium tracking-[0.35em] text-honey uppercase"
        >
          {content.lineup.heading[lang]}
        </h2>

        <div className="mt-12 flex flex-col gap-8 sm:gap-10">
          {flavors.map((flavor) => (
            <FlavorCard key={flavor.id} flavor={flavor} lang={lang} />
          ))}
        </div>

        <p className="mt-14 text-center font-display text-lg font-light tracking-[0.12em] text-white/70">
          {content.lineup.comingSoon}
        </p>
      </div>
    </section>
  );
}
