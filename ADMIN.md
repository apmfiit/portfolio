# Content admin (Sveltia CMS)

Edit all site text/images from a form UI at **https://petrafanasyev.com/admin/**.
Saving commits JSON to `content/data/` on `main` → GitHub Actions rebuilds and
deploys (~1–2 min). No content lives in code anymore.

## What you can edit

- **Кейсы (Projects):** headline, blurb, status, year, cover, meta (role/timeline/
  team/skills/platforms), and each section (eyebrow, heading, body paragraphs,
  images + captions). Every field is RU + EN.
- **Настройки сайта → Опыт (главная):** the home experience list.
- **Настройки сайта → Обо мне:** intro, experience detail, growth, achievements
  (with photos), personal line.
- **Настройки сайта → Тексты UI и контакты:** the home taglines, all interface
  labels, and contact links (Telegram / email / CV).

Images you upload go into `public/images/` and are referenced as `/images/...`.

## One-time setup (login via GitHub)

A static site can't keep the OAuth secret, so logging in needs a tiny free
**Cloudflare Worker** that holds it. ~10 minutes, once.

### 1. Create a GitHub OAuth App
GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**:
- **Application name:** `petrafanasyev CMS`
- **Homepage URL:** `https://petrafanasyev.com`
- **Authorization callback URL:** `https://<your-worker>.workers.dev/callback`
  (you'll get the worker URL in step 2 — come back and fill this in).

Save → copy the **Client ID** and generate a **Client Secret**.

### 2. Deploy the auth worker
Use the official **`sveltia/sveltia-cms-auth`** worker:
1. Go to <https://github.com/sveltia/sveltia-cms-auth> and follow its
   “Deploy to Cloudflare” steps (or `git clone` + `npx wrangler deploy`).
2. Set these Worker **environment variables / secrets**:
   - `GITHUB_CLIENT_ID` = the Client ID from step 1
   - `GITHUB_CLIENT_SECRET` = the Client Secret from step 1
   - `ALLOWED_DOMAINS` = `petrafanasyev.com` (add `localhost` too for local testing)
3. Deploy → copy the Worker URL, e.g. `https://sveltia-cms-auth.<you>.workers.dev`.
4. Paste that Worker URL back into the OAuth App’s **callback URL** as
   `…workers.dev/callback`.

### 3. Point the CMS at the worker
In `public/admin/config.yml`, set:
```yaml
backend:
  base_url: https://sveltia-cms-auth.<you>.workers.dev
```
Commit that change (or tell me the worker URL and I'll set it).

### 4. Use it
Open `https://petrafanasyev.com/admin/`, click **Sign in with GitHub**, edit,
**Publish**. Changes deploy automatically.

> Only GitHub accounts with write access to `apmfiit/portfolio` can publish.
