import React, { useEffect, useRef, useState } from 'react';

export default function Hero() {
    const heroRef = useRef(null);
    const [baseWaveOffset, setBaseWaveOffset] = useState(0);
    const [mouseInfluence, setMouseInfluence] = useState(0);
    const timeRef = useRef(0);
    const animationFrameRef = useRef(null);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 12) return 'Good morning';
        if (hour >= 12 && hour < 16) return 'Good afternoon';
        if (hour >= 16 && hour < 19) return 'Good evening';
        return 'Good night';
    };

    const userName = localStorage.getItem('nudgeUserName');

    // Horizontal drift wave animation
    useEffect(() => {
        const heroElement = heroRef.current;
        if (!heroElement) return;

        let targetMouseInfluence = 0;
        let currentMouseInfluence = 0;

        const handleMouseMove = (e) => {
            const rect = heroElement.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const heroWidth = rect.width;
            const normalizedX = (mouseX / heroWidth) * 2 - 1;
            // Very subtle horizontal mouse influence: ±3px
            targetMouseInfluence = normalizedX * 3;
        };

        const handleMouseLeave = () => {
            targetMouseInfluence = 0;
        };

        const animate = () => {
            // Horizontal drift animation (8s cycle)
            timeRef.current += 0.016; // ~60fps
            const horizontalDrift = Math.sin(timeRef.current * 0.785) * 18; // ±18px horizontal sway
            
            // Smooth mouse influence easing
            currentMouseInfluence += (targetMouseInfluence - currentMouseInfluence) * 0.06;
            
            setBaseWaveOffset(horizontalDrift);
            setMouseInfluence(currentMouseInfluence);
            
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        heroElement.addEventListener('mousemove', handleMouseMove);
        heroElement.addEventListener('mouseleave', handleMouseLeave);
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            heroElement.removeEventListener('mousemove', handleMouseMove);
            heroElement.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const totalWaveOffset = baseWaveOffset + mouseInfluence;

    return (
        <div className="hero-final" ref={heroRef}>
            {/* NUDGE logo - larger, proper branding */}
            <div className="hero-nudge-wordmark">NUDGE</div>

            {/* Full-width premium wave with horizontal drift animation */}
            <svg 
                className="hero-premium-wave" 
                viewBox="0 0 1400 140" 
                preserveAspectRatio="none"
                style={{ transform: `translateX(${totalWaveOffset}px)` }}
            >
                <defs>
                    <linearGradient id="premiumWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255, 159, 102, 0.25)" />
                        <stop offset="20%" stopColor="rgba(255, 159, 102, 0.5)" />
                        <stop offset="40%" stopColor="rgba(255, 159, 102, 0.7)" />
                        <stop offset="60%" stopColor="rgba(255, 159, 102, 0.7)" />
                        <stop offset="80%" stopColor="rgba(255, 159, 102, 0.5)" />
                        <stop offset="100%" stopColor="rgba(255, 159, 102, 0.25)" />
                    </linearGradient>
                    <filter id="premiumGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Smooth full-width S-curve */}
                <path 
                    d="M 0 75 Q 280 50, 450 60 Q 620 68, 700 75 Q 780 82, 950 80 Q 1120 75, 1400 75" 
                    stroke="url(#premiumWaveGradient)" 
                    strokeWidth="2.5" 
                    fill="none"
                    filter="url(#premiumGlow)"
                    className="wave-path-premium"
                />
                
                {/* Premium dots positioned on the curve */}
                <circle cx="350" cy="55" r="5" fill="#FF9F66" filter="url(#premiumGlow)" className="wave-dot">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="700" cy="75" r="6.5" fill="#FFB885" filter="url(#premiumGlow)" className="wave-dot-main">
                    <animate attributeName="r" values="6.5;8;6.5" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="1050" cy="78" r="5" fill="#FF9F66" filter="url(#premiumGlow)" className="wave-dot">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                </circle>
            </svg>

            {/* "Track your habit." - medium size, comes first visually */}
            <div className="hero-subheadline">
                <h2>
                    <span className="track-text">Track</span>{' '}
                    <span className="habit-text">your habit.</span>
                </h2>
            </div>

            {/* Main greeting - LARGEST, most important, Lora serif */}
            <div className="hero-main-greeting">
                <h1>{userName ? `${getGreeting()} ${userName}!` : `${getGreeting()}!`}</h1>
            </div>

            {/* Subtitle - smallest */}
            <div className="hero-subtitle-text">
                <p>Here's your gentle nudge for today.</p>
            </div>
        </div>
    );
}
