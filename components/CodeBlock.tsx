// components/CodeBlock.tsx
'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ code, language = 'typescript' }: { code: string, language?: string }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: '0.5rem 0',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
