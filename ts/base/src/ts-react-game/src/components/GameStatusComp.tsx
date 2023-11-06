import { ChessType, GameStatus } from "../types/enums";

interface IProps {
  // 当前状态 平局 红方赢 黑方赢等
  status: GameStatus
  // 下一个该落红子还是黑子
  next: ChessType.red | ChessType.black
}

export function GameStatusComp(props :IProps) {
  let content: JSX.Element;

  if(props.status === GameStatus.gaming) {
    if(props.next === ChessType.red) {
      content = <div className="next red">红方落子</div>
    } else {
      content = <div className="next black">黑方落子</div>
    }
  } else {
    if(props.status === GameStatus.redWin) {
      content = <div className="win red">红方胜利</div>
    } else if(props.status === GameStatus.blackWin) {
      content = <div className="win black">黑方胜利</div>
    } else {
      content = <div className="win equal">双方平局</div>
    }
  }

  return (
    <div className="status">
      {content}
    </div>
  )
}