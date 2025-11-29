# NUDGE 🎯

🚀 **Live Demo:** https://nudgecoach.vercel.app/

**A beautiful AI-powered habit tracker with a witty personal coach**


## 🚀 Live Demo

Try NUDGE instantly here:  
👉 **https://nudgecoach.vercel.app**

---

## 📖 Project Overview

**NUDGE** is a modern habit tracking application that helps you build better habits through gentle encouragement rather than harsh accountability. Unlike traditional habit trackers that focus on punishment and guilt, NUDGE celebrates your progress and provides personalized motivation.

### What NUDGE Does
- Track your daily habits with smart emoji detection
- Get personalized encouragement from Coach Nudge, your AI assistant
- Celebrate tiny wins and build momentum
- Stay motivated with daily athlete quotes
- Keep your data private with local browser storage

### Why It Exists
Most habit trackers make you feel bad when you miss a day. NUDGE takes a different approach—it focuses on what you *did* accomplish and gives you gentle nudges to keep going. It's designed to be encouraging, not punishing.

### What Makes It Unique
- 🤖 **Coach Nudge AI** — A witty AI assistant that knows your stats and gives personalized advice
- 🎯 **Tiny Wins** — Micro-challenges that build real momentum (e.g., "Take 3 sips of water")
- 🎨 **Smart Emoji Habits** — Type "morning run" and automatically get 🏃‍♂️ (30+ categories)
- 🔥 **Streak Tracking** — Automatic consecutive day calculation
- 💬 **Motivational Quotes** — Daily inspiration from world-class athletes
- 🔒 **Privacy-First** — All data stored locally in your browser, no backend required
- 🎉 **Celebration Moments** — Special modal when you complete all habits
- 🛡️ **Safety Logic** — Blocks unhealthy habits like smoking with witty warnings

---

## ✨ Features

### 🏠 Personalized Experience
- **Time-based greeting** — "Good morning, [Your Name]!" based on the time of day
- **Welcome modal** — Captures your name on first visit for personalization
- **Custom dashboard** — See your progress at a glance

### 📊 Habit Management
- **Add habits** with name and frequency (Daily/Weekdays/Weekends)
- **Smart emoji detection** — Automatically assigns relevant emojis based on habit name
- **Streak tracking** — Consecutive days calculated automatically
- **One-click completion** — Mark habits done with visual feedback
- **Easy deletion** — Remove habits you no longer need

### 🤖 Coach Nudge (AI Assistant)
Your personal AI habit coach with multiple interaction modes:

1. **"How am I doing?"** — Get personalized feedback based on your actual stats
2. **"Give me a mini task"** — Receive instant micro-challenges (no AI needed)
3. **"I did it"** — Get celebration messages for completing challenges
4. **Free-form chat** — Ask anything about habits, motivation, or productivity

### 🎯 Tiny Wins
- **Micro-challenges** — Small, achievable tasks like "Do 5 air squats" or "Take 3 deep breaths"
- **Instant gratification** — Complete them right now for a quick win
- **Momentum building** — Small wins lead to bigger achievements

### 💬 Daily Motivation
- **Athlete quotes carousel** — 8 inspiring quotes from Ronaldo, Messi, Serena Williams, and more
- **Auto-rotating** — New quote every 6 seconds
- **Manual navigation** — Click arrows or dots to browse quotes

### 🎉 Celebration Modal
- **Triggers at 100% completion** — Appears when you finish all habits for the day
- **Feedback collection** — Asks "Did you feel good?" to track your emotional progress
- **Encouraging design** — Celebrates your achievement with confetti emoji

### 🛡️ Safety Features
- **Unhealthy habit blocker** — Prevents adding habits like "smoking", "vaping", or "self-harm"
- **Witty warnings** — "Coach Nudge says: that one's more of a villain than a habit 🫣"
- **Input retention** — Keeps your text so you can edit it to something healthier

### 📱 Responsive Design
- **Mobile-first** — Works perfectly on phones, tablets, and desktops
- **Dark theme** — Easy on the eyes with premium glassmorphism effects
- **Smooth animations** — Polished transitions and micro-interactions

### 💾 Data Persistence
- **LocalStorage** — All habits and settings saved in your browser
- **No backend required** — Works completely offline after first load
- **Privacy-focused** — Your data never leaves your device

---

## 🚀 How to Use Coach Nudge

Coach Nudge is powered by AI, but you need to provide your own free API key to use it. Here's a simple guide:

### Step 1: Open NUDGE
Open the NUDGE app in your browser.

### Step 2: Find the Settings Button
Scroll down to the **Coach Nudge** widget and click the **⚙️ Settings** icon in the top-right corner.

