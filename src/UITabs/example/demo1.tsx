import { Segmented, TabsProps, ThemeModel, UITabs } from '@xybot/ui';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
    icon: '🔥',
    // disabled: true,
  },
  {
    key: '4',
    label: 'Tab 4',
    children: 'Content of Tab Pane 4',
  },
];

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
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
      <UITabs size="small" items={items} />
      <UITabs size="middle" items={items} />
      <UITabs size="large" items={items} />

      <UITabs size="small" items={items} type="segment" />
      <UITabs
        size="middle"
        items={items}
        type="segment"
        segmentedProps={{
          vertical: true,
        }}
      />

      <Segmented<string>
        options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        onChange={(value) => {
          console.log(value); // string
        }}
      />
    </div>
  );
};
