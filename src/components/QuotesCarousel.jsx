import React, { useState, useEffect } from 'react';

const athleteQuotes = [
    { text: "Talent without working hard is nothing.", author: "Cristiano Ronaldo" },
    { text: "I always want more. Whether it's a goal or winning a game, I'm never satisfied.", author: "Lionel Messi" },
    { text: "Hard work beats talent when talent doesn't work hard.", author: "Kylian Mbappé" },
    { text: "You can't put a limit on anything. The more you dream, the farther you get.", author: "Michael Phelps" },
    { text: "The minute you think you've got it made, disaster is just around the corner.", author: "Lewis Hamilton" },
    { text: "Sometimes you have to accept you can't win all the time.", author: "Roger Federer" },
    { text: "What's important is to fight, to believe until the end.", author: "Rafael Nadal" },
    { text: "You have to believe in yourself when no one else does.", author: "Serena Williams" },
];

export default function QuotesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextQuote = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % athleteQuotes.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevQuote = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + athleteQuotes.length) % athleteQuotes.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Auto-advance every 7-10 seconds (random interval)
    useEffect(() => {
        const randomInterval = Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000;
        const interval = setInterval(() => {
            nextQuote();
        }, randomInterval);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const currentQuote = athleteQuotes[currentIndex];

    return (
        <div className="quotes-carousel">
            {/* Navigation Arrows */}
            <button onClick={prevQuote} className="carousel-arrow carousel-arrow-left" aria-label="Previous quote">
                ‹
            </button>

            {/* Quote Content Card */}
            <div className="quote-card-wrapper">
                <div className={`quote-content ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                    <div className="quote-accent-line-refined"></div>
                    <p className="quote-text-refined">"{currentQuote.text}"</p>
                    <p className="quote-author-refined">— {currentQuote.author}</p>
                </div>
                
                {/* Slider Dots Below Quote */}
                <div className="carousel-dots">
                    {athleteQuotes.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                if (!isAnimating) {
                                    setIsAnimating(true);
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsAnimating(false), 500);
                                }
                            }}
                            aria-label={`Go to quote ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <button onClick={nextQuote} className="carousel-arrow carousel-arrow-right" aria-label="Next quote">
                ›
            </button>
        </div>
    );
}
