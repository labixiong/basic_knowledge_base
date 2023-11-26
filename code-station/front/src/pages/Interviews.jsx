import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getInterviewAsync } from '../redux/interviewSlice'
import { getTypeList } from '../redux/typeSlice';
import { Tree, BackTop } from 'antd'
import { getInterviewById } from '../api/interview';

import styles from '../css/Interview.module.css'
import PageHeader from '../components/PageHeader'

function Interviews(props) {

	const dispatch = useDispatch()
	const { interviewTitleList } = useSelector(state => state.interview)
	const { typeList } = useSelector(state => state.type)
	const [treeData, setTreeData] = useState([])
	const [interviewInfo, setInterviewInfo] = useState(null) // 存储对应id的面试题内容


	useEffect(() => {
		// 每个分类下面的面试题标题
		if (!interviewTitleList.lenth) {
			dispatch(getInterviewAsync())
		}

		// 分类名
		if (!typeList.length) {
			dispatch(getTypeList())
		}

		if (interviewTitleList.length && typeList.length) {
			const arr = []

			for (let i = 0; i < typeList.length; i++) {
				arr.push({
					title: (<h3>{typeList[i].typeName}</h3>),
					key: i
				})
			}

			for (let i = 0; i < interviewTitleList.length; i++) {
				const childArr = []
				for (let j = 0; j < interviewTitleList[i].length; j++) {
					childArr.push({
						title: (<h4 onClick={() => handleClick(interviewTitleList[i][j]._id)}>{interviewTitleList[i][j].interviewTitle}</h4>),
						key: `${i}-${j}`
					})
				}

				arr[i].children = childArr
			}

			setTreeData(arr)
		}

		// 组装treeData
	}, [typeList, interviewTitleList])

	let interviewRightSide = null
	if (interviewInfo) {
		// 赋值面试题的内容
		interviewRightSide = (
			<div className={styles.content}>
				<h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
				<div className={styles.contentContainer}>
					<div dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }}></div>
				</div>
			</div>
		);
	} else {
		interviewRightSide = (
			<div style={{ textAlign: 'center', fontSize: '40px', fontWeight: '100', marginTop: '150px' }}>请选择您想查看的面试题</div>
		)
	}

	async function handleClick(id) {
		const { data } = await getInterviewById(id)
		setInterviewInfo(data)
	}

	return (
		<div className={styles.container}>
			<PageHeader title='面试题大全'></PageHeader>
			<div className={styles.interviewContainer}>
				<div className={styles.leftSide}>
					<Tree treeData={treeData}></Tree>
				</div>
				<div className={styles.rightSide}>
					{interviewRightSide}
				</div>
			</div>
			<BackTop />
		</div>
	);
}

export default Interviews;