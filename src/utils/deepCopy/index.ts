import { isArray } from "../isType";

/**
 * 深拷贝
 * @param obj 拷贝对象
 */
export default function deepCopy<T>(obj: T): T {
    var objClone: any = isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if ((obj as any).hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepCopy(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}
