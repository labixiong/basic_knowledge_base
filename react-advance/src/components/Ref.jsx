import React, { useRef, useImperativeHandle } from 'react'

/**
 * 测试string类型ref以及createRef
 */
// export default class Ref extends React.Component {

//   constructor() {
//     super();
//     this.inputRef = createRef()
//   }

//   handleClick = () => {
//     // 字符串格式的ref
//     // console.log(this.refs);
//     // this.refs.inputRef.focus()

//     // createRef创建
//     console.log(this.inputRef);
//     this.inputRef.current.focus()
//   }

//   render () {
//     return (
//       <div>
//         {/* 字符串格式的ref */}
//         {/* <input type="text" ref='inputRef' /> */}

//         {/* createRef创建 */}
//         <input type="text" ref={this.inputRef} />
//         <button onClick={this.handleClick}>聚焦</button>
//       </div>
//     )
//   }
// }


// 测试useRef
function Ref(props, ref) {

  const childRef = useRef()

  useImperativeHandle(ref, () => ({
    click: handleClick,
    test: () => {
      console.log('子组件test方法');
    }
  }))

  function handleClick () {
    console.log('子组件click');
  }


  return (
    <div ref={childRef}>
      子组件
    </div>
  )
}

export default React.forwardRef(Ref)