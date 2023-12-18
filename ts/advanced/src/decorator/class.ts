import 'reflect-metadata'
import { validate, isNotEmpty } from 'class-validator'


type constructor = new (...args: any[]) => object

/**
 * 类装饰器
 * @param target 类
 * @param b 
 * @returns void || 新的类
 */
function test(target: constructor) {
  // console.log(target, 'target');
}

/**
 * 
 * @param target 
 * @param key 
 */
function d(target: any, key: any) {
  // console.log(target, key);
}

function enumrable(target: any, key: string, props: PropertyDescriptor) {
  console.log(target, key, props);
  props.enumerable = true
}


@test
class AA {
  @d
  prop1: string

  @enumrable
  method1() { }
}

const aa = new AA()

for (const key in aa) {
  console.log(key, 'key');
}