# HI Tech Open Well Contractor website

A fast, static, bilingual (தமிழ் / English) website for HI Tech Open Well Contractor, Tiruchengode.
Built with Vue 3 + Vite, pre-rendered to plain HTML with vite-ssg so Google can read every page.
The site opens in Tamil (`<html lang="ta">`); visitors can switch to English, and the choice is remembered.
No backend: the enquiry form is emailed through Web3Forms.

## Pages

| URL | Page |
|---|---|
| `/` | Home: hero, stats, services, areas, gallery, enquiry form, reviews |
| `/tamil-nadu/salem` (and 19 more) | One page per district, from `src/data/areas.js` |
| `/contact` | Phone, WhatsApp, email, map link, enquiry form |
| `/privacy` | Privacy policy for the enquiry form |

## Folder structure

```
public/
  images/           your photos (hero.jpg, service-N.jpg, work-N.jpg)  <- add photos here
  optimized/        AVIF + WebP copies made from images/ (generated, do not edit)
  logo.png, favicon.ico, icon-*.png, apple-touch-icon.png
src/
  components/       SiteHeader, SiteFooter, CtaBand, EnquiryForm, ServiceCards, AreaList,
                    WorkGallery (gallery + lightbox), ReviewsSection, StarRating,
                    MobileBar, WhatsAppFloat, AppIcon
  pages/            HomePage, DistrictPage, ContactPage, PrivacyPage, NotFound
  data/
    business.js     name, phones, email, address, stats, site URL  <- edit here
    areas.js        states, districts, nearby towns, district text  <- add districts here
    photos.js       alt text (Tamil + English) for each photo
    reviews.js      customer reviews  <- add real reviews here
  generated/        photos.json, the list of optimised photos (generated)
  composables/      usePageMeta (title, description, canonical, Open Graph)
  styles/main.css   colours (CSS variables), buttons, layout
  i18n.js           all English + Tamil text
  routes.js, main.js, App.vue
scripts/
  sitemap.mjs            writes dist/sitemap.xml, robots.txt and _headers after each build
  optimize-images.mjs    turns public/images/ photos into AVIF + WebP + og.jpg (runs on dev and build)
```

## 1. Install

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

## 2. Add the Web3Forms key (so enquiries reach your email)

1. Go to https://web3forms.com, enter **velanraja002@gmail.com** and click *Create Access Key*.
   The key is emailed to you. Every enquiry will be sent to this email address.
2. Copy `.env.example` to `.env` and paste the key:

   ```
   VITE_WEB3FORMS_KEY=your-access-key-here
   ```

Without a key the form still shows, but tells visitors to call instead.
The key is safe to be public (Web3Forms keys only allow sending to your own email).

## 3. Run locally

```bash
npm run dev
```

Open http://localhost:5173. Use the EN / தமிழ் toggle at the top right to check both languages.

## 4. Build

```bash
npm run build      # outputs static HTML to dist/
npm run preview    # serve dist/ locally to check the build
```

The build pre-renders every page to its own `index.html`, then writes `sitemap.xml`,
`robots.txt` and `404.html`.

**Before your first real deploy**, set your domain in `src/data/business.js`:

```js
siteUrl: 'https://your-domain.in',
```

It is used in the sitemap, canonical links and social sharing previews.

To see what is in the JavaScript bundle:

```bash
npm run analyze    # builds, then opens stats.html: a treemap of every module with gzip/brotli sizes
```

## Performance

The site is built for slow 4G Android phones and for many visitors at once (it is plain static
files on a CDN, so traffic spikes cost nothing). What is in place:

- **Pre-rendered HTML** (vite-ssg): every page's text is in the HTML, readable before any
  JavaScript loads. Routes are split into chunks; the reviews carousel hydrates only when it
  scrolls into view, and the gallery lightbox downloads only when a photo is touched or hovered.
- **Images**: AVIF with WebP fallback in `<picture>`, sizes 400/800/1200/1920 px (never
  upscaled) with `srcset` + `sizes`. The hero is preloaded with `fetchpriority="high"` and is
  never lazy (142 KB for the 1200 px AVIF most phones pick). Every other photo is
  `loading="lazy"`, `decoding="async"` and has `width`/`height`. The gallery loads thumbnails
  only; full-size photos load only inside the lightbox. The logo is a 2.5 KB WebP inlined in
  the page.
- **Fonts**: self-hosted woff2 (Latin + Tamil subsets, only the weights used),
  `font-display: swap`. Only the four files the first screen uses are preloaded. Size-adjusted
  local fallback fonts are inlined in `index.html`, so text does not jump when the web fonts
  arrive.
