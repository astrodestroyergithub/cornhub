# CodeHub — High-Contrast Video & Photo Portal (Netlify Ready)

A responsive, high-contrast dark-and-orange (`#0f0f0f` / `#1b1b1b` / `#ff9000`) video and photo streaming web application tailored for coding videos, technical streams, and visual galleries. It includes an integrated **Admin Studio** for uploading local videos and photos, indexing external video URLs with custom thumbnails and metadata, managing filter categories, and customizing the header logo branding.

## Project Directory Structure for Netlify

```text
codehub-netlify-portal/
├── index.html              # Self-contained main entry point (HTML5 + Tailwind + app bundle)
├── netlify.toml            # Netlify build, headers, and SPA redirect configuration
├── _redirects              # Fallback static routing rule for Netlify CDN
├── css/
│   └── custom.css          # Modular dark-mode and orange-pill theme rules
├── js/
│   └── app.js              # Modular feed, category filter, player modal, and Admin Studio logic
├── assets/
│   └── sample-data.json    # Default seed catalog of videos, categories, and gallery photos
└── README.md               # Usage and deployment documentation
```

## Key Features

- **Signature High-Contrast Dark UI**: Styled with `#000000` top utility strip, `#141414` sticky header, `#181818` media cards, `#ff9000` orange pill accents, hover progress bars, `4K`/`HD` badges, duration timestamps, view counters, and approval percentage ratings.
- **Full Responsiveness**: Adapts fluidly across mobile phones (`360px+` with collapsible drawer menu), tablets (`2-column` grid), laptops (`3-column` grid), and `4K` desktop monitors (`4-column` grid with persistent discovery sidebar).
- **Admin Upload & Linker Studio (`ADMIN` button)**:
  - **External Video Links**: Paste any public video URL or direct `.mp4`/`.webm` stream link, specify the source website label, attach a thumbnail URL or upload a custom thumbnail image, and set the title, creator, duration, quality badge (`4K`, `HD`, `RAW`), category, and tags.
  - **Local Video & Photo Uploads**: Select local video files (`video/*`) or images (`image/*`) from your device to publish immediately to the visitor feed and photo gallery.
  - **Live Feed Card Preview**: Preview how your card looks in real time before publishing.
  - **Category & Brand Manager**: Add or delete filter categories on the fly, customize the two-part header logo text (`Code` + `Hub`), and export/restore your JSON catalog.
- **Interactive Theater Modal & Lightbox**: Play uploaded videos, preview simulated live coding streams, upvote videos, copy share links, post viewer comments, or launch external video URLs in a new tab.
- **Contact & Support Desk**: Includes a department selector, reference URL field, and instant session ticket tracker.

## How to Deploy on Netlify

### Method 1: Netlify Drop (Fastest — No CLI Needed)
1. Download and extract `codehub_netlify_deploy.zip` (or use the project folder directly).
2. Go to [Netlify Drop](https://app.netlify.com/drop) in your browser.
3. Drag and drop the project folder onto the upload zone. Netlify will publish the site immediately over HTTPS.

### Method 2: Git Repository Continuous Deployment
1. Push the project directory to a GitHub, GitLab, or Bitbucket repository.
2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site** → **Import an existing project**.
3. Select your repository and verify the build settings (auto-detected from `netlify.toml`):
   - **Build command**: *(leave blank — static site)*
   - **Publish directory**: `.`
4. Click **Deploy site**.

### Method 3: Netlify CLI
1. Install the Netlify CLI locally (`npm install -g netlify-cli`).
2. Run `netlify deploy --prod --dir=.` from the root of the project directory.
