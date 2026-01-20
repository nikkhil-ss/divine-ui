# Divine Devotion — Static Site (HTML/CSS/JS)

This project has been simplified to pure HTML, CSS, and JavaScript. No React, Vite, Tailwind, or Node.js tooling is required anymore.

## Structure

- `index.html` — Home
- `about.html` — About page
- `services.html` — Services page
- `donation.html` — Donation page (with basic amount selector)
- `contact.html` — Contact + map + FAQ
- `404.html` — Not found page
- `assets/css/styles.css` — Site styles
- `assets/js/main.js` — Small JS for navbar and donation interactions

Existing `src/` React code remains in the repo for reference but is no longer used.

## Quick Start

- Open `index.html` directly in your browser, or
- Serve the folder with any static server.

On Windows PowerShell, you can use Python’s simple server (if Python is installed):

```powershell
python -m http.server 8080
```

Then visit http://localhost:8080 in your browser.

## Notes

- Image paths reference files in `src/assets/`. If you plan to host without a build step, ensure your host serves these static files or move them under `assets/` for portability.
- To change colors or spacing, edit CSS variables in `assets/css/styles.css`.

