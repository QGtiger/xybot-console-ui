import { UIAlert } from '@xybot/ui';
import React from 'react';

const App: React.FC = () => (
  <>
    <UIAlert showIcon message="secondary Text" type="secondary" />
    <br />
    <UIAlert showIcon message="Success Text" type="success" />
    <br />
    <UIAlert showIcon message="Info Text" type="info" />
    <br />

    <UIAlert showIcon message="Warning Text" type="warning" />
    <br />
    <UIAlert showIcon message="Error Text" type="error" />
  </>
);

export default App;
