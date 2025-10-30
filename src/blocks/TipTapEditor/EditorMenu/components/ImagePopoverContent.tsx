import IconFont from '@/common/IconFont';
import { UITabs, UITabsProps } from '@/components';
import { useReactive } from 'ahooks';

function ImgFileUpload() {
  return <div>图片上传功能待开发</div>;
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
    <div className=" w-60 px-2 py-1">
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
