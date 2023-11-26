import RouteConfig from './index'
import RouteBeforeConfig from './RouteBeforeConfig'

import { Alert } from 'antd'

/**
 * 模拟导航守卫
 * 
 * 容器组件，不做任何jsx的展示，是为了实现导航守卫的功能
 */
export default function RouteBefore() {

  // 根据location.pathname获取到RouteBeforeConfig所匹配的对象
  const curPath = RouteBeforeConfig.filter(item => item.path === location.pathname)[0]


  function handleClose() {
    location.pathname = '/'
  }

  if (curPath.needLogin) {
    if (curPath.needLogin && !localStorage.getItem('userToken')) {
      return (
        <Alert message="请先登录" type='warning' closable onClose={handleClose} style={{ marginTop: '30px', marginBottom: '30px' }}></Alert>
      )
    }
  }

  return <RouteConfig></RouteConfig>
}

