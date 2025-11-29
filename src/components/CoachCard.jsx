import { useState, useRef, useEffect } from 'react';
import { callCoachAI, hasApiKey } from '../lib/openRouterClient';
import Settings from './Settings';

/**
 * Coach AI Card Component
 * @param {Object} props
 * @param {Object} props.stats - User habit statistics
 * @param {number} props.stats.completedToday - Habits completed today
 * @param {number} props.stats.totalHabits - Total number of habits
 * @param {number} props.stats.bestStreak - Best streak
 */
// Micro-challenges for "Give me a mini task"
const microChallenges = [
  "Take 3 sips of water right now 💧",
  "Stand up and stretch for 20 seconds 🙆‍♀️",
  "Do 3 tiny jumps on the spot 🐸",
  "Take 5 deep breaths — in through your nose, out through your mouth 🧘",
  "Look away from the screen and relax your eyes for 15 seconds 👀",
  "Roll your shoulders back 5 times 🔄",
  "Shake out your hands for 10 seconds ✋",
  "Stand on one leg for 10 seconds (balance time!) 🦩",
  "Do 5 air squats right where you are 💪",
  "Smile at yourself in your phone camera (yes, really!) 😊"
];

// Celebration messages for "I did it"
const celebrationReplies = [
  "Hooray! Tiny win, big momentum 🎉",
  "Nice one! That's one point to Future You ✨",
  "Boom! You just nudged your day in the right direction 🚀",
  "Look at you go! Micro-wins add up fast 💪",
  "Yes! That's the energy we need 🔥",
  "Small step, giant leap for your habits 🌟"
];

export default function CoachCard({ stats }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Coach Nudge — ready when you are 👋"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Free-text message sending (uses OpenRouter)
  const sendMessage = async (userMessage) => {
    if (isLoading) return;
    
    // Check if API key is configured
    if (!hasApiKey()) {
      setError('API key not configured. Click the ⚙️ icon to add your OpenRouter API key.');
      setShowSettings(true);
      return;
    }

    setError(null);
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      // Get conversation history (exclude the welcome message)
      const conversationHistory = updatedMessages.filter(
        msg => msg.content !== "Hey! I'm Coach Nudge — ready when you are 👋"
      );

      // Call AI with the same Coach Nudge personality
      const response = await callCoachAI({
        messages: conversationHistory,
        stats
      });

      // Add assistant response
      setMessages([...updatedMessages, { role: 'assistant', content: response }]);
    } catch (err) {
      console.error('Coach AI error:', err);
      
      if (err.message === 'API_KEY_MISSING' || err.message === 'INVALID_API_KEY') {
        setError('Invalid API key. Please check your settings.');
        setShowSettings(true);
      } else {
        setError('Oops! Something went wrong. Try again?');
      }
      
      // Remove the user message if there was an error
      setMessages(updatedMessages.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action) => {
    if (isLoading) return;

    if (action === 'status') {
      // Flow 1: "How am I doing?" - Uses OpenRouter
      if (!hasApiKey()) {
        setError('API key not configured. Click the ⚙️ icon to add your OpenRouter API key.');
        setShowSettings(true);
        return;
      }

      setError(null);
      setIsLoading(true);

      // Add user message
      const userMessage = { role: 'user', content: 'How am I doing?' };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      try {
        // Get conversation history (exclude welcome message)
        const conversationHistory = updatedMessages.filter(
          msg => msg.content !== "Hey! I'm Coach Nudge — ready when you are 👋"
        );

        // Call AI with stats
        const response = await callCoachAI({
          messages: conversationHistory,
          stats
        });

        // Add assistant response
        setMessages([...updatedMessages, { role: 'assistant', content: response }]);
      } catch (err) {
        console.error('Coach AI error:', err);
        
        if (err.message === 'API_KEY_MISSING' || err.message === 'INVALID_API_KEY') {
          setError('Invalid API key. Please check your settings.');
          setShowSettings(true);
        } else {
          setError('Oops! Something went wrong. Try again?');
        }
        
        // Remove the user message if there was an error
        setMessages(updatedMessages.slice(0, -1));
      } finally {
        setIsLoading(false);
      }

    } else if (action === 'challenge') {
      // Flow 2: "Give me a mini task" - Local array, no AI
      const randomChallenge = microChallenges[Math.floor(Math.random() * microChallenges.length)];
      
      setMessages(prev => [
        ...prev,
        { role: 'user', content: 'Give me a mini task' },
        { role: 'assistant', content: randomChallenge }
      ]);

    } else if (action === 'done') {
      // Flow 3: "I did it" - Local celebration, no AI
      const randomCelebration = celebrationReplies[Math.floor(Math.random() * celebrationReplies.length)];
      
      setMessages(prev => [
        ...prev,
        { role: 'user', content: 'I did it' },
        { role: 'assistant', content: randomCelebration }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
    }
  };

  return (
    <div className="coach-card">
      {/* Header with settings */}
      <div className="coach-card-header">
        <h3 className="widget-title">Coach Nudge</h3>
        <button
          className="coach-settings-btn"
          onClick={() => setShowSettings(true)}
          aria-label="Settings"
          title="Configure API Key"
        >
          ⚙️
        </button>
      </div>

      {/* Messages area */}
      <div className="coach-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`coach-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
          >
            <div className="coach-message-content">
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="coach-message assistant">
            <div className="coach-message-content coach-loading">
              <span className="loading-dot">●</span>
              <span className="loading-dot">●</span>
              <span className="loading-dot">●</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className="coach-error">
          {error}
        </div>
      )}

      {/* Quick action buttons (always visible) */}
      <div className="coach-quick-actions">
        <button
          className="coach-quick-btn"
          onClick={() => handleQuickAction('status')}
          disabled={isLoading}
        >
          How am I doing?
        </button>
        <button
          className="coach-quick-btn"
          onClick={() => handleQuickAction('challenge')}
          disabled={isLoading}
        >
          Give me a mini task
        </button>
        <button
          className="coach-quick-btn"
          onClick={() => handleQuickAction('done')}
          disabled={isLoading}
        >
          I did it
        </button>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="coach-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Coach Nudge anything..."
          className="coach-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="coach-send-btn"
          aria-label="Send message"
        >
          {isLoading ? '⏳' : '➤'}
        </button>
      </form>

      {/* Settings Modal */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
