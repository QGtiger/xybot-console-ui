import { Editor, ThemeModel, TipTapEditor, uploadFile } from '@xybot/ui';
import { useRef } from 'react';

const content = `"<p>"</p><react-component count="0"></react-component><p>"</p><image-upload-node src="https://winrobot-pub-a.oss-cn-hangzhou.aliyuncs.com/static/1111.png" width="109" height="75" editable="true"></image-upload-node><p></p><p>""</p>"`;

export default () => {
  const { isDarkMode } = ThemeModel.useModel();

  const editorRef = useRef<Editor | null>(null);

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
        editorProviderProps={{
          onCreate(props) {
            editorRef.current = props.editor;
          },
        }}
        editable={false}
        hiddenMenu
        content={content}
      />

      <TipTapEditor
        onChange={(e) => {
          console.log(editorRef.current?.commands.setContent(e.html));
        }}
        content={content}
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
