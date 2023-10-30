var _class;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class A {
  constructor(b = 2) {
    _defineProperty(this, "prop1", 1);
    _defineProperty(this, "method2", (...args) => {
      console.log(args);
    });
    this.prop2 = b;
  }
  method1() {
    console.log("method1");
  }
  static method3() {
    console.log("method3", this);
  }
}
_class = A;
_defineProperty(A, "method4", () => {
  console.log("method4", _class);
});