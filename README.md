# Portfolio (React + TypeScript + Vite)

This is a portfolio website built with React, TypeScript, Vite, Tailwind CSS, and GSAP.

## Before You Push To GitHub

Use this checklist before your first push/deploy:

1. Remove local build and dependency folders from tracking.
2. Ensure a `.gitignore` exists (already added in this project).
3. Keep secrets out of the repo (`.env`, API keys, tokens).
4. Confirm the app builds successfully with `npm run build`.
5. Verify external asset paths (videos/images in `public/`) work in production.
6. Add project metadata (`README`, repo description, license if needed).

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Resume Download Setup

Place your resume PDF at:

- `public/resume.pdf`

The website resume buttons are already wired to this path and will trigger a download in production.

## First-Time Git Setup

Run these in the project root:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If `node_modules` or `dist` were added before `.gitignore`, untrack them once:

```bash
git rm -r --cached node_modules dist
git add .
git commit -m "chore: apply gitignore"
git push
```

## Deploy Options

### Option 1: GitHub Pages (recommended for static portfolio)

Your current Vite config uses `base: './'`, which works for static hosting and avoids broken asset links.

Steps:

1. Push code to GitHub.
2. In GitHub repo: `Settings` -> `Pages`.
3. Set Source to `GitHub Actions`.
4. Add a workflow that builds and deploys the `dist/` folder.

### Option 2: Vercel / Netlify

1. Import the GitHub repository.
2. Build command: `npm run build`
3. Output directory: `dist`

## Security Notes

- Never commit `.env` files.
- Rotate any key that was ever committed accidentally.
- Keep dependencies updated (`npm audit`, `npm update` as needed).
