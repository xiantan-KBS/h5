'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {userId} = event;
	const userInfo = await db.collection('user').doc(userId).get();
	let article_ids = userInfo.data[0].article_ids;
	
	
	const list = await db.collection('article')
	.aggregate()
	.project({
		content:0,
		comments:0,
	})
	.match({
		id:dbCmd.in(article_ids),
	})
	.end()
	
	
	return {
		code:0,
		msg:'成功获取数据',
		data:list.data,
	}
};
