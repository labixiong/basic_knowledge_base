// 棋子类型约束
export enum ChessType {
  none, 
  red,
  black
}

// 游戏的状态
export enum GameStatus {
  /**
   * 游戏中
   */
  gaming,
  /**
   * 红方胜利
   */
  redWin,
  /**
   * 黑方胜利
   */
  blackWin,
  /**
   * 平局
   */
  equal
}