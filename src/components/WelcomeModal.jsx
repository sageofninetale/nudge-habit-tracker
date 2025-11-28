import React, { useState } from 'react';

export default function WelcomeModal({ onClose }) {
    const [userName, setUserName] = useState('');

    const handleSave = () => {
        if (userName.trim()) {
            localStorage.setItem('nudgeUserName', userName.trim());
            onClose();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && userName.trim()) {
            handleSave();
        }
    };

    return (
        <div className="welcome-modal-overlay-refined" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="welcome-modal-refined">
                <h2 className="welcome-title-refined">Welcome to NUDGE 👋</h2>
                <p className="welcome-subtitle-refined">What should we call you?</p>

                <div className="welcome-form-refined">
                    <input
                        type="text"
                        className="welcome-input-refined"
                        placeholder="Your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        autoFocus
                    />

                    <button
                        onClick={handleSave}
                        className="btn-welcome-save"
                        disabled={!userName.trim()}
                    >
                        Save and continue
                    </button>
                </div>
            </div>
        </div>
    );
}
