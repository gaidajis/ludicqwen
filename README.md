# LUCID

> *Cut the noise. Keep what's essential.*

**LUCID** is a tiered catalogue of curated items — products, experiences, and locations — ranked by a structured scoring system across 10 hierarchy levels of human need, from immediate survival to long-term meaning.

🌐 **Live site:** [gaidajis.github.io/ludicqwen](https://gaidajis.github.io/ludicqwen/)

---

## How It Works

### The 10-Tier Hierarchy

Every item in LUCID belongs to one of 10 tiers, ordered from the most urgent and essential to the most expansive and long-term:

| # | Tier | Timeframe | What it covers |
|---|------|-----------|----------------|
| 01 | **Body Alive** | Minutes | The non-negotiables. What stands between the body and extinction. |
| 02 | **Body Stable** | Hours | Stabilization within hours — water, shelter, wound management. |
| 03 | **Body Sustained** | Days | Nutrition, sleep architecture, and physical recovery systems. |
| 04 | **Environment Secure** | Weeks | Safety infrastructure, stable housing, grid resilience. |
| 05 | **Body & Pleasure** | Weeks–Months | Sensory restoration, comfort protocols, deliberate pleasure. |
| 06 | **Social & Emotional** | Months | Belonging mechanisms, emotional safety, secure communication. |
| 07 | **Status & Agency** | Months–Years | Mastery development, financial sovereignty, decision-making power. |
| 08 | **Mind Stimulated** | Ongoing | Discovery frameworks, deep learning systems, paradigm shift catalysts. |
| 09 | **Senses & Excitement** | Ongoing | Awe procurement — uncharted coordinates, pristine audio, peak input. |
| 10 | **Self & Meaning** | Years | Purpose construction, legacy design, highest-impact contribution. |

### Item Cards

Each item is displayed as a card containing:

- **Image** — 16:9 visual thumbnail
- **Tier badge** — which tier the item belongs to (e.g. `TIER 3`)
- **Modality tag** — `Product`, `Experience`, or `Location`
- **Budget indicator** — `Budget`, `Mid`, or `Luxury`
- **Score bars** — three sub-scores visualised:
  - **Efficacy** — how well it actually works
  - **Build Quality** — durability, craftsmanship, reliability
  - **Consensus** — how broadly agreed-upon its value is
- **Overall score** — composite rating
- **Justification** — a concise rationale for why this item made the list
- **Source tags** — types of evidence behind the rating

### Sidebar Navigation

The fixed left sidebar (desktop) / slide-out drawer (mobile) provides:

- **Tier jump links** — click any tier label to scroll directly to it
- **Modality filter** — show only `Product`, `Experience`, or `Location` items (or `All`)
- **Budget filter** — narrow to `Budget`, `Mid`, or `Luxury` items (or `All`)
- **Edit Mode toggle** — enter/exit content management mode

### Edit Mode

Activated via the **ENTER EDIT MODE** button in the sidebar. When active:

- A banner appears at the top confirming edit mode is live
- Each card shows **Edit** (pencil) and **Delete** (trash) controls
- A **`+` floating button** appears in the bottom-right corner to add new items
- A form modal handles all fields: title, tier, modality, budget, image URL, scores, justification, intent, and source types
- All changes apply immediately to the in-memory state

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| State | Zustand |
| Icons | Lucide React |
| Routing | React Router DOM v7 |
| Deployment | GitHub Pages (via GitHub Actions) |

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/gaidajis/ludicqwen.git
cd ludicqwen/lucid

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Deployment

The site is automatically deployed to **GitHub Pages** on every push to `main` via the GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

The workflow:
1. Installs Node 20 and runs `npm ci` in `lucid/`
2. Builds the app with `npm run build`
3. Publishes `lucid/dist/` to the `gh-pages` branch

---

## Project Structure

```
ludicqwen/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
└── lucid/
    ├── public/
    │   └── 404.html            # SPA routing fallback for GitHub Pages
    └── src/
        ├── components/
        │   ├── IntroScreen.tsx  # Animated splash screen
        │   ├── Sidebar.tsx      # Navigation, filters, edit toggle
        │   ├── TierSection.tsx  # Section header per tier
        │   ├── DataCard.tsx     # Individual item card
        │   ├── ScoreBar.tsx     # Score visualisation
        │   ├── ItemForm.tsx     # Add / edit item form
        │   ├── Modal.tsx        # Modal wrapper
        │   └── ConfirmDelete.tsx
        ├── data/
        │   └── initialData.ts   # Seed data
        ├── store/
        │   └── useLucidStore.ts # Zustand state management
        ├── types/
        │   └── index.ts         # TypeScript interfaces
        ├── App.tsx
        └── main.tsx
```
