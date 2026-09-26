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
  optimized/        WebP copies made from images/ (generated, do not edit)
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
  sitemap.mjs            writes dist/sitemap.xml + robots.txt after each build
  optimize-images.mjs    turns public/images/ photos into WebP + og.jpg (runs on dev and build)
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
| `service-1.jpg` | 1st service card: New borewell |
| `service-2.jpg` | 2nd service card: Open well |
| `service-3.jpg` | 3rd service card: Repair & flushing |
| `service-4.jpg` | 4th service card: Water point survey |
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
