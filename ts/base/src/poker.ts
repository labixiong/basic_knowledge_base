/**
 * 扑克牌小练习
 * 目标：创建一副扑克牌（不包括大小王），打印该扑克牌
 */
// type Color = "♥" | "♠" | "♦" | "♣"

import { Color, Mark } from './enum/poker-enums'
import { Deck, NormalCard, Joker } from './types/poker-types'


function createDeck(): Deck {
  const deck: Deck = []
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
      deck.push(card)

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

  deck.push(joker)

  joker = {
    type: 'big',
    getString() {
      return 'JOKER'
    }
  }

  deck.push(joker)

  return deck
}

function printDeck(deck: Deck) {
  deck.forEach(d => {
    console.log(d.getString())
  })
}

printDeck(createDeck())



