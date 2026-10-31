import { content, type Lang } from '../data/content';
import { FallbackImage } from './FallbackImage';

function TextLogo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 64 64" className="h-16 w-16 sm:h-20 sm:w-20" aria-hidden="true" focusable="false">
        <circle cx="32" cy="32" r="22" fill="none" stroke="#d9a441" strokeWidth="1.5" />
        <circle cx="38" cy="28" r="20" fill="#0a0a0c" />
      </svg>
      <span className="font-display text-3xl font-light tracking-[0.35em] text-white sm:text-5xl">
        {content.brandName.toUpperCase()}
      </span>
    </div>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  const { hero, logoImage, brandName } = content;
  const headlineLang: Lang = hero.useEnglishHeadlineForAllLanguages ? 'en' : lang;

  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 pt-28 pb-20 sm:px-6">
      <FallbackImage
        src={hero.image}
        fallback={null}
        fetchPriority="high"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_50%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,rgba(217,164,65,0.14),transparent_60%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-ink/50 via-ink/35 to-ink" />

      <div className="mx-auto max-w-4xl text-center">
        <FallbackImage
          src={logoImage}
          alt={brandName}
          fallback={<TextLogo />}
          className="mx-auto h-44 w-auto sm:h-60"
        />
        <h1
          lang={headlineLang}
          className="mt-12 font-display text-4xl leading-[1.08] font-light tracking-tight text-balance text-white sm:mt-16 sm:text-6xl lg:text-7xl"
        >
          {hero.headline[headlineLang]}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed tracking-[0.22em] text-balance text-white/70 uppercase sm:mt-8 sm:text-sm">
          {hero.subheadline[lang]}
        </p>
      </div>
    </section>
  );
}
