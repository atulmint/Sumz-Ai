import { FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmptySummaryState() {
    return (
        <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
                <FileText className="w-16 h-16 text-gray-400" />
                <h2 cy-data="empty-title" className="text-xl font-semibold text-gray-600">
                    No summaries yet
                </h2>
                <p className="text-gray-500 max-w-md">
                    Upload your first PDF to start using the power of AI to generate summaries.
                </p>
                <Link cy-data="link-to-upload" href="/upload">
                    <Button
                        variant="link"
                        className="mt-4 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:no-underline"
                    >
                        Create your first summary
                    </Button>
                </Link>
            </div>
        </div>
    );
}