### Step 3: Get Your Free API Key
1. Go to [https://openrouter.ai/](https://openrouter.ai/)
2. Sign up for a free account (no credit card required)
3. Navigate to [https://openrouter.ai/keys](https://openrouter.ai/keys)
4. Click **"Create Key"**
5. Copy your new API key (it starts with `sk-or-v1-...`)

### Step 4: Add Your Key to NUDGE
1. Paste your API key into the input field in the Settings modal
2. Click **"Save API Key"**
3. Your key is stored securely in your browser (never sent anywhere except OpenRouter)

### Step 5: Start Chatting!
Now you can:
- Click **"How am I doing?"** to get personalized feedback
- Type any question like "I feel tired" or "What should I focus on today?"
- Get AI-powered encouragement based on your actual habit stats

### Note About Free Tier
The free OpenRouter model (`gpt-oss-20b`) has rate limits. If you hit them, just wait a few minutes. You can still use all other features without an API key!

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** — Modern UI library
- **Vite 7.2.4** — Lightning-fast build tool
- **Vanilla CSS** — Custom dark theme with glassmorphism

### AI Integration
- **OpenRouter API** — Access to multiple AI models
- **Model:** `openai/gpt-oss-20b:free` — Free tier for testing

### Data & Deployment
- **LocalStorage** — Browser-based persistence
- **Vercel** — Serverless deployment platform
- **Simple Analytics** — Privacy-friendly analytics (no cookies)

---

## 💻 Local Development

Want to run NUDGE on your own machine? Here's how:

### Prerequisites
- Node.js 16+ and npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/sageofninetale/nudge-habit-tracker.git
cd nudge-habit-tracker/spark-habit

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 📸 Screenshots

### Home Section
![NUDGE Hero Section](https://via.placeholder.com/800x400/0B0B0F/FF9F66?text=NUDGE+Hero+Section)
*Personalized greeting with animated wave and time-based welcome message*

### Habits & Tiny Wins
![Habits Dashboard](https://via.placeholder.com/800x400/0B0B0F/FF9F66?text=Habits+%26+Tiny+Wins)
*Track your habits, see your streaks, and celebrate tiny wins*

### Coach Nudge
![Coach Nudge AI](https://via.placeholder.com/800x400/0B0B0F/FF9F66?text=Coach+Nudge+AI+Chat)
*Chat with your personal AI habit coach for encouragement and advice*

### Daily Motivation
![Quotes Carousel](https://via.placeholder.com/800x400/0B0B0F/FF9F66?text=Daily+Motivation+Quotes)
*Auto-rotating carousel with inspiring quotes from world-class athletes*

### Celebration Modal
![100% Completion](https://via.placeholder.com/800x400/0B0B0F/FF9F66?text=Celebration+Modal)
*Special celebration when you complete all your habits for the day*

---

## 📂 Project Structure

```
spark-habit/
├── src/
│   ├── App.jsx                    # Main application logic
│   ├── App.css                    # All styling (dark theme, animations)
│   ├── components/
│   │   ├── Hero.jsx               # Hero section with animated wave
│   │   ├── CoachCard.jsx          # AI chat interface
│   │   ├── QuotesCarousel.jsx     # Auto-rotating quotes
│   │   ├── CelebrationModal.jsx   # 100% completion celebration
│   │   ├── WelcomeModal.jsx       # First-time name capture
│   │   └── Settings.jsx           # API key configuration
│   └── lib/
│       ├── habitEmoji.js          # Smart emoji mapping (30+ categories)
│       └── openRouterClient.js    # OpenRouter API integration
├── docs/                          # Additional documentation
├── index.html                     # Entry point
├── package.json                   # Dependencies
└── vite.config.js                 # Vite configuration
```

---

## 🎯 Key Features Explained

### Smart Emoji Detection
Type a habit name and NUDGE automatically assigns a relevant emoji:
- "morning run" → 🏃‍♂️
- "drink water" → 💧
- "read book" → 📚
- "gym workout" → 🏋️‍♂️
- "meditation" → 🧘

Over 30 categories supported, with a default ⭐ for anything else.

### Unhealthy Habit Blocker
NUDGE prevents you from adding harmful habits:
- Typing "smoking", "vaping", or "self-harm" triggers a friendly warning
- Habit is blocked but your input is retained for editing
- Encourages you to pick healthier alternatives

### Hybrid AI Approach
NUDGE uses AI strategically:
- **AI-powered:** "How am I doing?" and free-form chat
- **Local logic:** "Give me a mini task" and "I did it" (instant, no API needed)
- This keeps the app fast while still feeling intelligent

---

## 📚 Additional Documentation

For deeper technical details:
- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) — Complete feature breakdown and architecture
- [SYSTEM_WORKFLOW.md](SYSTEM_WORKFLOW.md) — Data flows and implementation details

---

## 🔮 Future Enhancements

Potential features for future versions:
- Weekly summary emails with Coach Nudge insights
- Habit templates (Morning Routine, Fitness, Productivity packs)
- Photo proof for habit completion
- Social sharing of progress cards
- Theme customization (light mode, custom colors)
- Optional cloud sync for multi-device access

---

## 📄 License

MIT License — Free to use for learning or personal projects.

---

## 👨‍💻 Credits

**Built by Aryan Subhash**

NUDGE was designed and developed as a portfolio demonstration project, showcasing:
- Modern React development with hooks and state management
- AI integration with OpenRouter API
- Product thinking (gentle encouragement vs. harsh accountability)
- Premium UI/UX design with vanilla CSS
- Privacy-first architecture with local storage

Created for personal use and to demonstrate full-stack product development skills.

---

## 🌟 Why NUDGE?

Traditional habit trackers focus on streaks and punishment. NUDGE is different:
- ✅ Celebrates what you *did* accomplish
- ✅ Provides gentle encouragement, not guilt
- ✅ Offers instant micro-wins to build momentum
- ✅ Respects your privacy (no backend, no tracking)
- ✅ Feels premium and polished from the first interaction

**Give yourself a gentle nudge toward better days.** 🎯

---

**Made with ❤️ and a gentle nudge**
