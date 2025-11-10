import { Button, Popover, UIPopover } from '@xybot/ui';
import React from 'react';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => (
  <div>
    <Popover content={content} title="Title">
      <Button type="primary">Hover me</Button>
    </Popover>
    <UIPopover content={content} open title="Title" placement="rightTop">
      <Button type="primary">Hover me (UIPopover)</Button>
    </UIPopover>
  </div>
);

export default App;
