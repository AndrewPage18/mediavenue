# MediaVenue — single-page marketing site (template)

A self-contained, responsive one-page site for an affiliate network agency whose
angle is **owned traffic matched to each client's campaigns** — not a generic
ad marketplace.

No build step. No framework. Plain HTML + CSS + vanilla JS so you can edit it
with any editor and host it anywhere static.

```
mediavenue-site/
├── index.html      ← all page content / copy
├── styles.css      ← all styling; brand tokens live at the very top
├── script.js       ← nav, mobile menu, scroll reveals, form stub
├── favicon.svg     ← browser tab icon (vector)
├── assets/
│   ├── favicon-32.png       ← PNG fallback icon
│   ├── apple-touch-icon.png ← 180×180 iOS home-screen icon
│   └── og-image.png         ← 1200×630 link-preview image
└── README.md
```

## Run it

Just open `index.html` in a browser. For a local server (optional):

```
# from this folder
python -m http.server 8080      # then visit http://localhost:8080
```

## Deploy it

Upload the whole folder (keep `assets/` next to `index.html`) to any static host
— Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, or plain shared hosting.
Nothing server-side is required until you wire up the contact form.

---

## What to change before it goes live

Everything below is placeholder. Search `index.html` for these:

| Placeholder | Where | Replace with |
|---|---|---|
| `MediaVenue` | nav, footer, `<title>` | your brand name |
| routing glyph `<svg>` | nav + footer (`.brand`) | your logo (SVG or `<img>`) |
| `https://t.me/animatrixx` | nav "Talk to Us" button `href` | your real Telegram username |
| `support@mediavenue.net` | Contact → `.next__contact` | real email (or remove) |
| `[ Add real contact details… ]` | Contact → `.next__contact` | phone / hours / booking link |
| `illustrative` figures + all `.stat__num` (`+41%`, `2.3×`, `24h`, `8`) | Results section | your verified reporting numbers |
| `Privacy Policy` / `Terms` `href="#"` | footer | real policy page URLs |
| footer legal line | footer `.footer__legal` | your registered entity + jurisdiction |
| `<meta name="description">` | `<head>` | your real SEO description |
| `https://mediavenue.net` (×3) | `<head>` Open Graph / Twitter tags | your real domain — **must be absolute URLs** or link previews break |

> The site intentionally contains **no real names, emails, phone numbers,
> addresses, registration details or social handles**. Add your own.

## Favicon & link-preview image

- **Favicon** — `favicon.svg` (vector, used by modern browsers) plus
  `assets/favicon-32.png` and `assets/apple-touch-icon.png` fallbacks. All wired
  up in the `<head>`. To replace: swap the art in `favicon.svg`, then
  regenerate the PNGs (any SVG-to-PNG tool, or [realfavicongenerator.net]).
- **Link preview (`assets/og-image.png`, 1200×630)** — shown when the URL is
  shared on Slack, LinkedIn, WhatsApp, iMessage, X, Facebook, etc.
  - The `og:image` / `twitter:image` tags in `<head>` **must point at an
    absolute URL** (`https://yourdomain.com/assets/og-image.png`). Relative
    paths do not work — scrapers fetch the image from outside your page.
  - After changing the domain, re-scrape with
    [Facebook Sharing Debugger], [X Card Validator], or LinkedIn's Post
    Inspector so the platforms drop their cached copy.
  - To restyle the image, edit the source and re-export at exactly 1200×630.

[realfavicongenerator.net]: https://realfavicongenerator.net
[Facebook Sharing Debugger]: https://developers.facebook.com/tools/debug/
[X Card Validator]: https://cards-dev.twitter.com/validator

## Re-brand the colours

Open `styles.css` — the first block is `:root { … }` under **BRAND TOKENS**.
You usually only need these:

```css
--accent:     #34E3C0;   /* primary accent — the brand colour            */
--accent-2:   #6E8BFF;   /* secondary accent used in button gradients    */
--accent-ink: #04150F;   /* text colour when placed on top of the accent */
--bg:         #0B0E14;   /* page background                              */
```

Grounds (`--surface`, `--line`, …) and text colours are right below if you want
to shift the whole palette. Type is set with `--font-display`, `--font-body`,
`--font-mono` — change the `<link>` in `index.html` if you swap Google Fonts.

## Fonts used

Loaded from Google Fonts in `index.html`:

- **Bricolage Grotesque** — headings
- **Hanken Grotesk** — body
- **IBM Plex Mono** — labels, stats, code-style captions

## Wire up the contact form

`script.js` → the `contactForm` submit handler currently just shows a thank-you
panel and sends nothing. Replace the marked block with a real request, e.g.:

```js
await fetch("https://YOUR-ENDPOINT", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(Object.fromEntries(new FormData(form))),
});
```

or point the `<form>` at a hosted service (Formspree, Basin, Getform) with an
`action` and `method="POST"`.

## Notes on the design

- **Single dark theme by choice.** The brief asked for a dark theme with an
  accent colour, so the site commits to one visual world rather than shipping a
  half-built light mode. To add a light theme later, define a `:root` light
  palette and override the tokens under
  `@media (prefers-color-scheme: dark)` / `:root[data-theme="dark"]`.
- **Motion is progressive enhancement.** All content is visible without
  JavaScript; scroll reveals and the hero diagram animation only add polish, and
  they respect `prefers-reduced-motion`.
- **Graphics are abstract SVG** (routing nodes, tiny diagrams) — no stock
  photos, no implied real people.
- Accessible: semantic landmarks, labelled form fields, visible focus rings,
  keyboard-operable mobile menu.
