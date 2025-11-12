import { Editor, EditorContextValue, useCurrentEditor } from '@tiptap/react';

export function useMenuEdtior(): [Editor, EditorContextValue] {
  const editorContentValue = useCurrentEditor();
  if (!editorContentValue || !editorContentValue.editor) {
    throw new Error('useMenuEdtior 必须在 EditorProvider 内使用');
  }

  return [editorContentValue.editor, editorContentValue] as const;
}
