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
  const [title, setTitle] = useState('');
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

      if (!title) {
        const titleResponse = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ body: `Generate a short title for a code snippet with this description: ${description}. Just show the title and nothing else.` })
        });
        const titleData = await titleResponse.json();
        if (titleData.output) setTitle(titleData.output);
      }
    } catch (error) {
      console.error("Failed to generate code", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCodeBlur = async (code: string) => {
    console.log("Generating title from code...");
    //if (title || !code.trim()) return;
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: `Generate a short title for this code snippet. Just show the title and nothing else:\n${code.slice(0, 1000)}` })
      });
      const data = await response.json();
      if (data.output) setTitle(data.output);
    } catch (error) {
      console.error("Failed to generate title from code", error);
    }
  };

  const handleLanguageChange = (detectedLang: string) => {
    const match = LANGUAGES.find(l => l.toLowerCase() === detectedLang.toLowerCase());
    if (match) {
      setLanguage(match);
    } else {
      setLanguage(detectedLang);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Create a Snippet</h1>
      
      <form action={createSnippet} className="flex flex-col gap-4">
        
        {/* Manual Inputs */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold">Title</label>
          <input 
            name="title" 
            id="title" 
            className="border border-blue-900 shadow-lg shadow-blue-500/50 rounded p-2 bg-transparent"
            placeholder="e.g. Docker Config"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* AI Generator Section */}
        <div className="bg-gray-100 dark:bg-linear-to-b from-blue-950 to-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
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
              className="border border-blue-900 shadow-lg shadow-blue-500/50 rounded p-2 bg-transparent text-sm"
              placeholder="Describe the code you want to generate..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-2"> 
              <select 
                className="border border-blue-900 shadow-lg shadow-purple-600/50 rounded p-2 bg-transparent flex-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
              <button 
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-linear-to-b from-blue-900 to-purple-600 shadow-lg shadow-purple-500/50 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                <svg className="float-left" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
</svg> {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="font-semibold"><FontAwesomeIcon icon={faCode} />Code</label>
          <SnippetEditor code={generatedCode} onBlur={handleCodeBlur} 
          //onLanguageChange={handleLanguageChange} 
          />
        </div>

        <div className="flex gap-4 items-center mt-2">
            <button 
                type="submit" 
                className="bg-linear-to-b from-blue-900 to-blue-500 
                text-white px-6 py-2 rounded hover:bg-blue-600 shadow-lg shadow-blue-500/50"
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