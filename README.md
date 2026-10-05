# Loksewa Hub — Deploy Guide

A plain static website for Loksewa (civil service) exam practice. No build
step, no backend — any static host works. Everything lives in the root folder.

## Pages
- `index.html` (+ `home.css`) — home hub with tool cards
- `quiz.html` (+ `styles.css`, `app.js`) — Nepal geography map quiz
- `constitution.html` (+ `constitution.css`) — Constitution overview by theme
- `constitution-full.html` (+ `constitution-full.css`) — Preamble, all 308 Articles and the 9 Schedules, taken from the official English text (anthem and figures omitted)
- `history.html` (+ `history.css`) — Nepal's history timeline
- `placeholder.css` — styles for "coming soon" pages (not used by a page yet)

## Language (English <-> Nepali)
- `i18n.js` — tiny translation engine. Text marked `data-i18n="key"` is swapped
  when the visitor taps the E / N switch at the top of the hamburger menu.
  The choice is remembered in `localStorage`. Add strings with `I18N.add({en:{...}, ne:{...}})`.
- Done so far: menu, home page, quiz interface, and Nepali names of districts, cities,
  landmarks and headquarters (`names_ne.json`). Recall mode accepts English or Nepali.
  District fact sentences (`facts_ne.json`) are translated too.
  History page and the constitution overview are fully bilingual (strings live inside
  `history.html` and `constitution.html`). Still English: the full constitution text (Nepali version pending).

## Shared navigation
- `nav.js` — injects the hamburger button and side drawer on every page
- `nav.css` — styles for the drawer
To add or rename a menu link, edit the `LINKS` list at the top of `nav.js`.
Every page just needs `nav.css` in `<head>` and `<script src="nav.js">` before `</body>`.

## Quiz data (fetched by `app.js`)
- `districts.json` — 77 district boundary shapes
- `provinces.json` — district → province lookup
- `cities.json` — 40 major cities
- `landmarks.json` — 36 mountains, lakes, rivers, parks, temples
- `facts_ne.json` — Nepali version of each district's fact sentence
- `names_ne.json` — Nepali names (districts, cities, landmarks, headquarters)
- `facts.json` — headquarters, population, area and a fact per district

Best scores save to the visitor's own browser via `localStorage`.

## Deploy (Vercel or Netlify)
1. Put all files in a GitHub repo (web upload works, no git commands needed).
2. Connect the repo on Vercel or Netlify; leave framework/build settings empty.
3. Any future edit: push the changed file, the host redeploys automatically.

## Notes
- Google Fonts (Rajdhani, Inter) load via `@import` at the top of each CSS file.
  Remove that line if you want zero external requests.
