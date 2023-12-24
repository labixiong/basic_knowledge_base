class Chess {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    move(targetX, targetY) {
        console.log('1.判断是否出界');
        console.log('2. 目标位置是否有己方棋子');
        if (this.rule(targetX, targetY)) {
            this.x = targetX;
            this.y = targetY;
            console.log(`${this.name}移动成功`);
            return true;
        }
        return false;
    }
}
class Horse extends Chess {
    constructor() {
        super(...arguments);
        this.name = '马';
    }
    rule(targetX, targetY) {
        return true;
    }
}
class Gun extends Chess {
    get name() {
        return '炮';
    }
    rule(targetX, targetY) {
        return true;
    }
}
class Car extends Chess {
    constructor() {
        super();
        this.name = '车';
    }
    rule(targetX, targetY) {
        return true;
    }
}
class Board {
    constructor() { }
    static createBoard() {
        if (this._board) {
            return this._board;
        }
        this._board = new Board();
        return this._board;
    }
}
const b2 = Board.createBoard();
const b3 = Board.createBoard();
console.log(b2 === b3);
class Index {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() { }
}
const i = new Index('zs', 18);
console.log(i['id']);
class MyArray {
    constructor() {
        this[0] = 'asdfsd';
        this[1] = 'asdfsd';
        this[2] = 'xfbd';
    }
}
const arr = new MyArray();
arr[4] = 'sdgsfd';
class B {
}
class A {
}
const a = new A();
a[0] = 'gsdg';
a['asdgsd'] = 'gsdg';
console.log(a);
