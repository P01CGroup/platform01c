'use client'

import { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Enter content...",
  className = ""
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateValue();
  };

  const updateValue = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    updateValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            execCommand('redo');
          } else {
            e.preventDefault();
            execCommand('undo');
          }
          break;
      }
    }
    
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      execCommand('insertLineBreak');
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertList = (type: 'ordered' | 'unordered') => {
    execCommand(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const toolbarButtons = [
    { label: 'B', command: 'bold', title: 'Bold (Ctrl+B)' },
    { label: 'I', command: 'italic', title: 'Italic (Ctrl+I)' },
    { label: 'U', command: 'underline', title: 'Underline (Ctrl+U)' },
    { label: 'S', command: 'strikeThrough', title: 'Strikethrough' },
    { label: 'H1', command: 'formatBlock', value: '<h1>', title: 'Heading 1' },
    { label: 'H2', command: 'formatBlock', value: '<h2>', title: 'Heading 2' },
    { label: 'H3', command: 'formatBlock', value: '<h3>', title: 'Heading 3' },
    { label: 'P', command: 'formatBlock', value: '<p>', title: 'Paragraph' },
    { label: '•', command: 'insertUnorderedList', title: 'Bullet List' },
    { label: '1.', command: 'insertOrderedList', title: 'Numbered List' },
    { label: '🔗', command: 'link', title: 'Insert Link', custom: insertLink },
    { label: '📄', command: 'removeFormat', title: 'Clear Formatting' },
  ];

  return (
    <div className={`border border-gray-300 rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 bg-gray-50 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={() => button.custom ? button.custom() : execCommand(button.command, button.value)}
            title={button.title}
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-dark focus:border-dark"
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateValue}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsToolbarVisible(true)}
        onBlur={() => setIsToolbarVisible(false)}
        className="p-3 min-h-[200px] focus:outline-none focus:ring-0"
        style={{
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
        data-placeholder={placeholder}
      />
      
      {/* Placeholder styling */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
} 