# Neuronix Technologies — Frontend

Company website for Neuronix Technologies. Built with React 18, Vite 6, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v3 + Radix UI (shadcn) |
| Routing | React Router v6 (lazy-loaded) |
| Server state | TanStack Query v5 |
| Animations | Framer Motion v11 |
| 3D background | Three.js v0.171 |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm run lint      # ESLint (quiet)
npm run lint:fix  # ESLint auto-fix
```

The dev server proxies `/api/*` requests to `http://localhost:3000` (backend, not yet built).

---

## Project Structure

```
src/
├── App.jsx                       # Root — AuthProvider, QueryClient, Router
├── main.jsx                      # Entry point — StrictMode, global error listener
│
├── constants/
│   └── index.js                  # NAV_LINKS, FOOTER_LINKS, CONTACT_INFO, SITE_META
│
├── features/                     # Domain modules (feature-first)
│   ├── home/
│   │   ├── components/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesPreview.jsx
│   │   │   ├── PortfolioPreview.jsx
│   │   │   └── TestimonialsSection.jsx
│   │   └── index.js
│   ├── services/
│   │   ├── components/Services.jsx
│   │   ├── constants.js          # SERVICES array
│   │   └── index.js
│   ├── portfolio/
│   │   ├── components/PortfolioCard.jsx
│   │   ├── constants.js          # PROJECTS array
│   │   └── index.js
│   ├── blog/
│   │   ├── components/BlogCard.jsx
│   │   ├── constants.js          # POSTS array
│   │   └── index.js
│   ├── about/
│   │   ├── components/TeamCard.jsx
│   │   ├── constants.js          # TEAM, VALUES, STATS
│   │   └── index.js
│   └── chatbot/
│       ├── components/Chatbot.jsx
│       └── index.js
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx            # Shared shell — Navbar, Footer, global 3D bg
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── ui/
│       ├── NeuralNetwork3D.jsx   # Three.js WebGL background (variant: hero | ambient)
│       ├── SectionReveal.jsx     # Intersection Observer fade-in wrapper
│       ├── AnimatedCounter.jsx   # Count-up on scroll
│       ├── WhatsAppButton.jsx    # Fixed WhatsApp CTA
│       └── CookieConsent.jsx     # Cookie banner
│
├── pages/                        # Route-level components (lazy-loaded)
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── ServicesPage.jsx
│   ├── PortfolioPage.jsx
│   ├── BlogPage.jsx
│   ├── ContactPage.jsx
│   └── NotFoundPage.jsx
│
├── routes/
│   ├── index.jsx                 # AppRoutes — all pages lazy + Suspense
│   └── ProtectedRoute.jsx
│
├── stores/
│   └── authStore.jsx             # Context-based auth (stub — no backend yet)
│
├── lib/
│   ├── api-client.js             # Fetch wrapper — GET/POST/PUT/DELETE + ApiError
│   ├── query-client.js           # TanStack Query client instance
│   └── utils.js                  # cn() — clsx + tailwind-merge
│
└── index.css                     # Design tokens, glass morphism, glow utilities
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, services preview, portfolio preview, testimonials |
| `/about` | About | Mission, team, values, stats |
| `/services` | Services | Full services grid with detail |
| `/portfolio` | Portfolio | Project showcase cards |
| `/blog` | Blog | Article listing |
| `/contact` | Contact | Contact form, map (Bijapur), contact info |
| `*` | 404 | Not found |

---

## Key Patterns

**Feature-first modules** — each feature in `src/features/<name>/` exports its components and data through a barrel `index.js`. Pages import from the feature barrel, not from nested paths.

**Global 3D background** — `NeuralNetwork3D` renders a WebGL particle canvas via Three.js. `Layout.jsx` mounts it as `position: fixed` behind all page content (`z-0`). All page content sits in a `relative z-[1]` wrapper above it.

```jsx
// Two variants available:
<NeuralNetwork3D variant="ambient" />  // 70 particles — used globally in Layout
<NeuralNetwork3D variant="hero" />     // 120 particles — for high-impact hero use
```

**Lazy-loaded routes** — every page is wrapped in `React.lazy` + `Suspense` in `src/routes/index.jsx`. Three.js, Framer Motion, and React Router are split into separate chunks via Vite `manualChunks`.

**API client** — `src/lib/api-client.js` is a typed fetch wrapper ready to connect to the backend. It reads `VITE_API_BASE_URL` (defaults to `/api`) and attaches `Authorization: Bearer <token>` from `localStorage`.

---

## Environment Variables

Create a `.env.local` at the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

All Vite env vars must be prefixed with `VITE_` to be accessible in the browser.

---

## Styling

Design tokens are CSS custom properties defined in `src/index.css`. The theme is dark-first — near-black background (`hsl(0 0% 4%)`), red primary accent (`hsl(0 100% 61%)`).

Key utility classes defined in `index.css`:

| Class | Purpose |
|---|---|
| `.glass` | Glass morphism — low-opacity white bg + backdrop blur |
| `.glass-card` | Slightly more opaque glass variant for cards |
| `.glow-red` | Red box-shadow glow (used on primary buttons) |
| `.glow-red-sm` | Subtle glow variant |
| `.text-glow` | Red text-shadow glow |
| `.gradient-red-subtle` | Faint red diagonal gradient for section backgrounds |
| `.scroll-progress` | Fixed top bar showing page scroll percentage |

Fonts: **Space Grotesk** (`font-heading`) for headings, **Inter** for body text.

---

## Backend

The backend has not been built yet. Current placeholders:

- Contact form uses a `setTimeout` in place of a real API call
- `authStore.jsx` is a stub with no real session persistence
- `src/lib/api-client.js` is wired and ready — replace `setTimeout` with `api.post('/contact', data)` once the Express backend is up

---

## Contact

**Neuronix Technologies**
- Email: neuronixtechnologies@gmail.com
- Phone: +91 9187376646
- Address: Near Secab Primary College, Bijapur 586101
