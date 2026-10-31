import Image from 'next/image';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';

export default function InstagramCTA() {
    return (
        <section className="relative isolate overflow-hidden bg-wine text-on-wine">
            <Image src="/images/grass.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30 mix-blend-luminosity" />
            <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="page-x group block py-20 md:py-28"
            >
                <p className="label">Nouveautés, conseils de style, inspiration quotidienne</p>
                <p className="display mt-4 whitespace-nowrap text-[9.6vw] leading-none transition-colors group-hover:text-clay">
                    @{INSTAGRAM_HANDLE}
                </p>
                <span className="stitch mt-6 block" />
            </a>
        </section>
    );
}
