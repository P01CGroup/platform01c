'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Start writing...",
  className = ""
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      Bold,
      Italic,
      Strike,
      Underline,
      Code,
      TextStyle,
      Color,
      Highlight,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      HorizontalRule,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  // Handle file drops
  useEffect(() => {
    if (!editor) return;

    const handleDrop = async (event: DragEvent) => {
      event.preventDefault();
      
      const files = Array.from(event.dataTransfer?.files || []);
      const imageFile = files.find(file => file.type.startsWith('image/'));
      
      if (imageFile) {
        try {
          // Show loading state
          editor.chain().focus().setImage({ src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' }).run();
          
          // Upload via API
          const formData = new FormData();
          formData.append('file', imageFile);
          formData.append('type', 'inline');

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Upload failed');
          }

          const data = await response.json();
          const publicUrl = data.url;

          // Replace the placeholder with the actual image
          editor.chain().focus().setImage({ src: publicUrl }).run();
        } catch (error) {
          console.error('Image upload error:', error);
          alert('Failed to upload image. Please try again.');
          // Remove the placeholder image
          editor.chain().focus().deleteSelection().run();
        }
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      editorElement.classList.add('drag-over');
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      editorElement.classList.remove('drag-over');
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener('drop', handleDrop);
    editorElement.addEventListener('dragover', handleDragOver);
    editorElement.addEventListener('dragleave', handleDragLeave);

    return () => {
      editorElement.removeEventListener('drop', handleDrop);
      editorElement.removeEventListener('dragover', handleDragOver);
      editorElement.removeEventListener('dragleave', handleDragLeave);
    };
  }, [editor]);

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className={`min-h-[200px] p-4 border border-gray-300 bg-gray-50 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className={`min-h-[200px] p-4 border border-gray-300 bg-gray-50 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 w-3/4"></div>
        </div>
      </div>
    );
  }

  const addImage = async () => {
    // Create a file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          // Show loading state
          editor.chain().focus().setImage({ src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' }).run();
          
          // Upload via API
          const formData = new FormData();
          formData.append('file', file);
          formData.append('type', 'inline');

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Upload failed');
          }

          const data = await response.json();
          const publicUrl = data.url;

          // Replace the placeholder with the actual image
          editor.chain().focus().setImage({ src: publicUrl }).run();
        } catch (error) {
          console.error('Image upload error:', error);
          alert('Failed to upload image. Please try again.');
          // Remove the placeholder image
          editor.chain().focus().deleteSelection().run();
        }
      }
    };
    input.click();
  };

  const setLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const deleteColumn = () => editor.chain().focus().deleteColumn().run();
  const addRowBefore = () => editor.chain().focus().addRowBefore().run();
  const addRowAfter = () => editor.chain().focus().addRowAfter().run();
  const deleteRow = () => editor.chain().focus().deleteRow().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();

  return (
    <div className={`tiptap-editor ${className}`}>
      <div className="tiptap-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`toolbar-button ${editor.isActive('bold') ? 'is-active' : ''}`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`toolbar-button ${editor.isActive('italic') ? 'is-active' : ''}`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`toolbar-button ${editor.isActive('strike') ? 'is-active' : ''}`}
            title="Strike"
          >
            <s>S</s>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`toolbar-button ${editor.isActive('underline') ? 'is-active' : ''}`}
            title="Underline"
          >
            <u>U</u>
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`toolbar-button ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`toolbar-button ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`toolbar-button ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
            title="Numbered List"
          >
            1.
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`toolbar-button ${editor.isActive('blockquote') ? 'is-active' : ''}`}
            title="Quote"
          >
            "
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={setLink}
            className={`toolbar-button ${editor.isActive('link') ? 'is-active' : ''}`}
            title="Add Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={removeLink}
            className="toolbar-button"
            title="Remove Link"
          >
            🔗❌
          </button>
          <button
            type="button"
            onClick={addImage}
            className="toolbar-button"
            title="Add Image"
          >
            🖼️
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`toolbar-button ${editor.isActive('code') ? 'is-active' : ''}`}
            title="Inline Code"
          >
            {'</>'}
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`toolbar-button ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
            title="Code Block"
          >
            {'{ }'}
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={insertTable}
            className="toolbar-button"
            title="Insert Table"
          >
            ⊞
          </button>
          <button
            type="button"
            onClick={addColumnBefore}
            className="toolbar-button"
            title="Add Column Before"
          >
            ←
          </button>
          <button
            type="button"
            onClick={addColumnAfter}
            className="toolbar-button"
            title="Add Column After"
          >
            →
          </button>
          <button
            type="button"
            onClick={deleteColumn}
            className="toolbar-button"
            title="Delete Column"
          >
            ×
          </button>
          <button
            type="button"
            onClick={addRowBefore}
            className="toolbar-button"
            title="Add Row Before"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={addRowAfter}
            className="toolbar-button"
            title="Add Row After"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={deleteRow}
            className="toolbar-button"
            title="Delete Row"
          >
            ×
          </button>
          <button
            type="button"
            onClick={deleteTable}
            className="toolbar-button"
            title="Delete Table"
          >
            ⊟
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="toolbar-button"
            title="Horizontal Rule"
          >
            —
          </button>
        </div>
      </div>

      <div className="tiptap-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor; 