import React from 'react';
import { Button, List, Popover, Avatar, Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

import styles from "../css/LoginAvatar.module.css";
import { UserOutlined } from "@ant-design/icons";
import { clearUserInfo, changeLoginStatus } from '../redux/userSlice'

// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
function LoginAvatar(props) {


	const { isLogin, userInfo } = useSelector(state => state.user);
	let loginStatus = null;
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function handleListItemClick(item) {
		if (item === '个人中心') {
			// 跳转到个人中心
		} else {
			// 退出登录 清空token以及用户信息
			localStorage.removeItem('userToken')
			dispatch(clearUserInfo)
			dispatch(changeLoginStatus(false))
			navigate('/')
		}
	}

	if (isLogin) {
		// 登录了的
		const content = (
			<List
				dataSource={["个人中心", "退出登录"]}
				size="large"
				renderItem={(item) => {
					return (
						<List.Item style={{ cursor: "pointer" }} onClick={() => handleListItemClick(item)}>{item}</List.Item>
					)
				}}
			/>
		);
		loginStatus = (
			<Popover content={content} trigger="hover" placement="bottom">
				<div className={styles.avatarContainer}>
					<Avatar src={<Image src={userInfo?.avatar} preview={false} />} size="large" icon={<UserOutlined />} />
				</div>
			</Popover>
		);
	} else {
		// 没有登录
		loginStatus = (
			<Button type="primary" size="large" onClick={props.loginHandle}>注册/登录</Button>
		);
	}

	return (
		<div>
			{loginStatus}
		</div>
	);
}

export default LoginAvatar;