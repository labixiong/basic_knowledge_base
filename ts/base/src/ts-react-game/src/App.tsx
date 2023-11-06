import React from 'react'
import { ChessType } from './types/enums'
import { GameComp } from './components/GameComp'

// 函数式组件
// const App = () => {
//   return (
//     <div>
//       <CountComp num={2}></CountComp>
//     </div>
//   )
// }

// 类组件

// interface IState {
//   num: number
// }

// class App extends React.Component<{}, IState> {
//   state: IState = {
//     num: 0
//   }

//   render(): React.ReactNode {
//     return(
//       <div>
//         <CountComp num={this.state.num} onChange={(n) => {
//           this.setState({
//             num: n
//           })
//         }}></CountComp>
//       </div>
//     )
//   }
// }

const chesses: ChessType[] = [
  ChessType.black,
  ChessType.none,
  ChessType.red,
  ChessType.black,
  ChessType.none,
  ChessType.black,
  ChessType.red,
  ChessType.black,
  ChessType.red,
]

const App = () => {
  return (
    <div>
      <GameComp></GameComp>
    </div>
  )
}

export default App
