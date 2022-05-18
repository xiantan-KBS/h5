<template>
	<view >
		<uni-popup ref="popup" type="bottom" :mask-click="false">
			 <!-- 内容区域 -->
			      <view class="popup-wrapper">
			        <view class="popup-header">
			          <view class="popup-header-item" @click="closeComment">取消</view>
			          <view class="popup-header-item" @click="sendComment">发布</view>
			        </view>
			        <view class="popup-content">
			          <textarea class="popup-content-textarea" v-model.trim="commentsValue" maxlength="200" fixed placeholder="请输入评论内容"></textarea>
			          <view class="popup-content-count">{{commentsValue.length}}/200</view>
			        </view>
			      </view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"Comment",
		props:{
			showPopup:Boolean,
		},
		// mounted(){
		// 	this.$refs.popup.open();
		// },
		watch:{
			showPopup(newV){
				// console.log(newV)
				newV ? this.$refs.popup.open() : this.$refs.popup.close()
			}
		},
		data() {
			return {
				commentsValue:"",
			};
		},
		methods:{
			/* 取消关闭弹窗层 */
			closeComment(){
				this.$emit("closeComment");
				this.commentsValue = '';
			},
			sendComment(){
				if (!this.commentsValue) {
					uni.showToast({
						title:"评论不能为空",
						icon:"none",
					});
					return ;
				}
				this.$emit('sendCommentData',this.commentsValue);
				this.commentsValue = '';
			},
		}
	}
</script>

<style lang='scss' scoped>
.popup-wrapper {
  background-color: #fff;
  .popup-header {
    @include flex();
    font-size: 28rpx;
    color: #666;
    border-bottom: 1px #f5f5f5 solid;
    .popup-header-item {
      height: 100rpx;
      line-height: 100rpx;
      padding: 0 30rpx;
    }
  }
  .popup-content {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    .popup-content-textarea {
      height: 400rpx;
      width: 100%;
    }
    .popup-content-count {
      @include flex(flex-end);
      font-size: 24rpx;
      color: $c-9;
    }
  }
}
</style>