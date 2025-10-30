import { Segmented, Tabs, TabsProps } from 'antd';

import classNames from 'classnames';
import './index.less';

export interface UITabsProps extends Omit<TabsProps, 'type'> {
  type?: 'line' | 'card' | 'editable-card' | 'segment';
  hiddeTabLine?: boolean;

  segmentedProps?: Omit<
    React.ComponentProps<typeof Segmented>,
    'options' | 'onChange' | 'value'
  >;
}

export function UITabs(props: UITabsProps) {
  const { type, hiddeTabLine, ...rest } = props;
  if (type === 'segment') {
    return (
      <Tabs
        {...rest}
        renderTabBar={(renderTabBarProps) => {
          if (!props.items) return <div>Tabs Segment 仅支持 items</div>;

          const options = props.items.map((it) => {
            return {
              ...it,
              label: it.label,
              value: it.key,
              disabled: it.disabled,
            };
          });

          // 返回Segmented组件替代默认标签栏
          return (
            <Segmented
              {...props.segmentedProps}
              size={props.size}
              options={options}
              value={props.activeKey}
              onChange={(key) => {
                renderTabBarProps.onTabClick?.(String(key), {} as any);
              }}
              style={{ marginBottom: 12 }}
            />
          );
        }}
        className={classNames('ui-tabs-segment', props.className)}
      />
    );
  }
  return (
    <Tabs
      {...rest}
      className={classNames(rest.className, { 'hide-tab-line': hiddeTabLine })}
      type={type}
    />
  );
}
