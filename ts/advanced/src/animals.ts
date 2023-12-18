export abstract class Animal {
  abstract type: string

  constructor(
    public name: string,
    public age: number
  ) { }

  sayHello() {
    console.log(`我是${this.type},我叫${this.name},我今年${this.age}岁!!!`);
  }
}



export class Lion extends Animal {
  type: string = '狮子'
}

export class Tiger extends Animal {
  type: string = '老虎'
}

export class Monkey extends Animal implements Swim {
  type: string = '猴子'

  deepSwim(): void {
    console.log('我会潜泳');
  }
}

interface Swim {
  deepSwim(): void
}
