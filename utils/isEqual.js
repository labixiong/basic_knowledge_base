function isEqual(value, other) {

  function isObjectLike(value) {
    return value != null && typeof value == 'object'
  }

  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other
  }

  const toStr = Object.prototype.toString,
    objTag = '[object Object]',
    arrTag = '[object Array]'

  if(((toStr.call(value) !== objTag) && (toStr.call(other) !== objTag)) || (toStr.call(value) !== arrTag) && (toStr.call(other) !== arrTag)) {

    return value === other || JSON.stringify(value) === JSON.stringify(other)
  }

  let valueKeys = Object.keys(value),
    otherKeys = Object.keys(other)

  if(valueKeys.length !== otherKeys.length) {
    return false
  }

  for (let i = 0; i < valueKeys.length; i ++) {
    let key = valueKeys[i]
    let item1 = value[key],
      item2 = other[key]

    if(((toStr.call(item1) === objTag) && (toStr.call(item2) === objTag)) || (toStr.call(item1) === arrTag) && (toStr.call(item2) === arrTag)) {
      // 值是对象则再次进行比较
      return isEqual(item1, item2)
    } else if(item1 === item2) {
      return true
    } else {
      return false
    }
  }
}

let obj1 = { 'b': { 'c': { 'd': 333 } } }
let obj2 = { 'b': { 'c': { 'd': 222 } } }

console.log(isEqual(obj1, obj2)); // false

let arr1 = [1,2,{'a': 12, 'b': [1,2,3]}]
let arr2 = [1,2,{'a': 12, 'b': [1,2,3]}]

console.log(isEqual(arr1, arr2)); // true


