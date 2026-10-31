import { content, type Lang } from '../data/content';

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center text-sm text-white/60 sm:flex-row sm:justify-between sm:text-left">
        <p>
          <span className="font-display tracking-[0.25em] text-white/80 uppercase">{content.brandName}</span>
          <span aria-hidden="true" className="mx-3 text-white/30">
            ·
          </span>
          {content.location}
        </p>
        <p>
          <span className="mr-3">{content.footer.contactLabel[lang]}</span>
          <a
            href={`mailto:${content.email}`}
            className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-honey"
          >
            {content.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
