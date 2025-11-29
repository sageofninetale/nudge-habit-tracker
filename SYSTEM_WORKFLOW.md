# NUDGE – System Workflow Documentation

> **Technical workflows, architecture diagrams, and implementation details**

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Component Tree](#2-component-tree)
3. [Data Flow Diagrams](#3-data-flow-diagrams)
4. [Core Workflows](#4-core-workflows)
5. [Mobile Layout Flow](#5-mobile-layout-flow)
6. [OpenRouter API Flow](#6-openrouter-api-flow)
7. [File-by-File Overview](#7-file-by-file-overview)

---

## 1. Architecture Overview

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         NUDGE App                            │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Frontend (Vite)                  │    │
│  │                                                      │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │    │
│  │  │  Components  │  │     State    │  │   CSS    │ │    │
│  │  │   (JSX)      │  │  (useState)  │  │ Styling  │ │    │
│  │  └──────────────┘  └──────────────┘  └──────────┘ │    │
│  │                                                      │    │
│  │  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │  Utilities   │  │  Constants   │                │    │
│  │  │  (lib/)      │  │  (arrays)    │                │    │
│  │  └──────────────┘  └──────────────┘                │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Data Persistence Layer                    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │         localStorage (Browser)                │  │    │
│  │  │  • sparkHabit_v1 (habits array)              │  │    │
│  │  │  • nudgeUserName (string)                    │  │    │
│  │  │  • nudge_openrouter_key (string)             │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           External Services                         │    │
│  │                                                      │    │
│  │  ┌──────────────────┐  ┌──────────────────────┐   │    │
│  │  │  OpenRouter API  │  │  Simple Analytics    │   │    │
│  │  │  (AI Responses)  │  │  (Page Views)        │   │    │
│  │  └──────────────────┘  └──────────────────────┘   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Component Tree

### React Component Hierarchy

```
App.jsx (Root)
│
├── WelcomeModal
│   └── (First-time user name capture)
│
├── CelebrationModal
│   └── (100% completion celebration)
│
├── Hero
│   ├── NUDGE Wordmark
│   ├── Animated SVG Wave
│   ├── Greeting (time-based)
│   └── Subtitle
│
└── Widgets Grid
    │
    ├── Widget 1: Today Card
    │   ├── Date Display
    │   ├── Progress Ring (SVG)
    │   └── Stats Row (Done/Total/Best)
    │
    ├── Widget 2: Your Habits List
    │   └── Habit Items (map)
    │       ├── Emoji (auto-assigned)
    │       ├── Habit Name
    │       ├── Streak Counter
    │       ├── Mark Done Button
    │       └── Delete Button
    │
    ├── Widget 3: Coach Nudge
    │   ├── CoachCard
    │   │   ├── Settings Button
    │   │   ├── Messages Area
    │   │   ├── Quick Action Buttons
    │   │   └── Input Area
    │   └── Settings Modal
    │       └── API Key Configuration
    │
    ├── Widget 4: Add a Habit
    │   ├── Text Input
    │   ├── Frequency Selector
    │   └── Add Button
    │
    ├── Widget 5: Tiny Wins
    │   └── Win Items (dynamic)
    │
    └── Widget 6: Daily Motivation
        └── QuotesCarousel
            ├── Left Arrow
            ├── Quote Content
            ├── Dot Indicators
            └── Right Arrow
```

---

## 3. Data Flow Diagrams

### 3.1 Habit Creation Flow

```
User Types Habit Name
         │
         ▼
User Selects Frequency
         │
         ▼
User Clicks "Add Habit"
         │
         ▼
┌────────────────────┐
│ handleAddHabit()   │
└────────────────────┘
         │
         ▼
┌────────────────────┐
│ Validate Input     │
│ • Not empty?       │
│ • Not unhealthy?   │
└────────────────────┘
         │
    ┌────┴────┐
    │         │
  FAIL      PASS
    │         │
    ▼         ▼
 Alert   ┌────────────────────┐
         │ Create Habit Object│
         │ • id: Date.now()   │
         │ • name: trimmed    │
         │ • frequency        │
         │ • streak: 0        │
         │ • lastCompleted: null│
         └────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │ getEmojiForHabit() │
         │ (assigns emoji)    │
         └────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │ setHabits([new,    │
         │          ...prev]) │
         └────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │ useEffect triggers │
         │ saveHabits()       │
         └────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │ localStorage.      │
         │ setItem()          │
         └────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │ UI Re-renders      │
         │ • Habit appears    │
         │ • Input cleared    │
         └────────────────────┘
```

---

### 3.2 Marking Habit Done Flow

```
User Clicks "Mark Done" Button
         │
         ▼
┌────────────────────────┐
│ handleCompleteToday()  │
│ (habitId)              │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Get current timestamp  │
│ todayStr = ISO string  │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Map through habits     │
│ Find matching habitId  │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Check if already done  │
│ isSameDay(lastCompleted│
│          , today)?     │
└────────────────────────┘
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    ▼         ▼
 Return   ┌────────────────────┐
 Unchanged│ Check if yesterday │
          │ was completed      │
          └────────────────────┘
                   │
              ┌────┴────┐
              │         │
             YES       NO
              │         │
              ▼         ▼
       newStreak =  newStreak = 1
       streak + 1
              │         │
              └────┬────┘
                   ▼
          ┌────────────────────┐
          │ Return updated     │
          │ habit:             │
          │ • streak: newStreak│
          │ • lastCompleted:   │
          │   todayStr         │
          └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ setHabits()        │
          │ triggers re-render │
          └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ useEffect saves to │
          │ localStorage       │
          └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ UI Updates:        │
          │ • Button → "✓ Done"│
          │ • Streak increments│
          │ • Progress ring    │
          │   updates          │
          └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ Check if 100%      │
          │ completion         │
          └────────────────────┘
                   │
              ┌────┴────┐
              │         │
             YES       NO
              │         │
              ▼         ▼
       Show Celebration  End
       Modal (500ms delay)
```

---

### 3.3 Emoji Assignment Flow

```
Habit Name Entered
         │
         ▼
┌────────────────────────┐
│ getEmojiForHabit()     │
│ (habitName)            │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Validate input         │
│ • Not null?            │
│ • Is string?           │
└────────────────────────┘
         │
    ┌────┴────┐
    │         │
  FAIL      PASS
    │         │
    ▼         ▼
 Return   ┌────────────────────┐
   ❓     │ Convert to         │
          │ lowercase & trim   │
          └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ Loop through       │
          │ emojiMappings[]    │
          └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ For each mapping:  │
          │ Check if any       │
          │ keyword matches    │
          └────────────────────┘
                   │
              ┌────┴────┐
              │         │
            MATCH     NO MATCH
              │         │
              ▼         ▼
       Return emoji  Continue
       (e.g., 🏃‍♂️)   to next
              │      mapping
              │         │
              └────┬────┘
                   │
                   ▼
          ┌────────────────────┐
          │ If no matches      │
          │ found after loop   │
          └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │ Return default ❓  │
          └────────────────────┘
```

**Example**:
- Input: `"Morning run"`
- Lowercase: `"morning run"`
- Check mappings:
  - `['run', 'running', 'jog', 'jogging']` → **MATCH on 'run'**
  - Return: `🏃‍♂️`

---

### 3.4 Completion Ring Logic

```
Habits Array Changes
         │
         ▼
┌────────────────────────┐
│ Calculate              │
│ completedToday         │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Filter habits where    │
│ isSameDay(             │
│   lastCompleted,       │
│   new Date()           │
│ )                      │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ completedToday =       │
│ filtered.length        │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Calculate              │
│ completionRate         │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ If habits.length > 0:  │
│   rate = Math.round(   │
│     (completed /       │
│      total) * 100      │
│   )                    │
│ Else:                  │
│   rate = 0             │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ SVG Circle Rendering   │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Calculate strokeDash:  │
│ circumference =        │
│   2 * π * radius       │
│ offset = circumference │
│   * (1 - rate/100)     │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Apply to SVG:          │
│ strokeDasharray=       │
│   circumference        │
│ strokeDashoffset=      │
│   offset               │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Display percentage     │
│ text in center         │
└────────────────────────┘
```

**Math Example**:
- Radius: 60px
- Circumference: 2π × 60 = 376.99
- Completion: 60%
- Offset: 376.99 × (1 - 0.6) = 150.8
- Result: 60% of circle filled

---

## 4. Core Workflows

### 4.1 App Initialization (First Load)

```
1. Browser loads index.html
   ↓
2. Vite injects React app
   ↓
3. main.jsx renders <App />
   ↓
4. App.jsx useState initializers run:
   ├─ loadHabits() from localStorage
   ├─ Check for 'nudgeUserName'
   └─ Set showWelcome if no name
   ↓
5. If no name found:
   ├─ WelcomeModal renders
   ├─ User enters name
   ├─ Save to localStorage
   └─ Modal closes
   ↓
6. Hero renders with greeting
   ↓
7. Widgets render with habit data
   ↓
8. App ready for interaction
```

---

### 4.2 Streak Calculation Logic

```javascript
// Pseudocode for streak calculation

function updateStreak(habit, todayStr) {
  // If already done today, no change
  if (isSameDay(habit.lastCompleted, todayStr)) {
    return habit;
  }
  
  let newStreak;
  
  // Check if yesterday was completed
  if (habit.lastCompleted && isYesterday(habit.lastCompleted)) {
    // Continue streak
    newStreak = habit.streak + 1;
  } else {
    // Streak broken, restart at 1
    newStreak = 1;
  }
  
  return {
    ...habit,
    streak: newStreak,
    lastCompleted: todayStr
  };
}
```

**Streak Rules**:
- First completion: Streak = 1
- Consecutive days: Streak += 1
- Missed day: Streak resets to 1
- Same day re-click: No change

---

### 4.3 Celebration Modal Trigger

```
useEffect Hook Monitors:
  - completedToday
  - habits.length

Condition Check:
  IF habits.length > 0
  AND completedToday === habits.length
  AND !hasShownCelebrationRef.current
  THEN:
    ├─ Wait 500ms (setTimeout)
    ├─ setShowCelebration(true)
    └─ hasShownCelebrationRef.current = true

Modal Behavior:
  ├─ Renders overlay
  ├─ Shows celebration message
  ├─ Presents two response buttons
  └─ Logs user response to console

Reset:
  - hasShownCelebrationRef resets on page reload
  - Modal won't show again until next 100%
```

---

### 4.4 AI Call (Stats → Response)

```
User Action: Clicks "How am I doing?"
         │
         ▼
┌────────────────────────┐
│ handleQuickAction      │
│ ('status')             │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Check hasApiKey()      │
└────────────────────────┘
         │
    ┌────┴────┐
    │         │
   NO        YES
    │         │
    ▼         ▼
 Show Error  Continue
 + Settings
    │
    ▼
┌────────────────────────┐
│ Add user message to    │
│ chat: "How am I doing?"│
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Prepare API call       │
│ parameters:            │
│ • messages: history    │
│ • stats: {             │
│     completedToday,    │
│     totalHabits,       │
│     bestStreak         │
│   }                    │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ callCoachAI()          │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ buildSystemPrompt()    │
│ • Inject stats         │
│ • Add personality      │
│ • Include templates    │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Fetch OpenRouter API   │
│ POST /chat/completions │
│ Headers:               │
│ • Authorization: Bearer│
│ • Content-Type: JSON   │
│ Body:                  │
│ • model: gpt-oss-20b   │
│ • messages: [system,   │
│              ...history]│
│ • temperature: 0.8     │
│ • max_tokens: 150      │
└────────────────────────┘
         │
    ┌────┴────┐
    │         │
  ERROR     SUCCESS
    │         │
    ▼         ▼
 Handle   Extract
 Error    response
    │         │
    ▼         ▼
 Show     Add to chat
 Error    as assistant
 Message  message
    │         │
    └────┬────┘
         │
         ▼
┌────────────────────────┐
│ UI updates with        │
│ AI response            │
└────────────────────────┘
```

---

### 4.5 Settings Modal → API Key Save

```
User Clicks ⚙️ Icon
         │
         ▼
┌────────────────────────┐
│ setShowSettings(true)  │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Settings Modal Renders │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ useEffect loads        │
│ existing key from      │
│ localStorage           │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ User pastes API key    │
│ into input field       │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ User clicks            │
│ "Save API Key"         │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ handleSave()           │
│ • saveApiKey(key)      │
│ • setSaved(true)       │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ localStorage.setItem(  │
│   'nudge_openrouter_   │
│    key',               │
│   key.trim()           │
│ )                      │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Button shows           │
│ "✓ Saved!"             │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Wait 1 second          │
│ (setTimeout)           │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Modal closes           │
│ onClose()              │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Coach Nudge features   │
│ now functional         │
└────────────────────────┘
```

---

### 4.6 Loading Habits on Startup

```
App Component Mounts
         │
         ▼
┌────────────────────────┐
│ useState(() =>         │
│   loadHabits()         │
│ )                      │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ loadHabits() function  │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ Try:                   │
│   localStorage.getItem │
│   ('sparkHabit_v1')    │
└────────────────────────┘
         │
    ┌────┴────┐
    │         │
  NULL    FOUND
    │         │
    ▼         ▼
 Return   ┌────────────────────┐
 default  │ JSON.parse(saved)  │
 habits   └────────────────────┘
    │              │
    │         ┌────┴────┐
    │         │         │
    │       SUCCESS   ERROR
    │         │         │
    │         ▼         ▼
    │    Return     Return
    │    parsed     default
    │    habits     habits
    │         │         │
    └────┬────┴────┬────┘
         │         │
         ▼         ▼
┌────────────────────────┐
│ State initialized      │
│ with habits array      │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ UI renders with        │
│ loaded habits          │
└────────────────────────┘
```

---

## 5. Mobile Layout Flow

### Responsive Breakpoint: 768px

**Desktop Layout (> 768px)**:
```
┌─────────────────────────────────────┐
│              Hero                    │
├──────────────┬──────────────────────┤
│   Today      │                      │
│   Card       │    Your Habits       │
│              │    (tall, 2 rows)    │
├──────────────┤                      │
│   Coach      │                      │
│   Nudge      │                      │
│   (tall)     ├──────────────────────┤
│              │    Add Habit         │
├──────────────┼──────────────────────┤
│  Tiny Wins   │  Daily Motivation    │
└──────────────┴──────────────────────┘
```

**Mobile Layout (≤ 768px)**:
```
┌─────────────────────────┐
│         Hero            │
├─────────────────────────┤
│      Today Card         │
├─────────────────────────┤
│      Add Habit          │
├─────────────────────────┤
│      Tiny Wins          │
├─────────────────────────┤
│   Daily Motivation      │
├─────────────────────────┤
│     Your Habits         │
├─────────────────────────┤
│     Coach Nudge         │
├─────────────────────────┤
│        Footer           │
└─────────────────────────┘
```

### CSS Media Query Strategy

```css
/* Desktop Grid */
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Mobile Stack */
@media (max-width: 768px) {
  .widgets-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  /* Reorder widgets */
  .widget-today { order: 1; }
  .widget-add { order: 2; }
  .widget-wins { order: 3; }
  .widget-quote-refined { order: 4; }
  .widget-habits { order: 5; }
  .widget-coach-ai { order: 6; }
}
```

---

## 6. OpenRouter API Flow

### 6.1 API Request Structure

```javascript
// Request
POST https://openrouter.ai/api/v1/chat/completions

Headers:
{
  "Authorization": "Bearer sk-or-v1-...",
  "Content-Type": "application/json",
  "HTTP-Referer": "https://nudge.local",
  "X-Title": "NUDGE Habit Coach"
}

Body:
{
  "model": "openai/gpt-oss-20b:free",
  "messages": [
    {
      "role": "system",
      "content": "You are Coach Nudge...\n\nCurrent user stats:\n- Habits completed today: 3\n- Total habits tracked: 5\n- Best streak: 7 days\n\n..."
    },
    {
      "role": "user",
      "content": "How am I doing?"
    }
  ],
  "temperature": 0.8,
  "max_tokens": 150
}
```

### 6.2 API Response Structure

```javascript
// Response
{
  "id": "gen-...",
  "model": "openai/gpt-oss-20b:free",
  "object": "chat.completion",
  "created": 1701234567,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "You've done 3/5 so far — that's real momentum. One more and you'll level up today 💪"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 245,
    "completion_tokens": 23,
    "total_tokens": 268
  }
}
```

### 6.3 System Prompt Injection

```
buildSystemPrompt(stats) {
  return `
    You are Coach Nudge, a friendly, witty habit coach...
    
    Current user stats:
    - Habits completed today: ${stats.completedToday}
    - Total habits tracked: ${stats.totalHabits}
    - Best streak across habits: ${stats.bestStreak} days
    
    [Personality guidelines...]
    [Response templates...]
  `;
}
```

**Dynamic Stats Injection**:
- Stats passed from `App.jsx` to `CoachCard`
- `CoachCard` passes to `callCoachAI()`
- `callCoachAI()` builds system prompt with stats
- AI receives fresh stats with every request

---

## 7. File-by-File Overview

### 7.1 [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx) (517 lines)

**Purpose**: Main application component, orchestrates all features.

**Key Responsibilities**:
- State management for habits array
- localStorage persistence
- Habit CRUD operations (Create, Read, Update, Delete)
- Completion percentage calculation
- Streak tracking logic
- Modal visibility control
- Widget rendering and layout

**Key Functions**:
- `loadHabits()`: Load from localStorage
- `saveHabits()`: Save to localStorage
- `handleAddHabit()`: Create new habit
- `handleCompleteToday()`: Mark habit done
- `handleDeleteHabit()`: Remove habit
- `isSameDay()`: Date comparison
- `isYesterday()`: Streak validation
- `getTinyWins()`: Generate win messages

**State Variables**:
- `habits`: Array of habit objects
- `name`: New habit name input
- `frequency`: New habit frequency
- `showWelcome`: Welcome modal visibility
- `showCelebration`: Celebration modal visibility

---

### 7.2 [`App.css`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.css) (53KB)

**Purpose**: All application styling in one file.

**Key Sections**:
- Global resets and variables
- Hero section animations
- Widget grid layout
- Card styling (glassmorphism)
- Progress ring SVG styling
- Habit item styling
- Button styles (primary, secondary, delete)
- Modal overlays and content
- Coach Nudge chat interface
- Quotes carousel animations
- Mobile responsive breakpoints

**Design Patterns**:
- CSS custom properties for colors
- Flexbox for alignment
- Grid for layout
- Transitions for smooth interactions
- Media queries for responsiveness

---

### 7.3 [`CoachCard.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/CoachCard.jsx) (285 lines)

**Purpose**: AI chat interface for Coach Nudge.

**Key Features**:
- Message history display
- Quick action buttons (3 types)
- Free-form text input
- Settings modal trigger
- Loading states
- Error handling

**Key Functions**:
- `sendMessage()`: Free-form AI chat
- `handleQuickAction()`: Quick button handler
  - `'status'`: AI-powered stats check
  - `'challenge'`: Local micro-task
  - `'done'`: Local celebration
- `handleSubmit()`: Form submission

**State Variables**:
- `messages`: Chat history array
- `input`: Current input text
- `isLoading`: API call in progress
- `error`: Error message string
- `showSettings`: Settings modal visibility

**Constants**:
- `microChallenges`: 10 mini tasks
- `celebrationReplies`: 6 celebration messages

---

### 7.4 [`Settings.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/Settings.jsx) (100 lines)

**Purpose**: API key configuration modal.

**Key Features**:
- API key input (password-masked)
- Show/hide toggle
- Save to localStorage
- Success feedback
- Link to OpenRouter

**Key Functions**:
- `handleSave()`: Save key and close modal
- `handleOverlayClick()`: Close on outside click

**State Variables**:
- `apiKey`: Input value
- `showKey`: Visibility toggle
- `saved`: Success state

---

### 7.5 [`CelebrationModal.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/CelebrationModal.jsx) (82 lines)

**Purpose**: 100% completion celebration.

**Key Features**:
- Overlay with backdrop
- Celebration message
- Two response buttons
- Keyboard support (Escape to close)
- Body scroll lock when open

**Key Functions**:
- `handleAmazingClick()`: Positive response
- `handleNeedNudgeClick()`: Needs encouragement
- Escape key listener
- Body overflow control

---

### 7.6 [`QuotesCarousel.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/QuotesCarousel.jsx) (83 lines)

**Purpose**: Rotating athlete quotes display.

**Key Features**:
- 8 athlete quotes
- Auto-advance (7-10s random interval)
- Manual navigation (arrows)
- Dot indicators
- Fade animations

**Key Functions**:
- `nextQuote()`: Advance to next
- `prevQuote()`: Go to previous
- Auto-advance `useEffect`

**State Variables**:
- `currentIndex`: Active quote index
- `isAnimating`: Transition in progress

**Constants**:
- `athleteQuotes`: Array of 8 quotes

---

### 7.7 [`Hero.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/Hero.jsx) (143 lines)

**Purpose**: Animated hero section with greeting.

**Key Features**:
- NUDGE wordmark
- Animated SVG wave
  - Horizontal drift (8s cycle)
  - Mouse interaction
- Time-based greeting
- Personalized with user name

**Key Functions**:
- `getGreeting()`: Time-based message
- Wave animation loop (requestAnimationFrame)
- Mouse move handler
- Mouse leave handler

**State Variables**:
- `baseWaveOffset`: Automatic drift
- `mouseInfluence`: Mouse-based offset

**Animation Details**:
- 60fps smooth animation
- ±18px horizontal sway
- ±3px mouse influence
- Easing: 0.06 smoothing factor

---

### 7.8 [`WelcomeModal.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/WelcomeModal.jsx) (48 lines)

**Purpose**: First-time user name capture.

**Key Features**:
- Name input field
- Enter key support
- Save to localStorage
- Auto-focus on input

**Key Functions**:
- `handleSave()`: Save name and close
- `handleKeyPress()`: Enter key handler

**State Variables**:
- `userName`: Input value

---

### 7.9 [`habitEmoji.js`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/lib/habitEmoji.js) (107 lines)

**Purpose**: Smart emoji assignment engine.

**Key Features**:
- 30+ keyword mappings
- Case-insensitive matching
- First-match-wins algorithm
- Fallback to ❓

**Data Structure**:
```javascript
const emojiMappings = [
  {
    keywords: ['run', 'running', 'jog', 'jogging'],
    emoji: '🏃‍♂️'
  },
  // ... 30+ more
];
```

**Key Function**:
- `getEmojiForHabit(habitName)`: Returns emoji string

---

### 7.10 [`openRouterClient.js`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/lib/openRouterClient.js) (180 lines)

**Purpose**: OpenRouter API integration.

**Key Features**:
- API key management
- System prompt builder
- Fetch wrapper with error handling
- Response parsing

**Constants**:
- `OPENROUTER_API_URL`: API endpoint
- `MODEL`: `openai/gpt-oss-20b:free`
- `STORAGE_KEY`: `nudge_openrouter_key`

**Key Functions**:
- `callCoachAI({ messages, stats })`: Main API call
- `buildSystemPrompt(stats)`: Dynamic prompt
- `hasApiKey()`: Check if configured
- `saveApiKey(key)`: Store in localStorage
- `getApiKey()`: Retrieve from localStorage
- `clearApiKey()`: Remove from localStorage

**Error Types**:
- `API_KEY_MISSING`: No key in storage
- `INVALID_API_KEY`: 401 response
- Network errors: Generic failure message

---

### 7.11 [`index.html`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/index.html) (23 lines)

**Purpose**: HTML entry point.

**Key Features**:
- Meta tags for SEO
- Google Fonts (Inter)
- Simple Analytics script
- React root div

**Important Elements**:
- `<meta name="description">`: SEO description
- `<title>`: Page title
- Font preconnect for performance
- Async analytics script

---

### 7.12 [`vite.config.js`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/vite.config.js) (11 lines)

**Purpose**: Vite build configuration.

**Key Settings**:
- React plugin enabled
- Proxy: `/api` → `http://localhost:5001`
  - (Note: Currently unused, prepared for future backend)

---

### 7.13 [`package.json`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/package.json) (33 lines)

**Purpose**: Project dependencies and scripts.

**Scripts**:
- `dev`: Start Vite dev server
- `build`: Production build
- `lint`: ESLint check
- `preview`: Preview production build
- `server`: Run Express server (currently unused)

**Key Dependencies**:
- `react`: 19.2.0
- `react-dom`: 19.2.0
- `recharts`: 3.5.0 (for future analytics)
- `express`: 5.1.0 (for future backend)

---

## 8. Performance Considerations

### Optimization Strategies

1. **localStorage Caching**:
   - Habits loaded once on mount
   - Saved only when changed (useEffect dependency)

2. **Lazy Rendering**:
   - Modals render only when `isOpen === true`
   - Conditional rendering for empty states

3. **Animation Performance**:
   - `requestAnimationFrame` for smooth 60fps
   - CSS transitions instead of JavaScript
   - `will-change` hints for GPU acceleration

4. **API Efficiency**:
   - Local responses for micro-tasks and celebrations
   - AI calls only when necessary
   - Max tokens limited to 150

5. **Bundle Size**:
   - Vite tree-shaking for unused code
   - No heavy dependencies
   - Single CSS file (no CSS-in-JS overhead)

---

## 9. Security Considerations

### Current Security Measures

1. **API Key Storage**:
   - Stored in localStorage (client-side only)
   - Never sent to any server except OpenRouter
   - Password-masked in UI

2. **Input Validation**:
   - Habit name trimming
   - Unhealthy habit blocking
   - Empty input prevention

3. **XSS Prevention**:
   - React auto-escapes all text content
   - No `dangerouslySetInnerHTML` usage

### Future Security Enhancements

1. **Backend Authentication**:
   - Move API key to server-side
   - User authentication with JWT
   - Rate limiting on API calls

2. **Input Sanitization**:
   - More robust validation
   - Character limits
   - Profanity filtering

---

**Last Updated**: November 29, 2025
