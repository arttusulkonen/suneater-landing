# Публикация сайта

Схема: код хранится на GitHub. Пока идёт работа над дизайном, превью публикуется на GitHub Pages. Для запуска Cloudflare Pages собирает тот же код и раздаёт его на `mead.fi`.

> Названия кнопок в панели Cloudflare время от времени меняются. Если что-то выглядит иначе, ищи по смыслу: Workers & Pages, Pages, Connect to Git.

## 1. Репозиторий на GitHub

1. Создай на GitHub новый репозиторий `suneater-landing` без README и .gitignore (они уже есть в проекте).
2. В папке проекта:

```bash
git init
git add .
git commit -m "Initial Sun Eater landing page"
git branch -M main
git remote add origin git@github.com:<твой-логин>/suneater-landing.git
git push -u origin main
```

`node_modules`, `dist` и `.env*` в репозиторий не попадут, они перечислены в `.gitignore`.

## 2. Превью на GitHub Pages (для согласования дизайна)

Workflow `.github/workflows/pages.yml` собирает сайт при каждом пуше в `main` и публикует его по адресу `https://<логин>.github.io/suneater-landing/`.

Включить один раз: репозиторий на GitHub → **Settings → Pages → Build and deployment → Source: GitHub Actions**. Потом открой вкладку **Actions** и перезапусти workflow (или сделай любой пуш).

Что важно знать:

- На бесплатном тарифе GitHub Pages работает только у **публичных** репозиториев, для приватного нужен GitHub Pro.
- Сам сайт на GitHub Pages открыт всем, у кого есть ссылка (защитить паролем нельзя). От поисковиков он закрыт тегом `noindex` в `index.html`.
- Сайт живёт в подпапке `/suneater-landing/`, поэтому сборка идёт с `BASE_PATH=/suneater-landing/`. Пути к картинкам в `content.ts` пиши как обычно (`'/img/...'`), подпапка добавляется автоматически.
- Если переименуешь репозиторий, подпапка поменяется сама.

После переезда на `mead.fi` превью можно выключить: **Settings → Pages → Unpublish site**, затем удалить `.github/workflows/pages.yml`.

## 3. Cloudflare Pages

1. Зайди на `dash.cloudflare.com` → **Workers & Pages** → **Create** → вкладка **Pages** → **Connect to Git**.
2. Разреши Cloudflare доступ к GitHub (можно только к этому одному репозиторию) и выбери `suneater-landing`.
3. Настройки сборки:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: `main`
4. **Save and Deploy**. Через минуту сайт откроется по адресу вида `suneater-landing.pages.dev`.

Версия Node для сборки берётся из файла `.node-version` (22). Если сборка падает с ошибкой про версию Node, добавь в настройках проекта переменную окружения `NODE_VERSION` = `22`.

Сайт закрыт от поисковиков (см. раздел «Открыть для поисковиков»), но адрес `pages.dev` открыт всем, у кого есть ссылка. Если нужно спрятать его полностью, включи в проекте Pages **Access policy** (Cloudflare Access): тогда для входа потребуется подтверждение по email.

## 4. Обновление сайта

Положи картинки в `public/img/`, поправь `src/data/content.ts`, проверь локально (`npm run dev`) и отправь изменения:

```bash
git add .
git commit -m "Add label images"
git push
```

Cloudflare (и GitHub Pages, пока превью включено) сам пересоберёт сайт. Ветки, кроме `main`, получают отдельные адреса для предпросмотра и не трогают основной сайт.

## 5. Подключение домена mead.fi (когда будешь готов)

Домен уже обслуживается Cloudflare, поэтому DNS-записи создаются автоматически.

1. **Сначала сохрани список DNS-записей.** Почта `suneater@mead.fi` уже работает, и её записи (MX, а также TXT для SPF и DKIM) трогать нельзя. Открой **DNS → Records** и сделай скриншот или экспорт.
2. Если для `mead.fi` или `www` уже есть записи A, AAAA или CNAME (например, от старой заглушки), Cloudflare предложит их заменить. Заменять можно **только** эти записи, MX и TXT оставь как есть.
3. В проекте Pages: **Custom domains** → **Set up a custom domain** → `mead.fi` → **Activate domain**. SSL-сертификат выпустится автоматически, обычно за несколько минут.
4. Повтори для `www.mead.fi`. Чтобы у сайта был один адрес, настрой редирект `www` → `mead.fi`: **Rules → Redirect Rules**, шаблон «Redirect from WWW to root».
5. Проверь:
   - `https://mead.fi` и `https://www.mead.fi` открывают сайт;
   - отправь письмо на `suneater@mead.fi` с внешнего ящика и ответь на него: почта должна работать в обе стороны;
   - в **DNS → Records** все MX и TXT на месте.

## 6. Открыть для поисковиков (в день запуска)

Сейчас сайт закрыт от индексации двумя способами. Чтобы открыть, убери оба:

1. В `index.html` удали строку `<meta name="robots" content="noindex, nofollow" />` и комментарий над ней.
2. В `public/_headers` удали строку `X-Robots-Tag: noindex, nofollow` и комментарий над ней.

После `git push` по желанию:

- добавь `public/robots.txt` со ссылкой на sitemap;
- подтверди домен в Google Search Console и запроси индексацию главной страницы.

Технический адрес `pages.dev` после этого тоже станет индексируемым. Это не страшно: в `index.html` указан `canonical` на `https://mead.fi/`, и поисковики будут считать основным адресом домен.

`robots.txt` с `Disallow: /` для закрытия сайта использовать не стоит: тогда поисковик не видит `noindex` и может показать голую ссылку в выдаче, если на сайт кто-то сослался.
