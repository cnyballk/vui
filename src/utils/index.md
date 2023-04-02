---
toc: content
---

## 介绍

常用工具函数

## 方法
 
### setInterval

循环定时器 返回定时器 id

参数:

| 参数名   | 类型     | 默认值 | 是否必填 | 描述           |
| -------- | -------- | ------ | -------- | -------------- |
| fn       | Function | -      | true     | 要执行的函数   |
| interval | number   | -      | true     | 多少毫秒后执行 |

返回值:

| 类型   | 描述      |
| ------ | --------- |
| number | 定时器 id |

```javascript
import { setInterval } from '@cnyballk/vui';

let i = 0;
// 开启定时器 返回定时器id
let time = setInterval(() => {
  console.log(++i); // 1,2,3,4,5...
}, 1000);
```

### clearInterval

清除循环定时器

参数:

| 参数名 | 类型   | 默认值 | 是否必填 | 描述                      |
| ------ | ------ | ------ | -------- | ------------------------- |
| id     | number | -      | true     | 开启循环定时器时返回的 id |

示例:

```javascript
import { setInterval, clearInterval } from '@cnyballk/vui';

let i = 0;
// 开启定时器 返回定时器id
let time = setInterval(() => {
  console.log(++i); // 1,2,3,4,5
  if (i === 5) {
    // 清除定时器
    clearInterval(time);
  }
}, 1000);
```

### random

生产范围随机整数**(但不包括上限值)**

参数:

| 参数名 | 类型   | 默认值 | 是否必填 | 描述   |
| ------ | ------ | ------ | -------- | ------ |
| lower  | number | -      | true     | 下限值 |
| upper  | number | -      | true     | 上限值 |

返回值:

| 类型   | 描述                                    |
| ------ | --------------------------------------- |
| number | 下限值到上限值之间的整数,但不包括上限值 |

示例:

```javascript
// 引入
import { random } from '@cnyballk/vui';

let num = random(0, 10);
console.log(num); // 0 ~ 9
```

### parseURL

解析 URL 地址

参数:

| 参数名 | 类型   | 默认值 | 是否必填 | 描述     |
| ------ | ------ | ------ | -------- | -------- |
| url    | string | -      | true     | url 地址 |

返回值:

| 类型   | 描述                     |
| ------ | ------------------------ |
| object | url 地址参数 JSON 格式化 |

示例:

```javascript
import { parseURL } from '@cnyballk/vui';

let obj = parseURL('https://www.baidu.com?a=cny&b=ball&c=k');
console.log(obj); // {a:1,b:2,c:3}
```



### isType

判断类型

参数:

| 参数名 | 类型 | 默认值 | 是否必填 | 描述       |
| ------ | ---- | ------ | -------- | ---------- |
| obj    | any  | -      | true     | 要判断的值 |

返回值:

| 类型    | 描述     |
| ------- | -------- |
| boolean | 是否正确 |

示例:

```javascript
import { isArray, isObject, isString, isSymbol, isBoolean, isNumber,getVariableType } from '@cnyballk/vui';

console.log(isArray([])); // true
console.log(isObject({})); // true
console.log(isString('')); // true
console.log(isSymbol(Symbol())); // true
console.log(isBoolean(true)); // true
console.log(isNumber(123)); // true
console.log(getVariableType({}) === 'Object'); // true
```

### deepCopy

深拷贝

参数:

| 参数名 | 类型   | 默认值 | 是否必填 | 描述 |
| ------ | ------ | ------ | -------- | ---- |
| obj    | object | array  | -        | true |

返回值:

| 类型   | 描述  |
| ------ | ----- |
| object | array |

示例:

```javascript
import { deepCopy } from '@cnyballk/vui';

let obj1 = { a: 1, b: 2 };
let obj2 = deepCopy(obj1);
obj2.a = 3;
console.log(obj1, obj2); // {a: 1, b: 2} {a: 3, b: 2}

let arr1 = [1, 2, 3];
let arr2 = deepCopy(arr1);
arr2.push(4);
console.log(arr1, arr2); // [1, 2, 3] [1, 2, 3, 4]
```

### throttle

节流函数

参数:

| 参数名 | 类型     | 默认值 | 是否必填 | 描述                           |
| ------ | -------- | ------ | -------- | ------------------------------ |
| fn     | Function | -      | true     | 要执行的函数                   |
| delay  | number   | 600    | false    | 执行过后多少毫秒后才能再次执行 |

返回值:

| 类型     | 描述                 |
| -------- | -------------------- |
| Function | 返回带节流效果的函数 |

示例:

```javascript
import { throttle } from '@cnyballk/vui';

let fn = throttle(() => console.log(111), 2000);
setTimeout(fn, 1000);
setTimeout(fn, 2000); // 111
setTimeout(fn, 3000);
setTimeout(fn, 4000); // 111
```

### debounce

防抖函数

参数:

| 参数名  | 类型     | 默认值 | 是否必填 | 描述             |
| ------- | -------- | ------ | -------- | ---------------- |
| fn      | Function | -      | true     | 要执行的函数     |
| delay   | number   | 600    | false    | 延迟多少毫秒执行 |
| isFirst | boolean  | true   | false    | 是否执行第一次   |

返回值:

| 类型     | 描述                 |
| -------- | -------------------- |
| Function | 返回带防抖效果的函数 |

示例:

```javascript
import { useEffect } from 'react';
import { debounce } from '@cnyballk/vui';

export default function IndexPage() {
  const handleChange = debounce(() => {
    console.log('做请求操作...');
  }, 1000);

  return <input type="text" onChange={handleChange} placeholder="请输入" />;
}
```

### each

循环

参数:

| 参数名 | 类型     | 默认值 | 是否必填 | 描述         |
| ------ | -------- | ------ | -------- | ------------ |
| arr    | array    | -      | true     | 要循环的数组 |
| fn     | Function | -      | true     | 要执行的函数 |

示例:

```javascript
import { each } from '@cnyballk/vui';

each([1, 2, 3, 4, 5], function (val, key, arr) {
  console.log(val, key, arr);
});
// 1 0 [1, 2, 3, 4, 5]
// 2 1 [1, 2, 3, 4, 5]
// 3 2 [1, 2, 3, 4, 5]
// 4 3 [1, 2, 3, 4, 5]
// 5 4 [1, 2, 3, 4, 5]
```

### formatDate

时间日期格式化

参数:

| 参数名 | 类型   | 默认值               | 是否必填 | 描述         |
| ------ | ------ | -------------------- | -------- | ------------ |
| time   | time   | new Date().getTime() | false    | 要转化的时间 |
| format | string | 'Y-M-D H:m:s'        | false    | 格式         |

返回值:

| 类型   | 描述         |
| ------ | ------------ |
| string | 转换后的格式 |

示例:

```javascript
import { formatDate } from '@cnyballk/vui';

formatDate(); // '2021-11-12 17:43:45'
formatDate(new Date().getTime(), 'Y-M-D'); // '2021-11-12'
formatDate(new Date().getTime(), 'H:m:s'); // '17:43:45'
formatDate(new Date(), 'Y/M/D H-m'); // '2021/11/12 18-00'
formatDate(1636711275233, 'Y/M/D H-m'); // '2021/11/12 18-01'
```
