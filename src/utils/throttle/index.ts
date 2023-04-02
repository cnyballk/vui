/**
 * @param  {Function}                 需要转成节流函数的函数
 * @param  {number}                   延迟时间（毫秒数）
 * @return {undefined}                无返回值
 */
export default function throttle(fn: any, delay: number = 600) {
    let prev = Date.now();

    return function (...rest: any[]) {
        const now = Date.now();
        if (now - prev >= delay) {
            fn.apply(fn, rest);
            prev = Date.now();
        }
    };
}