import { CSSProperties } from 'react';
import { colorHex } from '@/lib/colors';

type Silhouette = 'robe' | 'papillon' | 'droite' | 'ensemble' | 'kimono' | 'chemise' | 'sporty';
type Detail = 'ceinture' | 'smocks' | 'broderie' | 'zip' | 'dentelle';

const FIGURES: Record<string, { silhouette: Silhouette; detail?: Detail }> = {
    'robe-rose-poudre-oversize': { silhouette: 'robe' },
    'ensemble-mastour-beige': { silhouette: 'ensemble' },
    'abaya-papillon-noire': { silhouette: 'papillon' },
    'kimono-soie-rose': { silhouette: 'kimono' },
    'robe-lin-camel-oversized': { silhouette: 'robe' },
    'abaya-brodee-blanche': { silhouette: 'droite', detail: 'broderie' },
    'ensemble-palazzo-noir': { silhouette: 'ensemble' },
    'robe-satin-emeraude': { silhouette: 'robe', detail: 'ceinture' },
    'kimono-velours-taupe': { silhouette: 'kimono' },
    'robe-maxi-lavande': { silhouette: 'robe', detail: 'smocks' },
    'ensemble-sporty-gris': { silhouette: 'sporty' },
    'abaya-everyday-marine': { silhouette: 'droite', detail: 'zip' },
    'kimono-dentelle-ivoire': { silhouette: 'kimono', detail: 'dentelle' },
    'robe-chemise-olive': { silhouette: 'chemise' },
};

const BY_CATEGORY: Record<string, Silhouette> = {
    Robes: 'robe',
    Abayas: 'droite',
    Ensembles: 'ensemble',
    Kimonos: 'kimono',
};

// Dégradés partagés, montés une seule fois dans le layout
export function GarmentDefs() {
    return (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
                <linearGradient id="mo-folds" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#000" stopOpacity="0.28" />
                    <stop offset="0.12" stopColor="#fff" stopOpacity="0.1" />
                    <stop offset="0.24" stopColor="#000" stopOpacity="0.16" />
                    <stop offset="0.36" stopColor="#fff" stopOpacity="0.14" />
                    <stop offset="0.47" stopColor="#000" stopOpacity="0.08" />
                    <stop offset="0.58" stopColor="#fff" stopOpacity="0.16" />
                    <stop offset="0.7" stopColor="#000" stopOpacity="0.14" />
                    <stop offset="0.84" stopColor="#fff" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="mo-fall" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
                    <stop offset="0.45" stopColor="#000" stopOpacity="0" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.24" />
                </linearGradient>
                <linearGradient id="mo-sleeve" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="0.3" />
                    <stop offset="0.45" stopColor="#fff" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.26" />
                </linearGradient>
                <pattern id="mo-lace" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="8" cy="8" r="3.6" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="1.4" fill="#fff" fillOpacity="0.4" />
                    <circle cx="16" cy="16" r="1.4" fill="#fff" fillOpacity="0.4" />
                    <circle cx="16" cy="0" r="1.4" fill="#fff" fillOpacity="0.4" />
                    <circle cx="0" cy="16" r="1.4" fill="#fff" fillOpacity="0.4" />
                </pattern>
            </defs>
        </svg>
    );
}

function Cloth({ d, shade = 'mo-folds', sink = 0 }: { d: string; shade?: string; sink?: number }) {
    return (
        <>
            <path d={d} fill="var(--cloth)" />
            <path d={d} fill={`url(#${shade})`} />
            {shade === 'mo-folds' && <path d={d} fill="url(#mo-fall)" />}
            {sink > 0 && <path d={d} fill="#000" fillOpacity={sink} />}
        </>
    );
}

// Plis : une ombre et un reflet décalés
function Creases({ lines }: { lines: string[] }) {
    return (
        <g fill="none" strokeLinecap="round">
            {lines.map((d) => (
                <g key={d}>
                    <path d={d} stroke="#000" strokeOpacity="0.13" strokeWidth="1.6" />
                    <path d={d} stroke="#fff" strokeOpacity="0.09" strokeWidth="1" transform="translate(2 0)" />
                </g>
            ))}
        </g>
    );
}

