// 类
class User {
  // 类型描述
  readonly ids: number // 只读属性
  gender: "male" | "female" = "male"
  pid?: string // 可选,此种写法相当于联合类型 string | undefined
  private publishNum: number = 3// 外部不可访问
  private curPublishNum: number = 0

  constructor(public name: string, private _height: number) {
    this.ids = Math.random()
  }

  // 访问器
  set height(value: number) {
    if (value < 0) {
      this._height = 0
    } else if (value >= 200) {
      this._height = 200
    } else {
      this._height = value
    }
  }

  get height() {
    return this._height
  }

  publish(title: string) {

  }
}

const us = new User('zs', 18)
us.gender = 'female'

