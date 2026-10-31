import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { content, type Lang } from '../data/content';
import { LanguageSwitcher } from './LanguageSwitcher';

const STORAGE_KEY = 'suneater-age-confirmed';

function readConfirmed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    // Хранилище недоступно: просто спрашиваем при каждом визите.
    return false;
  }
}

interface AgeGateProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

/**
 * Подтверждение возраста на нативном <dialog>: showModal() делает остальную страницу
 * недоступной для клавиатуры и скринридеров и держит фокус внутри окна.
 */
export function AgeGate({ lang, onLangChange }: AgeGateProps) {
  const { ageGate, ui } = content;
  const [confirmed, setConfirmed] = useState(readConfirmed);
  const [declined, setDeclined] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const declinedRef = useRef<HTMLParagraphElement>(null);
  // Ответ помним и в памяти: если localStorage недоступен, окно не должно открыться снова.
  const answeredRef = useRef(false);
  const titleId = useId();
  const noteId = useId();
  const open = ageGate.enabled && !confirmed;

  // useLayoutEffect, чтобы окно открылось до первой отрисовки и сайт не мелькал под ним.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (!dialog.open) dialog.showModal();
    confirmRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // После «нет» кнопки исчезают: переводим фокус на сообщение, чтобы его прочитал скринридер.
  useEffect(() => {
    if (declined) declinedRef.current?.focus();
  }, [declined]);

  if (!open) return null;

  function confirm() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Не запомнится, спросим в следующий раз.
    }
    answeredRef.current = true;
    dialogRef.current?.close();
    setConfirmed(true);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={noteId}
      // Esc не закрывает окно: без ответа на вопрос сайт не показываем.
      onCancel={(event) => event.preventDefault()}
      onClose={() => {
        if (!answeredRef.current && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-white/10 bg-ink-soft p-0 text-white/90 backdrop:bg-ink/95"
    >
      <div className="flex justify-end px-4 pt-3">
        <LanguageSwitcher lang={lang} label={ui.languageSwitcherLabel[lang]} onChange={onLangChange} />
      </div>

      <div className="px-6 pt-2 pb-8 text-center sm:px-10 sm:pb-10">
        <svg viewBox="0 0 64 64" className="mx-auto h-10 w-10" aria-hidden="true" focusable="false">
          <circle cx="32" cy="32" r="22" fill="none" stroke="#d9a441" strokeWidth="1.5" />
          <circle cx="38" cy="28" r="20" fill="#121216" />
        </svg>

        <h2 id={titleId} className="mt-6 font-display text-2xl leading-snug font-light text-balance text-white sm:text-3xl">
          {ageGate.question[lang]}
        </h2>

        {declined ? (
          <p
            ref={declinedRef}
            id={noteId}
            tabIndex={-1}
            className="mt-5 text-sm leading-relaxed text-white/70 focus:outline-none"
          >
            {ageGate.declined[lang]}
          </p>
        ) : (
          <>
            <p id={noteId} className="mt-4 text-sm text-white/70">
              {ageGate.note[lang]}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                ref={confirmRef}
                type="button"
                onClick={confirm}
                className="rounded-full bg-honey px-7 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-[#e6b55a]"
              >
                {ageGate.confirm[lang]}
              </button>
              <button
                type="button"
                onClick={() => setDeclined(true)}
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                {ageGate.decline[lang]}
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
