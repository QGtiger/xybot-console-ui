import { Image } from 'antd';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function ImagePreviewer({ src, close }: { src: string; close: () => void }) {
  const [visible, setVisible] = useState(true);
  return (
    <Image
      style={{ display: 'none' }}
      preview={{
        visible,
        src,
        onVisibleChange: setVisible,
        afterOpenChange(open) {
          if (!open) {
            close();
          }
        },
      }}
    />
  );
}

export function showPreviewImage(src: string) {
  const ele = document.createElement('div');
  document.body.appendChild(ele);
  const root = createRoot(ele);
  root.render(
    <ImagePreviewer
      src={src}
      close={() => {
        root.unmount();
        ele.remove();
      }}
    />,
  );
}
