export interface Product {
    id: string;
    name: string;
    price: number;
    sizes: string[];
    category: string;
    description: string;
    images: string[];
    featured: boolean;
    promotion: boolean;
    discountPrice?: number;
    colors?: string[];
    material?: string;
    careInstructions?: string;
    weight?: string;
    stock?: Record<string, number>;
}

export interface Promotion {
    id: string;
    title: string;
    description: string;
    code?: string;
    image: string;
    link: string;
}
