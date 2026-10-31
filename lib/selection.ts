"use client";

import { useSyncExternalStore } from 'react';
import { currentPrice, formatPrice, products } from '@/lib/catalog';
import { sizeLabel } from '@/lib/sizes';

export interface SelectionItem {
    productId: string;
    size: string;
    color?: string;
}

interface SelectionState {
    items: SelectionItem[];
    open: boolean;
}

const STORAGE_KEY = 'mastour-selection';
const EMPTY: SelectionState = { items: [], open: false };

let state: SelectionState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function emit(next: SelectionState) {
    state = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getSnapshot() {
    if (!loaded) {
        loaded = true;
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as SelectionItem[];
            // Écarte les références retirées du catalogue
            state = { items: stored.filter((i) => products.some((p) => p.id === i.productId)), open: false };
        } catch {
            state = EMPTY;
        }
    }
    return state;
}

export function useSelection() {
    return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function addToSelection(item: SelectionItem) {
    emit({ items: [...state.items, item], open: true });
}

export function removeFromSelection(index: number) {
    emit({ ...state, items: state.items.filter((_, i) => i !== index) });
}

export function setSelectionOpen(open: boolean) {
    emit({ ...state, open });
}

export function selectionTotal(items: SelectionItem[]) {
    return items.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? currentPrice(product) : 0);
    }, 0);
}

function describeItem(item: SelectionItem) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return '';
    const parts = [product.name];
    if (item.color) parts.push(`coloris ${item.color}`);
    parts.push(sizeLabel(item.size) === item.size ? `taille ${item.size}` : sizeLabel(item.size).toLowerCase());
    return `${parts.join(', ')} (réf. ${product.id}) : ${formatPrice(currentPrice(product))}`;
}

export function buildOrderMessage(items: SelectionItem[]) {
    if (items.length === 1) {
        return `Bonjour ! Je souhaite commander : ${describeItem(items[0])}. Est-ce disponible ? Merci !`;
    }
    const lines = items.map((item) => `- ${describeItem(item)}`).join('\n');
    return `Bonjour ! Je souhaite commander :\n${lines}\nTotal : ${formatPrice(selectionTotal(items))} hors livraison. Est-ce disponible ? Merci !`;
}

export async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}
