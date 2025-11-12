import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { NodeViewWrapper, type ReactNodeViewProps } from '@tiptap/react';
import { useReactive } from 'ahooks';
import { Progress, ProgressProps } from 'antd';
import { useEffect } from 'react';
import { fileManager, removeFile } from './fileManage';
import { UploadImageType } from './type';

const twoColors: ProgressProps['strokeColor'] = {
  '0%': 'var(--bg-base-spotlight)',
  '100%': 'var(--bg-base-spotlight-secondary)',
};

function UploadImageProgress({
  file,
  uploadImage,
  onSuc,
}: {
  file?: File;
  uploadImage: UploadImageType;
  onSuc: (url: string) => void;
}) {
  const viewModel = useReactive({
    progress: 0,
    state: !file ? 3 : 1, // 1 上传中 2 上传成功 3 上传失败
  });

  const { progress, state } = viewModel;
  const isUploading = state === 1;
  const isSuccess = state === 2;
  const isError = state === 3;

  const icon = (() => {
    if (isUploading) {
      return <LoadingOutlined />;
    } else if (isSuccess) {
      return <CheckCircleOutlined className=" text-textSuccess-default" />;
    } else {
      return <CloseCircleOutlined className=" text-textError-default" />;
    }
  })();

  useEffect(() => {
    if (file) {
      try {
        viewModel.state = 1;
        uploadImage?.(file, {
          onProgress: (percent) => {
            viewModel.progress = percent;
          },
          onSuccess(url) {
            viewModel.state = 2;
            onSuc(url);
          },
          onError() {
            viewModel.state = 3;
          },
        });
      } catch (error) {
        viewModel.state = 3;
      }
    }
  }, [file]);

  return (
    <div className=" box-border items-start flex gap-2 p-2 border w-full border-solid border-borderBase-secondary rounded-md">
      <div className="mt-1">{icon}</div>
      {file ? (
        <div className="flex flex-col w-full ">
          <div>{file.name}</div>
          <div className=" text-textBase-secondary text-xs">
            {(() => {
              if (isUploading) {
                return `上传中...`;
              } else if (isSuccess) {
                return '上传成功';
              } else if (isError) {
                return '上传失败';
              }
            })()}
          </div>
          <Progress
            className="w-full"
            percent={progress}
            showInfo={false}
            strokeColor={twoColors}
          />
        </div>
      ) : (
        <div className=" flex flex-col w-full ">
          <div className=" text-textBase-secondary text-xs">未选择文件</div>
        </div>
      )}
    </div>
  );
}

export function ImageUploadComponent(
  props: ReactNodeViewProps & {
    uploadImage: UploadImageType;
  },
) {
  const { uploadImage } = props;
  const { fileId, src } = props.node.attrs;

  const file = fileManager.getFile(fileId!);

  return (
    <NodeViewWrapper className="image-upload-node">
      {src ? (
        <img data-drag-handle className="w-full" src={props.node.attrs.src} />
      ) : (
        <UploadImageProgress
          onSuc={(url) => {
            props.updateAttributes({
              src: url,
              fileId: undefined,
            });
            removeFile(fileId!);
          }}
          file={file}
          uploadImage={uploadImage}
        />
      )}
    </NodeViewWrapper>
  );
}
