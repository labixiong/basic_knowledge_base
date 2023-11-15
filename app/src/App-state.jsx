import React from 'react'
import Hello from './components/Hello'
import World from './components/World'
import Button from './components/Button'

// export default function App() {

//   const clickHandle = (e) => {
//     console.log(this);
//     // e为React封装后的事件对象SyntheticBaseEvent
//     console.log(e);

//     // nativeEvent为原生事件对象
//     console.log(e.nativeEvent);
//   }

//   return (
//     <div>
//       <button onClick={(e) => clickHandle.bind(this, e)}>点击</button>
//     </div>
//   )
// }

// 类组件
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '金大成',
      age: 18
    }
  }

  render() {
    return (
      <div>
        <Hello></Hello>
        <World></World>
        <Button>添加按钮</Button>
      </div>
    )
  }
}
