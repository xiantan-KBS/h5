<template>
	<view class="tab-bar">
			<scroll-view scroll-x="true" class="scroll-tab" :scroll-with-animation="true"  :scroll-into-view="currentIndex">
				 <view class="scroll-tab-box">
				 	<view @click="changeActiveIndex(index)" v-for="(item,index) in tabList" :key="item._id" class="scroll-tab-item" 
					:class="{active:activeIndex=== index}"  :id="`item${index}`">
				 		{{item.name}}
				 	</view>
				 </view>
			</scroll-view>
		<view class="setting-icon">
			<uni-icons type="gear" size="26" color="#666" @click="goLabelAdmin"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TabBar",
		props:{
			tabList:Array,
			activeIndex:Number,
		},
		watch:{
			activeIndex:{
				handler(newV,oldV){
					this.currentIndex = `item${newV}`
				}
			}
		},
		data() {
			return {
				currentIndex:'item0'  //滚动的过渡效果
			};
		},
		methods:{
			changeActiveIndex(index){
				this.$emit('changeIndex',index);
			},
			async goLabelAdmin(){
				await this.isLogin();
				uni.navigateTo({
					url:"/pages/labelAdmin/labelAdmin",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
 @import './TabBar.scss';
</style>