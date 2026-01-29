'use client';

import Editor from '@monaco-editor/react';
import { useState, useEffect } from 'react';

export default function SnippetEditor({ defaultValue = '', defaultLanguage = 'typescript', code: externalCode, onBlur, onLanguageChange }: { defaultValue?: string, defaultLanguage?: string, code?: string, onBlur?: (code: string) => void, onLanguageChange?: (language: string) => void }) {
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

  function handleEditorDidMount(editor: any) {
    editor.onDidBlurEditorText(() => {
      if (onBlur) {
        onBlur(editor.getValue());
      }
    });
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
          if (onLanguageChange) {
            onLanguageChange(data.language);
          }
        }
      } catch (error) {
        console.error("Failed to detect language", error);
      }
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="border border-blue-900 shadow-md shadow-blue-500/50 rounded overflow-hidden pt-2 bg-[#1e1e1e]">
      <div className="px-4 py-1 text-xs text-gray-400 bg-[#1e1e1e] border-b border-gray-800">
        Detected: {language}
      </div>
      <Editor
        height="40vh"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
        }}
      />
      <input type="hidden" name="code" value={code} />
      <input type="hidden" name="language" value={language} />
    </div>
  );
}
