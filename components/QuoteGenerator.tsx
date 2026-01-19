'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';

export default function QuoteGenerator() {
  const [output, setOutput] = useState('This is a nextjs project.');

  useEffect(() => {
    const generateText = async () => {
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: "Write a code related wisdom of the day. Just show the wisdom and nothing else (no prefix 'Wisdom:' or 'Code:')." })
        });

        const data = await response.json();

        if (response.ok) {
          const parsed = await marked.parse(data.output);
          setOutput(parsed);
        } else {
          setOutput(data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    generateText();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: output }} />
  );
}
