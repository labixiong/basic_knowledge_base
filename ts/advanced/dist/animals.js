"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monkey = exports.Tiger = exports.Lion = exports.Animal = void 0;
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(`我是${this.type},我叫${this.name},我今年${this.age}岁!!!`);
    }
}
exports.Animal = Animal;
class Lion extends Animal {
    constructor() {
        super(...arguments);
        this.type = '狮子';
    }
}
exports.Lion = Lion;
class Tiger extends Animal {
    constructor() {
        super(...arguments);
        this.type = '老虎';
    }
}
exports.Tiger = Tiger;
class Monkey extends Animal {
    constructor() {
        super(...arguments);
        this.type = '猴子';
    }
    deepSwim() {
        console.log('我会潜泳');
    }
}
exports.Monkey = Monkey;
