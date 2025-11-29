/**
 * habitEmoji.js
 * Smart emoji assignment based on habit name keywords
 */

const emojiMappings = [
  // Running & Jogging
  { keywords: ['run', 'running', 'jog', 'jogging'], emoji: '🏃‍♂️' },
  
  // Walking
  { keywords: ['walk', 'walking', 'step', 'steps'], emoji: '🚶‍♂️' },
  
  // Hiking & Trails
  { keywords: ['hike', 'hiking', 'trail', 'mountain', 'trek'], emoji: '🥾' },
  
  // Sports
  { keywords: ['football', 'soccer'], emoji: '⚽' },
  { keywords: ['basketball'], emoji: '🏀' },
  { keywords: ['tennis'], emoji: '🎾' },
  { keywords: ['swim', 'swimming'], emoji: '🏊‍♂️' },
  
  // Gym & Workout
  { keywords: ['gym', 'workout', 'training', 'exercise', 'lift', 'weight'], emoji: '🏋️‍♂️' },
  
  // Cycling
  { keywords: ['bike', 'cycle', 'cycling', 'biking'], emoji: '🚴' },
  
  // Climbing
  { keywords: ['climb', 'climbing', 'boulder'], emoji: '🧗' },
  
  // Dancing
  { keywords: ['dance', 'dancing'], emoji: '💃' },
  
  // Yoga & Stretching
  { keywords: ['yoga', 'stretch', 'stretching'], emoji: '🧘‍♀️' },
  
  // Meditation & Breathing
  { keywords: ['meditat', 'breathing', 'mindful', 'mindfulness'], emoji: '🧘' },
  
  // Reading
  { keywords: ['read', 'reading', 'book'], emoji: '📚' },
  
  // Study & Learning
  { keywords: ['study', 'exam', 'revision', 'learn', 'learning'], emoji: '🧠' },
  
  // Writing & Journaling
  { keywords: ['write', 'writing', 'journal', 'journaling'], emoji: '✍️' },
  
  // Coding
  { keywords: ['code', 'coding', 'program', 'programming', 'debug'], emoji: '💻' },
  
  // Water & Hydration
  { keywords: ['water', 'drink', 'hydrat', 'hydration'], emoji: '💧' },
  
  // Sleep
  { keywords: ['sleep', 'bed', 'rest', 'nap'], emoji: '😴' },
  
  // Bath & Shower
  { keywords: ['bath', 'bathe', 'bathing', 'shower'], emoji: '🚿' },
  
  // Cleaning & Chores
  { keywords: ['clean', 'chore', 'tidy', 'vacuum'], emoji: '🧹' },
  
  // Cooking
  { keywords: ['cook', 'cooking', 'meal prep', 'bake', 'baking'], emoji: '🍳' },
  
  // Creative & Music
  { keywords: ['music', 'instrument', 'practice music'], emoji: '🎵' },
  { keywords: ['paint', 'draw', 'art', 'sketch'], emoji: '🎨' },
  { keywords: ['photo', 'photography'], emoji: '📷' },
  
  // Food
  { keywords: ['breakfast'], emoji: '🍳' },
  { keywords: ['fruit'], emoji: '🍎' },
  { keywords: ['vegetable', 'veggie', 'salad'], emoji: '🥦' },
  
  // Social & Wellness
  { keywords: ['call', 'family', 'friend'], emoji: '📞' },
  { keywords: ['gratitude', 'prayer', 'grateful'], emoji: '🙏' },
  { keywords: ['garden', 'gardening', 'plant'], emoji: '🌱' },
];

/**
 * Get emoji for a habit based on keywords in the name
 * @param {string} habitName - The habit name
 * @returns {string} - The emoji character (or ❓ as default)
 */
export function getEmojiForHabit(habitName) {
  if (!habitName || typeof habitName !== 'string') {
    return '❓';
  }

  const name = habitName.toLowerCase().trim();

  // Check each mapping for keyword matches
  for (const mapping of emojiMappings) {
    for (const keyword of mapping.keywords) {
      if (name.includes(keyword)) {
        return mapping.emoji;
      }
    }
  }

  // Default fallback
  return '❓';
}
