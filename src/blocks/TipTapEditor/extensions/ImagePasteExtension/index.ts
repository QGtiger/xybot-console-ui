import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';

export interface ImagePasteOptions {
  handlePasteImage: (view: EditorView, file: File) => void;
  handleDropImage?: (view: EditorView, file: File) => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ImagePasteExtension: {
      /**
       * 处理图片粘贴
       */
      handleImagePaste: (file: File) => ReturnType;
    };
  }
}

const ImagePasteExtension = Extension.create<ImagePasteOptions>({
  name: 'ImagePasteExtension',

  addOptions() {
    return {
      handlePasteImage: () => {
        console.warn('handlePasteImage 未实现');
      },
      handleDropImage: undefined,
    };
  },

  addProseMirrorPlugins() {
    const { handlePasteImage, handleDropImage } = this.options;

    const plugins = [];

    // 粘贴处理插件
    plugins.push(
      new Plugin({
        props: {
          handlePaste: (view: EditorView, event: ClipboardEvent) => {
            // 检查编辑器是否可编辑
            if (!view.editable) {
              return false;
            }
            const items = Array.from(event.clipboardData?.items || []);

            for (const item of items) {
              if (item.type.startsWith('image/')) {
                event.preventDefault();
                const file = item.getAsFile();
                if (file) {
                  handlePasteImage(view, file);
                }
                return true;
              }
            }
            return false;
          },
        },
      }),
    );

    // 拖拽处理插件（如果提供了处理函数）
    if (handleDropImage) {
      plugins.push(
        new Plugin({
          props: {
            handleDrop: (view: EditorView, event: DragEvent) => {
              // 检查编辑器是否可编辑
              if (!view.editable) {
                return false;
              }
              const files = Array.from(event.dataTransfer?.files || []);
              const imageFiles = files.filter((file) =>
                file.type.startsWith('image/'),
              );

              if (imageFiles.length > 0) {
                event.preventDefault();
                imageFiles.forEach((file) => {
                  handleDropImage(view, file);
                });
                return true;
              }
              return false;
            },
          },
        }),
      );
    }

    return plugins;
  },

  addCommands() {
    return {
      handleImagePaste:
        (file: File) =>
        ({ editor }) => {
          this.options.handlePasteImage(editor.view, file);
          return true;
        },
    };
  },
});

export default ImagePasteExtension;
