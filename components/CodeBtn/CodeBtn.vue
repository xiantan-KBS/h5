<template>
	<view class="code-container">
		<view class="code-btn" @click="getForm">
			{{flag ? `${time}秒后重新获取`: "获取验证码"}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"CodeBtn",
		data() {
			return {
				timer:null,
				flag:false,
				time:60,
			};
		},
		methods:{
			/* 向父组件传递事件和回调函数 */
			getForm(){
					/* 如果获取验证码定时器开启了后，设置一个锁，再次点击不会重新发送验证码 */
				if(this.timer) return;
				this.$emit('getForm',this.sendPhoneData);			
			},
			async sendPhoneData(form){
				// console.log(form);  //父组件中的表单
				/* 获取输入的手机号码 */
				const phone = await form.validateField(['phone']);
				this.timeRunning();
				const {mobeilCode,msg} = await this.$http.getCode(phone);
				
				uni.showToast({
					title:msg,
					icon:"none",
				})
				
				// 把验证码发给父组件进行验证
				this.$emit('validateCode',mobeilCode);
			},
			/* 验证码倒计时60秒 */
			timeRunning(){
				this.flag = true;
				this.timer = setInterval(()=>{
					if (this.time === 1) {
						clearInterval(this.timer);
						/* 倒计时结束后还原数据 */
						this.timer = null;
						this.flag = false;
						this.time = 60;
						return;
					}
					this.time--;
				},1000)
			}
		},
		/* 组件销毁后清除定时器 */
		beforeDestroy(){
			clearInterval(this.timer)
			this.timer = null;
			this.flag = false;
			this.time = 60;
		}
	}
</script>

<style lang="scss" scoped>
.code-container{
	//保证宽度不受内容改变的影响
	flex-shrink: 0;
	margin-right:40rpx;
	.code-btn{
		text-align: center;
		// width: 140rpx;
		background-color: $base-color;
		padding: 20rpx;
		border-radius: 10rpx;
		color: #fff;
		opacity: .8;
	}
}
</style>