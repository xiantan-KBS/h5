import http from "../../http.js";


//获取选项卡列表数据
export const getTabData = data =>{
	return http({name:'get-tab-data',data})
}



// 获取文章列表数据
export const getArticleListData = data =>{
	return http({name:'get-article-list-data',data})

}

// 点击爱心是否收藏或取消收藏
export const getIsLike = data =>{
	return http({name:'get-is-like',data})
}


// 根据搜索词获取文章数据
export const getSearchData = data =>{
	return http({name:'get-search-data',data})
}



// 更新用户对标签选择的数组
export const updateLabelData = data =>{
	return http({name:'update-label-data',data})
}


// 获取文章详情页的数据
export const getArticleData = data =>{
	return http({name:'get-article-data',data})
}


//发送评论给后端处理数据
export const sendCommentData = data=> http({name:'send-comment-data',data})


//获取文章评论
export const getCommentData = data=> http({name:'get-comment-data',data})


/* 是否关注或取消关注作者 */
export const  updateFollowAuthor=data=> http({name:'update-follow-author',data})


/* 是否点赞或取消点赞文章 */
export const  updateThumbsUp=data=> http({name:'update-thumbs-up',data})


/* 获取用户收藏的文章 */
export const getCollectArticle=data=> http({name:'get-collect-article',data})

/* 获取用户关注的作者 */
export const getLikeAuthor=data=> http({name:'get-like-author',data})


/* 获取用户自己编写的文章 */
export const getSelfArticle=data=> http({name:'get-self-article',data})


/* 提交用户意见反馈 */
export const submitFeedback=data=> http({name:'submit-feedback',data})


/* 更改头像 */
export const updateUserAvatar=data=> http({name:'update-user-avatar',data})

