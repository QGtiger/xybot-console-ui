import OriginalPreview from 'dumi/theme-default/builtins/Previewer';
import { ThemeProvider } from '../../../../src';

export default function Previewer(props: any) {
  return (
    <ThemeProvider
      componentConfig={{
        uiSelect: {
          type: 'filledbase',
        },
        uiInput: {
          type: 'filledbase',
        },
      }}
    >
      <OriginalPreview {...props} />
    </ThemeProvider>
  );
}
