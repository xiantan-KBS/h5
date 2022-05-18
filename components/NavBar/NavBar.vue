<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
			<view :style="{height:statusBarHeight + 'rpx'}"></view>
			
			<!-- 当是搜素界面时，展示返回按钮 -->
			<view class="return-icon" v-if="isSearch" @click="goBack" :style="{top:statusBarHeight + 'rpx'}">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>
			<view class="nav-bar-content" @click="jumpSearchPage" :style="{marginRight:marginRight + 'rpx',marginLeft:isSearch ? '20rpx' : ''}">
				<uni-icons type="search" color="#999"></uni-icons>
				<view class="nav-search" v-if="!isSearch">
					输入文章标题进行搜素
				</view>
				<input v-else type="text" placeholder="输入文章标题进行搜素"  v-model.trim="searchVal"
				class="search-input" confirm-type="search" @confirm="getSearchData"/>
			</view>
		</view>
		
		<!-- 占位条，因为搜索框是固定定位 -->
		<view :style="{height:statusBarHeight+80+'rpx'}"></view>
	</view>
</template>

<script>
	export default {
		name:"NavBar",
		props:{
			isSearch:{
				type:Boolean,
				default:false,
			},
			parentVal:String,
		},
		data() {
			return {
				statusBarHeight: 20,
				marginRight:0,
			};
		},
		created(){
			//获取小程序默认状态栏的高度（h5没有状态栏）
			const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			statusBarHeight && (this.statusBarHeight = statusBarHeight * 2)
			
			
			//只有当是微信小程序的时候，会有右侧的一个小胶囊
			// #ifdef MP-WEIXIN
			const buttonInfo = uni.getMenuButtonBoundingClientRect();
			this.statusBarHeight += buttonInfo.top;
			this.marginRight = buttonInfo.width *2 +40 ; 
			console.log(buttonInfo);
			// #endif
		},
		methods:{
			jumpSearchPage(){
				/* 如果是搜索页面不用跳转 */
				if(this.isSearch) return
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			goBack(){
				// #ifdef H5
				uni.switchTab({
					url:'/pages/index/index'
				})
				// #endif
				// #ifndef H5
					uni.navigateBack({})
				// #endif
			},
			/* 通知父组件发送数据 */
			getSearchData(e){
				// console.log(e)
				this.$emit('getSearchData',e.detail);
			}
		},
		computed:{
			/* 实现数据双向绑定 */
			searchVal:{
				get(){
					return this.parentVal;
				},
				set(val){
					this.$emit('changeVal',val);
					if (!val) {
						this.$emit('getSearchData',{value:''});
					}
				}
			}
		}
	}
</script>

<style lang="scss">
@import "./NavBar.scss"
</style>