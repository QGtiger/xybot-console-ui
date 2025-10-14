import { Highlighter } from 'dumi-theme-antd-style';
import { FC } from 'react';
import {
  vs,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface SourceCodeProps {
  lang: string;
  children: string;
}

const SourceCode: FC<SourceCodeProps> = ({ children, lang }) => {
  return (
    <Highlighter
      syntaxThemes={{
        // shiki 的主题可以直接配置字符串
        shiki: {
          dark: 'dark-plus',
          light: 'github-light',
        },
        // prism 的主题配置需要引入对象
        prism: {
          dark: vscDarkPlus,
          light: vs,
        },
      }}
      language={lang}
    >
      {children}
    </Highlighter>
  );
};

export default SourceCode;
