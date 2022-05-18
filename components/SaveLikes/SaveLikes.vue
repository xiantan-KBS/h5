<template>
	<view class="save-likes" @click.stop="handleLikes">
		<uni-icons :type="isLike ? 'heart-filled':'heart'" :size="size" color="#ff5500"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"SaveLikes",
		props:{
			articleId:String,
			size:{
				type:String,
				default:'20',
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			//点击处理文章是否喜欢
			async handleLikes(){
				//首先判断用户是否登录
				//用户登录了直接进行icon类型的切换
				//用户没有登录则跳转到用户登录页
				await this.isLogin();
				// 登录了用户信息，就向后端获取数据
				// console.log('用户的id',this.userInfo._id,'文章的id',this.articleId)
				const {msg,newUserInfo} = await this.$http.getIsLike({userId:this.userInfo._id,articleId:this.articleId});
				
				/* 重新修改用户信息 */
				this.setUserInfo({...this.userInfo,...newUserInfo});
				/*  */
				uni.showToast({
					title:msg,
					icon:"none"
				})	
				
				/* 事件总线，文章收藏就会触发关注文章页面重新获取数据 */
				uni.$emit('updateCollectList');
			}
		},
		computed:{
			/* 根据用户信息判断该文章是否是收藏状态 */
			isLike(){
				
				/* 兼容微信小程序 */
				try {
					return this.userInfo && this.userInfo.article_likes_ids.includes(this.articleId);
				} catch (e) {
					return false;
				}
			}
		}
	}
</script>

<style>

</style>