# NUDGE – Project Documentation

> **A gentle nudge toward better days**

---

## 1. Product Overview

### What is NUDGE?

**NUDGE** is a premium, dark-mode habit tracking web application designed to help users build and maintain consistent daily habits through gentle encouragement, visual progress tracking, and an AI-powered coaching assistant.

Unlike traditional habit trackers that focus on rigid accountability, NUDGE emphasizes:
- **Gentle nudges** instead of harsh reminders
- **Tiny wins** that celebrate small victories
- **Coach Nudge** – a witty, encouraging AI companion

### Who is it for?

NUDGE is built for:
- **5-10 close friends** who want a simple, beautiful habit tracker
- **Portfolio reviewers and recruiters** evaluating Aryan Subhash's product + engineering skills
- **Personal use** as a daily habit companion

### NUDGE's Value Proposition

1. **Gentle Nudges**: Encouraging, never punishing. The app celebrates progress, not perfection.
2. **Tiny Wins**: Every small step counts. The app highlights micro-achievements to build momentum.
3. **Coach Nudge**: A witty AI coach that provides personalized encouragement based on your actual progress.

### Why This App Exists

- **Portfolio piece**: Demonstrates full-stack product thinking, React development, AI integration, and premium UI/UX design
- **Personal use**: A real tool for building better habits
- **Fun AI experience**: Experimenting with personality-driven AI interactions using OpenRouter

---

## 2. Feature List (Detailed)

### 🌅 Hero Section

**Purpose**: Create a warm, welcoming first impression with dynamic personalization.

