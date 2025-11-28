import React from 'react';

export default function Greeting() {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good morning';
        if (hour >= 12 && hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const userName = localStorage.getItem('nudgeUserName');
    const greeting = userName ? `${getGreeting()}, ${userName}` : getGreeting();

    return (
        <div className="greeting-section-refined">
            <h2 className="greeting-text-refined">{greeting}</h2>
            <p className="greeting-subtitle-refined">Here's your gentle nudge for today.</p>
        </div>
    );
}
