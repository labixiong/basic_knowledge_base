import React, { Component } from 'react'
import { formatDate } from '../utils';

export default function withLogClass(Com) {
  class withLogCom extends Component {
    constructor(props) {
      super(props);
      this.state = { n: 1 };
    }
    componentDidMount() {
      console.log(
        `日志：组件${Com.name}已经创建，创建时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    componentWillUnmount() {
      console.log(
        `日志：组件${Com.name}已经销毁，销毁时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    render() {
      const { forwardRef, ...rest } = this.props
      return <Com ref={forwardRef} {...rest} />;
    }
  };

  return React.forwardRef((props, ref) => {
    return <withLogCom { ...props } forwardRef={ref} ></withLogCom>
  })
}
