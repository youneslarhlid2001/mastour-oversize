"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    questions: FAQItem[];
}

export default function FAQAccordion({ questions }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="space-y-2">
            {questions.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <div
                        key={idx}
                        className={`border rounded-xl transition-all duration-300 ${isOpen
                                ? 'border-rose-200 bg-rose-50/30 shadow-sm'
                                : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                        >
                            <span className={`text-sm font-medium transition-colors ${isOpen ? 'text-rose-700' : 'text-gray-800'
                                }`}>
                                {item.question}
                            </span>
                            <ChevronDown
                                size={18}
                                className={`flex-shrink-0 transition-transform duration-300 ${isOpen
                                        ? 'rotate-180 text-rose-500'
                                        : 'text-gray-400'
                                    }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="px-5 pb-4">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
