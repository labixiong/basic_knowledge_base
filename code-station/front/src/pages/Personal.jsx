import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/Personal.module.css'
import PersonalInfoItem from '../components/PersonalInfoItem'

import { useSelector, useDispatch } from 'react-redux'
import { Card, Image, Upload, Modal, Form, Input, Button, message, Popconfirm } from 'antd'
import { formatDate } from '../utils/tools'
import { updateUserInfoAsync, updateStoreUserInfo, changeLoginStatus, clearUserInfo } from '../redux/userSlice'
import { checkPassword as localCheckPassword } from '../api/user'
import { useNavigate } from 'react-router-dom'


/**
 * 个人中心
 */
export default function Personal(props) {

  const { userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [passwordInfo, setPasswordInfo] = useState({
    oldpassword: '',
    newpassword: '',
    passwordConfirm: ''
  })
  // 存储用户修改的项目，利用patch的更新接口局部更新用户信息
  const [editInfo, setEditInfo] = useState({})
  const navigate = useNavigate()

  function handleUploadChange(e) {
    if (e.file.status === 'done') {
      const url = e.file.response.data

      const updateData = { avatar: url }
      // 处理用户头像的更新
      dispatch(updateStoreUserInfo(updateData))
      dispatch(updateUserInfoAsync({
        userId: userInfo._id,
        newInfo: updateData
      }))

      message.success('更新用户头像成功')
    }
  }

  function updatePasswordInfo(newInfo, key) {
    const newPasswordInfo = { ...passwordInfo }
    newPasswordInfo[key] = newInfo.trim()
    setPasswordInfo(newPasswordInfo)
    if (key === 'newpassword') {
      updateInfo(newInfo, 'loginPwd')
    }
  }

  // 验证用户输入的旧密码是否正确
  async function checkPassword() {
    if (passwordInfo.oldpassword) {
      const { data } = await localCheckPassword(userInfo._id, passwordInfo.oldpassword)
      if (!data) {
        // 此时密码不正确
        return Promise.reject('密码不正确')
      }
    }
  }

  /**
   * 根据用户输入的值修改指定项
   * @param {*} newInfo 用户输入的值
   * @param {*} key 指定项
   */
  function updateInfo(newInfo, key) {
    if (key === 'nickname' && !newInfo) {
      message.warning('昵称不能为空')
      return
    }
    const newUserInfo = { ...editInfo }
    newUserInfo[key] = newInfo
    setEditInfo(newUserInfo)
  }

  function handleModalContentByPanelName(panelName) {
    switch (panelName) {
      case "基本信息": {
        return (
          <>
            <Form
              name="basic1"
              autoComplete="off"
              initialValues={userInfo}
              onFinish={handleOk}
            >
              {/* 登录密码 */}
              <Form.Item
                label="登录密码"
                name="oldpassword"
                rules={[
                  { required: true },
                  {
                    validator: checkPassword
                  }
                ]}
                validateTrigger='onBlur'
              >
                <Input.Password
                  rows={6}
                  value={passwordInfo.oldpassword}
                  placeholder="如果要修改密码，请先输入旧密码"
                  onChange={(e) => updatePasswordInfo(e.target.value, 'oldpassword')}
                />
              </Form.Item>

              {/* 新的登录密码 */}
              <Form.Item
                label="新密码"
                name="newpassword"
              >
                <Input.Password
                  rows={6}
                  value={passwordInfo.newpassword}
                  placeholder="请输入新密码"
                  onChange={(e) => updatePasswordInfo(e.target.value, 'newpassword')}
                />
              </Form.Item>

              {/* 确认密码 */}
              <Form.Item
                label="确认密码"
                name="passwordConfirm"
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newpassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次密码不一致'));
                    },
                  }),
                ]}
                validateTrigger='onBlur'
              >
                <Input.Password
                  rows={6}
                  placeholder="请确认密码"
                  value={passwordInfo.passwordConfirm}
                  onChange={(e) => updatePasswordInfo(e.target.value, 'passwordConfirm')}
                />
              </Form.Item>

              {/* 用户昵称 */}
              <Form.Item
                label="用户昵称"
                name="nickname"
              >
                <Input
                  placeholder="昵称可选，默认为新用户"
                  // value={userInfo.nickname}
                  value={123}
                  onBlur={(e) => updateInfo(e.target.value, 'nickname')}
                />
              </Form.Item>

              {/* 确认修改按钮 */}
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Popconfirm
                  title="更新用户信息之后将退出当前登录，点击确定继续"
                  onConfirm={handlePopConfirm}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="primary" htmlType="submit">
                    确认
                  </Button>
                </Popconfirm>

                <Button type="link" htmlType="submit" className="resetBtn">
                  重置
                </Button>
              </Form.Item>
            </Form>
          </>
        )
      }
      case "社交账号": {
        return (
          <>
            <Form
              name="basic2"
              initialValues={userInfo}
              autoComplete="off"
              onFinish={handleOk}
            >
              <Form.Item
                label="邮箱"
                name="mail"
              >
                <Input
                  value={userInfo.mail}
                  placeholder="请填写邮箱"
                  onChange={(e) => updateInfo(e.target.value, 'mail')}
                />
              </Form.Item>
              <Form.Item
                label="QQ号"
                name="qq"
              >
                <Input
                  value={userInfo.qq}
                  placeholder="请填写 QQ 号"
                  onChange={(e) => updateInfo(e.target.value, 'qq')}
                />
              </Form.Item>
              <Form.Item
                label="微信"
                name="wechat"
              >
                <Input
                  value={userInfo.wechat}
                  placeholder="请填写微信号"
                  onChange={(e) => updateInfo(e.target.value, 'wechat')}
                />
              </Form.Item>
              <Form.Item
                label="github"
                name="github"
              >
                <Input
                  value={userInfo.github}
                  placeholder="请填写 github "
                  onChange={(e) => updateInfo(e.target.value, 'github')}
                />
              </Form.Item>

              {/* 确认修改按钮 */}
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>

                <Button type="link" htmlType="submit" className="resetBtn">
                  重置
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }
      case "个人简介": {
        return (
          <>
            <Form
              name="basic3"
              initialValues={userInfo}
              autoComplete="off"
              onFinish={handleOk}
            >
              {/* 自我介绍 */}
              <Form.Item
                label="自我介绍"
                name="intro"
              >
                <Input.TextArea
                  rows={6}
                  value={userInfo.intro}
                  placeholder="选填"
                  onChange={(e) => updateInfo(e.target.value, 'intro')}
                />
              </Form.Item>

              {/* 确认修改按钮 */}
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>

                <Button type="link" htmlType="submit" className="resetBtn">
                  重置
                </Button>
              </Form.Item>
            </Form>
          </>
        )
      }
    }
  }

  function showModal(title) {
    setIsModalOpen(true)
    setEditInfo({})
    setModalTitle(title)
  }

  function handleOk() {
    // console.log('ok');
    // 派发action，更改仓库数据以及服务端数据
    dispatch(updateUserInfoAsync({
      userId: userInfo._id,
      newInfo: editInfo
    }))

    message.success('更新用户信息成功')
    // setIsModalOpen(false)
    handleCancel()
  }

  function handleCancel() {
    // console.log('cancel');
    setIsModalOpen(false)
  }

  function handlePopConfirm() {
    handleOk()
    localStorage.removeItem("userToken");
    // 清除状态仓库
    dispatch(clearUserInfo);
    dispatch(changeLoginStatus(false));
    navigate("/");
  }

  return (
    <div>
      <PageHeader title='个人中心'></PageHeader>
      {/* 信息展示 */}
      <div className={styles.container}>
        <div className={styles.row}>
          <video src='/static/uploads/166bf852ca7176ba2c5593ddbc1dd657-115071492.avi' width='200px' height='200px' controls autoPlay></video>
        </div>
        {/* 基本信息 */}
        <div className={styles.row}>
          <Card title='基本信息' extra={(<div className={styles.edit} onClick={() => showModal('基本信息')}>编辑</div>)}>
            <PersonalInfoItem info={{ itemName: '登录账号', itemValue: userInfo.loginId }}></PersonalInfoItem>
            <PersonalInfoItem info={{ itemName: '账户密码', itemValue: '*******' }}></PersonalInfoItem>
            <PersonalInfoItem info={{ itemName: '用户昵称', itemValue: userInfo.nickname }}></PersonalInfoItem>
            <PersonalInfoItem info={{ itemName: '用户积分', itemValue: userInfo.points }}></PersonalInfoItem>
            <PersonalInfoItem info={{ itemName: '注册时间', itemValue: formatDate(userInfo.registerDate) }}></PersonalInfoItem>
            <PersonalInfoItem info={{ itemName: '上次登录时间', itemValue: formatDate(userInfo.lastLoginDate) }}></PersonalInfoItem>
            <div style={{ fontWeight: '100', height: '50px' }}>当前头像</div>
            <Image src={userInfo.avatar} width={100}></Image>
            <div style={{ fontWeight: '100', height: '50px' }}>上传新头像</div>
            <Upload action='/api/upload' maxCount={1} onChange={handleUploadChange} listType='picture-card'>+</Upload>
          </Card>
        </div>
        {/* 社交账号 */}
        <div className={styles.row}>
          <Card title='社交账号' extra={(<div className={styles.edit} onClick={() => showModal('社交账号')}>编辑</div>)}>
            <PersonalInfoItem info={{
              itemName: "邮箱",
              itemValue: userInfo.mail ? userInfo.mail : "未填写",
            }} />
            <PersonalInfoItem info={{
              itemName: "QQ号",
              itemValue: userInfo.qq ? userInfo.qq : "未填写",
            }} />
            <PersonalInfoItem info={{
              itemName: "微信号",
              itemValue: userInfo.wechat ? userInfo.wechat : "未填写",
            }} />
            <PersonalInfoItem info={{
              itemName: "github",
              itemValue: userInfo.github ? userInfo.github : "未填写",
            }} />
          </Card>
        </div>
        {/* 个人简介 */}
        <div className={styles.row}>
          <Card title='个人简介' extra={(<div className={styles.edit}>编辑</div>)} onClick={() => showModal('个人简介')}>
            <p className={styles.intro}>
              {userInfo.intro ? userInfo.intro : "未填写"}
            </p>
          </Card>
        </div>
      </div>

      {/* 修改信息的对话框 */}
      <Modal title={modalTitle} onOk={handleOk} onCancel={handleCancel} footer={false} open={isModalOpen}>
        {handleModalContentByPanelName(modalTitle)}
      </Modal>
    </div>
  )
}
