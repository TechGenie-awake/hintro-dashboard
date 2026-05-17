# Hintro Dashboard

A responsive mock dashboard built for the Hintro Frontend Developer Internship assignment. The app replicates the Hintro product UI using mock APIs, supporting two user states — empty and active.

## Live Demo

https://hintro-dashboard-sand.vercel.app

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | UI framework and build tool |
| CSS Modules | Scoped component-level styling |
| Lucide React | Icon library |
| React Loading Skeleton | Loading states |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/your-username/hintro-dashboard.git
cd hintro-dashboard
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
VITE_API_URL=https://mock-backend-hintro.vercel.app
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## User Switching

The app supports two mock users as defined in the API documentation:

| Email | User ID | Description |
|---|---|---|
| `john@example.com` | `u1` | New user — shows empty states throughout |
| Any other email | `u2` | Active user — shows randomized data |

> Password can be anything. Authentication is simulated since no auth endpoint exists in the mock API.

---

## Features

- **Dashboard** — 4 stat cards showing Total Sessions, Average Duration, AI Used, Last Session
- **Recent Calls** — call sessions grouped by date with client avatar, description and time
- **Empty States** — u1 shows zero stats and a "No Recent Calls" placeholder
- **Skeleton Loading** — stat cards and call list show skeleton placeholders while API loads
- **Sidebar Navigation** — active state highlights current page
- **Feedback Modal** — multi-step form with title, star rating (1–5), and dynamic question based on rating
- **Feedback History** — card grid showing past submissions with stars, description, date and time
- **LocalStorage** — all feedback entries persisted across sessions
- **Usage Bar** — KB files usage from dashboard API shown in sidebar
- **Logout Modal** — confirmation dialog before logging out
- **Responsive** — collapsible sidebar drawer on mobile with hamburger menu
- **Coming Soon** — placeholder pages for Call Insights, Knowledge Base, Prompts, Boxy Controls

---

## API Endpoints

All data is fetched live from the mock backend. Nothing is hardcoded.

Base URL: `https://mock-backend-hintro.vercel.app`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/profile` | User profile (name, email) |
| GET | `/api/auth/dashboard` | Dashboard data with subscription and usage |
| GET | `/api/call-sessions/stats` | Total sessions, avg duration, AI interactions, last session |
| GET | `/api/call-sessions?limit=10` | Paginated call history |

All requests include `x-user-id: u1` or `x-user-id: u2` header.

---

## Project Structure
```
src/
├── api/              # API calls
├── components/       # Reusable UI components
├── pages/            # Full pages (Dashboard, Login, FeedbackHistory)
├── App.jsx           # Root with routing
└── index.css         # Global CSS variables
```

---

## Conventions

- **CSS Modules** for all component styles — no global class conflicts
- **CSS Variables** defined in `index.css` — no hardcoded colors anywhere
- **Lucide React** for all icons — no emojis used as UI elements
- **API layer** centralized in `src/api/api.js` — components never call fetch directly
- **State-based routing** in `App.jsx` — no external router dependency

---

## Assumptions

- Login is simulated — maps email to `u1` or `u2` since no real auth endpoint exists
- `averageDuration` from API is in seconds, displayed as `Xm Ysec` per Figma design
- `lastSession` array from API uses index `[0]` as the most recent session date
- Usage bar reflects `kb_files` from the dashboard API (`used`, `limit`, `percentage`)
- Feedback star rating goes from 1–5 with dynamic question:
  - 1–2 stars → "What frustrated you or felt confusing?"
  - 3 stars → "What could be improved?"
  - 4–5 stars → "What did you like the most?"
- Coming soon pages shown for sections not covered by the mock API

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```