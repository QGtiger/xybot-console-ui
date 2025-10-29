import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import './EmojiList.less';

export const EmojiList = forwardRef<any, any>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({ name: item.name });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(
    ref,
    () => {
      return {
        onKeyDown: (x: any) => {
          if (x.event.key === 'ArrowUp') {
            upHandler();
            return true;
          }

          if (x.event.key === 'ArrowDown') {
            downHandler();
            return true;
          }

          if (x.event.key === 'Enter') {
            enterHandler();
            return true;
          }

          return false;
        },
      };
    },
    [upHandler, downHandler, enterHandler],
  );

  if (!props.items.length) return null;

  return (
    <div className="dropdown-menu">
      {props.items.map((item: any, index: number) => (
        <button
          type="button"
          className={index === selectedIndex ? 'is-selected' : ''}
          key={index}
          onClick={() => selectItem(index)}
        >
          {item.fallbackImage ? <img src={item.fallbackImage} /> : item.emoji}:
          {item.name}:
        </button>
      ))}
    </div>
  );
});
