import { MessageInstance, TypeOpen } from 'antd/es/message/interface';

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
export const MessageInsRef = {
  current: null as unknown as MessageInstance,
};

export const UIMessage = {} as MessageMethods;

MessageTypes.forEach((key) => {
  if (key === 'loading') {
    UIMessage[key] = (content, ...args) => {
      const contentJson = (() => {
        if (
          typeof content === 'object' &&
          content !== null &&
          'content' in content
        ) {
          return content;
        } else {
          return { content };
        }
      })();

      const ins = MessageInsRef.current?.[key](
        {
          ...contentJson,
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
    UIMessage[key] = (key) => {
      MessageInsRef.current?.destroy(key);
    };
  } else {
    UIMessage[key] = (...args) => {
      const ins = MessageInsRef.current?.[key](...args);
      return ins;
    };
  }
});
