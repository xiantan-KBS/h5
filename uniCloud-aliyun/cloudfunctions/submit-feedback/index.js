'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		userId,
		content,
		feedbackImageList,
	} = event;
	
	await db.collection('feedback').add({
		userId,
		feedbackImageList,
		content,
	})
	
	//返回数据给客户端
	return{
		code:0,
		data:{
			msg:'提交反馈成功',
		}
	}
};
