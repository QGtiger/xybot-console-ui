import { ThemeModel, TipTapEditor, uploadFile } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        background: isDarkMode ? '#202127' : '#f4f4f7',
        padding: '16px',
      }}
    >
      <TipTapEditor
        onChange={console.log}
        content={`"<react-component count="0"></react-component>"<image-upload-node src="https://winrobot-pub-a.oss-cn-hangzhou.aliyuncs.com/static/1111.png"></image-upload-node><p></p>""`}
        onUploadImage={async (file, { onProgress, onSuccess }) => {
          onProgress?.(96);
          uploadFile({
            file,
            name: file.name,
          }).then((url) => {
            onSuccess?.(url);
          });
        }}
      />
    </div>
  );
};
