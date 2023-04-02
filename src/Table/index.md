# Table

## 基本使用

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Table, random } from '@cnyballk/vui';

const dataColumns = [
  {
    title: '排名',
    key: 'rank',
    render: (item, key, index, columns, actualRowIndex) => {
      const color = {
        0: '#F7DF57',
        1: '#F2AB57',
        2: '#F2AB57',
      };
      return (
        <span style={{ color: color[actualRowIndex] || '#fff' }}>
          {item[key]}
        </span>
      );
    },
  },
  {
    title: '机构名称',
    key: 'name',
  },
  {
    title: '总金额(亿)',
    key: 'number',
    render: (item, key) => (
      <div
        style={{ color: '#F7DF57', fontFamily: 'AgencyFB-Bold', fontSize: 36 }}
      >
        {item[key]}
      </div>
    ),
  },
];

const data = [
  {
    name: '平安保险公司',
    number: 283652,
  },
  {
    name: '太平洋保险公司',
    number: 261349,
  },
  {
    name: '中泰保险公司',
    number: 248615,
  },
  {
    name: 'XXX保险公司1',
    number: 198642,
  },
  {
    name: 'XXX保险公司2',
    number: 172532,
  },
  {
    name: 'XXX保险公司3',
    number: 165321,
  },
  {
    name: 'XXX保险公司4',
    number: 123841,
  },
  {
    name: 'XXX保险公司5',
    number: 123841,
  },
  {
    name: 'XXX保险公司6',
    number: 123441,
  },
  {
    name: 'XXX保险公司7',
    number: 122841,
  },
  {
    name: 'XXX保险公司8',
    number: 113841,
  },
].map((e, index) => ({
  ...e,
  rank: 'TOP ' + (index + 1),
  color: `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
}));

export default () => {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,.8)',
      }}
    >
      <Table
        rowGap={10}
        listProps={{ rowHeight: 45, autoHeight: true, hasLongList: false }}
        dataSource={data}
        columns={dataColumns}
        columnGap={10}
        scrollBody={{ showSize: 7, skipSize: 1, time: 5000 }}
      />
    </div>
  );
};
```
