import { useState, useEffect } from 'react';
import { getStuListApi } from "../api/index"
import Alert from './Alert';
import { useLocation, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStuListAsync } from '../store/stuSlice'


function Home(props) {

    // const [stuList, setStuList] = useState([]); // 存储全部的数据

		// 从仓库中获取数据,放弃组件内维护stuList数据
		const { stuList } = useSelector((state) => state.stu)


    const [searchItem, setSearchItem] = useState("");
		const [alert, setAlert] = useState(null)
		const [searchList, setSearchList] = useState([]) // 存储搜索后的数据

		const location = useLocation()
		const dispatch = useDispatch()

		
    // 注意，这里需要添加依赖性为空数组，代表只执行一次
    useEffect(() => {
			// 之前的方式在副作用hook里发送请求
			// getStuListApi().then(({ data }) => {
			// 	setStuList(data);
			// });

			// 现在从仓库中获取数据
			if(!stuList.length) {
				// 如果没有数据,应该发送请求获取数据
				// 但是也不是在这里直接发请求,而不是应该派发一个action到仓库,由仓库负责发送异步请求获取数据,然后填充到仓库里
				dispatch(getStuListAsync())
			}
    }, [stuList, dispatch]);

		// 现修改为从store中获取数据

		// 用于跳转到Home组件时所传递的state数据
		useEffect(() => {
			if(location.state) {
				setAlert(location.state)
			}
		}, [location])

		// 搜索框change事件
    function changeHandle(value) {
			setSearchItem(value)

			// 过滤数据
			const arr = stuList.filter(s => {
				return s.name.match(value)
			})

			setSearchList(arr)
		}

		// 最终显示的列表
		const list = searchItem ? searchList : stuList


    const trs = list.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item.name}</td>
					<td>{item.age}</td>
					<td>{item.phone}</td>
					<td>
						<NavLink to={`/detail/${item.id}`}>详情</NavLink>
					</td>
				</tr>
			)
    })

		const showAlert = alert ? <Alert {...alert}></Alert> : null

    return (
			<div>
				{showAlert}
				<h1>学生列表</h1>
				{/* 搜索框 */}
				<input
					type="text"
					placeholder='根据姓名检索'
					className="form-control"
					value={searchItem}
					onChange={e => changeHandle(e.target.value)}
				/>
				{/* 表格 */}
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>姓名</th>
							<th>年龄</th>
							<th>联系方式</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{trs}
					</tbody>
				</table>
			</div>
    );
}

export default Home;