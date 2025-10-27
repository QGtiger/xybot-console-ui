import Placeholder from '@tiptap/extension-placeholder';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import './index.less';

export interface TipTapEditorProps {
  className?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
}

export function TipTapEditor(props: TipTapEditorProps) {
  const { className, placeholder = '请输入内容...', onChange } = props;
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('Editor content updated:', html);
      console.log('Editor JSON content:', editor.getJSON());
      onChange?.(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <button
        type="button"
        onClick={() => {
          console.log('toggling bold');
          // editor.chain().focus().toggleBold().run();
          editor.chain().focus().setFontSize('28px').run();
        }}
      >
        22
      </button>
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </div>
  );
}
