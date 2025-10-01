"use client";

import { useState } from "react";

interface CodeFormatterProps {
  themeColor: string;
  code?: string;
  language?: string;
}

export function CodeFormatter({ themeColor, code: initialCode, language: initialLanguage }: CodeFormatterProps) {
  const [code, setCode] = useState(initialCode || `function greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));`);
  const [language, setLanguage] = useState(initialLanguage || "javascript");
  const [copied, setCopied] = useState(false);

  const languages = [
    { value: "javascript", label: "JavaScript", icon: "📜" },
    { value: "typescript", label: "TypeScript", icon: "📘" },
    { value: "python", label: "Python", icon: "🐍" },
    { value: "html", label: "HTML", icon: "🌐" },
    { value: "css", label: "CSS", icon: "🎨" },
    { value: "json", label: "JSON", icon: "📋" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCode = () => {
    // Simple beautification (in production, you'd use prettier or similar)
    try {
      if (language === "json") {
        const parsed = JSON.parse(code);
        setCode(JSON.stringify(parsed, null, 2));
      } else {
        // Basic indentation fix for demo purposes
        const lines = code.split('\n');
        let indent = 0;
        const formatted = lines.map(line => {
          const trimmed = line.trim();
          if (trimmed.endsWith('{') || trimmed.endsWith('[')) {
            const result = '  '.repeat(indent) + trimmed;
            indent++;
            return result;
          } else if (trimmed.startsWith('}') || trimmed.startsWith(']')) {
            indent = Math.max(0, indent - 1);
            return '  '.repeat(indent) + trimmed;
          }
          return '  '.repeat(indent) + trimmed;
        }).join('\n');
        setCode(formatted);
      }
    } catch (e) {
      // If formatting fails, keep original
    }
  };

  return (
    <div 
      style={{ backgroundColor: themeColor }} 
      className="backdrop-blur-sm rounded-xl p-6 mt-4 mb-4 max-w-2xl w-full border border-white/20 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">💻 Code Formatter</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={formatCode}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Format
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              language === lang.value
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            {lang.icon} {lang.label}
          </button>
        ))}
      </div>

      {/* Code editor */}
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-white/10 shadow-inner">
        <div className="bg-gray-800/50 px-4 py-2 flex items-center gap-2 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs text-white/50 ml-2">{language}</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 bg-transparent text-green-300 font-mono text-sm resize-none focus:outline-none"
          style={{ 
            caretColor: '#fff',
            tabSize: 2,
          }}
          spellCheck={false}
        />
        <div className="bg-gray-800/50 px-4 py-2 border-t border-white/10">
          <div className="text-xs text-white/40">
            Lines: {code.split('\n').length} | Characters: {code.length}
          </div>
        </div>
      </div>
    </div>
  );
}