function Mirror({ children }: { children: React.ReactNode }) {
    return <g transform="matrix(-1 0 0 1 400 0)">{children}</g>;
}

function Sleeves({ d }: { d: string }) {
    return (
        <>
            <Cloth d={d} shade="mo-sleeve" />
            <Mirror>
                <Cloth d={d} shade="mo-sleeve" />
            </Mirror>
        </>
    );
}

function Neck({ d = 'M166 80 C180 68 220 68 234 80 C222 94 178 94 166 80 Z' }: { d?: string }) {
    return (
        <>
            <path d={d} fill="var(--cloth)" />
            <path d={d} fill="#000" fillOpacity="0.42" />
        </>
    );
}

function Robe() {
    return (
        <>
            <Sleeves d="M258 92 C286 102 312 176 330 276 C338 322 350 360 358 384 C340 398 308 398 290 386 C284 330 274 262 262 200 Z" />
            <Cloth d="M166 80 C178 94 222 94 234 80 L262 94 C276 200 306 420 340 572 C280 592 120 592 60 572 C94 420 124 200 138 94 Z" />
            <Creases
                lines={[
                    'M214 130 C226 260 250 430 272 572',
                    'M186 130 C176 280 150 440 128 572',
                    'M201 210 C203 330 197 470 201 584',
                    'M242 300 C256 390 288 490 308 562',
                    'M158 300 C144 390 112 490 92 562',
                ]}
            />
            <Neck />
        </>
    );
}

function Papillon() {
    return (
        <>
            <Cloth d="M168 80 C180 92 220 92 232 80 L300 108 C350 158 386 250 396 332 C360 348 320 342 288 322 C292 400 300 500 308 578 C260 592 140 592 92 578 C100 500 108 400 112 322 C80 342 40 348 4 332 C14 250 50 158 100 108 Z" />
            <Creases
                lines={[
                    'M122 128 C92 188 52 260 28 326',
                    'M278 128 C308 188 348 260 372 326',
                    'M112 322 C122 262 132 204 146 150',
                    'M288 322 C278 262 268 204 254 150',
                    'M152 170 C150 300 128 450 122 580',
                    'M248 170 C250 300 272 450 278 580',
                    'M200 190 C202 330 198 470 200 586',
                ]}
            />
            <Neck d="M168 80 C182 68 218 68 232 80 C220 92 180 92 168 80 Z" />
        </>
    );
}

function Droite() {
    return (
        <>
            <Sleeves d="M254 92 C276 104 292 170 304 270 C310 320 316 368 320 400 C308 410 288 410 276 402 C272 340 266 270 258 210 Z" />
            <Cloth d="M168 80 C180 92 220 92 232 80 L258 94 C266 220 280 430 292 578 C250 590 150 590 108 578 C120 430 134 220 142 94 Z" />
            <Creases lines={['M222 150 C232 300 246 450 256 582', 'M178 150 C168 300 154 450 144 582', 'M200 300 C200 400 200 500 200 586']} />
            <Neck d="M168 80 C182 68 218 68 232 80 C220 92 180 92 168 80 Z" />
        </>
    );
}

const TUNIC = 'M168 80 C180 92 220 92 232 80 L260 94 C268 180 278 290 288 378 C250 392 150 392 112 378 C122 290 132 180 140 94 Z';

function Ensemble() {
    return (
        <>
            <Cloth d="M146 320 L254 320 C268 400 296 500 310 582 C280 592 236 592 212 584 L201 410 L188 584 C164 592 120 592 90 582 C104 500 132 400 146 320 Z" sink={0.14} />
            <Creases lines={['M236 400 C252 460 270 530 282 586', 'M164 400 C148 460 130 530 118 586', 'M201 410 L201 584']} />
            <Sleeves d="M256 92 C278 104 294 170 304 262 C308 300 312 332 314 356 C304 366 286 366 274 358 C270 306 266 256 260 206 Z" />
            <Cloth d={TUNIC} />
            <Creases lines={['M222 140 C230 220 240 310 248 386', 'M178 140 C170 220 160 310 152 386', 'M200 220 C200 280 200 340 200 390']} />
            <Neck d="M168 80 C182 68 218 68 232 80 C220 92 180 92 168 80 Z" />
        </>
    );
}

