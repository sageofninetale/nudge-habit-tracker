import React from 'react';

export default function Hero() {
    return (
        <div className="hero-section-refined">
            {/* Top Left Branding */}
            <div className="hero-branding">
                NUDGE
            </div>

            {/* Elegant Smooth Wave with Subtle Glowing Dots */}
            <svg className="hero-line-refined" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="heroLineGradientRefined" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
                    </linearGradient>
                </defs>

                {/* Smoother wave path - more elegant curve */}
                <path
                    d="M 0,35 Q 200,15 400,30 T 800,30 Q 1000,35 1200,25"
                    stroke="url(#heroLineGradientRefined)"
                    strokeWidth="1.2"
                    fill="none"
                />

                {/* Refined glowing dots with reduced glow */}
                <circle cx="300" cy="22" r="3.5" fill="white" opacity="0.4" className="hero-dot-refined">
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
                </circle>

                <circle cx="600" cy="30" r="4" fill="white" className="hero-dot-main-refined">
                    <animate attributeName="r" values="4;5.5;4" dur="2s" repeatCount="indefinite" />
                </circle>

                <circle cx="900" cy="25" r="3.5" fill="white" opacity="0.4" className="hero-dot-refined">
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" begin="1.5s" />
                </circle>
            </svg>

            {/* Refined Hero Text - Single Line, Smaller, More Elegant */}
            <div className="hero-content-refined">
                <h1 className="hero-heading-refined">
                    <span className="hero-text-light-refined">track </span><span className="hero-text-bright-refined">your habit.</span>
                </h1>
                <p className="hero-tagline-refined">A gentle nudge toward better days.</p>
            </div>
        </div>
    );
}
