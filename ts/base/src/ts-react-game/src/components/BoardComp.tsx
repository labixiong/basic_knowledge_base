import { ChessType } from "../types/enums";
import { ChessComp } from "./ChessComp";
import '../assets/styles/board.css'
import React from 'react'

// 棋盘组件
interface IProps { 
  chesses: ChessType[]
  onClick?: (index: number) => void
  isGameOver?: boolean
}

export const BoardComp: React.FC<IProps> = function (props) {
  // 此时props的isGameOver属性类型判断为 布尔或者undefined
  // 但是它不可能为undefined，如果涉及到运算的话就会出现问题，所以此时应该加一下类型断言或者非空断言
  
  // 类型断言
  // const isGameOver = props.isGameOver as boolean
  // 非空断言
  const isGameOver = props.isGameOver!

  const list = props.chesses.map((type, i) =>
    <ChessComp
      key={i}
      type={type}
      onClick={() => {
        if(props.onClick && !isGameOver) {
          props.onClick(i)
        }
      }}
    ></ChessComp>
  )

  return (
    <div className="board">
      {list}
    </div>
  )
}

BoardComp.defaultProps = {
  isGameOver: false
}
