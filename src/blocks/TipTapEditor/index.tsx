import Placeholder from '@tiptap/extension-placeholder';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { EditorEvents, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import classNames from 'classnames';
import { EditorMenu, EditorMenuProps } from './EditorMenu';
import './index.less';

export interface TipTapEditorProps {
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  onChange?: (
    props: EditorEvents['update'] & {
      html: string;
    },
  ) => void;

  hiddenMenu?: boolean;
  menuProps?: EditorMenuProps;
}

export function TipTapEditor(props: TipTapEditorProps) {
  const {
    className,
    placeholder = '请输入内容...',
    menuProps,
    onChange,
    hiddenMenu,
    wrapperClassName,
  } = props;

  return (
    <div className={classNames('tiptap-editor', wrapperClassName)}>
      <EditorProvider
        slotBefore={hiddenMenu ? null : <EditorMenu {...menuProps} />}
        extensions={[
          StarterKit,
          TextStyleKit,
          Placeholder.configure({
            placeholder: placeholder,
          }),
        ]}
        editorProps={{
          attributes: {
            class: `tiptap-editor-content ${className || ''}`,
          },
        }}
        onUpdate={(p) => {
          const html = p.editor.getHTML();
          onChange?.({
            ...p,
            html,
          });
        }}
      ></EditorProvider>
    </div>
  );
}
