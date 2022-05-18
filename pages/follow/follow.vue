<template>
	<view class="follow-container">
	    <view class="follow-tab">
	      <view class="follow-tab-box">
	        <view class="follow-tab-item" :class="{active:currentIndex===0}" @click="currentIndex = 0">文章</view>
	        <view class="follow-tab-item" :class="{active:currentIndex===1}" @click="currentIndex = 1">作者</view>
	      </view>
	    </view>
	    <!-- 内容切换区域 -->
	    <view class="follow-list-container">
	      <swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex = $event.detail.current">
	        <swiper-item>
	          <ListItem  :articleList="articleList" v-if="articleList.length"></ListItem>
	          <view v-else  class="no-data">暂无收藏的文章</view>
	        </swiper-item>
	        <swiper-item>
	          <AuthorList :authorList="authorList" v-if="authorList.length"/>
			   <view v-else  class="no-data">暂无关注的作者</view>
	        </swiper-item>
	      </swiper>
	    </view>
	  </view>
</template>

<script>
	export default {
		onLoad(){
			// #ifdef MP-WEIXIN
			 if(!this.userInfo){
				 uni.redirectTo({
				 	url:"/pages/userInfo/login/login",
				 })
				 return;
			 }
			// #endif
			
			/* 监听事件总线 */
			uni.$on('updateCollectList',()=>{
				this.getCollectArticle('noLoading');
			})
			uni.$on('updateAuthorList',()=>{
				this.getLikeAuthor('noLoading');
			})
			this.getCollectArticle();
			this.getLikeAuthor();
		},
		// watch:{
		// 	"userInfo.article_likes_ids":{
		// 		handler(){
		// 			this.getCollectArticle();
		// 		}
		// 	}
		// },
		data() {
			return {
				currentIndex:0,
				articleList:[],
				authorList:[],
				dataNone:true,
			};
		},
		methods:{
			/* 获取收藏文章的数据 */
			async getCollectArticle(isLoading){
				const list = await this.$http.getCollectArticle({userId:this.userInfo._id,isLoading})
				this.articleList = list;
			},
			/* 获取关注的作者 */
			async getLikeAuthor(isLoading){
				const list = await this.$http.getLikeAuthor({userId:this.userInfo._id,isLoading})
				this.authorList = list;
			}
		}
	}
</script>

<style lang="scss">

@import "./follow.scss"
</style>
