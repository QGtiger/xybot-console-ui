import IconFont from '@/common/IconFont';
import { type Editor, useCurrentEditor, useEditorState } from '@tiptap/react';
import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

import './index.less';

export type EditorMenuItems =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'code'
  | 'link'
  | 'image';
const allItems: EditorMenuItems[] = [
  'bold',
  'italic',
  'underline',
  'code',
  'link',
  'image',
];

const MenuItemIconMap: Record<EditorMenuItems, string> = {
  bold: 'Bold-sm',
  italic: 'Italic-sm',
  underline: 'Underline-sm',
  code: 'Code-sm',
  link: 'Link-sm',
  image: 'Image-sm',
};

function MenuItem(
  props: HTMLAttributes<HTMLButtonElement> & { iconType: string },
) {
  return (
    <button
      type="button"
      {...props}
      className={classNames('menu-item', props.className)}
    >
      <IconFont type={props.iconType} />
    </button>
  );
}

function useEditorStateByActiveKey(key: string, editor: Editor) {
  return useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive(key),
  });
}

const MenuItemsMap: Record<EditorMenuItems, FC<{ editor: Editor }>> = {
  bold: function Bold({ editor }) {
    const isActive = useEditorStateByActiveKey('bold', editor);
    return (
      <MenuItem
        className={classNames({
          active: isActive,
        })}
        iconType={MenuItemIconMap.bold}
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      />
    );
  },
  italic: function Italic({ editor }) {
    const isActive = useEditorStateByActiveKey('italic', editor);
    return (
      <MenuItem
        className={classNames({
          active: isActive,
        })}
        iconType={MenuItemIconMap.italic}
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      />
    );
  },
  underline: function Underline({ editor }) {
    const isActive = useEditorStateByActiveKey('underline', editor);
    return (
      <MenuItem
        className={classNames({
          active: isActive,
        })}
        iconType={MenuItemIconMap.underline}
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      />
    );
  },
  code: function Code({ editor }) {
    const isActive = useEditorStateByActiveKey('code', editor);
    return (
      <MenuItem
        className={classNames({
          active: isActive,
        })}
        iconType={MenuItemIconMap.code}
        onClick={() => {
          editor.chain().focus().toggleCode().run();
        }}
      />
    );
  },
  link: function Link({ editor }) {
    const isActive = useEditorStateByActiveKey('link', editor);
    return (
      <MenuItem
        className={classNames({
          active: isActive,
        })}
        iconType={MenuItemIconMap.link}
      />
    );
  },
  image: function Image({ editor }) {
    return (
      <MenuItem
        iconType={MenuItemIconMap.image}
        onClick={() => {
          // const url = window.prompt('Enter image URL');
          // if (url) {
          //   editor.chain().focus().setImage({ src: url }).run();
          // }
        }}
      />
    );
  },
};

function EditorMenuItem(props: { type: EditorMenuItems }) {
  const editorContentValue = useCurrentEditor();
  if (!editorContentValue.editor) return null;
  const M = MenuItemsMap[props.type];
  return <M editor={editorContentValue.editor} />;
}

export interface EditorMenuProps {
  items?: EditorMenuItems[];
}

export function EditorMenu(props: EditorMenuProps) {
  const { items = allItems } = props;

  return (
    <div className="editor-menu">
      {items.map((item) => (
        <EditorMenuItem key={item} type={item} />
      ))}
    </div>
  );
}
