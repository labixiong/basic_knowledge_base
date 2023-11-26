import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTypeList, updateIssueTypeId } from '../redux/typeSlice'
import { Tag } from 'antd'

// 分类组件
export default function TypeSelect() {

  const { typeList } = useSelector(state => state.type)
  const dispatch = useDispatch()
  const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
  const [tagContainer, setTagContainer] = useState([])

  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }

    if (typeList.length) {
      const arr = []
      arr.push(
        <Tag
          color='magenta'
          value='all'
          key='all'
          style={{ cursor: 'pointer' }}
          onClick={() => handleTypeChange('all')}
        >
          全部
        </Tag>)

      for (let i = 0; i < typeList.length; i++) {
        arr.push(
          <Tag
            color={colorArr[i % colorArr.length]}
            value={typeList[i]._id}
            key={typeList[i]._id}
            style={{ cursor: 'pointer' }}
            onClick={() => handleTypeChange(typeList[i]._id)}
          >
            {typeList[i].typeName}
          </Tag>)
      }

      setTagContainer(arr)
    }
  }, [typeList])


  function handleTypeChange(typeId) {
    // 更新状态仓库对应的 issueTypeId 或者bookTypeId
    if (location.pathname === '/issues') {
      // 处于问答页面
      dispatch(updateIssueTypeId(typeId))
    } else if (location.pathname === '/books') {

    }
  }

  return (
    <div>
      {tagContainer}
    </div>
  )
}
