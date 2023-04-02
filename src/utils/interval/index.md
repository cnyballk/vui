# interval

## 描述

模拟定时器

## api

### setInterval

传入监听方法以及间隔时间开启一个定时器，并返回一个定时器 id

函数签名

   setInterval(
        fn: (...arg: any[]) => void | any,
        interval: number,
    ): number;

### clearInterval

传入定时器 id 以清除一个定时器

函数签名：

    clearInterval(id: number): void;
