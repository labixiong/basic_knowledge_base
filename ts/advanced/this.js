// TS中的this
var user = {
    name: 'zs',
    age: 18,
    sayHello: function () {
        console.log(this.age, this.name);
    }
};
var s = user.sayHello;
s();
var user2 = {
    name: 'zs',
    age: 18,
    sayHello: function () {
        console.log(this, this.name, this.age);
    }
};
var say = user2.sayHello;
// 此时下方代码就会报错 类型为“void”的 "this" 上下文不能分配给类型为“IUser”的方法的 "this"。
// say()
// 使用类的方式
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    User.prototype.sayHello = function () {
        console.log(this, this.name, this.age);
    };
    return User;
}());
var u = new User('zs', 18);
var say2 = u.sayHello;
// 此时代码不会报错，因为允许这样的调用方式，但是调用后会报错
say2();
