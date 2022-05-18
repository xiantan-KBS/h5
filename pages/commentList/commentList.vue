<template>
	<view>
		<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
			<CommentBox :commentData="item" v-if="item" @handleReply="handleReply" :isReply="false">
			</CommentBox>
		</view>
		
		<!-- 评论组件,弹出框 -->
		<Comment :showPopup="showPopup" @closeComment="showPopup=false" @sendCommentData="sendCommentData" />
	</view>
</template>

<script>
	export default {
		onLoad(params){
			// console.log(params);
			this.articleId = params.articleId;
			this.getCommentData();
		},
		data() {
			return {
				articleId:"",
				commentList : [],
				showPopup: false, //是否显示评论遮罩层，
				// pageSize : 5,
				// page : 1,
				replyData:{},
			}
		},
		methods: {
			/* 获取评论数组 */
			async getCommentData() {
				const data = {
					_id: this.articleId,
					// pageSize:this.pageSize,
					// page:this.page,
				};
				const res = await this.$http.getCommentData(data);
				this.commentList = res;
			},
			/* 打开留言层 */
			async openPopup() {
				/* 首先判断是否是登陆状态 */
				await this.isLogin();
				this.showPopup = true;
			},
			handleReply(data){
				// console.log(data);
				// return;
				this.replyData = {
					commentId: data.comment.comment_id,
					is_reply: data.isReply,
				}
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id);
				this.openPopup();
			},
			async sendCommentData(content){
				const data = {
					userId: this.userInfo._id,
					articleId: this.articleId,
					content,
					...this.replyData,
				};
				// console.log(data)
				const {
					msg
				} = await this.$http.sendCommentData(data);
				uni.showToast({
					title: msg,
					icon: 'none',
				})
				this.showPopup = false;
				
				/* 发送完评论后要更新界面，重新获取数据 */
				this.replyData = {};
				this.getCommentData();
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-content-container{
	padding: 0 30rpx;
	border-bottom: 1px solid #eee;
}
</style>
