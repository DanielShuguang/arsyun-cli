import { cloneDeep, pick } from 'lodash-es'

/**
 * 清空表单，仅对对象第一层做处理
 * @template T
 * @param {T} target
 * @returns {T}
 */
export function formDataClean(target) {
  const obj = cloneDeep(target)
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      obj[key] = ''
    }
  })
  return obj
}

/**
 * 检查手机号合法性
 * @param {string} phone
 */
export function checkMobileNumber(phone) {
  const reg = /(1[3-9]\d{9}$)/
  return reg.test(phone)
}

/**
 * 检查邮箱的合法性
 * @param {string} email
 */
export function checkEmailFormat(email) {
  const reg =
    /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  return reg.test(email)
}

/**
 * 手机验证码合法性校验
 * @param {string} verify
 */
export function checkVerifyValidity(verify) {
  if (verify.length !== 4) {
    return false
  }
  if (isNaN(+verify)) {
    return false
  }
  return true
}

/**
 * 下载文件
 * @param {BlobPart} data 文件流
 * @param {string} fileName 文件名
 * @param {string} suffix 后缀名
 */
export function downloadFile(data, fileName, suffix) {
  const blob = new Blob([data])
  const fullName = fileName + suffix
  const elink = document.createElement('a')
  elink.download = fullName
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href)
  document.body.removeChild(elink)
}

/**
 * 筛选返回数据中的分页信息
 * @param {Record<string, any>} obj
 * @returns {Record<string, number>}
 */
export function pagerSetter(obj) {
  return pick(obj, ['page', 'page_size', 'total'])
}
