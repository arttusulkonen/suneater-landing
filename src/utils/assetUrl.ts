/**
 * Пути из content.ts ('/img/...') с учётом base из vite.config.ts.
 * На GitHub Pages сайт живёт в подпапке (/suneater-landing/), на mead.fi в корне.
 */
export function assetUrl(path: string): string {
  if (!path.startsWith('/')) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
