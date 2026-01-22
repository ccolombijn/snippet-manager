// components/SnippetDeleteButton.tsx
'use client';

import { deleteSnippet } from '@/app/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </form>
  );
}
