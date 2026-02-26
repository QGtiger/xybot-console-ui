import { message } from 'antd';
import { MessageInstance, TypeOpen } from 'antd/es/message/interface';
import classNames from 'classnames';
import { UIDotLoading } from '../UISpin';
import './index.less';

type MessageMethods = {
  info: TypeOpen;
  success: TypeOpen;
  error: TypeOpen;
  warning: TypeOpen;
  loading: TypeOpen;
  destroy: (key?: React.Key) => void;
};

const MessageTypes = [
  'info',
  'success',
  'error',
  'warning',
  'loading',
  'destroy',
] as const;

const MessageInsRef = {
  current: message as unknown as MessageInstance,
};

export const UIMessage = {} as MessageMethods;

function normalizeContent(
  content: Parameters<TypeOpen>[0],
): Record<string, unknown> & { content?: React.ReactNode; className?: string } {
  if (typeof content === 'object' && content !== null && 'content' in content) {
    return { ...content };
  }
  return { content };
}

function mergeMessageClassName(
  type: string,
  options: Record<string, unknown> & { className?: string },
): string {
  return classNames('ui-message', `ui-message-${type}`, options.className);
}

MessageTypes.forEach((key) => {
  if (key === 'loading') {
    UIMessage[key] = (content, ...args) => {
      const contentJson = normalizeContent(content);
      const className = mergeMessageClassName(key, contentJson);

      const ins = MessageInsRef.current?.[key](
        {
          ...contentJson,
          content: contentJson.content,
          className,
          icon: (
            <UIDotLoading
              style={{
                marginRight: 8,
              }}
            />
          ),
        },
        ...args,
      );
      return ins;
    };
  } else if (key === 'destroy') {
    UIMessage[key] = (messageKey) => {
      MessageInsRef.current?.destroy(messageKey);
    };
  } else {
    UIMessage[key] = (content, ...args) => {
      const contentJson = normalizeContent(content);
      const className = mergeMessageClassName(key, contentJson);

      const ins = MessageInsRef.current?.[key](
        {
          ...contentJson,
          content: contentJson.content,
          className,
        },
        ...args,
      );
      return ins;
    };
  }
});
