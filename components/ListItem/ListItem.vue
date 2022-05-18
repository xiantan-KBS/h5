<template>
	<view class="list-item-container">
		<scroll-view scroll-y="true" class="scroll-list-item">
			<ListCard  v-for="it in articleList" :key="it._id" :articleItem="it" v-if="it.mode" @saveHistory="$emit('saveHistory')"/>
			<!-- <uni-load-more status="loading"></uni-load-more> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"ListItem",
		props:{
			articleList:Array,
		},
		// async created(){
		// 	const res = await this.$http.getArticleListData({classify:"前端开发"});
		// 	this.list = res;
		// 	// console.log(res)
		// },
		data() {
			return {
			
			}
		}
	}
</script>

<style lang="scss">
.list-item-container{
	height: 100%;
	.scroll-list-item{
		height: 100%;
		overflow: hidden;
	}
}
</style>