// 游戏组件
import React from 'react'
import { ChessType, GameStatus } from '../types/enums'
import { BoardComp } from './BoardComp'
import { GameStatusComp } from './GameStatusComp'

interface IState {
  chesses: ChessType[],
  gameStatus: GameStatus,
  nextChess: ChessType.red | ChessType.black
}

export class GameComp extends React.Component<{}, IState> {

  // 虽然已经约束了状态值，但是并没有赋初始值，所以会出现null的情况
  state: IState = {
    chesses: [],
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.black
  }

  // 当组件嵌入到页面的时候调用init初始化函数
  componentDidMount(): void {
    this.init()
  }

  /**
   * 初始化数据，重新设置棋盘
   */
  init() {
    const arr: ChessType[] = []
    for (let i = 0; i < 9; i++) {
      arr.push(ChessType.none)
    }

    // 重新设置状态
    this.setState({
      chesses: arr,
      gameStatus: GameStatus.gaming,
      nextChess: ChessType.black
    })
  }

  // 处理棋子被点击的事件
  handleChessClick(index: number) {
    const chesses: ChessType[] = [...this.state.chesses]
    chesses[index] = this.state.nextChess
    this.setState(prevState => ({
      chesses,
      nextChess: prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red,
      gameStatus: this.getStatus(chesses, index)
    }))
  }

  // 得到当前游戏状态, 需要获取当前棋盘有多少棋子以及最后一个棋子落子的位置
  getStatus(chesses: ChessType[], index: number): GameStatus {
    // 1. 通过落子位置index判断是否有一方获得胜利
    const horMin = Math.floor(index / 3) * 3;
    const verMin = index % 3;
    if ((chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2])
      ||
      (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6])
      ||
      (chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none)
      ||
      (chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none)) {
      if (chesses[index] === ChessType.red) {
        return GameStatus.redWin;
      }else {
        return GameStatus.blackWin;
      }
    }
    // 2. 判断是否平局
    if (!chesses.includes(ChessType.none)) {
      return GameStatus.equal;
    }
    // 3. 如果不属于前两种情况那么就是游戏正在进行中
    return GameStatus.gaming;
  } 

  render(): React.ReactNode {
    return (
      <div className='game'>
        <h1>三连棋游戏</h1>
        <GameStatusComp status={this.state.gameStatus} next={this.state.nextChess}></GameStatusComp>
        <BoardComp
          chesses={this.state.chesses}
          isGameOver={this.state.gameStatus !== GameStatus.gaming}
          onClick={this.handleChessClick.bind(this)}
        ></BoardComp>
        <button onClick={() => {
          this.init()
        }}>重新开始</button>
      </div>
    )
  }
}