function Kimono({ detail }: { detail?: Detail }) {
    const panel = 'M214 92 L232 80 L268 96 C278 220 294 430 306 576 C278 586 244 584 224 578 C232 420 226 220 214 92 Z';
    return (
        <>
            <Cloth d="M170 80 C182 70 218 70 230 80 L242 574 C222 582 178 582 158 574 Z" sink={0.4} />
            <Sleeves d="M264 94 C300 106 342 170 370 260 L380 298 C352 320 318 324 292 306 L272 190 Z" />
            <Cloth d={panel} />
            <Mirror>
                <Cloth d={panel} />
            </Mirror>
            {detail === 'dentelle' && (
                <>
                    <path d={panel} fill="url(#mo-lace)" />
                    <Mirror>
                        <path d={panel} fill="url(#mo-lace)" />
                    </Mirror>
                </>
            )}
            <Creases lines={['M250 160 C258 300 270 450 280 578', 'M150 160 C142 300 130 450 120 578', 'M300 128 C320 180 338 240 350 300', 'M100 128 C80 180 62 240 50 300']} />
        </>
    );
}

function Chemise() {
    return (
        <>
            <Sleeves d="M254 92 C278 104 296 170 306 270 C312 320 316 356 318 384 L280 392 C274 330 268 270 258 210 Z" />
            <Sleeves d="M280 392 L318 384 L320 404 L282 412 Z" />
            <Cloth d="M168 80 C180 92 220 92 232 80 L260 94 C270 220 286 430 298 578 C252 590 148 590 102 578 C114 430 130 220 140 94 Z" />
            <Creases lines={['M228 300 C238 390 252 490 262 582', 'M172 300 C162 390 148 490 138 582']} />
            <g stroke="#000" strokeOpacity="0.3" strokeWidth="1">
                <path d="M192 112 V584" />
                <path d="M208 112 V584" />
            </g>
            <g fill="#000" fillOpacity="0.45">
                {[140, 200, 310, 370, 430, 490, 550].map((y) => (
                    <circle key={y} cx="200" cy={y} r="2.6" />
                ))}
            </g>
            <Cloth d="M132 256 C168 268 232 268 268 256 L270 276 C232 288 168 288 130 276 Z" shade="mo-sleeve" />
            <path d="M212 268 L232 350 L218 352 L204 274 Z" fill="var(--cloth)" />
            <path d="M212 268 L232 350 L218 352 L204 274 Z" fill="#000" fillOpacity="0.22" />
            <Cloth d="M200 112 L166 76 L150 92 L178 130 Z" shade="mo-sleeve" />
            <Mirror>
                <Cloth d="M200 112 L166 76 L150 92 L178 130 Z" shade="mo-sleeve" />
            </Mirror>
        </>
    );
}

function Sporty() {
    return (
        <>
            <Cloth d="M148 328 L252 328 C264 400 264 500 258 566 L226 570 L204 400 L174 570 L142 566 C136 500 136 400 148 328 Z" sink={0.14} />
            <Cloth d="M142 566 L174 570 L172 590 L142 586 Z" shade="mo-sleeve" />
            <Cloth d="M226 570 L258 566 L258 586 L228 590 Z" shade="mo-sleeve" />
            <Creases lines={['M238 400 C244 450 244 510 242 566', 'M162 400 C156 450 156 510 158 566', 'M204 400 L204 420']} />
            <Sleeves d="M260 96 C290 110 310 180 318 270 C320 296 322 316 322 330 L286 340 C282 300 276 250 266 210 Z" />
            <Sleeves d="M286 340 L322 330 L324 352 L288 362 Z" />
            <Cloth d="M166 84 C178 96 222 96 234 84 L268 100 C276 170 284 260 290 340 C250 354 150 354 110 340 C116 260 124 170 132 100 Z" />
            <Cloth d="M110 340 C150 354 250 354 290 340 L291 362 C250 376 150 376 109 362 Z" shade="mo-sleeve" />
            <Creases lines={['M226 150 C232 220 238 290 244 346', 'M174 150 C168 220 162 290 156 346']} />
            <Neck d="M166 84 C180 72 220 72 234 84 C222 96 178 96 166 84 Z" />
        </>
    );
}

