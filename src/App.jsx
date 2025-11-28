import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import WelcomeModal from "./components/WelcomeModal";
import Greeting from "./components/Greeting";
import QuotesCarousel from "./components/QuotesCarousel";
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

// Automatic Icon Assignment based on habit name
function getHabitIcon(habitName) {
  const name = habitName.toLowerCase();

  // Sports & Fitness
  if (name.includes('swim')) return '🏊';
  if (name.includes('football') || name.includes('soccer')) return '⚽';
  if (name.includes('basketball')) return '🏀';
  if (name.includes('tennis')) return '🎾';
  if (name.includes('golf')) return '⛳';
  if (name.includes('yoga')) return '🧘';
  if (name.includes('gym') || name.includes('workout') || name.includes('exercise')) return '💪';
  if (name.includes('run') || name.includes('jog')) return '🏃';
  if (name.includes('walk')) return '🚶';
  if (name.includes('bike') || name.includes('cycle')) return '🚴';
  if (name.includes('dance')) return '💃';
  if (name.includes('climb')) return '🧗';
  if (name.includes('ski')) return '⛷️';
  if (name.includes('surf')) return '🏄';

  // Health & Wellness
  if (name.includes('water') || name.includes('hydrat')) return '💧';
  if (name.includes('sleep')) return '😴';
  if (name.includes('meditat')) return '🧘';
  if (name.includes('stretch')) return '🤸';
  if (name.includes('vitamin') || name.includes('supplement')) return '💊';

  // Food & Nutrition
  if (name.includes('breakfast')) return '🍳';
  if (name.includes('lunch')) return '🥗';
  if (name.includes('dinner')) return '🍽️';
  if (name.includes('fruit')) return '🍎';
  if (name.includes('vegetable') || name.includes('veggie')) return '🥦';
  if (name.includes('protein')) return '🥩';
  if (name.includes('meal')) return '🍱';

  // Productivity & Learning
  if (name.includes('read')) return '📚';
  if (name.includes('write') || name.includes('journal')) return '✍️';
  if (name.includes('study') || name.includes('learn')) return '📖';
  if (name.includes('code') || name.includes('program')) return '💻';
  if (name.includes('practice')) return '🎯';
  if (name.includes('focus') || name.includes('work')) return '🎯';

  // Creative & Hobbies
  if (name.includes('music') || name.includes('instrument')) return '🎵';
  if (name.includes('paint') || name.includes('draw') || name.includes('art')) return '🎨';
  if (name.includes('photo')) return '📷';
  if (name.includes('cook')) return '👨‍🍳';
  if (name.includes('garden')) return '🌱';

  // Social & Mindfulness
  if (name.includes('call') || name.includes('family') || name.includes('friend')) return '📞';
  if (name.includes('gratitude')) return '🙏';
  if (name.includes('prayer')) return '🙏';
  if (name.includes('smile') || name.includes('laugh')) return '😊';

  // Default
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

      {/* Hero Section */}
      <Hero />

      {/* Greeting */}
      <Greeting />

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
                const icon = getHabitIcon(habit.name);

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

        {/* Widget 3: Add a Habit */}
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

        {/* Widget 4: Tiny Wins */}
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

        {/* Widget 5: Daily Motivation - Quotes Carousel */}
        <div className="premium-widget widget-quote-refined">
          <h3 className="widget-title">Daily Motivation</h3>
          <QuotesCarousel />
        </div>

      </div>
    </div>
  );
}

export default App;