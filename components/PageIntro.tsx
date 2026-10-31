import { ReactNode } from 'react';

interface PageIntroProps {
    eyebrow: string;
    title: ReactNode;
    children?: ReactNode;
}

export default function PageIntro({ eyebrow, title, children }: PageIntroProps) {
    return (
        <header className="page-x pb-10 pt-12 md:pb-14 md:pt-20">
            <p className="label rise text-thread">{eyebrow}</p>
            <h1 className="display rise mt-4 text-[clamp(3.5rem,11vw,11rem)] leading-[1.02]" style={{ '--d': '80ms' } as React.CSSProperties}>
                {title}
            </h1>
            {children && (
                <div className="rise mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-soft" style={{ '--d': '160ms' } as React.CSSProperties}>
                    {children}
                </div>
            )}
        </header>
    );
}
