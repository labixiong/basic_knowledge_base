import { Color, Mark } from "../enum/poker-enums"

// 定义牌 包含普通卡牌和大小王的通用属性
export interface Card {
  getString: () => string
}

// 普通卡牌
export interface NormalCard extends Card {
  color: Color
  mark: Mark
}

// 定义大小王
export interface Joker extends Card {
  type: "big" | "small"
}

// 一组牌
export type Deck = Card[]