- **CSS/JS**: critical CSS is inlined per page, the rest loads at the end of the page. The whole
  home page uses about 76 KB of gzipped JavaScript, mostly Vue itself. There are no animation
  libraries: motion uses only transform/opacity and IntersectionObserver, and is switched off
  for `prefers-reduced-motion`. The one scroll listener is passive and throttled with
  requestAnimationFrame.
- **Caching** (`netlify.toml` + `dist/_headers`, written by `scripts/sitemap.mjs`): hashed files
  in `/assets/` (JS, CSS, fonts) and `/optimized/` (photos) are cached for a year
  (`immutable`); HTML is `max-age=0, must-revalidate`, so a new deploy shows at once.
  Netlify compresses with Brotli/gzip automatically. (Cloudflare Pages reads `dist/_headers`
  too; on Cloudflare or Vercel, add the same one-year rule for `/assets/*` and `/optimized/*`.)
- **Enquiry form**: the send button is disabled while sending (no double submits); the request
  gives up after 10 seconds and shows the phone number; on any failure the filled-in details
  stay, so the visitor can press send again. The connection to Web3Forms is opened as soon as
  someone starts filling the form, not on page load.

### Lighthouse scores

Lighthouse 12, mobile preset (simulated slow 4G, 4x CPU slowdown), run locally on
Windows with headless Chrome against `dist/` served with gzip; median of 3 runs. Measured on
27 Sep 2026. "Before" is the build as it was before this optimisation pass.

| Page | | Performance | FCP | LCP | TBT | CLS | Transferred |
|---|---|---|---|---|---|---|---|
| Home `/` | before | 88 | 1.9 s | 3.5 s | 20 ms | 0 | 528 KB |
| | after | 83 | 2.3 s | 3.8 s | 20 ms | 0 | 575 KB |
| Area `/tamil-nadu/salem` | before | 88 | 2.0 s | 3.4 s | 20 ms | 0 | 404 KB |
| | after | 85 | 2.2 s | 3.6 s | 10 ms | 0 | 457 KB |

How to read this:

- **The targets (Performance 95+, LCP under 2.0 s) are not met in this local lab.** Every
  variant tried scored between 81 and 88, with LCP about 3.5 s.
- **The "before" score is flattered by a layout bug.** The hero photo and the service and gallery
  photos were missing their styles, so the hero photo showed as a strip below the text instead of
  behind it. Fixing that restored the intended full-screen hero and the 4:3 photo crops. The
  correct page paints more and loads slightly more image data, which accounts for the lower score.
- **This lab setup cannot reach the targets for any version of the page.** Tested variants:
  - With no web fonts at all, LCP was still 2.9–3.1 s.
  - With no JavaScript at all, LCP was 3.0–3.2 s.
  - Here, Chrome presents the first frame 0.7–2.2 s late even with no throttling. Lighthouse's
    simulation then treats every byte the page requested by that point as blocking LCP.
  - A trivial test page painted in under 0.1 s, so the gap comes from the machine's headless
    rendering, not the network.
- After deploying, check the real numbers with https://pagespeed.web.dev (Lighthouse on Google's
  servers) and in Search Console's Core Web Vitals report (real Android visitors).
- Weight on first load is within budget: under 600 KB in total, of which about 79 KB is
  gzipped JavaScript. Both are measured with a phone screen, which also fetches the lazy photos
  below the fold.

## 5. Deploy

### Netlify

1. Push this folder to a GitHub repository.
2. In Netlify: *Add new site > Import an existing project*, pick the repo.
   Build settings come from `netlify.toml` (command `npm run build`, publish folder `dist`).
