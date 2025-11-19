"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface ReadTextProps {
  value?: string;
}

const ReadText = ({ value }: ReadTextProps) => {
  const [editable, setEditable] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit],
    editable,
    content: value,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full py-2">
      <EditorContent editor={editor} />
    </div>
  );
};

export default ReadText;
