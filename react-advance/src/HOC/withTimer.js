import { useEffect, useState } from 'react'

/**
 * 为组件添加timer
 * @param {*} Component 旧组件
 * @returns 新组件
 */
export default function withTimer(Component) {
  return function NewComponent(props) {
    const [count, setCount] = useState(1)

    useEffect(() => {
      const timer = setInterval(() => {
        console.log(count);
        setCount(count + 1)
      }, 1000)

      return function() {
        clearInterval(timer)
      }
    }, [count])

    return <Component {...props}></Component>
  }
}