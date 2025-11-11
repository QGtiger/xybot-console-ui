import { IconFont } from '@/common';
import { UITabs, UITabsProps } from '@/components';
import { useReactive } from 'ahooks';
import { Upload } from 'antd';
import { useState } from 'react';
import { MenuModel } from '../model';

function UploadImageProgress({ file }: { file?: File }) {
  const { uploadImage } = MenuModel.useModel();
  const viewModel = useReactive({
    progress: 0,
    uploading: false,
    error: '',
  });

  if (!file) return null;
  return <div>{file?.name}</div>;
}

function ImgFileUpload() {
  const [file, setFile] = useState<File>();
  const accept = '.jpg,.jpeg,.png,.gif,.bmp,.webp';
  return (
    <div className=" flex flex-col gap-1">
      <Upload.Dragger
        accept={accept}
        showUploadList={false}
        beforeUpload={(f) => {
          setFile(f);
          return false;
        }}
        className="relative h-[160px] block  p-0"
      >
        <div className="  h-full flex flex-col items-center justify-center text-textBase-secondary">
          <IconFont
            className="text-[30px] text-text-base-tertiary -mt-2"
            type="icon-Upload-xl"
          />
          <div className="flex flex-col items-center justify-center">
            <span className=" font-[450] ">
              模板填写完成后，点击或拖拽文件到此处
            </span>
            <span className=" text-textBase-tertiary">
              仅支持 {accept} 文件
            </span>
          </div>
        </div>
      </Upload.Dragger>
      <UploadImageProgress file={file} />
    </div>
  );
}

export function ImagePopoverContent() {
  const viewModel = useReactive({
    tab: 'file' as 'file' | 'url',
  });
  const { tab } = viewModel;

  const items: UITabsProps['items'] = [
    {
      label: '上传图片',
      key: 'file',
      children: <ImgFileUpload />,
    },
    {
      label: '图片链接',
      key: 'url',
      children: <div className="mt-2">图片链接功能待开发</div>,
    },
  ];

  return (
    <div className=" w-[400px] px-2 py-1">
      <div className="flex items-center gap-2">
        <IconFont type="Image-sm" />
        插入图片
      </div>
      <UITabs
        type="segment"
        activeKey={tab}
        items={items}
        onChange={(key) => {
          viewModel.tab = key as any;
        }}
        segmentedProps={{
          block: true,
        }}
        className="mt-2"
      />
    </div>
  );
}
