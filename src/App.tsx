import { useEffect, useState } from 'react';
import { AgeGate } from './components/AgeGate';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Lineup } from './components/Lineup';
import { content, type Lang } from './data/content';

const STORAGE_KEY = 'suneater-lang';

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'fi' || stored === 'en') return stored;
  } catch {
    // Хранилище недоступно (приватный режим и т. п.), берём язык по умолчанию.
  }
  return content.defaultLang;
}

export default function App() {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content.meta.title[lang];
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description[lang]);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Не критично: язык просто не запомнится.
    }
  }, [lang]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-6xl justify-end px-4 py-5 sm:px-6">
          <LanguageSwitcher lang={lang} label={content.ui.languageSwitcherLabel[lang]} onChange={setLang} />
        </div>
      </header>
      <main>
        <Hero lang={lang} />
        <Lineup lang={lang} />
      </main>
      <Footer lang={lang} />
      <AgeGate lang={lang} onLangChange={setLang} />
    </>
  );
}
