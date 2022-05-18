export default {
	//页面初始化时，在localStorage中访问用户信息，没有则设置为null
	userInfo: uni.getStorageSync('userInfo') || null,
	
	/* 存储搜索历史记录站 */
	historyList:uni.getStorageSync('historyList') || [],
	
	/* 首页展示的标签类型 */
	labelList : uni.getStorageSync('labelList') || [],
}