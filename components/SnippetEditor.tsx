'use client';

import Editor from '@monaco-editor/react';
import { useState, useEffect } from 'react';

export default function SnippetEditor({ defaultValue = '', defaultLanguage = 'typescript', code: externalCode }: { defaultValue?: string, defaultLanguage?: string, code?: string }) {
  const [code, setCode] = useState(defaultValue);
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    if (externalCode !== undefined) {
      setCode(externalCode);
    }
  }, [externalCode]);

  function handleEditorChange(value: string | undefined) {
    setCode(value || '');
  }

  useEffect(() => {
    if (code === defaultValue) return;
    const timer = setTimeout(async () => {
      if (!code.trim()) return;
      
      try {
        const response = await fetch('/api/detect-language', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const data = await response.json();
        if (data.language) {
          setLanguage(data.language);
        }
      } catch (error) {
        console.error("Failed to detect language", error);
      }
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="border rounded overflow-hidden pt-2 bg-[#1e1e1e]">
      <div className="px-4 py-1 text-xs text-gray-400 bg-[#1e1e1e] border-b border-gray-800">
        Detected: {language}
      </div>
      <Editor
        height="40vh"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
        }}
      />
      <input type="hidden" name="code" value={code} />
      <input type="hidden" name="language" value={language} />
    </div>
  );
}
