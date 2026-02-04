# Habit Tracker - Build Daily Habits

> Install it like an app, use it offline, build better habits

[Live Demo](https://habit-tracker-orcin-seven.vercel.app) | [GitHub](https://github.com/Danielle73/habit-tracker)

## What It Does
A Progressive Web App (PWA) for tracking daily habits. Create habits, 
categorise them, and check them off each day, even without internet.

## Key Features
- ✅ Create and categorise daily habits
- 📱 Install on mobile/desktop (PWA)
- 🔌 Full offline functionality
- 💾 Local data persistence
- ⚡ Fast loading with service worker caching

## Tech Stack
- **React** - Component-based UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Responsive styling
- **Service Workers** - Offline functionality
- **localStorage** - Client-side persistence
- **Vite** - Build tooling

## PWA Architecture

Browser

├── React UI Layer

├── Service Worker (enables offline)

│   ├── Caches app shell

│   ├── Caches static assets

│   └── Background sync

└── localStorage (habit data)

## Why PWA?
Progressive Web Apps combine the best of web and native apps:
- **No app store** - Users can install directly from browser
- **Always up-to-date** - No manual updates needed
- **Offline-first** - Works without internet
- **Cross-platform** - One codebase for all devices
- **Lightweight** - Much smaller than native apps

## Technical Implementation
- Configured service worker for offline caching
- Implemented manifest.json for installability
- Local-first data architecture with localStorage
- Responsive design optimized for mobile usage
- Event-driven state updates for habit completion

## What I Learned
- How to implement service workers for offline functionality
- PWA manifest configuration and installability requirements
- Strategies for local-first data persistence
- Mobile-first responsive design patterns
- State management for daily tracking applications

## Installation (Development)
```bash
npm install
npm run dev
```

## Installation (As User)
1. Visit [[Here](https://habit-tracker-orcin-seven.vercel.app/)]
2. Click browser's "Install" button
3. App installs to home screen
4. Use like native app, even offline

---

Deployed on Vercel • Works Offline • Installable