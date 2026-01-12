// app/snippets/[id]/edit/page.tsx
import { db } from '@/app/db';
import { editSnippet } from '@/app/actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SnippetEditor from '@/components/SnippetEditor';

interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage({ params }: SnippetEditPageProps) {
  const { id } = await params;
  const idInt = parseInt(id);

  const snippet = await db.snippet.findFirst({
    where: { id: idInt },
  });

  if (!snippet) {
    return notFound();
  }

  const editSnippetAction = editSnippet.bind(null, snippet.id);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Snippet</h1>
      
      <form action={editSnippetAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold">Title</label>
          <input 
            name="title" 
            id="title" 
            className="border rounded p-2 bg-transparent"
            defaultValue={snippet.title}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="font-semibold">Code</label>
          <SnippetEditor defaultValue={snippet.code} />
        </div>

        <div className="flex gap-4 items-center mt-2">
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Save
            </button>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
                Cancel
            </Link>
        </div>
      </form>
    </div>
  );
}
