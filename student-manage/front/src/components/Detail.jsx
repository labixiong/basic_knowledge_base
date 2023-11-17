import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { delStuByIdAsync } from '../store/stuSlice'

export default function Detail() {
  // 获取动态参数
  const { id } = useParams()

  const navigate = useNavigate()

  const { stuList } = useSelector(state => state.stu)
  const dispatch = useDispatch()

  const [stu, setStu] = useState({
		name: "",
		age: "",
		phone: "",
		email: "",
		education: "本科",
		graduationschool: "",
		profession: "",
		profile: ""
	})

  useEffect(() => {
    // getStuByIdApi(id).then(({ data }) => {
    //   setStu(data)
    // })

    const curStu = stuList.filter(stu => stu.id === ~~id)
    setStu(curStu[0])
  }, [id, stuList])


  function deleteStu(id) {
    if(window.confirm('你是否要删除此学生？')) {
      // deleteStuByIdApi(id).then(() => {
      //   navigate('/home', {
      //     state: {
      //       alert: '学生删除成功',
      //       type: 'info'
      //     }
      //   })
      // })

      // 派发一个action,仓库来异步请求进行删除,然后仓库再更新自己的数据
      dispatch(delStuByIdAsync(id))
      navigate("/home", {
        state: {
          alert: "学生删除成功",
          type: "info"
        }
      })
    }
  }

  return (
    <div className="details container">
            <button className="btn btn-default" onClick={() => navigate("/home")}>返回</button>
            <h1 className="page-header">
                {stu.name}
                <span className="pull-right">
                    <button className="btn btn-primary" onClick={() => navigate(`/edit/${stu.id}`)} style={{ marginRight: 10 }}>修改</button>
                    <button className="btn btn-danger" onClick={() => deleteStu(stu.id)}>删除</button>
                </span>
            </h1>
            {/* 第一组 */}
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-phone">电话：{stu.phone}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-envelope">邮箱：{stu.email}</span>
                </li>
            </ul>
            {/* 第二组 */}
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-book">文化水平：{stu.education}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-flag">毕业院校：{stu.graduationschool}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-briefcase">专业：{stu.profession}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-user">个人简介：{stu.profile}</span>
                </li>
            </ul>
        </div>
  )
}
