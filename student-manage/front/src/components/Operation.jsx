import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { addStuAsync, editStuByIdAsync } from '../store/stuSlice'
import { useDispatch, useSelector } from 'react-redux'

function Operation(props) {

	const initStu = useMemo(() => ({
		name: "",
		age: "",
		phone: "",
		email: "",
		education: "本科",
		graduationschool: "",
		profession: "",
		profile: ""
	}), [])
	let [stu, setStu] = useState(initStu)

	const dispatch = useDispatch()
	const { stuList } = useSelector(state => state.stu)

	const navigate = useNavigate();
	const { id } = useParams()

	useEffect(() => {
		if(id) {
			const curStu = stuList.filter(stu => stu.id === ~~id)
   		setStu(curStu[0])
		} else {
			setStu(initStu)
		}
	}, [id, stuList, initStu])

	// 根据对应的key来更新信息
	function updateStuInfo(newInfo, key) {
		// 注意年龄要是数字
		if(key === 'age' && isNaN(newInfo)) {
			return
		}

		const newStuInfo = {...stu}
		newStuInfo[key] = newInfo.trim()
		setStu(newStuInfo)
	}

	// 提交学生信息
	function submitStuInfo(e) {
		// 阻止表单默认提交行为
		e.preventDefault()

		for (const key in stu) {
			if(!stu[key]) {
				alert('请完善表单的每一项！')
			}
		}

		if(id) {
			dispatch(editStuByIdAsync({ id, stu }))
			navigate("/home", {
				state: {
					alert: "学生修改成功",
					type: "info",
				}
			});
		} else {
			dispatch(addStuAsync(stu))
			navigate('/home', {
				state: {
					alert: '用户添加成功',
					type: 'success',
				}
			})
		}
	}

	let formItemArr = [
		{ label: '姓名', type: 'input', placeholder: '请填写用户姓名', value: stu.name, event: (e) => updateStuInfo(e.target.value, 'name') },
		{ label: '年龄', type: 'input', placeholder: '请填写用户年龄', value: stu.age, event: (e) => updateStuInfo(e.target.value, 'age') },
		{ label: '电话', type: 'input', placeholder: '请填写用户电话号码', value: stu.phone, event: (e) => updateStuInfo(e.target.value, 'phone') },
		{ label: '邮箱', type: 'input', placeholder: '请填写用户邮箱地址', value: stu.email, event: (e) => updateStuInfo(e.target.value, 'email') },
		{
			label: '学历',
			type: 'select',
			options: [{ title: '小学' }, { title: '初中或职中' }, { title: '高中或职高' }, { title: '专科' }, { title: '本科' }, { title: '硕士' }, { title: '博士' }],
			placeholder: '',
			value: stu.education,
			event: (e) => updateStuInfo(e.target.value,'education')
		},
		{ label: '毕业学校', type: 'input', placeholder: '请填写用户毕业院校', value: stu.graduationschool, event: (e) => updateStuInfo(e.target.value, 'graduationschool') },
		{ label: '职业', type: 'input', placeholder: '请填写用户从事的相关职业', value: stu.profession, event: (e) => updateStuInfo(e.target.value, 'profession') },
		{ label: '个人简介', type: 'textarea', placeholder: '请简单的介绍一下你自己，包括兴趣、爱好等信息...', value: stu.profile, event: (e) => updateStuInfo(e.target.value, 'profile') }
	]

	let formList = formItemArr.map((f, i) => {
		let container = null
		if(f.type === 'textarea') {
			container = (
				<textarea
					className="form-control"
					rows="10"
					placeholder={f.placeholder}
					value={f.value}
					onChange={(e) => f.event(e)}
				></textarea>
			)
		} else if(f.type === 'select') {
				let options = f.options.map(o => (<option key={o.title}>{o.title}</option>))
				container = (
					<select
						className="form-control"
						value={f.value}
						onChange={(e) => f.event(e)}
					>
						{options}
					</select>)
		} else {
			container = (
				<input
					type="text"
					className="form-control"
					placeholder={f.placeholder}
					value={f.value}
					onChange={(e) => f.event(e)}
				/>)
		}
		return (
		<div key={f.label} className="form-group">
			<label>{f.label}</label>
			{container}
		</div>)
	})

	return (
		<div>
			<div className="container">
				{/* 标题 */}
				<h1 className="page-header">{id ? "修改学生" : "添加学生"}</h1>
				<form id="myForm" onSubmit={submitStuInfo}>
					<div className="well">
						{formList}
						{/* <div className="form-group">
							<label>姓名</label>
							<input
								type="text"
								className="form-control"
								placeholder="请填写用户姓名"
								value={stu.name}
								onChange={(e) => updateStuInfo(e.target.value, 'name')}
							/>
						</div>
						<div className="form-group">
							<label>年龄</label>
							<input
								type="text"
								className="form-control"
								placeholder="请填写用户年龄"
								value={stu.age}
								onChange={(e) => updateStuInfo(e.target.value, 'age')}
							/>
						</div>
						<div className="form-group">
							<label>电话</label>
							<input
								type="text"
								className="form-control"
								placeholder="请填写用户电话号码"
								value={stu.phone}
								onChange={(e) => updateStuInfo(e.target.value, 'phone')}
							/>
						</div>
						<div className="form-group">
							<label>邮箱</label>
							<input
								type="text"
								className="form-control"
								placeholder="请填写用户邮箱地址"
								value={stu.email}
								onChange={(e) => updateStuInfo(e.target.value, 'email')}
							/>
						</div>
						<div className="form-group">
							<label>学历</label>
							<select
								className="form-control"
								value={stu.education}
								onChange={(e) => updateStuInfo(e.target.value, 'education')}
							>
								<option>小学</option>
								<option>初中或职中</option>
								<option>高中或职高</option>
								<option>专科</option>
								<option>本科</option>
								<option>硕士</option>
								<option>博士</option>
							</select>
						</div>
						<div className="form-group">
							<label>毕业学校</label>
							<input
								type="text"
								className="form-control"
								placeholder="请填写用户毕业院校"
								value={stu.graduationschool}
								onChange={(e) => updateStuInfo(e.target.value, 'graduationschool')}
							/>
						</div>
						<div className="form-group">
							<label>职业</label>
							<input
								type="text"
								className="form-control"
								placeholder="请填写用户从事的相关职业"
								value={stu.profession}
								onChange={(e) => updateStuInfo(e.target.value, 'profession')}
							/>
						</div>
						<div className="form-group">
							<label>个人简介</label>
							<textarea
								className="form-control"
								rows="10"
								placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..."
								value={stu.profile}
								onChange={(e) => updateStuInfo(e.target.value, 'profile')}
							></textarea>
						</div> */}
						<button type="submit" className="btn btn-primary">{id ? "确认修改" : "确认添加"}</button>
					</div>
				</form>
      </div>
		</div>
	);
}

export default Operation;