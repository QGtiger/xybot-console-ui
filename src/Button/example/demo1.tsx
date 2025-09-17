import { Button, ThemeModel } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
        background: isDarkMode ? '#202127' : '#f4f4f7',
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button size="xs" type="border" />
        <Button size="sm" type="border" />
        <Button size="md" type="border" />
        <Button size="lg" type="border" />
        <Button size="xl" type="border" />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button size="xs" type="text" />
        <Button size="sm" type="text" />
        <Button size="md" type="text" />
        <Button size="lg" type="text" />
        <Button size="xl" type="text" />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button size="xs" type="base" />
        <Button size="sm" type="base" />
        <Button size="md" type="base" />
        <Button size="lg" type="base" />
        <Button size="xl" type="base" />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button size="xs" type="primary" />
        <Button size="sm" type="primary" />
        <Button size="md" type="primary" />
        <Button size="lg" type="primary" />
        <Button size="xl" type="primary" />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button size="xs" type="danger" />
        <Button size="sm" type="danger" />
        <Button size="md" type="danger" />
        <Button size="lg" type="danger" />
        <Button size="xl" type="danger" />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button size="xs" type="secondary" />
        <Button size="sm" type="secondary" />
        <Button size="md" type="secondary" />
        <Button size="lg" type="secondary" />
        <Button size="xl" type="secondary" />
      </div>
    </div>
  );
};
