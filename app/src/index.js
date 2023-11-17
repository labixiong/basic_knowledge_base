import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/index';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
function render() {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

render()

// 使redux和react进行关联，在仓库的状态发生改变的时候触发
// store.subscribe(render)
