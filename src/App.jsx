import { useEffect, useState, useRef } from "react";
import Hero from "./components/Hero";
import WelcomeModal from "./components/WelcomeModal";
import QuotesCarousel from "./components/QuotesCarousel";
import CoachCard from "./components/CoachCard";
import CelebrationModal from "./components/CelebrationModal";
import { getEmojiForHabit } from "./lib/habitEmoji";
import "./App.css";

const STORAGE_KEY = "sparkHabit_v1";

const defaultHabits = [
  {
    id: 1,
    name: "Drink 2L of water",
    frequency: "Daily",
    streak: 0,
    lastCompleted: null,
  },
  {
    id: 2,
    name: "10 min walk",
    frequency: "Daily",
    streak: 0,
    lastCompleted: null,
  },
];

/**
 * Check if a habit is unhealthy (smoking, vaping, drugs, etc.)
 * @param {string} habitName - The habit name
 * @returns {boolean} - True if unhealthy
 */
function isUnhealthyHabit(habitName) {
  if (!habitName || typeof habitName !== 'string') return false;
  
  const name = habitName.toLowerCase().trim();
  
  const unhealthyKeywords = [
    'smoke', 'smoking', 'cigarette', 'cig', 'ciggy', 'tobacco',
    'vape', 'vaping', 'vapes',
    'drug', 'drugs', 'cocaine', 'heroin', 'meth',
    'junk food', 'binge', 'self harm', 'self-harm'
  ];
  
  return unhealthyKeywords.some(keyword => name.includes(keyword));
}

// DEPRECATED: Replaced by getEmojiForHabit from lib/habitEmoji.js
function getHabitIcon(habitName) {
  const name = habitName.toLowerCase();

  // Running & Jogging
  if (name.includes('run') || name.includes('running') || name.includes('jog')) return '�‍♂️';
  
  // Walking
  if (name.includes('walk') || name.includes('walking') || name.includes('step')) return '🚶‍♂️';
  
  // Football/Soccer
  if (name.includes('football') || name.includes('soccer')) return '⚽';
  
  // Swimming
  if (name.includes('swim') || name.includes('swimming')) return '🏊‍♂️';
  
  // Gym & Workout
  if (name.includes('gym') || name.includes('workout') || name.includes('training') || name.includes('exercise')) return '🏋️‍♂️';
  
  // Dancing
  if (name.includes('dance') || name.includes('dancing')) return '💃';
  
  // Yoga & Stretching
  if (name.includes('yoga') || name.includes('stretch')) return '🧘‍♀️';
  
  // Reading
  if (name.includes('read') || name.includes('reading') || name.includes('book')) return '�';
  
  // Study & Learning
  if (name.includes('study') || name.includes('exam') || name.includes('revision') || name.includes('learn')) return '🧠';
  
  // Meditation & Breathing
  if (name.includes('meditat') || name.includes('breathing') || name.includes('mindful')) return '🧘';
  
  // Water & Hydration
  if (name.includes('water') || name.includes('drink') || name.includes('hydrat')) return '💧';
  
  // Sleep
  if (name.includes('sleep') || name.includes('bed') || name.includes('rest')) return '�';
  
  // Cleaning & Chores
  if (name.includes('clean') || name.includes('chore') || name.includes('tidy')) return '🧹';
  
  // Cooking
  if (name.includes('cook') || name.includes('cooking') || name.includes('meal prep')) return '🍳';
  
  // Additional Sports
  if (name.includes('basketball')) return '🏀';
  if (name.includes('tennis')) return '�';
  if (name.includes('bike') || name.includes('cycle') || name.includes('cycling')) return '🚴';
  if (name.includes('climb') || name.includes('climbing')) return '🧗';
  
  // Writing & Journaling
  if (name.includes('write') || name.includes('journal')) return '✍️';
  
  // Coding
  if (name.includes('code') || name.includes('coding') || name.includes('program')) return '💻';
  
  // Creative
  if (name.includes('music') || name.includes('instrument')) return '🎵';
  if (name.includes('paint') || name.includes('draw') || name.includes('art')) return '🎨';
  if (name.includes('photo')) return '📷';
  
  // Food
  if (name.includes('breakfast')) return '🍳';
  if (name.includes('fruit')) return '🍎';
  if (name.includes('vegetable') || name.includes('veggie')) return '🥦';
  
  // Social & Wellness
  if (name.includes('call') || name.includes('family') || name.includes('friend')) return '📞';
  if (name.includes('gratitude') || name.includes('prayer')) return '🙏';
  if (name.includes('garden')) return '🌱';

  // Hiking
  if (name.includes('hike') || name.includes('hiking')) return '🥾';
  
  // Shower / Bath
  if (name.includes('bath') || name.includes('bathe') || name.includes('shower')) return '🚿';
  
  // Default - use star for anything else
  return '⭐';
}

