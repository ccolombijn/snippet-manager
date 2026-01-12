// components/CopyButton.tsx
'use client';

import { useState } from 'react';

export default function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 bg-blue-500 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-xs px-2 py-1 rounded transition-colors"
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
}
