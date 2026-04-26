"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Quote,
  Undo,
  Redo,
  Minus,
} from "lucide-react";

const Tiptap = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none  min-h-[150px] max-h-[400px]  p-1",
      },
    },
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

useEffect(() => {
  if (editor && value) {
    editor.commands.setContent(value || "");
  }
}, [editor, value]);


  const handleFormat = (command, value) => {
    if (!editor) return;
    const chain = editor.chain().focus();
    switch (command) {
      case "bold":
        chain.toggleBold().run();
        break;
      case "italic":
        chain.toggleItalic().run();
        break;
      case "heading":
        chain.toggleHeading({ level: value }).run();
        break;
      case "bulletList":
        chain.toggleBulletList().run();
        break;
      case "orderedList":
        chain.toggleOrderedList().run();
        break;
      case "codeBlock":
        chain.toggleCodeBlock().run();
        break;
      case "blockquote":
        chain.toggleBlockquote().run();
        break;
      case "hr":
        chain.setHorizontalRule().run();
        break;
      case "undo":
        chain.undo().run();
        break;
      case "redo":
        chain.redo().run();
        break;
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <h2 className="text-sm font-semibold">Description</h2>
      <div className="flex flex-wrap gap-1 p-2 cursor-pointer border rounded-lg bg-gray-50 ">
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          className="p-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("italic")}
          className="p-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("heading", 1)}
          className="p-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("heading", 2)}
          className="p-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("undo")}
          className="p-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("redo")}
          className="p-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <Redo size={18} />
        </button>
      </div>

      <EditorContent
        editor={editor}
        placeholder="Start typing..."
        className="min-h-[150px] max-h-[400px]  overflow-auto border rounded-lg  bg-white text-sm leading-relaxed shadow"
      />
    </div>
  );
};

export default Tiptap;
