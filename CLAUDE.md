# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for **Beyond the Call** — a 12-week fitness, nutrition, and mindset program for first responders, by Kaylee Sawatsky (Paramedic, CPT & Nutrition Coach).

## Stack

Plain HTML/CSS/JS — no build step, no framework, no dependencies.

- `index.html` — single-page layout with anchor-linked sections
- `style.css` — all styles (CSS custom properties for the design system)
- `script.js` — navbar scroll shadow, hamburger menu, FAQ accordion
- `images/` — put `kaylee.jpg` here (hero image, falls back gracefully if missing)

## Run

Open `index.html` directly in a browser, or use any static server:

```bash
npx serve .
# or
python -m http.server 8080
```

## Design System

CSS variables are defined in `:root` in `style.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--navy` | `#0d1b2a` | Hero bg, footer, headings |
| `--accent` | `#c8954a` | Buttons, highlights, CTA banner |
| `--off-white` | `#f8f6f2` | Page background |

Typography: **Inter** (body) + **Playfair Display** (headings/taglines) via Google Fonts.

## Page Sections

`#hero` → `#about` → `#program` → `#pricing` → `#faq` → `.cta-banner` → `footer`

All nav links use anchor IDs. The waitlist CTA links to an external Mailchimp subscribe URL.

## Deployment

Netlify drag-and-drop or GitHub Pages. No build command needed.