function DetailLayer({ detail }: { detail?: Detail }) {
    if (detail === 'ceinture') {
        return (
            <>
                <Cloth d="M126 226 C166 238 234 238 274 226 L276 246 C236 258 164 258 124 246 Z" shade="mo-sleeve" />
                <path d="M214 240 L240 340 L222 344 L204 244 Z" fill="var(--cloth)" />
                <path d="M214 240 L240 340 L222 344 L204 244 Z" fill="#000" fillOpacity="0.2" />
            </>
        );
    }
    if (detail === 'smocks') {
        return (
            <g fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="1.2">
                {[214, 222, 230, 238, 246].map((y) => (
                    <path key={y} d={`M${128 - (y - 214) * 0.14} ${y} C168 ${y + 10} 232 ${y + 10} ${272 + (y - 214) * 0.14} ${y}`} />
                ))}
            </g>
        );
    }
    if (detail === 'zip') {
        return <path d="M200 92 V584" stroke="#000" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="2 2" />;
    }
    if (detail === 'broderie') {
        return (
            <g fill="none" stroke="var(--embroidery)" strokeWidth="1.1">
                {[120, 160, 200, 240, 280, 320].map((y, i) => (
                    <g key={y} transform={`translate(200 ${y}) scale(${1 - i * 0.07})`}>
                        {[0, 60, 120, 180, 240, 300].map((a) => (
                            <ellipse key={a} cx="0" cy="-6.5" rx="2.6" ry="5.4" transform={`rotate(${a})`} />
                        ))}
                        <circle r="1.5" fill="var(--embroidery)" />
                    </g>
                ))}
                {[302, 96].map((x) => (
                    <g key={x} transform={`translate(${x} 388)`}>
                        {[0, 60, 120, 180, 240, 300].map((a) => (
                            <ellipse key={a} cx="0" cy="-4" rx="1.6" ry="3.4" transform={`rotate(${a})`} />
                        ))}
                    </g>
                ))}
            </g>
        );
    }
    return null;
}

interface GarmentProps {
    productId?: string;
    category?: string;
    color?: string;
    className?: string;
    label?: string;
}

export default function Garment({ productId, category, color, className = '', label }: GarmentProps) {
    const figure = (productId && FIGURES[productId]) || { silhouette: BY_CATEGORY[category ?? ''] ?? 'robe' };
    const { silhouette, detail } = figure as { silhouette: Silhouette; detail?: Detail };

    const style = {
        '--cloth': colorHex(color),
        '--embroidery': 'color-mix(in srgb, var(--cloth) 45%, #8d6a3f)',
    } as CSSProperties;

    return (
        <svg
            viewBox="0 0 400 600"
            className={`garment ${className}`}
            style={style}
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
        >
            {/* Cintre */}
            <path d="M200 74 V50 C200 42 212 40 212 30 C212 20 196 18 191 27" fill="none" stroke="#2b1216" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
            <path d="M200 52 L128 92 M200 52 L272 92" fill="none" stroke="#2b1216" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
            <g style={{ filter: 'drop-shadow(0 14px 14px rgb(43 18 22 / 0.26))' }}>
                {silhouette === 'robe' && <Robe />}
                {silhouette === 'papillon' && <Papillon />}
                {silhouette === 'droite' && <Droite />}
                {silhouette === 'ensemble' && <Ensemble />}
                {silhouette === 'kimono' && <Kimono detail={detail} />}
                {silhouette === 'chemise' && <Chemise />}
                {silhouette === 'sporty' && <Sporty />}
                <DetailLayer detail={detail} />
            </g>
        </svg>
    );
}
