import { lowerCase } from 'lodash-es'

/**
 * 获取对象自身可枚举属性的数组
 * @param {Record<string, any>} obj
 */
export function keysArray(obj) {
  return Object.keys(obj)
}

/**
 * 遍历对象的 key 值
 * @param {Record<string, any>} obj 目标对象
 * @param {(key: string, keys: string[]) => boolean} callback 遍历的回调
 * @returns 返回 true 可以提前停止遍历
 */
export function Objectkeys(obj, callback) {
  const keys = keysArray(obj)
  keys.some(key => callback(key, keys))
}

/**
 * 判断字符串是否相同
 * @param {string} str1
 * @param {string} str2
 * @description 判断忽略大小写
 */
export function strEquals(str1, str2) {
  return lowerCase(str1) === lowerCase(str2)
}

/**
 * 获取数字，如果不是数字或为空则返回 0
 * @param {string | number} value
 */
export function getCurrentNum(value) {
  if (isNaN(+value)) {
    return 0
  }
  return +value
}
