import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateProps(props) {

  return (
    <div>
      <span>{props.name}</span>
      <span>{props.age}</span>
      <span>{props.class}</span>
      <span>{props.team}</span>
      <span>{props.score}</span>
      {props.children[0]} - {props.children[1]}
    </div>
  )
}

ValidateProps.defaultProps = {
  name: 'zs',
  age: 18,
  class: '三年二班',
  team: [1,2,3],
  score: [100, 97, 120]
}

ValidateProps.propTypes = {
  // 自定义验证规则
  name: function(props, propName, componentName) {
    if (!/\S/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },
  age: PropTypes.number,
  class: PropTypes.string,
  team: PropTypes.arrayOf(PropTypes.number),
  score: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/\d/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  }),
  children: PropTypes.array
}

