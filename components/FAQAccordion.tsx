import { Plus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQAccordion({ questions }: { questions: FAQItem[] }) {
    return (
        <div className="border-t border-line">
            {questions.map((item) => (
                <details key={item.question} className="group border-b border-line">
                    <summary className="flex items-start justify-between gap-6 py-4 transition-colors hover:text-thread">
                        <span>{item.question}</span>
                        <Plus size={18} strokeWidth={1.5} className="plus mt-0.5 shrink-0" />
                    </summary>
                    <p className="max-w-[62ch] pb-5 text-[0.9375rem] leading-relaxed text-ink-soft">{item.answer}</p>
                </details>
            ))}
        </div>
    );
}
