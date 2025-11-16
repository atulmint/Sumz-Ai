export default function Footer() {
    return (
        <footer className="bg-gray-50 py-12">
            <div className="py-12 lg:py-2 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8
            lg:pt-12">
                <div className="flex items-center gap-2 flex-col">
                    <h2 className="text-2xl font-bold text-blue-400">SumzAI &copy; 2025</h2>
                    <p className="text-gray-400 mt-2">Transform long content into clear summaries with artificial intelligence.</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 flex-col text-gray-400 mt-2">
                <a href="mailto:test@example.com">test@example.com</a>
            </div>
            
        </footer>
    );
}