3. *Site configuration > Environment variables*: add `VITE_WEB3FORMS_KEY` with your key.
4. Deploy. (No GitHub? Run `npm run build` and drag the `dist` folder onto
   https://app.netlify.com/drop. Make sure your `.env` file exists before building.)

### Cloudflare Pages

1. Push to GitHub. In Cloudflare: *Workers & Pages > Create > Pages > Connect to Git*.
2. Framework preset: *None*. Build command: `npm run build`. Output directory: `dist`.
3. *Environment variables*: add `VITE_WEB3FORMS_KEY` (and `NODE_VERSION` = `22`).
4. Save and deploy.

### Vercel

Import the repo, framework *Vite*, build command `npm run build`, output `dist`,
and add `VITE_WEB3FORMS_KEY` under Environment Variables.

## 6. Connect your own domain

Buy a domain (for example from GoDaddy, Hostinger, or Namecheap), then:

- **Netlify:** *Domain management > Add a domain*, enter it, and follow the DNS
  instructions (either switch nameservers to Netlify, or add a `CNAME` record for `www`
  pointing to `your-site.netlify.app` and an `A` record for the root to `75.2.60.5`).
- **Cloudflare Pages:** *Custom domains > Set up a custom domain*. If the domain's DNS is on
  Cloudflare it is set up automatically; otherwise add the `CNAME` record it shows you.

HTTPS is issued automatically on both. After the domain works:

1. Update `siteUrl` in `src/data/business.js` and redeploy.
2. Add the site in [Google Search Console](https://search.google.com/search-console),
   and submit `https://your-domain.in/sitemap.xml`.
3. Create or claim your [Google Business Profile](https://business.google.com) with the same
   name, phone and address, and add the website link. This matters most for local searches.

## Common edits

- **Phone, email, address, stats:** `src/data/business.js`
- **Add a district:** add an entry in `src/data/areas.js` (slug, English + Tamil name,
  towns in both languages, note). The page, form dropdown, links and sitemap update automatically.
- **Any text (English or Tamil):** `src/i18n.js`
- **Colours:** CSS variables at the top of `src/styles/main.css`
- **Customer reviews:** fill in the entries in `src/data/reviews.js` (name, village, district,
  work, rating, text, date, photo). A review appears once its `name` and `text` are filled; the
  average rating and count update automatically, and each review also shows on the page of its
  `district`. Until one is filled, the home page shows "எங்கள் வாடிக்கையாளர் கருத்துகள் விரைவில்".
  Customer photos go in `public/images/reviews/` (small square photos). Only use real reviews,
  with the customer's permission.
- **Sample reviews (client demo):** the 5 entries marked `isSample: true` in `src/data/reviews.js`
  are demo reviews, not real customers. They show a grey "மாதிரி / Sample" badge and are never
  counted in the average rating or review count. The `VITE_SHOW_SAMPLE_REVIEWS` flag controls
  them (default `true`; set it in `.env` or your host's environment variables, then rebuild).
  **Before going live, set VITE_SHOW_SAMPLE_REVIEWS=false and add real reviews.**
- **"Rate us on Google" button:** paste your Google review link into `googleReviewUrl` in
  `src/data/business.js`. The button is hidden until a real link is there.
- **Photos:** see *Adding photos* below.

## Adding photos

To add photos, put them in `/public/images/` using these names:

| File name | Where it shows |
|---|---|
| `hero.jpg` | Big banner at the top of the home page and district pages (dark overlay keeps the text readable). Also used for the social-sharing preview. |
| `service-1.jpg` | Service card: New open well digging |
| `service-4.jpg` | Service card: Well deepening |
| `service-2.jpg` | Service card: Well wall construction |
| `service-3.jpg` | Service card: Old well cleaning & desilting |
| `service-5.jpg` | Service card: Water point survey (until added, the card shows `work-2.jpg`) |
| `work-1.jpg`, `work-2.jpg`, `work-3.jpg`, ... | "பணி இடங்கள் / Work sites" gallery, in number order. Add as many as you like. |

- JPG, PNG or WebP all work (`.jpg`, `.jpeg`, `.png`, `.webp`). Any size; landscape photos look best.
- **To add a gallery photo**, just save it as the next number (e.g. `work-8.jpg`). No code changes needed.
  To remove one, delete the file.
- **To replace a photo**, overwrite the file with the same name.
- If a `service-N.jpg` is missing, that card shows a plain coloured box with the service icon.
  If there are no `work-*` photos, the gallery section is hidden.
- **Alt text** (the description read out to blind visitors and used by Google): each photo has
  Tamil and English text in `src/data/photos.js`. When you add a new photo, add a line there
  describing it, e.g. `'work-8': { ta: 'HI Tech – கிணறு வெட்டும் பணி', en: 'HI Tech – well digging work' }`.
  Photos without a line get that general text.

`npm run dev` and `npm run build` optimise the photos automatically: each is converted to WebP,
resized (banner max 1920 px wide, service cards 800 px, gallery 1200 px plus a 600 px tile),
compressed to about 200 KB, and saved in `public/optimized/`. Only the optimised copies are deployed.
While `npm run dev` is running, a photo you add or change shows up after a moment.
You can also run the step on its own with `npm run images`.
