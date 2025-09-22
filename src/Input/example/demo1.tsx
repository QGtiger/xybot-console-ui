import { Input, InputRef, ThemeModel } from '@xybot/ui';
import { useEffect, useRef } from 'react';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      console.log(inputRef.current);
    }, 0);
  }, []);

  return <Input ref={inputRef} />;
};
