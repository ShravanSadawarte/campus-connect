# CampusConnect — Interactive Prototype

Student-facing campus engagement platform: discover events, register, join clubs, manage profile and notifications.

> Note: The Figma link provided requires login and no Figma MCP tools were connected in this environment, so the file could not be inspected directly. The UI below was built to match the written spec (layout, sidebar 264px, header 72px, cards, flows) with high visual polish. If you share screenshots or export tokens, styling can be tuned pixel-for-pixel.

## Stack
- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3, lucide-react icons
- Local state + React Context, localStorage persistence
- Mock data in `lib/data.ts` (separate from UI for easy backend swap)

## Screens
- `/` Dashboard — welcome, 3 stat cards, featured events, upcoming list, popular clubs
- `/discover` — search + category filter, event cards, empty state
- `/events/[id]` — banner, info, agenda, organizer, register/cancel + confirmation modal, share, related
- `/clubs` — search + filter, join/leave with instant UI update
- `/my-events` — registered tickets
- `/profile` — student summary, registered events, joined clubs
- Global: sidebar (desktop) + drawer (mobile), header search, notification panel with mark-read, profile dropdown, mobile bottom nav

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Data persistence
- `cc-registrations`, `cc-clubs`, `cc-notifications` in localStorage
- Duplicate registration prevented (toggle = register/cancel)

## Structure
```
app/ layout.tsx, page.tsx, globals.css
app/discover, app/events/[id], app/clubs, app/my-events, app/profile
components/ Sidebar, Header, AppShell, EventCard, ClubCard
lib/ types.ts, data.ts, store.tsx
```

## Limitations
- No real auth/backend — single demo student (Alex Morgan)
- Images via Unsplash remote URLs (needs internet)
- Figma pixel-fidelity pending direct file access
