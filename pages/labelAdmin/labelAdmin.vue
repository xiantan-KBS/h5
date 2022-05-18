<template>
	<view class="label-container">
	    <view class="label-box">
	      <view class="label-header">
	        <view class="label-title">我的标签</view>
	        <view class="label-edit" @click="startEdit">{{isEdit? '完成' :'编辑'}}</view>
	      </view>
	      <view class="label-content">
	        <view class="label-content-item" v-for="(item,index) in selfLabelList" :key="item._id">
	          {{item.name}}
	          <uni-icons v-if="isEdit" class="icon-close" type="clear" size="20" color="red" @click="delLabelIds(item)"></uni-icons>
	        </view>
	        <view class="no-data" v-if="!selfLabelList.length">当前没有数据</view>
	      </view>
	    </view>
	    <view class="label-box">
	      <view class="label-header">
	        <view class="label-title">标签推荐</view>
	      </view>
	      <view class="label-content">
	        <view class="label-content-item" v-for="(item,index) in recommendLabelList" :key="item._id" @click="addLabelIds(item)">
	          {{item.name}}
	        </view>
	        <view class="no-data" v-if="!recommendLabelList.length">当前没有数据</view>
	      </view>
	    </view>
	  </view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				isEdit:false,
				/* 用来记录userInfo里标签类型的改变 */
				labelIds:[],
			}
		},
		watch:{
			userInfo:{
				immediate:true,
				handler(newV,oldV){
					// console.log(this.userInfo.label_ids);
					this.labelIds = this.userInfo.label_ids;
				}
			}
		},
		methods: {
			/* 开始编辑这些标签 */
			startEdit(){
				this.isEdit = !this.isEdit;
				!this.isEdit && this.updateLabelData();
			},
			/* 发送给后端更新数据 */
			async updateLabelData(){
				
				const data = {userId:this.userInfo._id,label_ids:this.labelIds}
				// console.log('上传更新数据',data,this.setUserInfo);
				// return;
				const {msg} = await this.$http.updateLabelData(data);
				
				// console.log(msg)
				
				uni.showToast({
					title:msg,
				})
				
				this.setUserInfo({...this.userInfo, label_ids:[...this.labelIds]});
			},
			addLabelIds(item){
				if(!this.isEdit) return;
				this.labelIds.push(item._id);
			},
			delLabelIds(item){
				this.labelIds= this.labelIds.filter(it=> item._id !== it);
			}
		},
		computed:{
			...mapState(['labelList','userInfo']),
			selfLabelList(){
				return this.labelList.filter(it=> this.labelIds.includes(it._id));
			},
			recommendLabelList(){
				return this.labelList.filter(it=> !this.labelIds.includes(it._id)&&it._id);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./labelAdmin.scss";
</style>
