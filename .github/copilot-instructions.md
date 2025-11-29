# NUDGE Habit Tracker - AI Agent Instructions

## Project Architecture

**NUDGE** is a React + Vite single-page application for habit tracking with a premium dark-mode design. The app is entirely client-side with LocalStorage persistence, plus an optional Express API server for AI coaching features.

### Tech Stack
- **Frontend**: React 19 (with React.StrictMode), Vite 7, Recharts for future data visualization
- **Styling**: Vanilla CSS with extensive CSS custom properties (no CSS-in-JS, no Tailwind)
- **State**: React hooks (`useState`, `useEffect`) - no external state management
- **Data**: LocalStorage with key `sparkHabit_v1` (JSON serialization)
- **Backend** (optional): Express server at `src/server.js` for OpenAI integration

### Key Files
- `src/App.jsx` - Main component with all habit logic (400+ lines)
- `src/App.css` - Complete styling system with CSS variables (1000+ lines)
- `src/components/` - Four presentational components (Hero, Greeting, WelcomeModal, QuotesCarousel)
- `src/server.js` - Standalone Express API server (not integrated with Vite dev server)

## Core Patterns & Conventions

### 1. Data Model & State Management
Habits are stored as an array of objects with this structure:
```javascript
{
  id: number,           // Generated via Date.now()
  name: string,         // User-provided habit name
  frequency: string,    // "Daily", "Weekdays", or "Weekends"
  streak: number,       // Consecutive days completed
  lastCompleted: string // ISO date string or null
}
```

**State persistence pattern**: Every habit change triggers `useEffect` → `saveHabits()` → `localStorage.setItem()`. Load on mount via `useState(() => loadHabits())`.

**User name storage**: Separate LocalStorage key `nudgeUserName` for personalization (see `WelcomeModal.jsx`).

### 2. Automatic Icon Assignment
The `getHabitIcon()` function in `App.jsx` maps habit names to emojis using keyword matching:
- Sports/fitness: "swim" → 🏊, "gym"/"workout" → 💪, "run" → 🏃
- Health: "water"/"hydrat" → 💧, "sleep" → 😴, "meditat" → 🧘
- Productivity: "read" → 📚, "write"/"journal" → ✍️, "code" → 💻
- Default: ⭐

**When adding new categories**: Update the comprehensive if-statement chain in `getHabitIcon()` (lines 30-90 in App.jsx).

### 3. Streak Logic & Date Handling
Streaks increment only if completed yesterday (`isYesterday()` helper checks previous day):
```javascript
// In handleCompleteToday():
if (h.lastCompleted && isYesterday(h.lastCompleted)) {
  newStreak = h.streak + 1;
} else {
  newStreak = 1; // Reset if gap exists
}
```

Date comparisons use `isSameDay()` (compares year/month/date only, ignoring time). All dates stored as ISO strings via `new Date().toISOString()`.

### 4. Component Structure
**Monolithic main component**: `App.jsx` contains all business logic (habit CRUD, streak calculations, completion percentage). Child components are purely presentational:
- `Hero.jsx` - Animated SVG wave with branding
- `Greeting.jsx` - Time-based greeting + user name
- `WelcomeModal.jsx` - First-visit modal to capture name
- `QuotesCarousel.jsx` - Auto-rotating athlete quotes (10s interval)

**No prop drilling complexity**: Components either read from LocalStorage directly (Greeting, WelcomeModal) or receive no data (Hero, QuotesCarousel with static quotes).

### 5. CSS Architecture
All styles in `src/App.css` using BEM-inspired naming with `-premium` or `-refined` suffixes:
- CSS custom properties in `:root` for colors, gradients, shadows, spacing
- Dark palette: `--bg-primary: #0A0A0A`, warm accents `--accent-primary: #E97D49`
- Glassmorphism effects: `backdrop-filter: blur(12px)`, semi-transparent backgrounds
- Premium touches: Noise texture (`body::before`), vignette (`body::after`), shadow layering

**Widget grid**: 5-widget CSS Grid layout (`.widgets-grid`) with responsive breakpoints. Habits widget spans 2 rows (`grid-row: span 2`).

## Development Workflows

### Running the App
```bash
npm run dev          # Vite dev server on http://localhost:5173
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

### Optional AI Coach Server
```bash
npm run server       # Starts Express on http://localhost:5001
```
Requires `.env` file with `OPENAI_API_KEY`. The server is **standalone** - not auto-started by Vite. Vite proxy configured in `vite.config.js` (`/api` → `http://localhost:5001`).

### Linting
```bash
npm run lint         # ESLint with React hooks rules
```
Config in `eslint.config.js` - flat config format (ESLint 9+). Custom rule: ignore unused vars starting with capital letters/underscores.

## Common Modifications

### Adding New Features
1. **New habit property**: Update `defaultHabits`, `loadHabits()`, and render logic in habit list map
2. **New widget**: Add to `.widgets-grid` in `App.jsx`, create CSS class in `App.css` (copy existing widget styles)
3. **New icon category**: Extend `getHabitIcon()` if-statement chain with keyword matching
4. **Styling changes**: Always modify CSS variables in `:root` first before adding new classes

### LocalStorage Keys
- `sparkHabit_v1` - Habits array (versioned for future migrations)
- `nudgeUserName` - User's display name

**Migration pattern**: If changing data structure, increment version (`sparkHabit_v2`) and add migration logic in `loadHabits()`.

## Design Philosophy

**Premium minimalism**: Heavy use of shadows, gradients, and subtle animations. Avoid bright colors except for accent CTAs. All interactions should feel smooth (0.35s cubic-bezier transitions).

**Mobile-first responsive**: Widgets stack vertically on mobile (<768px). Desktop shows 2-column grid with habits list taking 2 rows.

**No external UI libraries**: All components hand-crafted. Recharts added to package.json but not yet used (planned for future analytics).

## Known Quirks

1. **Server isolation**: `src/server.js` is in the src/ directory but runs independently. It's not imported by the React app.
2. **Backup files**: `App.css.backup` and `App.jsx.backup` exist in src/ - these are old versions, not active.
3. **Frequency field unused**: Habits have a "frequency" property but it doesn't affect streak logic or completion checks yet.
4. **Quote rotation**: `QuotesCarousel` auto-advances every 10s. The `App.jsx` also has a `getDailyQuote()` function (unused) that picks one quote per day of year.

## Testing & Debugging

No formal test suite yet. Manual testing checklist:
- Add habit with various keywords (check icon assignment)
- Mark habit done (check streak increment)
- Complete same habit twice (should stay "Done", not re-increment)
- Refresh page (check LocalStorage persistence)
- Close welcome modal (check name appears in greeting)

**DevTools shortcuts**: Use React DevTools to inspect state. LocalStorage viewable in Application tab (key: `sparkHabit_v1`).
