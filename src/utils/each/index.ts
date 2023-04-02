
function each<T>(arr: T[], fn: (value: T, index: number, array: T[]) => void) {
    if (Array.prototype.forEach) {
        arr.forEach(fn);
    } else {
        let i = 0,
            len = arr.length;
        for (; i < len; i++) {
            fn(arr[i], i, arr);
        }
    }
}
export default each;