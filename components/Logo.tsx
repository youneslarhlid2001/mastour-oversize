import React from 'react';

type LogoVariant = 'full' | 'compact' | 'monogram';
type LogoColorScheme = 'dark' | 'light' | 'rose';

interface LogoProps {
    variant?: LogoVariant;
    colorScheme?: LogoColorScheme;
    className?: string;
    width?: number;
    height?: number;
}

const colorSchemes = {
    dark: {
        primary: '#2D2D2D',
        secondary: '#6B6B6B',
        accent: '#D8829D',
        ornament: '#D8829D',
    },
    light: {
        primary: '#FFFFFF',
        secondary: '#E0D5C9',
        accent: '#D8829D',
        ornament: '#D8829D',
    },
    rose: {
        primary: '#A64D79',
        secondary: '#D8829D',
        accent: '#D8829D',
        ornament: '#C9A87C',
    },
};

// Subtle floral/fabric ornament SVG path
const FloralOrnament = ({ color, width = 120 }: { color: string; width?: number }) => (
    <svg
        width={width}
        height={width * 0.25}
        viewBox="0 0 120 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Flowing abstract line — like a draped fabric or petal */}
        <path
            d="M10 15 C20 5, 35 5, 45 15 C55 25, 65 25, 75 15 C85 5, 100 5, 110 15"
            stroke={color}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
        />
        {/* Small center petal */}
        <ellipse cx="60" cy="15" rx="3" ry="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
        {/* Left petal */}
        <path
            d="M50 15 Q55 8 60 15"
            stroke={color}
            strokeWidth="0.7"
            fill="none"
            opacity="0.5"
        />
        {/* Right petal */}
        <path
            d="M60 15 Q65 8 70 15"
            stroke={color}
            strokeWidth="0.7"
            fill="none"
            opacity="0.5"
        />
    </svg>
);

export default function Logo({
    variant = 'full',
    colorScheme = 'dark',
    className = '',
    width,
    height,
}: LogoProps) {
    const colors = colorSchemes[colorScheme];

    if (variant === 'monogram') {
        const monoW = width || 48;
        const monoH = height || 48;
        return (
            <svg
                width={monoW}
                height={monoH}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                aria-label="Mastour Oversize"
            >
                {/* Oval frame */}
                <ellipse cx="40" cy="40" rx="36" ry="38" stroke={colors.accent} strokeWidth="1" fill="none" />
                {/* M */}
                <text
                    x="22"
                    y="50"
                    fontFamily="'Playfair Display', 'Georgia', serif"
                    fontSize="32"
                    fontWeight="400"
                    fill={colors.primary}
                    letterSpacing="0.02em"
                >
                    M
                </text>
                {/* O */}
                <text
                    x="45"
                    y="50"
                    fontFamily="'Playfair Display', 'Georgia', serif"
                    fontSize="32"
                    fontWeight="300"
                    fontStyle="italic"
                    fill={colors.accent}
                    letterSpacing="0.02em"
                >
                    O
                </text>
            </svg>
        );
    }

    if (variant === 'compact') {
        const compW = width || 280;
        const compH = height || 40;
        return (
            <svg
                width={compW}
                height={compH}
                viewBox="0 0 460 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                aria-label="Mastour Oversize"
            >
                {/* MASTOUR */}
                <text
                    x="0"
                    y="33"
                    fontFamily="'Playfair Display', 'Georgia', serif"
                    fontSize="30"
                    fontWeight="700"
                    fill={colors.primary}
                    letterSpacing="0.15em"
                >
                    MASTOUR
                </text>
                {/* Subtle separator dot */}
                <circle cx="225" cy="28" r="2" fill={colors.accent} opacity="0.6" />
                {/* OVERSIZE */}
                <text
                    x="240"
                    y="33"
                    fontFamily="'Playfair Display', 'Georgia', serif"
                    fontSize="30"
                    fontWeight="300"
                    fontStyle="italic"
                    fill={colors.accent}
                    letterSpacing="0.1em"
                >
                    OVERSIZE
                </text>
            </svg>
        );
    }

    // Full variant (default) — stacked with ornament
    const fullW = width || 260;
    const fullH = height || 100;
    return (
        <svg
            width={fullW}
            height={fullH}
            viewBox="0 0 340 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Mastour Oversize"
        >
            {/* Floral ornament */}
            <g transform="translate(110, 0)">
                <FloralOrnament color={colors.ornament} />
            </g>

            {/* MASTOUR — main brand name */}
            <text
                x="170"
                y="68"
                textAnchor="middle"
                fontFamily="'Playfair Display', 'Georgia', serif"
                fontSize="38"
                fontWeight="700"
                fill={colors.primary}
                letterSpacing="0.2em"
            >
                MASTOUR
            </text>

            {/* Thin decorative line */}
            <line
                x1="100"
                y1="80"
                x2="240"
                y2="80"
                stroke={colors.accent}
                strokeWidth="0.5"
                opacity="0.5"
            />

            {/* OVERSIZE — sub text */}
            <text
                x="170"
                y="103"
                textAnchor="middle"
                fontFamily="'Playfair Display', 'Georgia', serif"
                fontSize="16"
                fontWeight="400"
                fill={colors.secondary}
                letterSpacing="0.35em"
            >
                OVERSIZE
            </text>
        </svg>
    );
}
