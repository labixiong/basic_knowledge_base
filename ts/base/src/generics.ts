// 泛型

// 函数使用泛型
function take<T = number>(arr: T[], n: number): T[] {
  if (n >= arr.length) {
    return arr
  }

  const newArr: T[] = []
  for (let i = 0; i < n; i++) {
    newArr.push(arr[i])
  }

  return newArr
}

const result = take<number>([1, 2, 34, 4, 5], 2)
console.log(result);


// 类型约束
interface HasNameProp {
  name: string
}
function nameToUpperCase<T extends HasNameProp>(obj: T): T {
  obj.name = obj.name.split(" ").map(s => s[0].toUpperCase() + s.substr(1)).join(" ")
  return obj
}

const o = {
  name: 'kevin yuan',
  age: 22,
  gender: "male"
}

nameToUpperCase(o)


// 多泛型
function mixinArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
  if (arr1.length !== arr2.length) {
    throw new Error('两个数组长度不等')
  }

  let result: (T | K)[] = []

  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i])
    result.push(arr2[i])
  }

  return result
}
