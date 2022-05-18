<template>
	<view>
		<ListCard :articleItem="item" v-for="item in articleList" :key="item._id"/>
		 <view v-if="!articleList.length"  class="no-data">您还没有编写过文章</view>
	</view>
</template>

<script>
	export default {
		onLoad(){
			this.getSelfArticle();
		},
		data() {
			return {
				articleList:[],
			}
		},
		methods: {
			async getSelfArticle(){
				const list = await this.$http.getSelfArticle({userId:this.userInfo._id});
				this.articleList = list;
			}
		}
	}
</script>

<style lang="scss">
.no-data {
        height: 400rpx;
        line-height: 400rpx;
        width: 100%;
        text-align: center;
        font-size: 24rpx;
        color: #666;
    }
</style>
