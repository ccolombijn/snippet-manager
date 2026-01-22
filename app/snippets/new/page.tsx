'use client';

import { createSnippet } from '@/app/actions';
import Link from 'next/link';
import SnippetEditor from '@/components/SnippetEditor';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faCode } from '@fortawesome/free-solid-svg-icons';

const LANGUAGES = [
  "TypeScript", "JavaScript", "Python", "Java", "C#", "C++", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Dart", "HTML", "CSS", "Shell", "SQL", "Markdown", "JSON", "XML", "YAML", "Bash", "PowerShell", "C", "Objective-C", "R", "Perl", "Lua", "Haskell", "Elixir", "Erlang", "Scala", "Groovy"
];

export default function SnippetCreatePage() {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('TypeScript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAi, setShowAi] = useState(false);

  const handleGenerate = async () => {
    if (!description) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, language })
      });
      const data = await response.json();
      if (data.code) {
        setGeneratedCode(data.code);
      }
    } catch (error) {
      console.error("Failed to generate code", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Snippet</h1>
      
      <form action={createSnippet} className="flex flex-col gap-4">
        
        {/* Manual Inputs */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold">Title</label>
          <input 
            name="title" 
            id="title" 
            className="border rounded p-2 bg-transparent"
            placeholder="e.g. Docker Config"
          />
        </div>

        {/* AI Generator Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
          <button 
            type="button" 
            onClick={() => setShowAi(!showAi)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-sm uppercase text-gray-500"><FontAwesomeIcon icon={faWandMagicSparkles} /> Generate Code with AI</h3>
            <span className="text-gray-500">{showAi ? '−' : '+'}</span>
          </button>
          {showAi && <div className="flex flex-col gap-3 mt-3">
            <textarea
              className="border rounded p-2 bg-transparent text-sm"
              placeholder="Describe the code you want to generate..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-2">
              <select 
                className="border rounded p-2 bg-transparent flex-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
              <button 
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="font-semibold"><FontAwesomeIcon icon={faCode} />Code</label>
          <SnippetEditor code={generatedCode} />
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