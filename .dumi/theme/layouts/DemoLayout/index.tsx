import { useOutlet } from 'dumi';
import { ThemeProvider } from '../../../../src/components/ThemeProvider';

export default () => {
  const outlet = useOutlet();

  return <ThemeProvider>{outlet}</ThemeProvider>;
};
