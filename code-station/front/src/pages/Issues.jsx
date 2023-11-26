import { useState, useEffect } from 'react';
import { Pagination, Spin } from "antd";
import { getIssueByPage } from "../api/issue";
import { useSelector } from 'react-redux'

import PageHeader from "../components/PageHeader";
import IssueItem from "../components/IssueItem";
import AddIssueBtn from "../components/AddIssueBtn";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank"
import styles from "../css/Issue.module.css";
import TypeSelect from '../components/TypeSelect';

function Issues(props) {

	// 用于存储获取到的状态列表
	const [issueInfo, setIssueInfo] = useState([]);
	// 分页信息
	const [pageInfo, setPageInfo] = useState({
		current: 1, // 当前是第一页
		pageSize: 15, // 每一页显示 15 条数据
		total: 0, // 数据的总条数
	})
	const { issueTypeId } = useSelector(state => state.type)

	/**
	 * 处理翻译的回调函数
	 */
	function handlePageChange(current, pageSize) {
		setPageInfo({
			current,
			pageSize,
		})
	}

	useEffect(() => {

		let searchParams = {
			current: pageInfo.current,
			pageSize: pageInfo.pageSize,
			issueStatus: true
		}

		if (issueTypeId !== 'all') {
			// 用户点击了分类的，根据分类来渲染
			searchParams.typeId = issueTypeId
			searchParams.current = 1
		}

		async function fetchData() {
			const { data } = await getIssueByPage(searchParams);
			setIssueInfo(data.data);
			setPageInfo({
				current: data.currentPage,
				pageSize: data.eachPage,
				total: data.count
			});
		}
		fetchData();
	}, [pageInfo.current, pageInfo.pageSize, issueTypeId]);

	let issueList = [];
	for (let i = 0; i < issueInfo.length; i++) {
		issueList.push(<IssueItem key={i} issueInfo={issueInfo[i]} />);
	}

	return (
		<div className={styles.container}>
			{/* 上面的头部 */}
			<PageHeader title="问答列表">
				<TypeSelect></TypeSelect>
			</PageHeader>
			{/* 下面的列表内容区域 */}
			<div className={styles.issueContainer}>
				{/* 左边区域 */}
				<div className={styles.leftSide}>
					{issueList}
					{
						issueInfo.length > 0 ? (<div className="paginationContainer">
							<Pagination
								showQuickJumper
								defaultCurrent={1}
								{...pageInfo}
								onChange={handlePageChange}
							/>
						</div>) : (<div className={styles.noIssue}>有问题就来code station ！</div>)
					}
				</div>
				{/* 右边区域 */}
				<div className={styles.rightSide}>
					<AddIssueBtn />
					<div style={{
						marginBottom: "30px"
					}}><Recommend /></div>
					<ScoreRank />
				</div>
			</div>
		</div>
	);
}

export default Issues;