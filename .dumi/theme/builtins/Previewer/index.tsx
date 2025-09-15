import OriginalPreview from 'dumi/theme-default/builtins/Previewer';
import { ThemeProvider } from '../../../../src/components/ThemeProvider';

export default function Previewer(props: any) {
  return (
    <ThemeProvider>
      <OriginalPreview {...props} />
    </ThemeProvider>
  );
}
