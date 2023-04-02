
export function getVariableType(variable: any): string {
    return Object.prototype.toString.call(variable).match(/\[object (.*?)\]/)![1];
}

export const isObject = (obj: any): boolean => getVariableType(obj) === 'Object';
export const isArray = (obj: any): boolean => getVariableType(obj) === 'Array';
export const isSymbol = (obj: any): boolean => getVariableType(obj) === 'Symbol';
export const isString = (obj: any): boolean => getVariableType(obj) === 'String';
export const isNumber = (obj: any): boolean => getVariableType(obj) === 'Number';
export const isBoolean = (obj: any): boolean => getVariableType(obj) === 'Boolean';
