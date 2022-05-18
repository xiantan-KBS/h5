<template>
	<view>
			<view class="feedback-title">
				意见反馈：
			</view>
			<view class="feedback-content">
				<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
			</view>
	
			<view class="feedback-title">
				反馈图片：
			</view>
	
			<view class="feedback-image-box">
				<view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
					<view class="close-icon">
						<uni-icons type="closeempty" size="18" color="#fff" @click="deleteImg(index)"></uni-icons>
					</view>
					<view class="image-box">
						<image :src="item.url" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 添加图片的icon -->
				<view v-if="imageList.length < 5" class="feedback-image-item" @click="addImage">
					<view class="image-box">
						<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
					</view>
				</view>
			</view>
	
			<button type="warn" class="feedback-button" @click="submitFeedback">提交反馈意见</button>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				imageList:[],
			}
		},
		methods: {
			/* 添加图片 */
			addImage(){
				let count = 5 - this.imageList.length;
				uni.chooseImage({
					count,
					success:(res)=>{
						// console.log(res);
						const tempFilePaths = res.tempFilePaths;
						// const tempFileName = res.tempFiles.name;
						// this.imageList.push({url:tempFilePaths,name:tempFileName});
						tempFilePaths.forEach((url,index) =>{
								/* 只能传五找图片，多了传不了 */
							if(index < count) {
								this.imageList.push({
								url,
								name:res.tempFiles[0].name,
								})
							}
						})
					}
				})
			},
			/* 删除图片 */
			deleteImg(index){
				this.imageList.splice(index,1);
			},
				/* 提交意见反馈 */
			async submitFeedback(){
				if (!this.content) {
					uni.showToast({
						title:'反馈信息不能为空',
						icon:'none',
					})
					return ;
				}
				
				uni.showLoading();
				const feedbackImageList = await Promise.all(this.uploadImage())
				
				uni.hideLoading();
				// console.log(feedbackImageList);
				
				const {msg} = await this.$http.submitFeedback({
					userId:this.userInfo._id,
					content:this.content,
					feedbackImageList,
				})
				uni.showToast({
					title:msg,
				})
				
				setTimeout(()=>{
					uni.switchTab({
						url:"/pages/self/self"
					})
				},1500)
			},
				
			uploadImage(){
				return this.imageList.map((it,i)=>{
					// console.log(it)
					return new Promise(async resolve=>{
						const result = await uniCloud.uploadFile({
							filePath:it.url,
							cloudPath:it.name || `${i}.jpg`,
						})
						// console.log(result);
						resolve(result);
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./feedback.scss";
</style>
