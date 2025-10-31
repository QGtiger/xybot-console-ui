import { IconFont } from '@/common';
import { UIButton, UIInput } from '@/components';
import { type Editor } from '@tiptap/react';

import { Form } from 'antd';

export function LinkPopoverContent({
  isActive,
  iconType,
  editor,
  close,
}: {
  isActive?: boolean;
  iconType: string;
  editor: Editor;
  close: () => void;
}) {
  const [form] = Form.useForm();
  const url = editor.getAttributes('link').href;
  const isContainedLink = !!url;
  const activeFlag = isActive || isContainedLink;

  const text = (() => {
    let t = '';
    // 获取当前选中的文字或链接的文字
    const { from, to } = editor.state.selection;
    if (isContainedLink) {
      const originalFrom = from;
      const originalTo = to;

      // 如果选区内已经包含 link，则扩展选区到整个 link 范围
      // 如果在 editor.state.selection 上直接获取文本，可能只会获取部分文本
      editor.chain().focus().extendMarkRange('link').run();

      const { from: linkFrom, to: linkTo } = editor.state.selection;
      t = editor.state.doc.textBetween(linkFrom, linkTo, ' ');
      editor.commands.setTextSelection({ from: originalFrom, to: originalTo });
    } else {
      // 如果是创建新链接，获取当前选中的文字
      t = editor.state.doc.textBetween(from, to, ' ');
    }
    return t;
  })();

  const onConfirm = () => {
    form.validateFields().then((values) => {
      const { url, text } = values;
      if (isContainedLink) {
        // 当前选区扩展到包含完整的 link 标记范围
        editor.chain().focus().extendMarkRange('link').run();
      }
      const currentPosFrom = editor.state.selection.from;
      editor
        .chain()
        .focus()
        .deleteSelection()
        .unsetMark('link')
        .insertContent(text)
        .setTextSelection({
          // 4. 选中刚插入的文本
          from: currentPosFrom,
          to: currentPosFrom + text.length,
        })
        .setLink({ href: url }) // 5. 给选中的文本设置链接
        .setTextSelection(currentPosFrom + text.length) // 6. 光标移到链接后面
        .unsetMark('link') // 7. 取消光标处的 link 标记
        .run();

      close();
    });
  };

  const onCancel = () => {
    if (isContainedLink) {
      // 取消 link
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    close();
  };

  return (
    <div className=" w-60 px-2 py-1">
      <div className="flex items-center gap-2">
        <IconFont type={iconType} />
        {activeFlag ? '编辑链接' : '插入链接'}
      </div>
      <Form
        form={form}
        layout="vertical"
        className="mt-2"
        colon={false}
        initialValues={{
          url,
          text,
        }}
        validateTrigger={['onBlur']}
      >
        <Form.Item
          name="url"
          label="链接地址"
          rules={[
            {
              required: true,
              message: '请输入链接地址',
            },
            {
              type: 'url',
              message: '请输入有效的链接地址',
            },
          ]}
        >
          <UIInput type="filledsecondary" placeholder="https://example.com" />
        </Form.Item>
        <Form.Item name="text" label="显示文本(可选)">
          <UIInput type="filledsecondary" placeholder="链接文本" />
        </Form.Item>
      </Form>
      <div className="flex gap-2  mt-4">
        <UIButton type="primary" className=" w-1 flex-1" onClick={onConfirm}>
          确定
        </UIButton>
        <UIButton
          type="border"
          className=" w-20 flex-shrink-0"
          onClick={onCancel}
        >
          {isContainedLink ? '取消链接' : '取消'}
        </UIButton>
      </div>
    </div>
  );
}