// Motivation Quotes
const motivationQuotes = [
  { text: "Champions keep playing until they get it right.", author: "Serena Williams" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
];

function loadHabits() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultHabits;
    return JSON.parse(saved);
  } catch {
    return defaultHabits;
  }
}

function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function isSameDay(dateA, dateB) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isYesterday(dateString) {
  const d = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(d, yesterday);
}

function App() {
  const [habits, setHabits] = useState(() => loadHabits());
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('nudgeUserName');
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const hasShownCelebrationRef = useRef(false);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  // Get daily quote (rotates based on day of year)
  const getDailyQuote = () => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return motivationQuotes[dayOfYear % motivationQuotes.length];
  };

  const dailyQuote = getDailyQuote();

  function handleAddHabit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    // Check for unhealthy habits
    if (isUnhealthyHabit(name)) {
      alert(
        "Coach Nudge says: that one's more of a villain than a habit 🫣\n\n" +
        "Let's pick something that actually nudges your health in the right direction."
      );
      // Keep the input so they can edit it
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: name.trim(),
      frequency,
      streak: 0,
      lastCompleted: null,
    };

    setHabits((prev) => [newHabit, ...prev]);
    setName("");
  }

  function handleCompleteToday(habitId) {
    const now = new Date();
    const todayStr = now.toISOString();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;

        if (h.lastCompleted && isSameDay(h.lastCompleted, todayStr)) {
          return h;
        }

        let newStreak = 1;
        if (h.lastCompleted && isYesterday(h.lastCompleted)) {
          newStreak = h.streak + 1;
        }

        return {
          ...h,
          streak: newStreak,
          lastCompleted: todayStr,
        };
      })
    );
  }

  function handleDeleteHabit(habitId) {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  }

  const completedToday = habits.filter((h) =>
    h.lastCompleted ? isSameDay(h.lastCompleted, new Date()) : false
  ).length;

  const completionRate =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  const maxStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streak)) : 0;

  // Check for 100% completion and show celebration modal
  useEffect(() => {
    if (
      habits.length > 0 &&
      completedToday === habits.length &&
      !hasShownCelebrationRef.current
    ) {
      // Small delay to let the UI update first
      const timer = setTimeout(() => {
        setShowCelebration(true);
        hasShownCelebrationRef.current = true;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [completedToday, habits.length]);

  const handleCelebrationResponse = (response) => {
    // Response is logged in CelebrationModal component
    // Could save to localStorage or send to analytics here
  };

  // Tiny Wins - Only meaningful ones
  const getTinyWins = () => {
    const wins = [];

    // Today's completions
    if (completedToday > 0) {
      wins.push(`You completed ${completedToday} habit${completedToday > 1 ? 's' : ''} today 🎉`);
    }

    // Best streak this week
    if (maxStreak > 0) {
      wins.push(`Your longest streak this week is ${maxStreak} day${maxStreak > 1 ? 's' : ''} 🔥`);
    }

    // Consistency on specific habit
    const consistentHabit = habits.find(h => h.streak >= 2);
    if (consistentHabit) {
      wins.push(`You stayed consistent on "${consistentHabit.name}" 💪`);
    }

    return wins.slice(0, 3);
  };

  const tinyWins = getTinyWins();

  return (
    <div className="app-premium">
      {/* Welcome Modal */}
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onResponse={handleCelebrationResponse}
      />

      {/* Hero Section */}
      <Hero />

      {/* Five Widget Grid */}
      <div className="widgets-grid">

        {/* Widget 1: Today Summary */}
        <div className="premium-widget widget-today">
          <h3 className="widget-title">Today</h3>
          <p className="widget-date">{today}</p>

          {/* Progress Ring */}
          <div className="progress-ring-container-premium">
            <div className="progress-ring-premium">
              <svg viewBox="0 0 140 140">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E97D49" />
                    <stop offset="100%" stopColor="#F8C163" />
                  </linearGradient>
                </defs>
                <circle
                  className="progress-ring-bg-premium"
                  cx="70"
                  cy="70"
                  r="60"
                />
                <circle
                  className="progress-ring-fill-premium"
                  cx="70"
                  cy="70"
                  r="60"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - completionRate / 100)}`}
                />
              </svg>
              <div className="progress-ring-text-premium">
                <div className="progress-percentage-premium">{completionRate}%</div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="today-stats-row">
            <div className="stat-item-premium">
              <span className="stat-value-premium">{completedToday}</span>
              <span className="stat-label-premium">Done</span>
            </div>
            <div className="stat-item-premium">
              <span className="stat-value-premium">{habits.length}</span>
              <span className="stat-label-premium">Total</span>
            </div>
            <div className="stat-item-premium">
              <span className="stat-value-premium">{maxStreak}</span>
              <span className="stat-label-premium">Best</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Your Habits List (Tall - spans 2 rows) */}
        <div className="premium-widget widget-habits">
          <h3 className="widget-title">Your Habits</h3>

          {habits.length === 0 ? (
            <div className="empty-state-premium">
              <p>No habits yet. Add one to get started!</p>
            </div>
          ) : (
            <div className="habits-list-premium">
              {habits.map((habit) => {
                const doneToday =
                  habit.lastCompleted &&
                  isSameDay(habit.lastCompleted, new Date());
                const icon = getEmojiForHabit(habit.name);

                return (
                  <div
                    key={habit.id}
                    className={`habit-item-premium ${doneToday ? "completed" : ""}`}
                  >
                    <div className="habit-info-premium">
                      <span className="habit-icon-auto">{icon}</span>
                      <div className="habit-details-premium">
                        <p className="habit-name-premium">{habit.name}</p>
                        <p className="habit-streak-premium">
                          🔥 {habit.streak} day streak
                        </p>
                      </div>
                    </div>
                    <div className="habit-actions-premium">
                      <button
                        onClick={() => handleCompleteToday(habit.id)}
                        className={`btn-mark-done-premium ${doneToday ? "done" : ""}`}
                        disabled={doneToday}
                      >
                        {doneToday ? "✓ Done" : "Mark done"}
                      </button>
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="btn-delete-premium"
                        title="Delete habit"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Widget 3: Coach AI */}
        <div className="premium-widget widget-coach-ai">
          <CoachCard
            stats={{
              completedToday,
              totalHabits: habits.length,
              bestStreak: maxStreak
            }}
          />
        </div>

        {/* Widget 4: Add a Habit */}
        <div className="premium-widget widget-add">
          <h3 className="widget-title">Add a Habit</h3>

          <form onSubmit={handleAddHabit} className="add-habit-form-premium">
            <input
              type="text"
              placeholder="Habit name (e.g., Morning run)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-premium"
              required
            />

            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="select-premium"
            >
              <option>Daily</option>
              <option>Weekdays</option>
              <option>Weekends</option>
            </select>

            <button type="submit" className="btn-add-premium">
              + Add Habit
            </button>
          </form>
        </div>

        {/* Widget 5: Tiny Wins */}
        <div className="premium-widget widget-wins">
          <h3 className="widget-title">Tiny Wins</h3>

          {tinyWins.length > 0 ? (
            <div className="wins-list">
              {tinyWins.map((win, i) => (
                <div key={i} className="win-item">
                  <span className="win-text">{win}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-wins">Complete a habit to see your wins!</p>
          )}
        </div>

        {/* Widget 6: Daily Motivation - Quotes Carousel */}
        <div className="premium-widget widget-quote-refined">
          <h3 className="widget-title">Daily Motivation</h3>
          <QuotesCarousel />
        </div>

      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p className="footer-text">
          © 2025 Aryan Subhash. All rights reserved.
        </p>
        <p className="footer-text">
          Made with ❤️ by Aryan Subhash
        </p>
      </footer>
    </div>
  );
}

export default App;