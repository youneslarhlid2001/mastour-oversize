"use client";

import { useSyncExternalStore } from 'react';
import { Product } from '@/types';
import { lengthFor, numberedSizes, standardSizes } from '@/lib/sizes';

export interface Measures {
    poitrine: string;
    taille: string;
    hanches: string;
    hauteur: string;
}

const STORAGE_KEY = 'mastour-mesures';
const EMPTY: Measures = { poitrine: '', taille: '', hanches: '', hauteur: '' };

// Bornes de saisie plausibles, en centimètres
const LIMITS: Record<keyof Measures, [number, number]> = {
    poitrine: [50, 200],
    taille: [40, 200],
    hanches: [50, 200],
    hauteur: [120, 220],
};

let measures: Measures = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getSnapshot() {
    if (!loaded) {
        loaded = true;
        try {
            measures = { ...EMPTY, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
        } catch {
            measures = EMPTY;
        }
    }
    return measures;
}

export function useMeasures() {
    return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function saveMeasures(next: Measures) {
    measures = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    listeners.forEach((listener) => listener());
}

export function measuresAreValid(values: Measures) {
    const hasBody = Boolean(values.poitrine || values.taille || values.hanches);
    const inRange = (Object.keys(LIMITS) as (keyof Measures)[]).every((key) => {
        if (!values[key]) return true;
        const value = Number(values[key]);
        return value >= LIMITS[key][0] && value <= LIMITS[key][1];
    });
    return hasBody && inRange;
}

// Haut de fourchette d'une taille : S/M compte comme M, la taille unique va jusqu'au XL
function upperBounds(size: string) {
    const name = size === 'One Size' ? 'XL' : size.split('/').pop();
    const row = [...standardSizes, ...numberedSizes].find((s) => s.size === name);
    if (!row) return null;
    const top = (range: string) => Number(range.split('-')[1]);
    return { poitrine: top(row.poitrine), taille: top(row.taille), hanches: top(row.hanches) };
}

// Première taille du modèle qui englobe toutes les mesures saisies
export function recommendSize(sizes: string[], values: Measures) {
    return sizes.find((size) => {
        const bounds = upperBounds(size);
        if (!bounds) return false;
        return (['poitrine', 'taille', 'hanches'] as const).every((key) => !values[key] || Number(values[key]) <= bounds[key]);
    }) ?? null;
}

// Estimation : la distance épaule-sol représente environ 82 % de la hauteur
export function fallNote(product: Product, size: string | null, values: Measures) {
    const length = lengthFor(size);
    const height = Number(values.hauteur);
    if (!length || !height || !['Robes', 'Abayas'].includes(product.category)) return null;
    const gap = height * 0.82 - Number(length);
    if (gap < 0) return `Longueur ${length} cm : elle peut toucher le sol pour ${height} cm.`;
    if (gap <= 10) return `Longueur ${length} cm : environ à la cheville pour ${height} cm.`;
    return `Longueur ${length} cm : au-dessus de la cheville pour ${height} cm.`;
}
