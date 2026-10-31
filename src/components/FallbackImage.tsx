import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { assetUrl } from '../utils/assetUrl';

interface FallbackImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src: string;
  /** Рендерится, если путь пустой или картинка не загрузилась. */
  fallback: ReactNode;
}

export function FallbackImage({ src, fallback, alt = '', ...imgProps }: FallbackImageProps) {
  // Запоминаем именно сломанный путь: после смены src в content.ts картинка пробует загрузиться снова.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) return <>{fallback}</>;

  return <img src={assetUrl(src)} alt={alt} onError={() => setFailedSrc(src)} {...imgProps} />;
}
