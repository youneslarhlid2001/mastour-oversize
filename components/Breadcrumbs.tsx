import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center flex-wrap gap-1 text-xs text-gray-400">
                <li className="flex items-center gap-1">
                    <Link href="/" className="hover:text-rose-main transition-colors flex items-center gap-1">
                        <Home size={12} />
                        <span>Accueil</span>
                    </Link>
                </li>
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                        <ChevronRight size={12} className="text-gray-300" />
                        {item.href ? (
                            <Link href={item.href} className="hover:text-rose-main transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-600 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
