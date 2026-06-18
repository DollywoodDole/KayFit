# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page recreation of **Beyond the Call** — a 12-week fitness, nutrition, and mindset program for first responders, by Kaylee Sawatsky (Paramedic, CPT & Nutrition Coach). Original: beyondthecallwebsite.netlify.app

## Stack

Single-file HTML/CSS/JS — no build step, no framework, no dependencies. All CSS is inline in `<style>` in `index.html`. All JS is inline in `<script>` at the bottom.

- `index.html` — entire site (CSS + HTML + JS)
- `images/photo1.jpg` through `images/photo11.jpg` — extracted from original site, used in order through the page
- `style.css` / `script.js` — legacy files from initial build, not used (index.html is self-contained)

## Run

Open `index.html` directly in a browser. No server needed.

```bash
npx serve .
```

## Design System (all in `:root` in index.html)

| Token | Value | Use |
|-------|-------|-----|
| `--black` | `#11181c` | Page background |
| `--dark` | `#1a2429` | About, FAQ, footer sections |
| `--mid` | `#232f35` | Program, Pricing sections |
| `--gold` | `#c19a6b` | All accents, buttons, labels |
| `--cream` | `#f1ece2` | Body text |

Fonts: **Cormorant Garamond** (headings, logo, sig) + **Inter** (body) via Google Fonts.

## Page Sections (in order)

`nav` → `#hero` → `.marquee-bar` → `#about` → `#for` → `#program` → `#weeks` → `#photos` → `#included` → `#pricing` → `#faq` → `#cta` → `footer`

## Key Details

- Waitlist URL: `https://outlook.us7.list-manage.com/subscribe/post?u=2546188df96b7b6c5d5b26305&id=30d824b3aa&f_id=00be31e0f0`
- Instagram: `https://www.instagram.com/kaysawatskyfit`
- Contact email: `beyondthecallco@gmail.com`
- Pricing: $797 founding (first 20 spots) / $997 regular
- Scroll reveal: `.reveal` class + IntersectionObserver adds `.visible`
- FAQ uses native `<details>`/`<summary>` elements (no JS needed)
- Mobile nav: `nav.mobile-open` class toggled by hamburger button

## Deployment

Netlify drag-and-drop the folder or GitHub Pages. No build command.
