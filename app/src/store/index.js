// 仓库
import { createStore } from 'redux'

import { todoReducer } from './reducer'

// 需要传入一个reducer（纯函数，用于计算最新的状态）
// https://github.com/zalmoxisus/redux-devtools-extension#usage
export const store = createStore(todoReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
