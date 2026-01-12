// components/SnippetDeleteButton.tsx
'use client';

import { deleteSnippet } from '@/app/actions';

export default function SnippetDeleteButton({ id }: { id: number }) {
  return (
    <form
      action={deleteSnippet.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm('Are you sure you want to delete this snippet?')) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </form>
  );
}