**Components**:
- **NUDGE Wordmark**: Large, bold branding at the top
- **Animated Wave**: Horizontal drifting SVG wave with glowing dots that responds to mouse movement
  - Base animation: 8-second horizontal sway (±18px)
  - Mouse interaction: Subtle ±3px influence based on cursor position
  - Gradient colors: Warm orange tones (#FF9F66 to #FFB885)
- **Greeting**: Time-based personalized greeting
  - "Good morning" (12am - 12pm)
  - "Good afternoon" (12pm - 4pm)
  - "Good evening" (4pm - 7pm)
  - "Good night" (7pm - 12am)
  - Includes user's name if provided
- **Subheadline**: "Track your habit."
- **Subtitle**: "Here's your gentle nudge for today."

**Technical Details**:
- Component: [`Hero.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/Hero.jsx)
- Animation: RequestAnimationFrame for smooth 60fps wave motion
- Personalization: Reads `nudgeUserName` from localStorage

---

### 📊 Today Card

**Purpose**: Provide an at-a-glance view of daily progress.

**Components**:
- **Date Display**: Current date in format "Monday, 29 Nov"
- **Completion Ring**: Circular progress indicator
  - SVG-based with gradient fill (#E97D49 to #F8C163)
  - Displays completion percentage (0-100%)
  - Smooth animation when percentage changes
- **Stats Row**: Three key metrics
  - **Done**: Number of habits completed today
  - **Total**: Total number of habits tracked
  - **Best**: Highest streak across all habits

**Calculation Logic**:
```javascript
completionRate = (completedToday / totalHabits) * 100
completedToday = habits.filter(h => isSameDay(h.lastCompleted, today)).length
maxStreak = Math.max(...habits.map(h => h.streak))
```

**Technical Details**:
- Location: [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx#L333-L383) (Widget 1)
- Styling: `.widget-today` class with glassmorphism effects

---

### ➕ Add a Habit

**Purpose**: Simple, friction-free habit creation.

**Components**:
- **Text Input**: Habit name field
  - Placeholder: "Habit name (e.g., Morning run)"
  - Required field validation
- **Frequency Selector**: Dropdown with options
  - Daily
  - Weekdays
  - Weekends
- **Add Button**: "+ Add Habit" submit button

**Validation Rules**:
1. **Empty check**: Habit name cannot be blank
2. **Unhealthy habit guard**: Blocks harmful habits (see next section)

**Flow**:
1. User types habit name
2. Selects frequency (defaults to "Daily")
3. Clicks "Add Habit"
4. Validation runs
5. If valid: Habit added to list with auto-assigned emoji
6. If invalid: Alert shown, input retained for editing

**Technical Details**:
- Location: [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx#L450-L477) (Widget 4)
- Handler: `handleAddHabit()` function

---

### ⚠️ Unhealthy Habit Guard

**Purpose**: Prevent users from tracking harmful behaviors.

**Blocked Keywords**:
- Smoking: `smoke`, `smoking`, `cigarette`, `cig`, `ciggy`, `tobacco`
- Vaping: `vape`, `vaping`, `vapes`
- Drugs: `drug`, `drugs`, `cocaine`, `heroin`, `meth`
- Harmful behaviors: `junk food`, `binge`, `self harm`, `self-harm`

**Behavior**:
1. User types a habit containing blocked keywords
2. Alert appears: *"Coach Nudge says: that one's more of a villain than a habit 🫣. Let's pick something that actually nudges your health in the right direction."*
3. Habit is **not added** to the list
4. Input field **retains the text** so user can edit it
5. No emoji is assigned

**Technical Details**:
- Function: `isUnhealthyHabit()` in [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx#L34-L47)
- Case-insensitive keyword matching
- Called before habit creation in `handleAddHabit()`

---

### 🎯 Your Habits List

**Purpose**: Display all tracked habits with quick actions.

**Habit Tile Components**:
- **Auto-assigned Emoji**: Visual icon based on habit name (see Smart Emoji Engine)
- **Habit Name**: User-entered habit text
- **Streak Counter**: "🔥 X day streak" indicator
- **Mark Done Button**: 
  - Default state: "Mark done" (clickable)
  - Completed state: "✓ Done" (disabled, grayed out)
- **Delete Button**: "✕" icon to remove habit

**Visual States**:
- **Not completed today**: Normal styling, "Mark done" button active
- **Completed today**: 
  - Tile has `.completed` class
  - Slightly different background/border
  - "✓ Done" button disabled

**Interactions**:
1. **Mark Done**: Updates `lastCompleted` timestamp, increments streak if consecutive
2. **Delete**: Removes habit from list (with confirmation via browser default)

**Technical Details**:
- Location: [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx#L386-L436) (Widget 2)
- Emoji assignment: `getEmojiForHabit()` from [`habitEmoji.js`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/lib/habitEmoji.js)

---

### 🧠 Smart Emoji Engine

**Purpose**: Automatically assign contextually relevant emojis to habits based on keyword detection.

**How It Works**:
1. User enters habit name (e.g., "Morning run")
2. System converts to lowercase: `"morning run"`
3. Checks against 30+ keyword mappings
4. Returns first matching emoji
5. If no match: Returns `❓` (question mark)

**Emoji Categories** (30+ mappings):

| Category | Keywords | Emoji |
|----------|----------|-------|
| Running | run, running, jog, jogging | 🏃‍♂️ |
| Walking | walk, walking, step, steps | 🚶‍♂️ |
| Hiking | hike, hiking, trail, mountain, trek | 🥾 |
| Football | football, soccer | ⚽ |
| Basketball | basketball | 🏀 |
| Tennis | tennis | 🎾 |
| Swimming | swim, swimming | 🏊‍♂️ |
| Gym | gym, workout, training, exercise, lift, weight | 🏋️‍♂️ |
| Cycling | bike, cycle, cycling, biking | 🚴 |
| Climbing | climb, climbing, boulder | 🧗 |
| Dancing | dance, dancing | 💃 |
| Yoga | yoga, stretch, stretching | 🧘‍♀️ |
| Meditation | meditat, breathing, mindful, mindfulness | 🧘 |
| Reading | read, reading, book | 📚 |
| Study | study, exam, revision, learn, learning | 🧠 |
| Writing | write, writing, journal, journaling | ✍️ |
| Coding | code, coding, program, programming, debug | 💻 |
| Water | water, drink, hydrat, hydration | 💧 |
| Sleep | sleep, bed, rest, nap | 😴 |
| Shower | bath, bathe, bathing, shower | 🚿 |
| Cleaning | clean, chore, tidy, vacuum | 🧹 |
| Cooking | cook, cooking, meal prep, bake, baking | 🍳 |
| Music | music, instrument, practice music | 🎵 |
| Art | paint, draw, art, sketch | 🎨 |
| Photography | photo, photography | 📷 |
| Breakfast | breakfast | 🍳 |
| Fruit | fruit | 🍎 |
| Vegetables | vegetable, veggie, salad | 🥦 |
| Social | call, family, friend | 📞 |
| Gratitude | gratitude, prayer, grateful | 🙏 |
| Gardening | garden, gardening, plant | 🌱 |

**Technical Details**:
- File: [`habitEmoji.js`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/lib/habitEmoji.js)
- Function: `getEmojiForHabit(habitName)`
- Algorithm: Linear search through keyword mappings, first match wins
- Fallback: `❓` for unrecognized habits

---

### 🧩 Tiny Wins Card

**Purpose**: Celebrate small achievements to build momentum.

**Display Logic**:
The card shows up to 3 dynamic wins based on current progress:

1. **Today's Completions** (if > 0):
   - "You completed X habit(s) today 🎉"

2. **Best Streak** (if > 0):
   - "Your longest streak this week is X day(s) 🔥"

3. **Consistency Highlight** (if any habit has streak ≥ 2):
   - "You stayed consistent on \"[Habit Name]\" 💪"

**Empty State**:
- "Complete a habit to see your wins!"

**Auto-Update**:
- Recalculates whenever habits change
- No manual refresh needed

**Technical Details**:
- Location: [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx#L479-L494) (Widget 5)
- Function: `getTinyWins()` generates win messages

---

### 💬 Daily Motivation Quotes Carousel

**Purpose**: Provide inspiration through athlete quotes.

**Features**:
- **8 Athlete Quotes** from world-class performers:
  - Cristiano Ronaldo
  - Lionel Messi
  - Kylian Mbappé
  - Michael Phelps
  - Lewis Hamilton
  - Roger Federer
  - Rafael Nadal
  - Serena Williams

**Interactions**:
- **Auto-rotate**: Every 7-10 seconds (randomized interval)
- **Navigation arrows**: Left/right buttons to manually browse
- **Dot indicators**: Click any dot to jump to specific quote
- **Fade animation**: Smooth 500ms transition between quotes

**Quote Format**:
```
"[Quote text]"
— [Athlete name]
```

**Technical Details**:
- Component: [`QuotesCarousel.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/QuotesCarousel.jsx)
- State: `currentIndex` tracks active quote
- Animation: CSS `.fade-in` / `.fade-out` classes
- Auto-advance: `useEffect` with `setInterval`

---

### 🧠 Coach Nudge – AI Assistant

**Purpose**: Provide personalized, witty encouragement based on user's actual habit data.

#### Personality Traits:
- Warm, encouraging, playful
- Never mean or sarcastic
- Short responses (1-3 sentences)
- Minimal emoji use (💪 ✨ 🚀 😊)
- Natural coach voice, not robotic

---

#### Feature 1: "How am I doing?"

**Trigger**: User clicks "How am I doing?" button

**Behavior**:
1. Sends API call to OpenRouter with:
   - `completedToday`: Number of habits done today
   - `totalHabits`: Total habits tracked
   - `bestStreak`: Highest streak
2. AI analyzes stats and responds with personalized feedback

**Response Examples**:
- **0 completed**: "Everyone has quiet days — even one tiny habit today counts as a win."
- **Partial completion**: "You've done 2/5 so far — that's real momentum. One more and you'll level up today 💪"
- **100% completion**: "You smashed it — 5/5 done. That's how streaks are built 🚀"

**Technical Details**:
- Handler: `handleQuickAction('status')` in [`CoachCard.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/CoachCard.jsx#L109-L154)
- API call: `callCoachAI()` from [`openRouterClient.js`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/lib/openRouterClient.js)
- Requires: Valid OpenRouter API key

---

#### Feature 2: "Give me a mini task"

**Trigger**: User clicks "Give me a mini task" button

**Behavior**:
1. **No API call** – fully local
2. Randomly selects from 10 micro-challenges
3. Displays challenge instantly

**Micro-Challenges**:
- "Take 3 sips of water right now 💧"
- "Stand up and stretch for 20 seconds 🙆‍♀️"
- "Do 3 tiny jumps on the spot 🐸"
- "Take 5 deep breaths — in through your nose, out through your mouth 🧘"
- "Look away from the screen and relax your eyes for 15 seconds 👀"
- "Roll your shoulders back 5 times 🔄"
- "Shake out your hands for 10 seconds ✋"
- "Stand on one leg for 10 seconds (balance time!) 🦩"
- "Do 5 air squats right where you are 💪"
- "Smile at yourself in your phone camera (yes, really!) 😊"

**Technical Details**:
- Handler: `handleQuickAction('challenge')` in [`CoachCard.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/CoachCard.jsx#L155-L163)
- Array: `microChallenges` constant
- No API key required

---

#### Feature 3: "I did it"

**Trigger**: User clicks "I did it" button

**Behavior**:
1. **No API call** – fully local
2. Randomly selects celebration message
3. Displays encouragement instantly

**Celebration Messages**:
- "Hooray! Tiny win, big momentum 🎉"
- "Nice one! That's one point to Future You ✨"
- "Boom! You just nudged your day in the right direction 🚀"
- "Look at you go! Micro-wins add up fast 💪"
- "Yes! That's the energy we need 🔥"
- "Small step, giant leap for your habits 🌟"

**Technical Details**:
- Handler: `handleQuickAction('done')` in [`CoachCard.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/CoachCard.jsx#L165-L174)
- Array: `celebrationReplies` constant
- No API key required

---

#### Feature 4: Free-Form Messages

**Trigger**: User types custom message and presses Enter or clicks send button

**Behavior**:
1. Sends message to OpenRouter API
2. AI responds based on Coach Nudge personality
3. Conversation history maintained in chat

**Common Questions Handled**:

| User Input | AI Response Type |
|------------|------------------|
| "Who are you?" | Identity explanation |
| "How does this work?" | Feature overview |
| "Hey" / "Hi" | Friendly greeting |
| "I feel tired" | Empathetic encouragement |
| "What should I do today?" | Actionable suggestion based on stats |
| "How do I stay consistent?" | Habit-building advice |
| "Motivate me" | Playful challenge |

**Response Characteristics**:
- Short (1-3 sentences)
- Contextual to user's stats
- On-topic (habits, motivation, wellbeing)
- Redirects off-topic questions gently

**Technical Details**:
- Handler: `sendMessage()` in [`CoachCard.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/CoachCard.jsx#L56-L104)
- API: OpenRouter with `openai/gpt-oss-20b:free` model
- System prompt: Dynamically built with current stats

---

#### Settings Modal

**Purpose**: Configure OpenRouter API key for Coach Nudge.

**Features**:
- **API Key Input**: Password-masked field
- **Show/Hide Toggle**: Eye icon to reveal key
- **Save Button**: Stores key in localStorage
- **Security Note**: "🔒 Your API key is stored only in your browser"
- **Link**: Direct link to [openrouter.ai/keys](https://openrouter.ai/keys)

**Flow**:
1. User clicks ⚙️ icon in Coach Nudge header
2. Modal opens
3. User pastes API key from OpenRouter
4. Clicks "Save API Key"
5. Key stored in localStorage as `nudge_openrouter_key`
6. Modal closes after 1 second
7. Coach Nudge features now work

**Technical Details**:
- Component: [`Settings.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/Settings.jsx)
- Storage: `saveApiKey()` / `getApiKey()` from [`openRouterClient.js`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/lib/openRouterClient.js)

---

### 🎉 100% Completion Celebration

**Purpose**: Celebrate when user completes all habits for the day.

**Trigger**:
- When `completedToday === totalHabits` AND `totalHabits > 0`
- Shows only once per session (tracked via `useRef`)

**Modal Content**:
- **Icon**: 🎉 (large celebration emoji)
- **Title**: "Hooray! That was amazing"
- **Question**: "Did you feel good?"
- **Two Response Options**:
  1. "I felt amazing" (primary button)
  2. "Not really – I need another nudge" (secondary button)

**Behavior**:
- Appears 500ms after last habit is marked done
- Responses logged to console
- Modal closes after user selects option
- Can be dismissed by clicking overlay

**Future Enhancement Potential**:
- Save responses to localStorage
- Track emotional patterns over time
- Adjust Coach Nudge tone based on responses

**Technical Details**:
- Component: [`CelebrationModal.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/components/CelebrationModal.jsx)
- Trigger logic: [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx#L268-L282) (useEffect)
- Response handler: `handleCelebrationResponse()`

---

### 📱 Mobile Responsiveness

**Purpose**: Ensure seamless experience on all device sizes.

**Layout Strategy**:
- **Desktop**: 2-column grid with varying heights
- **Mobile**: Single-column vertical stack

**Mobile Order** (top to bottom):
1. Hero Section (greeting + wave)
2. Today Card (progress ring + stats)
3. Add a Habit (input form)
4. Tiny Wins (achievements)
5. Daily Motivation (quotes carousel)
6. Your Habits (habit list)
7. Coach Nudge (AI chat)
8. Footer (copyright)

**Responsive Breakpoints**:
- Desktop: `> 768px` – Grid layout
- Mobile: `≤ 768px` – Stacked layout

**Mobile Optimizations**:
- Touch-friendly button sizes (min 44px)
- Larger text for readability
- Simplified spacing
- Full-width cards
- Optimized carousel swipe gestures

**Technical Details**:
- CSS: Media queries in [`App.css`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.css)
- Grid: `.widgets-grid` with responsive columns

---

### 🦶 Footer

**Purpose**: Branding and analytics.

**Content**:
- "© 2025 Aryan Subhash. All rights reserved."
- "Made with ❤️ by Aryan Subhash"

**Analytics**:
- Simple Analytics script loaded asynchronously
- Privacy-friendly, no cookies
- Script: `https://scripts.simpleanalyticscdn.com/latest.js`

**Technical Details**:
- Location: [`App.jsx`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/src/App.jsx#L505-L512)
- Analytics: [`index.html`](file:///Users/aryansubhash/ai-habit-tracker/spark-habit/index.html#L20)

---

## 3. Technical Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | React 19.2.0 |
| Build Tool | Vite 7.2.4 |
| Language | JavaScript (ES6+) |
| Styling | Vanilla CSS |
| State Management | React useState/useEffect hooks |
| Data Persistence | localStorage |
| AI Integration | OpenRouter API (GPT-OSS-20B) |
| Fonts | Google Fonts (Inter) |
| Analytics | Simple Analytics |

### Data Flow

```
User Action → React Component → State Update → localStorage → UI Re-render
                                      ↓
                              (if AI feature)
                                      ↓
                              OpenRouter API → AI Response → Chat Update
```

### File Structure

```
spark-habit/
├── index.html              # Entry point, fonts, analytics
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── src/
│   ├── main.jsx            # React root render
│   ├── App.jsx             # Main app component (517 lines)
│   ├── App.css             # All styling (53KB)
│   ├── index.css           # Global resets
│   ├── components/
│   │   ├── Hero.jsx        # Animated hero section
│   │   ├── WelcomeModal.jsx # Name capture modal
│   │   ├── QuotesCarousel.jsx # Athlete quotes
│   │   ├── CoachCard.jsx   # AI chat interface
│   │   ├── Settings.jsx    # API key configuration
│   │   ├── CelebrationModal.jsx # 100% completion
│   │   └── Greeting.jsx    # (Deprecated, replaced by Hero)
│   └── lib/
│       ├── habitEmoji.js   # Smart emoji mapping
│       └── openRouterClient.js # AI API client
└── public/
    └── vite.svg            # Favicon
```

---

## 4. Data Models

### Habit Object

```javascript
{
  id: 1234567890,           // Timestamp-based unique ID
  name: "Morning run",      // User-entered habit name
  frequency: "Daily",       // "Daily" | "Weekdays" | "Weekends"
  streak: 5,                // Consecutive days completed
  lastCompleted: "2025-11-29T10:30:00.000Z" // ISO timestamp or null
}
```

### localStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `sparkHabit_v1` | Array\<Habit\> | All user habits |
| `nudgeUserName` | String | User's name for personalization |
| `nudge_openrouter_key` | String | OpenRouter API key |

---

## 5. AI Integration Details

### OpenRouter Configuration

- **API Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Model**: `openai/gpt-oss-20b:free`
- **Temperature**: 0.8 (creative but consistent)
- **Max Tokens**: 150 (keep responses short)

### System Prompt Structure

The AI receives a dynamic system prompt that includes:
1. **Identity**: "You are Coach Nudge..."
2. **Current Stats**: completedToday, totalHabits, bestStreak
3. **Personality Guidelines**: Warm, witty, concise
4. **Response Templates**: For common questions
5. **Behavioral Rules**: Stay on-topic, redirect gracefully

**Example System Prompt**:
```
You are Coach Nudge, a friendly, witty habit coach living inside the NUDGE habit tracker app.

Current user stats:
- Habits completed today: 3
- Total habits tracked: 5
- Best streak across habits: 7 days

Your personality:
- Warm, encouraging, playful — never mean or sarcastic
- Keep replies short and clear: usually 1-3 sentences
- Use emojis sparingly (💪 ✨ 🚀 😊) for emphasis, not every sentence
...
```

### Error Handling

| Error | Cause | User Message |
|-------|-------|--------------|
| `API_KEY_MISSING` | No key in localStorage | "API key not configured. Click the ⚙️ icon..." |
| `INVALID_API_KEY` | Wrong/expired key | "Invalid API key. Please check your settings." |
| Network error | API unreachable | "Oops! Something went wrong. Try again?" |

---

## 6. Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0F0F0F` | Main app background |
| Card Background | `rgba(255, 255, 255, 0.03)` | Widget backgrounds |
| Primary Orange | `#E97D49` | Buttons, accents |
| Secondary Orange | `#F8C163` | Gradients, highlights |
| Text Primary | `#FFFFFF` | Main text |
| Text Secondary | `rgba(255, 255, 255, 0.7)` | Subtitles, labels |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Visual Effects

- **Glassmorphism**: `backdrop-filter: blur(10px)` on cards
- **Soft Shadows**: `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2)`
- **Gradients**: Linear gradients for progress rings and buttons
- **Animations**: Smooth transitions (300-500ms)

---

## 7. Future Improvements

### Social Sharing
- Share daily/weekly progress to Twitter/Instagram
- Generate beautiful progress cards with stats
- Hashtag: #NUDGEHabits

### Weekly Summary
- Email digest every Sunday
- Highlight: Best streak, total completions, consistency score
- Motivational message from Coach Nudge

### Theme Customization
- Light mode option
- Custom color schemes (blue, green, purple)
- User-uploaded background images

### Better Analytics
- Completion rate trends over time
- Habit difficulty scoring
- Best time of day for habit completion
- Recharts integration for visual graphs

### Backend Options (If Needed)
- **Current**: 100% client-side (localStorage)
- **Future**: 
  - User accounts with authentication
  - Cloud sync across devices
  - Habit sharing with friends
  - Leaderboards for friendly competition
  - Backend: Node.js + Express + MongoDB

### Additional Features
- **Habit Templates**: Pre-built habit packs (Morning Routine, Fitness, Productivity)
- **Reminders**: Push notifications at custom times
- **Habit Notes**: Journal entries for each habit completion
- **Photo Proof**: Upload photos when marking habits done
- **Habit Chains**: Visualize streaks with calendar heatmap
- **Coach Nudge Voice**: Text-to-speech for AI responses
- **Gamification**: Points, levels, badges for milestones

---

## 8. Development & Deployment

### Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create `.env` file (optional):
```
VITE_OPENROUTER_API_KEY=sk-or-v1-...
```

### Deployment Options

- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Drag-and-drop build folder
- **GitHub Pages**: Static hosting
- **Cloudflare Pages**: Fast global CDN

---

## 9. Credits & License

**Created by**: Aryan Subhash  
**License**: MIT  
**Repository**: [github.com/sageofninetale/nudge-habit-tracker](https://github.com/sageofninetale/nudge-habit-tracker)

**Technologies Used**:
- React + Vite
- OpenRouter AI
- Google Fonts (Inter)
- Simple Analytics

---

**Last Updated**: November 29, 2025
