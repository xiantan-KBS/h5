<template>
	<swiper :current="activeIndex" @change="changeIndex">
		<swiper-item v-for="(it,i) in tabList" :key="it._id" class="swiper-box">
			<view class="swiper-item">
				<ListItem :articleList="articleData[i]"/>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		name:"ArticleList",
		props:{
			tabList:Array,
			activeIndex:Number,
		},	
		created(){
			// 这里首次渲染的时候，调用请求，
		 if (this.labelList.length) {
			 // console.log(this.labelList.length)
		 	this.getArticleListData(this.activeIndex)
		 }
			// this.getArticleListData();
		},
		watch:{
			/* Storage首次存储时，created不会调用，所有需要watch来监听数据调用 */
			tabList(newV,oldV){
				// console.log(newV,oldV);
				/* 点击收藏按钮时，如果相同则不用再次发送请求数据 */
				if (JSON.stringify(newV) === JSON.stringify(oldV)) return ;
				this.getArticleListData(this.activeIndex);
			}
		},
		data() {
			return {
				articleData:{},
			};
		},
		methods:{
			
			// 滑动列表，改变上面选项卡的状态
			changeIndex(e){
				const index = e.detail.current;
				this.$emit('changeIndex',index);
				if (!this.articleData[index] || !this.articleData[index].length) {
					this.getArticleListData(index);
				}
				
			},
			
			// 获取文章列表数据
			async getArticleListData(index){
				// console.log(this.activeIndex)
				const match = {classify:this.tabList[index].name};
				// console.log(match);
				const res = await this.$http.getArticleListData(match);
				this.$set(this.articleData,index,res);
				// console.log(this.articleList)
			}
		},
		computed:{
			...mapState(['labelList'])
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP-WEIXIN */
		swiper{
		height: 100% !important;
	}
	/* #endif */
		.swiper-item{
			height: 100%;
		}
	
</style>