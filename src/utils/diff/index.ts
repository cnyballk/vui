export interface Idiff<T> {
  index: number;
  type: number;
  item?: T;
}


export default function diff<T>(oldList: Array<T>, newList: Array<T>, key: (x: T) => any | string): Idiff<T>[] {
  let oldMap = makeKeyIndexAndFree(oldList, key);
  let newMap = makeKeyIndexAndFree(newList, key);

  let newFree = newMap.free;

  let oldKeyIndex = oldMap.keyIndex;
  let newKeyIndex = newMap.keyIndex;

  let moves: Idiff<T>[] = [];

  let children = [];
  let i = 0;
  let item;
  let itemKey;
  let freeIndex = 0;

  while (i < oldList.length) {
    item = oldList[i];
    itemKey = getItemKey(item, key);
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null);
      } else {
        let newItemIndex = newKeyIndex[itemKey];
        children.push(newList[newItemIndex]);
      }
    } else {
      let freeItem = newFree[freeIndex++];
      children.push(freeItem || null);
    }
    i++;
  }

  let simulateList = children.slice(0);

  i = 0;
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i);
      removeSimulate(i);
    } else {
      i++;
    }
  }

  let j = (i = 0);
  while (i < newList.length) {
    item = newList[i];
    itemKey = getItemKey(item, key);

    let simulateItem = simulateList[j];
    let simulateItemKey = getItemKey(simulateItem, key);

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++;
      } else {
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item);
        } else {
          let nextItemKey = getItemKey(simulateList[j + 1], key);
          if (nextItemKey === itemKey) {
            remove(i);
            removeSimulate(j);
            j++;
          } else {
            insert(i, item);
          }
        }
      }
    } else {
      insert(i, item);
    }

    i++;
  }

  let k = simulateList.length - j;
  while (j++ < simulateList.length) {
    k--;
    remove(k + i);
  }

  function remove(index) {
    let move = { index: index, type: 0 };
    moves.push(move);
  }

  function insert(index, item) {
    let move = { index: index, item: item, type: 1 };
    moves.push(move);
  }

  function removeSimulate(index) {
    simulateList.splice(index, 1);
  }

  return moves;
}

function makeKeyIndexAndFree<T>(list: Array<T>, key: (x: T) => any | string) {
  let keyIndex = {};
  let free: T[] = [];
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i];
    let itemKey = getItemKey(item, key);
    if (itemKey) {
      keyIndex[itemKey] = i;
    } else {
      free.push(item);
    }
  }
  return {
    keyIndex,
    free,
  };
}

function getItemKey<T>(item: T, key: (x: T) => any | string) {
  if (!item || !key) return void 666;
  return typeof key === 'string' ? item[key] : key(item);
}


