'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {value} = event;
	
	const collection = db.collection('article');
	
	//把内容部分截取下来，减少体积
	const res = await collection
	.aggregate()   //使用聚合的形式进行数据获取
	.match({
		title:new RegExp(value )
	})   //根据匹配条件进行数据返回模糊查询
	.end();
	
	console.log(res);
	//返回数据给客户端
	return {
		code:0,
		msg:"数据查询成功",
		data:res.data,
	}
};
