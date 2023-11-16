import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Operation from './components/Operation';
import Detail from './components/Detail'

import './styles/index.css'

function App() {
  return (
    <div id="app" className="container">
      {/* 导航栏 */}
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand">学生管理系统</div>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <NavLink to="/home" className="navigation">主页</NavLink>
              <NavLink to="/about" className="navigation">关于我们</NavLink>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NavLink to="/add" className="navigation">添加学生</NavLink>
            </ul>
          </div>
        </div>
      </nav>

      {/* 匹配上的路由所显示的内容显示在下方容器 */}
      <div className="content">
        <Routes>
          {/* 在 route 组件中书写你对应的路由，以及路由所对应的组件 */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<Operation />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Operation />} />
          <Route path="/" element={<Navigate replace to="/home"/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
