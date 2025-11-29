import { useState, useEffect } from 'react';
import { getApiKey, saveApiKey } from '../lib/openRouterClient';

/**
 * Settings modal for API key configuration
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {() => void} props.onClose - Close handler
 */
export default function Settings({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getApiKey());
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveApiKey(apiKey);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="settings-modal-overlay" onClick={handleOverlayClick}>
      <div className="settings-modal-content">
        <div className="settings-header">
          <h2>Settings</h2>
          <button
            className="settings-close-btn"
            onClick={onClose}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="settings-body">
          <div className="settings-section">
            <label htmlFor="api-key" className="settings-label">
              OpenRouter API Key
            </label>
            <div className="settings-input-group">
              <input
                id="api-key"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="settings-input"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="settings-toggle-btn"
                aria-label={showKey ? "Hide API key" : "Show API key"}
              >
                {showKey ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <p className="settings-note">
              🔒 Your API key is stored only in your browser. Get one free at{' '}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="settings-link"
              >
                openrouter.ai/keys
              </a>
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className={`settings-save-btn ${saved ? 'saved' : ''}`}
          >
            {saved ? '✓ Saved!' : 'Save API Key'}
          </button>
        </div>
      </div>
    </div>
  );
}
