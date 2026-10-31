export const standardSizes = [
    { size: 'S', poitrine: '86-90', taille: '66-70', hanches: '92-96', longueur: '135' },
    { size: 'M', poitrine: '90-94', taille: '70-74', hanches: '96-100', longueur: '137' },
    { size: 'L', poitrine: '94-98', taille: '74-78', hanches: '100-104', longueur: '139' },
    { size: 'XL', poitrine: '98-102', taille: '78-82', hanches: '104-108', longueur: '141' },
    { size: 'XXL', poitrine: '102-106', taille: '82-86', hanches: '108-112', longueur: '143' },
];

export const numberedSizes = [
    { size: '52', poitrine: '92-96', taille: '72-76', hanches: '98-102', longueur: '137' },
    { size: '54', poitrine: '96-100', taille: '76-80', hanches: '102-106', longueur: '139' },
    { size: '56', poitrine: '100-104', taille: '80-84', hanches: '106-110', longueur: '141' },
    { size: '58', poitrine: '104-108', taille: '84-88', hanches: '110-114', longueur: '143' },
];

export const sizeTips = [
    'Mesurez-vous en sous-vêtements pour plus de précision.',
    'En cas de doute entre deux tailles, prenez la taille au-dessus pour un confort oversize.',
    'La taille unique convient généralement du S au XL grâce à la coupe ample.',
    'Les mesures sont indicatives et peuvent varier légèrement selon les modèles.',
];

export const SIZE_ORDER = ['One Size', 'S', 'S/M', 'M', 'L', 'L/XL', 'XL', 'XXL', '52', '54', '56', '58'];

export function sizeLabel(size: string) {
    return size === 'One Size' ? 'Taille unique' : size;
}

export function lengthFor(size: string | null) {
    if (!size) return null;
    const row = [...standardSizes, ...numberedSizes].find((s) => s.size === size);
    return row ? row.longueur : null;
}
