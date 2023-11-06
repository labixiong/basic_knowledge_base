import React from 'react'

// props类型约束
interface IProps {
  num: number
  onChange?: (n: number) => void
}

// 状态约束
interface IState {
  msg: string
  description: string
}

// 函数式组件
// export const CountComp: React.FC<IProps> = function (props) {
//   return (
//     <div>
//       <button onClick={() => {
//         if(props.onChange) {
//           props.onChange(props.num - 1)
//         }
//       }}>-</button>
//       <span>{props.num}</span>
//       <button onClick={() => {
//         if(props.onChange) {
//           props.onChange(props.num + 1)
//         }
//       }}>+</button>
//     </div>
//   )
// }


// 类组件
export class CountComp extends React.Component<IProps> {

  // 内部state如果没有加类型约束的话，会以内部的state初始化类型为准
  // 此时this.state有一个属性test并且类型为number
  // 所以需要初始化的时候再添加类型约束为IState
  state: IState = {
    msg: "",
    description: ""
    // test: 2
  }
  render(): React.ReactNode {
    return (
      <div>
        <button onClick={() => {
          if(this.props.onChange) {
            this.props.onChange(this.props.num - 1)
          }
        }}>-</button>
        <span>{this.props.num}</span>
        <button onClick={() => {
          if(this.props.onChange) {
            this.props.onChange(this.props.num + 1)
          }
        }}>+</button>
      </div>
    )
  }
}