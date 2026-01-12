// app/snippets/[id]/page.tsx
import { db } from '@/app/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SnippetDeleteButton from '@/components/SnippetDeleteButton';
import CopyButton from '@/components/CopyButton';

interface SnippetDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetDetailPage({ params }: SnippetDetailPageProps) {
  const { id } = await params;
  const idInt = parseInt(id);

  if (isNaN(idInt)) {
    return notFound();
  }

  const snippet = await db.snippet.findFirst({
    where: { id: idInt },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          &larr; Back to snippets
        </Link>
        
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{snippet.title}</h1>
            <div className="flex items-center gap-4">
                <Link href={`/snippets/${snippet.id}/edit`} className="text-blue-500 hover:text-blue-700">
                    Edit
                </Link>
                <SnippetDeleteButton id={snippet.id} />
            </div>
        </div>
      </div>

      <div className="relative border p-4 rounded bg-gray-50 dark:bg-zinc-900 shadow-sm">
         <pre className="p-2 rounded text-sm overflow-x-auto">
            <code className="font-mono text-foreground">{snippet.code}</code>
         </pre>
         <CopyButton code={snippet.code} />
      </div>
    </div>
  );
}
