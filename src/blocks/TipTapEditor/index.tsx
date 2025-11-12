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
import CustomNode from './extensions/CustomNode';
import ImagePasteExtension from './extensions/ImagePasteExtension';
import ImageUploadNode, {
  ImageUploadNodeOptions,
} from './extensions/ImageUploadNode';
import { addFile } from './extensions/ImageUploadNode/fileManage';
import { LinkExtension } from './extensions/link';
import './highlight-theme.less';
import './highlight.less';

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

export type ContentType = string;

export type TipTapEditorProps = {
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
} & ImageUploadNodeOptions;

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
    onUploadImage,
  } = props;

  return (
    <div className={classNames('tiptap-editor', wrapperClassName)}>
      <EditorProvider
        {...editorProviderProps}
        slotBefore={hiddenMenu ? null : <EditorMenu {...menuProps} />}
        extensions={[
          StarterKit.configure({
            // 需要配置 link 扩展，否则和自定义的 link 冲突
            link: false,
            codeBlock: false,
          }),
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
          LinkExtension({
            openOnClick: !editable,
          }),
          CustomNode,
          ImageUploadNode.configure({
            onUploadImage,
            editable,
          }),
          ImagePasteExtension.configure({
            handlePasteImage: (view, file) => {
              const { state, dispatch } = view;
              const { selection } = state;
              const { from, to } = selection;

              // 插入图片节点
              const node = state.schema.nodes.ImageUploadNode.create({
                fileId: addFile(file), // 可以根据需要设置 fileId
              });

              const transaction = state.tr.replaceRangeWith(from, to, node);
              dispatch(transaction);

              // 这里可以调用上传接口，上传成功后更新节点的 src 属性为正式的 URL
              return true;
            },
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
        content={content}
        editable={editable}
      ></EditorProvider>
    </div>
  );
}

export function TipTapEditorViewer({ content }: { content: ContentType }) {
  return <TipTapEditor hiddenMenu content={content} editable={false} />;
}

export * from '@tiptap/react';
