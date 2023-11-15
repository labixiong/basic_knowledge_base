import React, { Component } from 'react'

export default class App extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef()
    this.uploadRef = React.createRef()
  }

  state = {
    upperV: '',
    numberV: '',
    textareaV: '',
    checkBoxs: [
      { content: 'html', checked: false },
      { content: 'css', checked: false },
      { content: 'js', checked: false },
      { content: 'vue', checked: false },
      { content: 'react', checked: false }
    ]
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case 'one': {
        // 将输入值转换为大写
        this.setState({
          upperV: e.target.value.toUpperCase()
        })
        break;
      }
      case 'two': {
        // 只能输入数字
        let newV = e.target.value.split("").map(item => {
          if(!isNaN(item)) {
            return item
          }
        }).join("")

        this.setState({
          numberV: newV
        })
        break;
      }

      case 'three': {
        this.setState({
          textareaV: e.target.value
        })
        break;
      }

      default: {
        
        return ''
      }
    }
  }

  // 对应checkBoxs的方法
  handleChange2(index) {
    console.log(index);
    const arr = [...this.state.checkBoxs]
    arr[index].checked = !arr[index].checked
    this.setState({
      checkBoxs: arr
    })
  }

  handleClick = () => {
    console.log(`你要提交的内容为：${this.uploadRef.current.files[0].name}`);
  }

  render() {
    return (
      <div>

        {/* 
          非受控组件示例,输入框不能给value属性，如果给value属性值的话，React会认为这是一个受控组件
          如果想要给默认值,可以使用defaultValue属性
        */}
        <input type="text" ref={this.inputRef}  defaultValue={123}/>
        <input type="file" ref={this.uploadRef} />

        {/* 下方均为受控组件示例 */}
        <div>
          {this.state.checkBoxs.map((item, index) => (
            <div key={item.content}>
              <input type='checkbox' value={item.content} checked={item.checked} onChange={() => this.handleChange2(index)}></input>
              <span>{item.content}</span>
            </div>
          ))}
        </div>
        {/* <input type="text" name="one" placeholder='自动转为大写' value={this.state.upperV} onChange={this.handleChange} />
        <input type="text" name='two' placeholder='只能输入数字' value={this.state.numberV} onChange={this.handleChange} /> */}
        <textarea name="three" id="" cols="30" rows="10" value={this.state.textareaV} onChange={this.handleChange}></textarea>
        <button onClick={this.handleClick}>提交</button>
      </div>
    )
  }
}
