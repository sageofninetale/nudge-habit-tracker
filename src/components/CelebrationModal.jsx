import { useEffect } from 'react';

/**
 * Celebration Modal Component
 * Shows when user completes all habits for the day
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onResponse - Response handler (receives 'amazing' or 'need-nudge')
 */
export default function CelebrationModal({ isOpen, onClose, onResponse }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAmazingClick = () => {
    console.log('User response: I felt amazing! ✨');
    onResponse('amazing');
    onClose();
  };

  const handleNeedNudgeClick = () => {
    console.log('User response: Not really – I need another nudge 💪');
    onResponse('need-nudge');
    onClose();
  };

  return (
    <div className="celebration-overlay" onClick={onClose}>
      <div className="celebration-modal" onClick={(e) => e.stopPropagation()}>
        {/* Celebration Icon */}
        <div className="celebration-icon">🎉</div>

        {/* Title */}
        <h2 className="celebration-title">Hooray! That was amazing</h2>

        {/* Subtitle */}
        <p className="celebration-subtitle">Did you feel good?</p>

        {/* Buttons */}
        <div className="celebration-buttons">
          <button
            className="celebration-btn celebration-btn-primary"
            onClick={handleAmazingClick}
          >
            I felt amazing
          </button>
          <button
            className="celebration-btn celebration-btn-secondary"
            onClick={handleNeedNudgeClick}
          >
            Not really – I need another nudge
          </button>
        </div>
      </div>
    </div>
  );
}
