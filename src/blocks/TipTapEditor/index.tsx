import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit'

export function TipTapEditor() {
  const editor = useEditor({
    extensions: [],
    content: `
      <h2>欢迎使用 Tiptap！🚀</h2>
      <p>这是一个基础的富文本编辑器示例。</p>
      <ul>
        <li>支持 <strong>加粗</strong> 和 <em>斜体</em></li>
        <li>支持列表和标题</li>
        <li>试试输入 <code>## 空格</code> 创建标题</li>
      </ul>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  );
}
