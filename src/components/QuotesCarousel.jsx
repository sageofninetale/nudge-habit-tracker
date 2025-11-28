import React, { useState, useEffect } from 'react';

const athleteQuotes = [
    { text: "Your love makes you strong. Your hate makes you unstoppable.", author: "Cristiano Ronaldo" },
    { text: "I always want more. Whether it's a goal, or winning a game, I'm never satisfied.", author: "Lionel Messi" },
    { text: "Talent without working hard is nothing.", author: "Cristiano Ronaldo" },
    { text: "The more difficult the victory, the greater the happiness in winning.", author: "Pelé" },
    { text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice.", author: "Pelé" },
    { text: "I don't have to show anything to anyone. There is nothing to prove.", author: "Cristiano Ronaldo" },
    { text: "Champions keep playing until they get it right.", author: "Serena Williams" },
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

    // Auto-advance every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextQuote();
        }, 10000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const currentQuote = athleteQuotes[currentIndex];

    return (
        <div className="quotes-carousel">
            <button onClick={prevQuote} className="carousel-arrow carousel-arrow-left" aria-label="Previous quote">
                ‹
            </button>

            <div className={`quote-content ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <div className="quote-accent-line-refined"></div>
                <p className="quote-text-refined">"{currentQuote.text}"</p>
                <p className="quote-author-refined">— {currentQuote.author}</p>
            </div>

            <button onClick={nextQuote} className="carousel-arrow carousel-arrow-right" aria-label="Next quote">
                ›
            </button>

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
    );
}
