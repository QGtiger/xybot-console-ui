import { Command, mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import React from 'react';
import { fileManager } from './fileManage';
import { ImageUploadComponent } from './ImageUploadComponent';
import { UploadImageType } from './type';

export interface ImageUploadNodeOptions {
  onUploadImage?: UploadImageType;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ImageUploadNode: {
      addImageUploadNode: (src: string) => ReturnType;

      addImageUploadNodeWithFile: (file: File) => ReturnType;
    };
  }
}

export default Node.create<ImageUploadNodeOptions>({
  name: 'ImageUploadNode',
  group: 'block',
  draggable: true,
  atom: true,
  selectable: true,

  addOptions() {
    return {
      onUploadImage() {
        console.error('onUploadImage not implemented');
      },
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      fileId: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'image-upload-node',
      },
    ];
  },

  renderHTML({ HTMLAttributes }): any {
    return ['image-upload-node', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer((props) =>
      React.createElement(ImageUploadComponent, {
        ...props,
        uploadImage: this.options.onUploadImage!,
      }),
    );
  },

  addCommands() {
    return {
      addImageUploadNode:
        (src: string): Command =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src,
            },
          });
        },

      addImageUploadNodeWithFile:
        (file) =>
        ({ commands }) => {
          const nodeId = `image-upload-${Date.now()}-${Math.random()}`;
          fileManager.setFile(nodeId, file);
          return commands.insertContent({
            type: this.name,
            attrs: {
              fileId: nodeId,
            },
          });
        },
    };
  },
});
