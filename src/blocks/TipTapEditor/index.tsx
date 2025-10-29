import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyleKit } from '@tiptap/extension-text-style';
import {
  EditorEvents,
  EditorProvider,
  EditorProviderProps,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { all, createLowlight } from 'lowlight';

import classNames from 'classnames';
// import css from 'highlight.js/lib/languages/css';
// import js from 'highlight.js/lib/languages/javascript';
// import ts from 'highlight.js/lib/languages/typescript';
// import html from 'highlight.js/lib/languages/xml';
import { EditorMenu, EditorMenuProps } from './EditorMenu';

import './index.less';

import { TipTapEmoji } from './extensions';
import './highlight-theme.less';
import './highlight.less';

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

export type ContentType = string;

export interface TipTapEditorProps {
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  content?: ContentType;
  onChange?: (
    props: EditorEvents['update'] & {
      html: string;
    },
  ) => void;

  hiddenMenu?: boolean;
  editable?: boolean;
  menuProps?: EditorMenuProps;

  editorProviderProps?: EditorProviderProps;
}

export function TipTapEditor(props: TipTapEditorProps) {
  const {
    className,
    placeholder = '请输入内容...',
    menuProps,
    onChange,
    hiddenMenu,
    wrapperClassName,
    content,
    editable = true,
    editorProviderProps,
  } = props;

  return (
    <div className={classNames('tiptap-editor', wrapperClassName)}>
      <EditorProvider
        {...editorProviderProps}
        slotBefore={hiddenMenu ? null : <EditorMenu {...menuProps} />}
        extensions={[
          StarterKit.configure({}),
          TextStyleKit,
          Placeholder.configure({
            placeholder: placeholder,
          }),
          CodeBlockLowlight.configure({
            lowlight,
            enableTabIndentation: true,
            tabSize: 2,
            HTMLAttributes: {
              class: 'hljs',
            },
          }),
          TipTapEmoji(),
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
        content={content}
        editable={editable}
      ></EditorProvider>
    </div>
  );
}

export function TipTapEditorViewer({ content }: { content: ContentType }) {
  return <TipTapEditor hiddenMenu content={content} editable={false} />;
}
