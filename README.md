# ahrdn.com

Portfolio site for Anika Harden. Static HTML and CSS with about 130 lines of JavaScript. No build step.

## Run it locally

    python3 -m http.server 8000

Then open http://localhost:8000.

## Layout

- `index.html`, `about.html`, `work-with-me.html`: main pages
- `work/`: case studies
- `css/style.css`: the one stylesheet; design tokens are at the top
- `js/main.js`: masthead, banner, scroll reveal, back-to-top, mobile nav, case-study scroll scenes, homepage lead art
- `images/work/`: case study screenshots
- `fonts/`: Newsreader and Libre Franklin, self-hosted under the SIL Open Font License
- `style-guide.html`: the design system (not linked from the nav)

## Deploy

Hosted on GitHub Pages from the `main` branch.
