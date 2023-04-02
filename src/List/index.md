# List

## 基本使用

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { List,random } from '@cnyballk/vui';

const Block = (props) => (
  <div
    style={{
      height: 50,
      color: props.color,
      border: `1px solid ${props.color}`,
    }}
  >
    {props.children}
  </div>
);
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
    <List
      rowKey="name"
      dataSource={data}
      rowHeight={50}
      renderItem={(data, dataIndex) => {
        return (
          <Block color={data.color}>
            [{data.rank}] {data.name}
          </Block>
        );
      }}
    />
  );
};
```
