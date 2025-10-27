import React from 'react';

type ContentType = any;

type CommentItem<E> = {
  time: number;
  title: React.ReactNode;
  avatar: string;
  content: ContentType;
  children?: CommentItem<E>[];
} & E;

export type CommentListProps<E> = {
  items: CommentItem<E>[];

  renderAvatar?: (avatar: string) => React.ReactNode;
  renderContent?: (content: any) => React.ReactNode;

  onReplay?: (item: CommentItem<E>, replyContent: ContentType) => void;
};

export function CommentTree<E>(props: CommentListProps<E>) {
  console.log(props);
  return 111;
}

// type P = { id: string };

// <CommentTree<P>
//   items={[]}
//   onReplay={(it, c) => {
//     console.log(it.id);
//     console.log(c);
//   }}
// />;
