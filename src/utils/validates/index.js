// src/utils/index.js
// src/utils/validates.js

/* 姓名校验 由2-10位汉字组成 */
export function validateUsername(str) {
  const reg = /^[\u4e00-\u9fa5]{2,10}$/
  return reg.test(str)
}

/* 手机号校验 由以1开头的11位数字组成  */
export function validatePhone(str) {
  const reg = /^[1][3-9][0-9]{9}$/
  return reg.test(str)
}

/* 密码校验强度长度校验 */
// export const validatePsdReg = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('请输入密码'))
//   }
//   if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
//     callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
//   } else {
//     callback()
//   }
// }

export function validatePsdReg(str) {
  const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){8,18}$/
  return reg.test(str)
}
