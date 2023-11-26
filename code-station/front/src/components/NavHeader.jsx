import React, { useState } from 'react';
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import LoginAvatar from "../components/LoginAvatar"

function PageHeader(props) {

	const navigate = useNavigate()
	const [searchOptions, setSearchOption] = useState("issue");

	function handleSearch(value) {
		value = value.trim()
		if (value) {
			// 搜索框有内容，根据内容筛选
			navigate('/searchPage', {
				state: {
					value,
					searchOptions
				}
			})
		} else {
			navigate('/')
		}
	}

	function handleSelectChange(val) {
		setSearchOption(val)
	}

	return (
		<div className="headerContainer">
			{/* 头部 logo */}
			<div className="logoContainer">
				<div className="logo"></div>
			</div>
			{/* 头部导航 */}
			<nav className="navContainer">
				<NavLink to="/" className="navgation">问答</NavLink>
				<NavLink to="/books" className="navgation">书籍</NavLink>
				<NavLink to="/interviews" className="navgation">面试题</NavLink>
				<a
					href="https://duyi.ke.qq.com/"
					className="navgation"
					target="_blank"
					rel="noreferrer"
				>视频教程</a>
			</nav>
			{/* 搜索框 */}
			<div className="searchContainer">
				<Input.Group compact>
					<Select defaultValue="issue" size="large" style={{ width: "20%" }} onChange={handleSelectChange}>
						<Select.Option value="issue">问答</Select.Option>
						<Select.Option value="book">书籍</Select.Option>
					</Select>
					<Input.Search
						placeholder="请输入要搜索的内容"
						allowClear
						enterButton="搜索"
						size="large"
						style={{
							width: "80%"
						}}
						onSearch={handleSearch}
					/>
				</Input.Group>
			</div>
			{/* 登录按钮 */}
			<div className="loginBtnContainer">
				{/* 自定义头像组件 */}
				<LoginAvatar loginHandle={props.loginHandle} />
			</div>
		</div>
	);
}

export default PageHeader;