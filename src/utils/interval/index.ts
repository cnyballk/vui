import each from '../each';

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
interface IIntervalQueue {
  id: number;
  fn: Function;
  interval: number;
  lastTime: number;
}
let intervalQueue: IIntervalQueue[] = [],
  id = -1,
  ticking = false,
  tickId: number | null = null,
  now = Date.now;

export function setInterval(fn: Function, interval: number) {
  id++;
  intervalQueue.push({ id, fn, interval, lastTime: now() });
  if (!ticking) {
    let tick = function () {
      tickId = requestAnimationFrame(tick);
      each(intervalQueue, function (item) {
        if (item.interval < 17 || now() - item.lastTime >= item.interval) {
          item.fn();
          item.lastTime = now();
        }
      });
    };
    ticking = true;
    tick();
  }
  return id;
}

export function clearInterval(id: number) {
  let i = 0,
    len = intervalQueue.length;

  for (; i < len; i++) {
    if (id === intervalQueue[i].id) {
      intervalQueue.splice(i, 1);
      break;
    }
  }

  if (intervalQueue.length === 0) {
    cancelAnimationFrame(tickId as number);
    ticking = false;
  }
}
