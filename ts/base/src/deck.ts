import { Color, Mark } from "./enum/poker-enums";
import { Card, Joker, NormalCard } from "./types/poker-types";

// 定义发牌接口
interface PublishResult {
  p1: Deck,
  p2: Deck,
  p3: Deck,
  left: Deck
}

// 一副牌
export class Deck {
  private cards: Card[] = []

  constructor(cards?: Card[]) {
    if (cards) {
      this.cards = cards
    } else {
      this.init()
    }
  }

  // 初始化动作不需要外部知晓
  private init() {
    const marks = Object.values(Mark)
    const colors = Object.values(Color)

    for (const m of marks) {
      for (const c of colors) {
        let card: NormalCard = {
          color: c,
          mark: m,
          getString() {
            return this.color + this.mark
          }
        }

        // 如果直接将对象填充进去,会进行严格类型检查
        // 抽离出去赋值给变量,会进行类型兼容,就不会进行报错
        this.cards.push(card)

        // 要么进行类型断言
        // deck.push(<Card>{
        //   color: c,
        //   mark: m,
        //   getString() {
        //     return this.color + this.mark
        //   }
        // })
      }
    }

    let joker: Joker = {
      type: 'small',
      getString() {
        return 'joker'
      }
    }

    this.cards.push(joker)

    joker = {
      type: 'big',
      getString() {
        return 'JOKER'
      }
    }

    this.cards.push(joker)
  }

  print() {
    let result = "\n";
    this.cards.forEach((card, i) => {
      result += card.getString() + "\t";
      if ((i + 1) % 6 === 0) {
        result += "\n";
      }
    })
    console.log(result);
  }

  // 洗牌
  // 将当前下标的值和生成的随机下标的值进行交换
  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      const targetIndex = this.getRandom(0, this.cards.length)
      const temp = this.cards[i]
      this.cards[i] = this.cards[targetIndex]
      this.cards[targetIndex] = temp
    }
  }

  // 发牌
  publish(): PublishResult {
    let p1: Deck, p2: Deck, p3: Deck, left: Deck;
    p1 = this.takeCards(17)
    p2 = this.takeCards(17)
    p3 = this.takeCards(17)
    left = new Deck(this.cards)

    return {
      p1,
      p2,
      p3,
      left
    }
  }

  // 从当前一副牌里取出指定数量n 的牌
  private takeCards(n: number): Deck {
    const cards: Card[] = []
    for (let i = 0; i < n; i++) {
      cards.push(this.cards.shift() as Card)
    }

    return new Deck(cards)
  }

  /**
   * 产生随机数，无法取到最大值
   * @param min 最小值
   * @param max 最大值
   */
  private getRandom(min: number, max: number) {
    const dec = max - min
    return Math.floor(Math.random() * dec + max)
  }

}