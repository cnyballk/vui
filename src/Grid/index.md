# Grid

## 基本使用

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Grid } from '@cnyballk/vui';

const Block = (props) => (
  <div style={{ height: 100, background: props.color }} />
);

export default () => {
  return (
    <Grid column={2} columnGap={20}>
      <Block color="red" />
      <Block color="#4569d4" />
    </Grid>
  );
};
```

## 竖向

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Grid } from '@cnyballk/vui';

const Block = (props) => (
  <div style={{ height: 100, background: props.color }} />
);

export default () => {
  return (
    <Grid column={2} type={1} rowGap={20}>
      <Block color="red" />
      <Block color="#4569d4" />
    </Grid>
  );
};
```

## 多行多列

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Grid } from '@cnyballk/vui';

const Block = (props) => (
  <div style={{ height: 100, background: props.color }} />
);

export default () => {
  return (
    <Grid column={2} type={1} rowGap={20}>
      <Grid column={3} columnGap={20}>
        <Block color="red" />
        <Block color="pink" />
        <Block color="gray" />
      </Grid>
      <Block color="#4569d4" />
    </Grid>
  );
};
```
