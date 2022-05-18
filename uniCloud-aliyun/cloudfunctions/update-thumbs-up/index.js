'use strict';
const db= uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {userId,articleId} = event;
	
	let user = await db.collection('user').doc(userId).get();
	user = user.data[0];
	// console.log(user)
	let returnMsg = '';
	let thumbsLists = null;
	
	if(user.thumbs_up_article_ids.includes(articleId)){
		returnMsg = '取消点赞',
	    thumbsLists = dbCmd.pull(articleId);
	}else{
		returnMsg = '成功点赞',
		thumbsLists = dbCmd.addToSet(articleId);
	}
	
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids:thumbsLists,
	})
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:returnMsg,
		}
	}
};
