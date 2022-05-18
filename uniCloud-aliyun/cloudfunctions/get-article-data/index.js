'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const { _id } = event;
	
	const res = await db.collection('article')
	.aggregate()
	.match({
		_id,
	}).
	project({
		comments:0,   //过滤掉评论区域
	})
	.end()
	
		
	return {
		code:0,
		msg:"成功获取文章数据",
		data:res.data[0],
	}
}