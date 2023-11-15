import './App.css';

function App() {

  const arr = [
    (<p key={10}>hello</p>),
    (<div key={11}>world</div>),
    (<span key={12}>hahaha</span>)
  ]

  const stuInfo = [
    { name: 'zs', age: 18 },
    { name: 'ls', age: 19 },
    { name: 'ww', age: 20 }
  ]

  const arr2 = stuInfo.map(item => {
    return (
      <div key={item.name}>姓名: { item.name }， 年龄：{ item.age }</div>
    )
  })

  
  return (
    <div className="App">
      {arr}
      {arr2}
    </div>
  );
}

export default App;
