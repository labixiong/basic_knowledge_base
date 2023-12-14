import { useEffect } from 'react'
import { formatDate } from '../utils/index'

/**
 * 接收一个组件 返回一个新组件
 * @param {*} Component 接收组件 
 * @returns 返回一个新组件
 */
export default function withLog(Component) {
  return function NewComponent(props) {
    // 抽离的公共逻辑
    useEffect(()=>{
      console.log(`日志：组件${Component.name}已经创建，创建时间${formatDate(Date.now(),"year-time")}`);
      return function(){
          console.log(`日志：组件${Component.name}已经销毁，销毁时间${formatDate(Date.now(),"year-time")}`);
      }
    },[])
    // 一般来讲，传入的组件会作为新组件的视图
    return <Component {...props} />
  }
}