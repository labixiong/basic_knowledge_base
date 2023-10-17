/**
 * 判断n是否是素数
 * @param {Number} n 
 */
export default function (n) {
  if(n < 2) {
    return false
  }

  for (let index = 2; index < n; index++) {
    if(n % index === 0) {
      return false
    }
  }

  return true
}