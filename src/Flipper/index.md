# Flipper

翻牌器

```jsx
/**
 * defaultShowCode: true
 */
import { Flipper } from '@cnyballk/vui';
import { useEffect,useState } from 'react';

export default () => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    let ref = setTimeout(() => {
      setNum((num + 1) % 10);
    }, 1000);

    return () => {
      clearTimeout(ref);
    };
  }, [num]);
  return <Flipper backText={num} />;
};
```
