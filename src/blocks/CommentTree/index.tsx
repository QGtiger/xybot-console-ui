import React, { createContext, useContext, useRef } from 'react';

import IconFont from '@/common/IconFont';
import { UIButton, UILink } from '@/components';
import { formatRelativeTime } from '@/utils/date';
import { useBoolean, useRequest } from 'ahooks';
import { Avatar } from 'antd';
import { ContentType, TipTapEditor } from '../TipTapEditor';
import './index.less';

type CommentItemType<E> = {
  time: number;
  name: string;
  title: React.ReactNode;
  avatar?: string;
  content: ContentType;
  children?: CommentItemType<E>[];
} & E;

type ProviderProps<E = any> = {
  renderAvatar?: (item: CommentItemType<E>) => React.ReactNode;
  renderContent?: (content: any) => React.ReactNode;

  onReplay?: (
    item: CommentItemType<E>,
    replyContent: ContentType,
  ) => Promise<void>;
};

const CommentTreeContext = createContext<ProviderProps<object>>({});

function CommentEditor({ send }: { send(t: ContentType): Promise<void> }) {
  const tRef = useRef<ContentType>('');
  const { runAsync, loading } = useRequest(
    () => {
      return send(tRef.current);
    },
    {
      manual: true,
    },
  );
  return (
    <div className="comment-editor-wrapper">
      <TipTapEditor
        hiddenMenu
        className="comment-editor"
        onChange={(e) => {
          tRef.current = e.html;
        }}
      />
      <div className="">
        <UIButton type="primary" size="md" loading={loading} onClick={runAsync}>
          回复
        </UIButton>
      </div>
    </div>
  );
}

function CommentItem<E>(props: { item: CommentItemType<E> }) {
  const { avatar, title, time, name, content, children } = props.item;
  const [isReply, isReplyAction] = useBoolean(false);

  const { onReplay, renderAvatar, renderContent } =
    useContext(CommentTreeContext);

  return (
    <div className="comment-item-wrapper">
      <div className="comment-item">
        <div className="left">
          <div className="avatar-cont">
            {renderAvatar ? (
              renderAvatar(props.item)
            ) : (
              <Avatar src={avatar}>{name.charAt(0)}</Avatar>
            )}
          </div>
        </div>
        <div className="right">
          <div className="t">
            <div className="title">{title}</div>
            <div className="time">{formatRelativeTime(time)}</div>
          </div>
          <div className="comment-content">
            {renderContent ? (
              renderContent(content)
            ) : (
              <TipTapEditor
                hiddenMenu
                content={content}
                editable={false}
                className="p-0"
              />
            )}
          </div>
          <div className="bottom">
            <UILink
              color="secondary"
              className="reply-btn"
              onClick={isReplyAction.toggle}
            >
              <IconFont type="a-Messagecircle-md" />
              回复
            </UILink>
          </div>
          {isReply && (
            <CommentEditor
              send={async (t) => {
                await onReplay?.(props.item, t);
                isReplyAction.setFalse();
              }}
            />
          )}
        </div>
      </div>
      {children && (
        <div className="comment-item-children">
          {/* eslint-disable-next-line */}
          <CommmentList items={children} />
        </div>
      )}
    </div>
  );
}

function CommmentList<E>({
  items,
  indentSize = 24,
}: {
  items: CommentItemType<E>[];
  indentSize?: number;
}) {
  return (
    <div
      className="comment-list"
      style={{
        margin: `0 ${indentSize}px`,
      }}
    >
      {items.map((item, index) => (
        <CommentItem key={index} item={item} />
      ))}
    </div>
  );
}

export type CommentTreeProps<E> = {
  items: CommentItemType<E>[];
} & ProviderProps<E>;

export function CommentTree<E>(props: CommentTreeProps<E>) {
  console.log(props);
  const { items } = props;
  return (
    <div className="comment-tree-wrapper">
      {/* @ts-ignore */}
      <CommentTreeContext.Provider value={props}>
        <CommmentList items={items} indentSize={0} />
      </CommentTreeContext.Provider>
    </div>
  );
}

// type P = { id: string };

// <CommentTree<P>
//   items={[]}
//   onReplay={(it, c) => {
//     console.log(it.id);
//     console.log(c);
//   }}
// />;
