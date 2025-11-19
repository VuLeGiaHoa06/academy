import type { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Strikethrough,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignStart,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const options = [
    {
      icon: <Heading1 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }) ? "is-active" : "",
    },
    {
      icon: <Heading2 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }) ? "is-active" : "",
    },
    {
      icon: <Heading3 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }) ? "is-active" : "",
    },
    {
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold") ? "is-active" : "",
    },
    {
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic") ? "is-active" : "",
    },
    {
      icon: <Strikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike") ? "is-active" : "",
    },
    {
      icon: <TextAlignStart />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }) ? "is-active" : "",
    },
    {
      icon: <TextAlignCenter />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }) ? "is-active" : "",
    },
    {
      icon: <TextAlignEnd />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }) ? "is-active" : "",
    },
  ];

  return (
    <div className="border rounded-t-lg bg-slate-50 flex gap-2 p-1">
      {options.map((option, index) => (
        <Toggle key={index} onClick={option.onClick}>
          <span>{option.icon}</span>
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
