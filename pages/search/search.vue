<template>
	<view class="search-container">
		 <!-- 搜索导航组件 -->
		<NavBar :isSearch="isSearch" :parentVal="parentVal" @changeVal="parentVal = $event" @getSearchData="getSearchData"/>
		<!-- 搜索包裹 -->
		    <view class="search-wrapper" v-if="isShowHistory">
		      <!-- 没有进行搜索的操作 -->
		      <view  class="search-history-container">
		        <!-- 头部 -->
		        <view class="search-header">
		          <text class="history-text">搜索历史</text>
		          <text class="history-clean" @click="cleanHistoryList">清空</text>
		        </view>
		        <!-- 内容部分 -->
		        <view class="search-history-content" v-if="historyList.length">
		          <view class="history-content-item" v-for="(item,i) in historyList" :key="i" @click="searchArticle(item)">{{item}}</view>
		        </view>
		
		        <view class="no-data" v-else>当前没有搜索历史</view>
		      </view>
		    </view>
			<!-- 开始进行搜索的操作 -->
			<view v-else class="search-list-container">
			  <ListItem v-if="searchList.length" :articleList="searchList" @saveHistory="saveHistory"></ListItem>
			   <view v-else class="no-data">没有搜索到相关数据</view>
			</view> 
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex";
	export default {
		data() {
			return {
				isSearch:true,
				parentVal:"",
				searchList:[],
				isShowHistory:true,
			}
		},
		methods: {
			/* 向云函数获取数据 */
			 async getSearchData(data){
				 // console.log(data.value)
				 this.isShowHistory = false;
				if(!data.value) {
					this.searchList = [];
					this.isShowHistory = true;
					return;
				};
				 const res = await this.$http.getSearchData(data);
				 // console.log(res) 
				 this.searchList = res;
			},
			/* 保存历史搜索记录 */
			saveHistory(){
				this.setHistoryList(this.parentVal);
			},
			async searchArticle(data){
				this.parentVal = data;
				await this.getSearchData({value:data});
			},
			...mapMutations(['setHistoryList','cleanHistoryList'])
		},
		computed:{
			...mapState(['historyList'])
		}
	}
</script>

<style lang="scss" scopde>
@import "./search.scss";
</style>
