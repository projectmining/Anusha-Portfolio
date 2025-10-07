# Anusha — Analytics Portfolio (React + Vite + Tailwind)

A sleek, interactive portfolio dashboard showcasing analytics impact, automation thinking,
and data storytelling. Built with React, Tailwind, Recharts, and Framer Motion.

## Quick start (local)

```bash
# 1) Extract the zip
cd anusha-analytics-portfolio

# 2) Install deps
npm install

# 3) Run locally
npm run dev
```

## Deploy to Netlify (recommended)

### Option A — Drag & Drop
1. Run a production build:
   ```bash
   npm run build
   ```
2. This creates a `dist/` folder. Go to https://app.netlify.com/ and click **Add new site → Deploy manually**.
3. Drag & drop the `dist/` folder into the Netlify UI. Done.

### Option B — Connect to Git
1. Create a new repo on GitHub and push this folder.
2. On Netlify, **Add new site → Import from Git** → connect GitHub and select your repo.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**. Netlify will auto-build on each commit.

### Custom domain
- In your site's **Domain settings** on Netlify, you can add a custom domain or use the default Netlify subdomain.
