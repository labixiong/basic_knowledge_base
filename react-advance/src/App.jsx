import './App.css';
import ValidateProps from './components/ValidateProps';
import withLog from './HOC/withLog'
// import withTimer from './HOC/withTimer'
import TestHOC1 from './components/TestHOC1';
import TestHOC2 from './components/TestHOC2';
import Ref from './components/Ref'
import Context from './components/Context';
import Portals from './components/Portals'

import { MyContext, MyContext2 } from './context/index'
import { useRef, useState } from 'react';

// const NewComp1 = withTimer(withLog(TestHOC1)) // HOC嵌套操作
const NewComp1 = withLog(TestHOC1)
const NewComp2 = withLog(TestHOC2)

function App() {

  const childRef = useRef()
  const [count, setCount] = useState(1)
  const [isShow, setIsShow] = useState(false)

  function handleClick() {
    childRef.current.click()
    childRef.current.test()
  }

  return (
    <div className="App">
      <ValidateProps class='三年三班' age={20}>
        <span>插槽内容1</span>
        <span>插槽内容222222</span>
      </ValidateProps>

      <NewComp1></NewComp1>
      <NewComp2></NewComp2>
      
      <Ref ref={childRef}></Ref>
      <button onClick={handleClick}>点击</button>

      <MyContext.Provider value={{count, setCount, a: 1, b: 2, c: 3}}>
        <MyContext2.Provider value={{a: 100, b: 200, c: 300}}>
          <Context></Context>
        </MyContext2.Provider>
      </MyContext.Provider>

      <div style={{
        position: 'relative'
      }} onClick={()=>console.log("App 组件被点击了")}>
        <button onClick={() => setIsShow(!isShow)}>显示/隐藏</button>
        { isShow ? <Portals></Portals> : null }
      </div>
    </div>
  );
}

export default App;
