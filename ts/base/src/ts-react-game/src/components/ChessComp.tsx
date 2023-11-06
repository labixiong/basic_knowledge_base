// 单个棋子组件
import React from 'react'
import { ChessType } from "../types/enums"
import '../assets/styles/chess.css'

// 属性类型约束
interface IProps {
  type: ChessType
  onClick?: () => void
}

export function ChessComp({ type, onClick }: IProps) {
  let chess = null

  if(type === ChessType.red) {
    chess = <div className='red chess-item'></div>
  } else if(type === ChessType.black) {
    chess = <div className='black chess-item'></div>
  }

  return (
    <div className="chess" onClick={() => {
      if(type === ChessType.none && onClick) {
        onClick()
      }
    }}>
      {chess}
    </div>
  )
}