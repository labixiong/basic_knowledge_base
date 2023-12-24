const user = {
    name: 'zs',
    age: 18,
    sayHello() {
        console.log(this.age, this.name);
    }
};
const s = user.sayHello;
s();
const user2 = {
    name: 'zs',
    age: 18,
    sayHello() {
        console.log(this, this.name, this.age);
    }
};
const say = user2.sayHello;
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(this, this.name, this.age);
    }
}
const u = new User('zs', 18);
const say2 = u.sayHello;
