# interval

## 描述

列表的 diff

## api

### diff

传入新旧数组以及 key 字段，返回如何增删的顺序

函数签名

    interface Idiff<T> {
        index: number;
        type: number;  //0 是remove 1是插入
        item?: T;
    }

    diff(
    oldList: Array<T>,
    newList: Array<T>,
    key: (x: T) => any | string,
    ): Idiff<T>;
