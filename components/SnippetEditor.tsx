'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

export default function SnippetEditor({ defaultValue = '' }: { defaultValue?: string }) {
  const [code, setCode] = useState(defaultValue);

  function handleEditorChange(value: string | undefined) {
    setCode(value || '');
  }

  return (
    <div className="border rounded overflow-hidden pt-2 bg-[#1e1e1e]">
      <Editor
        height="40vh"
        defaultLanguage="typescript"
        theme="vs-dark"
        defaultValue={defaultValue}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
        }}
      />
      <input type="hidden" name="code" value={code} />
    </div>
  );
}
