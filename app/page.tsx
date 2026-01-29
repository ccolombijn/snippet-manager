import { db } from './db';
import Link from 'next/link';
import SnippetDeleteButton from '@/components/SnippetDeleteButton';
import SnippetSearch from '@/components/SnippetSearch';
import CopyButton from '@/components/CopyButton';
import CodeBlock from '@/components/CodeBlock';
import QuoteGenerator from '@/components/QuoteGenerator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCode } from '@fortawesome/free-solid-svg-icons';

export default async function Home({
  
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  // Fetch data directly on the server
  const snippets = await db.snippet.findMany({
    where: {
      title: {
        contains: query || '',
      },
    },
  });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold"><FontAwesomeIcon icon={faCode} />Snippet Manager</h1>
        
        <Link 
          href="/snippets/new" 
          className="bg-linear-to-b from-blue-900 to-blue-500 shadow-lg shadow-blue-500/50 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          New
        </Link>
      </div>
      <QuoteGenerator />
      <SnippetSearch />

      <div className="flex flex-col gap-4">
        {snippets.length === 0 ? (
          <p className="text-gray-500">No snippets found.</p>
        ) : (
          snippets.map((snippet) => (
            <div key={snippet.id} className="p-4 rounded shadow-sm bg-background border border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg text-foreground">
                  <Link href={`/snippets/${snippet.id}`} className="hover:underline">
                    {snippet.title}
                  </Link>
                </h2>
                <div className="flex items-center gap-2">
                  <Link href={`/snippets/${snippet.id}/edit`} className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                  <SnippetDeleteButton id={snippet.id} />
                </div>
              </div>
              <div className="relative">
                <p className="text-sm text-gray-500">{snippet.language}</p>
                <CodeBlock code={snippet.code} language={snippet.language} />
                <CopyButton code={snippet.code} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}