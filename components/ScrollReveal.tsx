"use client";

import { useEffect, useRef, ReactNode } from 'react';

type AnimationType = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale';

interface ScrollRevealProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;    // ms
    duration?: number; // ms
    threshold?: number; // 0-1
    className?: string;
    once?: boolean;    // animate only once
}

const animationStyles: Record<AnimationType, { from: string; to: string }> = {
    'fade-up': {
        from: 'opacity-0 translate-y-8',
        to: 'opacity-100 translate-y-0',
    },
    'fade-in': {
        from: 'opacity-0',
        to: 'opacity-100',
    },
    'fade-left': {
        from: 'opacity-0 -translate-x-8',
        to: 'opacity-100 translate-x-0',
    },
    'fade-right': {
        from: 'opacity-0 translate-x-8',
        to: 'opacity-100 translate-x-0',
    },
    'scale': {
        from: 'opacity-0 scale-95',
        to: 'opacity-100 scale-100',
    },
};

export default function ScrollReveal({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 600,
    threshold = 0.15,
    className = '',
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.remove(...animationStyles[animation].from.split(' '));
                    el.classList.add(...animationStyles[animation].to.split(' '));
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    el.classList.remove(...animationStyles[animation].to.split(' '));
                    el.classList.add(...animationStyles[animation].from.split(' '));
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animation, threshold, once]);

    return (
        <div
            ref={ref}
            className={`${animationStyles[animation].from} transition-all ease-out ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
