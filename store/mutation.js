export default {

	setUserInfo(state, data) {
		//把数据保存在localStorage中（采用的是同步任务）
		uni.setStorageSync('userInfo', data);
		//改变状态数据
		state.userInfo = data;
	},
	setHistoryList(state, data) {
		let list = state.historyList;
		if (list.length > 0 && list.includes(data)) return;
		//把数据保存在localStorage中（采用的是同步任务）
		list.unshift(data);
		uni.setStorageSync('historyList', list);
		//改变状态数据
		state.historyList = list;
	},
	cleanHistoryList(state, data) {
		// #ifdef H5
		if (window.confirm && confirm('是否清空所有历史记录！')) {
			uni.removeStorageSync('historyList');
			state.historyList = [];
		}
		// #endif

		// #ifndef H5
		uni.removeStorageSync('historyList');
		state.historyList = [];
		// #endif

	},
	
	/* 改变labelList的值 */
	setLabelList(state,data){
		uni.setStorageSync('labelList',data);
		state.labelList = data;
	}
}
