# Menu

## 基本使用

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Menu } from '@cnyballk/vui';
import "./demo/demo.less";

const headerMenu: IMenu[] = [
  {
    label: '工程概况',
    msgs: [],
    unselectMsgs: [],
  },
  {
    label: '工程进度',
    msgs: [],
    unselectMsgs: [],
    children: [
      {
        label: '当前进度',
        msgs: [],
        unselectMsgs: [],
      },
      {
        label: '计划进度',
        msgs: [],
        unselectMsgs: [],
      },
      {
        label: '进度管理',
        msgs: [],
      },
    ],
  },
  {
    label: '施工疏解',
    msgs: [],
  },
  { label: '全景沙盘', url: '/shapan', msgs: [], isDisable: true },
];

export default () => {
  return (
    <Menu
      data={headerMenu}
      defaultSelectIndex={[0]}
      prefixClassName="header-menu"
    ></Menu>
  );
};
```
