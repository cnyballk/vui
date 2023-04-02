/**
 * 返回地址的参数
 * 兼容 谷歌 51 以上
 * @param {string} url  网页地址
 */
export default function parseURL(url: Window['location']['search'] = window?.location?.search): any {
    const _url: any = new URL(url);
    const obj = {};
    for (let [key, value] of _url.searchParams.entries()) {
        obj[key] = value;
    }
    return obj;
}
