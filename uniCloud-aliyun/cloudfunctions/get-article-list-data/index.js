'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {classify}  = event;
	//根据classify条件进行查找
	let matchObj = {}; 
	if(classify !== '全部'){
		  matchObj={classify};
	  }
	  
	const collection = db.collection('article');
	
	//把内容部分截取下来，减少体积
	const res = await collection
	.aggregate()   //使用聚合的形式进行数据获取
	.match(matchObj)   //根据匹配条件进行数据返回
	.project({
		content:0,   //本次查询不需要返回文字详情给前端
	}).end();
	
	//返回数据给客户端
	return {
		code:0,
		msg:"成功",
		data:res.data,
	}
};
