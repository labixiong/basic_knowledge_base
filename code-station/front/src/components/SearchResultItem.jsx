import React from 'react'
import IssueItem from './IssueItem'

// 存储搜索结果的项目，根据搜索的类型返回不同类型的搜索项目组件
export default function SearchResultItem(props) {
  return (
    <div>
      {
        props.info.issueTitle ? <IssueItem issueInfo={props.info}></IssueItem> : null
      }
    </div>
  )
}
