// Teinte de chaque coloris présent dans data/products.json.
// Un nouveau coloris sans entrée ici s'affiche en sable (FALLBACK).
const COLOR_HEX: Record<string, string> = {
    'Rose poudré': '#D9A9A6',
    'Beige clair': '#D9C6A8',
    'Noir': '#211C1E',
    'Taupe': '#8B7768',
    'Rose ancien': '#C08A8C',
    'Blanc cassé': '#EFE8DA',
    'Vert sauge': '#9AA88E',
    'Camel': '#B98A55',
    'Kaki': '#6E6A45',
    'Écru': '#E5DAC2',
    'Blanc': '#F6F2EA',
    'Crème': '#EFE3C8',
    'Marine': '#20304F',
    'Émeraude': '#0F5C4A',
    'Bordeaux': '#6B1E2E',
    'Or rose': '#CB9A84',
    'Prune': '#54273F',
    'Chocolat': '#4A2F24',
    'Lavande': '#B3A5CC',
    'Pêche': '#EDB89A',
    'Menthe': '#A9CDB7',
    'Gris chiné': '#9C9A97',
    'Bleu nuit': '#18233F',
    'Gris anthracite': '#3A3B3F',
    'Ivoire': '#F2EBD9',
    'Nude': '#D8B59D',
    'Olive': '#6F7141',
    'Bleu ciel': '#A9C4D9',
};

const FALLBACK = '#CDBDA3';

export function colorHex(name?: string) {
    return (name && COLOR_HEX[name]) || FALLBACK;
}

function luminance(hex: string) {
    const channel = (start: number) => {
        const value = parseInt(hex.slice(start, start + 2), 16) / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

// Fond de planche : contraste avec le vêtement pour que chaque coloris ressorte
export function backdropFor(name?: string) {
    const hex = colorHex(name);
    const l = luminance(hex);
    if (l > 0.62) return '#B98C78';
    if (l < 0.05) return '#E4D5BC';
    return `color-mix(in oklab, ${hex} 30%, #EFE6D6)`;
}

export function isLightColor(name?: string) {
    return luminance(colorHex(name)) > 0.62;
}
