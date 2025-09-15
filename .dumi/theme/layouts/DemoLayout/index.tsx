import { useOutlet } from 'dumi';
import { ThemeProvider } from '../../../../src';

export default () => {
  const outlet = useOutlet();

  return <ThemeProvider>{outlet}</ThemeProvider>;
};
