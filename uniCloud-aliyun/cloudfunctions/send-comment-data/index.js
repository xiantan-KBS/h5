'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId,articleId,content,commentId="",is_reply=false,reply_id=''} = event;
	// console.log('id',commentId);
	
	let user = await db.collection('user').doc(userId).get();
	user = user.data[0];
	// console.log(user);
	let article = await db.collection('article').doc(articleId).get();
	article = article.data[0];
	// console.log(articleId);
	
	
	
	  let commentObj = {
	    comment_id: generatedId(5),
	    comment_content: content,
	    create_time: Date.now(),
	    is_reply,
	    author: {
	      author_id: user._id,
	      author_name: user.author_name,
	      avatar: user.avatar,
	      professional: user.professional
	    },
	    replyArr: []
	  }
	
	if (commentId==='') {
		 commentObj.replyArr = [];
		  commentObj = dbCmd.unshift(commentObj);
		 
	}else{
		/* 获取当前评论的集合，在这个集合里面找到指定的那条评论，修改他的replyArr属性 */
		let authorName = null;
		/* 得到指定回复的那条评论在comments数组中的index值 */
		let commentIndex = article.comments.findIndex(it=> commentId === it.comment_id);
		// console.log('索引值',commentIndex)
		if (is_reply) {
			// console.log('replyArr:',article.comments[commentIndex].replyArr.filter(it=> reply_id === it.comment_id)[0])
			authorName = article.comments[commentIndex].replyArr.filter(it=> reply_id === it.comment_id)[0].author.author_name;
		}else{
			authorName = article.comments[commentIndex].author.author_name;
		}
		
		commentObj.to = authorName;
		commentObj={
			[commentIndex]:{
				replyArr:dbCmd.unshift(commentObj)
			}
		}
	}
	
	
	/*
	const obj = {comments:[{replyArr:1},{replyArr:2}]}
	修改comments数组的第一位
	...update({
		comments:{
			0:{
				replyArr:3
			}
		}
	})
	 */
	
	
	  // let comments = dbCmd.unshift(commentObj)
	  // console.log('c:',comments.operands);
	  await db.collection('article').doc(articleId).update({
	    comments:commentObj,
	  })
	
	
	
	
	
	/* 随机生成唯一的id */
	function generatedId (num) {
	    return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36)
	  }
	return {
		code:0,
		data:{
			msg:"评论成功"
		}
	}
};
