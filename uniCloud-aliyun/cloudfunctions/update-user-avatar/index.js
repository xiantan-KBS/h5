'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		userId,
		avatar,
	} = event;
	
	const userInfo = await db.collection('user').doc(userId).get();
	 const oldAvatar = userInfo.data[0].avatar;
	 
	 /* 删除云存储里面的旧头像*/
	 try{
	 	uniCloud.deleteFile({
	 		fileList:[oldAvatar],
	 	})
	 }catch(e){
	 	console.log(e)
	 }
	 
	 /* 更新用户的头像*/
	 const id = userInfo.data[0].id;
	 await db.collection('user').doc(userId).update({
		 avatar,
	 })
	 
	 await db.collection('article').where({
		 'author.id':id,
	 }).update({
		 'author.avatar':avatar,
	 })
	
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:"成功修改头像"
		}
	}
};
