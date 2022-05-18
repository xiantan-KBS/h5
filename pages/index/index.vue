<template>
	<view class="home-container">
		<!-- 顶部搜索框 -->
		<NavBar  />

		<!-- 分类选项卡 -->
		<TabBar :tabList="labelList" :activeIndex="activeIndex" @changeIndex="changeIndex"/>
		
		<!-- 文章列表容器 -->
		<ArticleList  class="acticle-container" :tabList="labelList" :activeIndex="activeIndex" @changeIndex="changeIndex"/>
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex";
	export default {
		
			async onLoad(){
				// const res = await uniCloud.callFunction({
				// 	name:"get-tab-data",
				// });
				if (this.labelList.length) return 
				const res = await this.$http.getTabData()
				const tabList = [{name:'全部'},...res];
				this.setLabelList(tabList);
				// console.log(this.$http);
			},
			data(){
				return{
					// tabList:[],
					activeIndex:0
				}
			},
			methods:{
				changeIndex(index){
					this.activeIndex = index;
				},
				/* 提交mutation改变数据 */
				...mapMutations(['setLabelList'])
			},
			computed:{
				labelList(){
					const showTabList = this.$store.state.labelList;
					if (this.userInfo) {
						this.activeIndex = 0;
						// console.log(1);
						return [...showTabList.slice(0,1),...showTabList.filter(it=> this.userInfo.label_ids.includes(it._id))]
					}else{
						return showTabList;
					}
				}
			},
			
	}
</script>

<style scoped lang="scss">
	/* #ifdef MP-WEIXIN */
    	.home-container{
		height: 100vh !important;
	}
	/* #endif */
	page{
		height: 100%;
		display: flex;
	}
.home-container{
	flex: 1;
	@include flex(flex-start,column);
	overflow: hidden;
	align-items: inherit;
	width: 100%;
	height: 100%;
	.acticle-container{
		flex: 1;
	}
}
</style>
