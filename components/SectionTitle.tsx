export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="text-center mb-16 relative">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-rose-50/50 to-transparent -z-10 rounded-full w-32 h-32 mx-auto blur-3xl opacity-50"></div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight relative z-10 pb-4">
                {title}
                <span className="block w-24 h-1 bg-gradient-to-r from-rose-400 to-rose-200 mx-auto mt-4 rounded-full"></span>
            </h2>
            {subtitle && <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">{subtitle}</p>}
        </div>
    );
}
