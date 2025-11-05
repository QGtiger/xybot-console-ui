import { MessageInstance, TypeOpen } from 'antd/es/message/interface';

import './index.less';

type MessageMethods = {
  info: TypeOpen;
  success: TypeOpen;
  error: TypeOpen;
  warning: TypeOpen;
  destroy: (key?: React.Key) => void;
};

const MessageTypes = ['info', 'success', 'error', 'warning'] as const;

export const MessageInsRef = {
  current: null as unknown as MessageInstance,
};

export const UIMessage = {} as MessageMethods;

MessageTypes.forEach((key) => {
  UIMessage[key] = (...args) => {
    const ins = MessageInsRef.current?.[key](...args);
    return ins;
  };
});
