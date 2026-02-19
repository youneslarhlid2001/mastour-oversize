"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        // When route changes, fade out then swap content
        setIsVisible(false);
        const timeout = setTimeout(() => {
            setDisplayChildren(children);
            setIsVisible(true);
        }, 200); // matches CSS transition duration

        return () => clearTimeout(timeout);
    }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="transition-all duration-300 ease-in-out"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            }}
        >
            {displayChildren}
        </div>
    );
}
