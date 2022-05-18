'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {userId,authorId} = event;
	
	let user = await db.collection('user').doc(userId).get();
	user = user.data[0];
	// console.log(user)
	let returnMsg = '';
	let authorLikes = null;
	
	if(user.author_likes_ids.includes(authorId)){
		returnMsg = '取消关注成功',
        authorLikes = dbCmd.pull(authorId);
	}else{
		returnMsg = '关注成功',
		authorLikes = dbCmd.addToSet(authorId);
	}
	
	await db.collection('user').doc(userId).update({
		author_likes_ids:authorLikes,
	})
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:returnMsg,
		}
	}
};
