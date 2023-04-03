# MotionPanel

## 基本使用

```jsx
/**
 * defaultShowCode: true
 * transform: true
 */
import React, { useState } from 'react';
import { MotionPanel } from '@cnyballk/vui';

const Block = (props) => (
  <div style={{ height: 100, background: props.color, width: 200 }} />
);

export default () => {
  const [show, setShow] = useState(true);
  return (
    <div style={{ height: 200 }}>
      <MotionPanel left={40} top={20} isShow={show}>
        <Block color="red" />
        <Block color="#4569d4" />
      </MotionPanel>
      <MotionPanel left={40} top={230} isShow={true}>
        <button
          onClick={() => {
            setShow(!show);
          }}
          style={{ height:30,width:100 }}
        >
          切换显隐
        </button>
      </MotionPanel>
    </div>
  );
};
```
