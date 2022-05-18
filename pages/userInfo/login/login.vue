<template>
	<view class="login-container">
		<img src="/static/img/login_bg.png" alt="" mode="aspectFill" class="banner-bg">
		<view class="login-type">
			<view class="login-item" :class="{active:type=== 'account'}" @click="changeType('account')">
				账号登陆
			</view>
			<view class="login-item" :class="{active:type=== 'phone'}" @click="changeType('phone')">
				手机登录
			</view>
		</view>
		<!-- :rules="userRules"  h5可以这样写，但小程序不支持 -->
		<uni-forms ref="form":modelValue="formData" class="form" >
			<view class="account-login" v-if="type==='account'">
				<uni-forms-item label="账号" name="loginName">
					<input type="text" v-model="formData.loginName" placeholder="请输入账号" 
					class="form-input" placeholder-class="placeholder "/>
				</uni-forms-item>
				<uni-forms-item name="password" label="密码">
					<!-- 增强后的密码框 -->
					<uni-easyinput :inputBorder="false" type="password" placeholder="请输入密码" v-model="formData.password" 
					 class="form-input" placeholder-class="placeholder"></uni-easyinput>
					<!-- <input type="password" placeholder="请输入密码" v-model="formData.password" 
					 class="form-input" placeholder-class="placeholder"/> -->
				</uni-forms-item>
			</view>
			<view  class="phone-login" v-else>
				<uni-forms-item label="手机号" name="phone">
					<input type="number" v-model="formData.phone" placeholder="请输入手机号" 
					 class="form-input" placeholder-class="placeholder "/>
				</uni-forms-item>
				<uni-forms-item name="vCode" label="验证码">
					<input type="number" placeholder="请输入验证码" v-model="formData.vCode" 
					 class="form-input" placeholder-class="placeholder "/>
					 <CodeBtn @getForm="getForm" @validateCode="returnCode = $event"/>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="submitUser">立即登录</button>
		</uni-forms>
		<view class="other">
			<view class="register" @click="goRegisterPage">
				注册
			</view>
			<view class="forget">
				忘记密码
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from "vuex"
	//返回带有setUserInfo方法的对象
	// console.log(mapMutations(['setUserInfo']))
	export default {
		/* 当页面初始化之后，绑定校验规则 */
		onReady(){
			/* 兼容小程序的写法，不然小程序在错误的情况下也能获取到表单数据*/
			this.$refs.form.setRules(this.userRules);
		},
		data() {
			return {
				type: "account",
				formData: {
					loginName: "", //账号
					password: "", //密码
					phone: "", //手机号
					vCode: "", //验证码
				},
				returnCode:1234,   
			}
		},
		methods: {
			
			//切换登录状态
			changeType(type){
				this.type = type;
				// console.log(this.$refs.form)
				//切换登录类型时清空表单验证错误信息(传一个参数【】)
					this.$refs.form.clearValidate([]);
					
			},
			//提交表单
			async submitUser(){
				//提价表单的验证信息，返回的是一个promise对象
				const res = await  this.$refs.form.validate();
				// console.log(res);
				this.sendUserInfo(res);
			},
			
			//发送数据
			async sendUserInfo(userInfo){
				var userInfoData = {type:this.type,...userInfo}
				const res = await this.$http.sendUserData(userInfoData);
				//通过提交mutations改变state状态的数据
				this.setUserInfo(res);
				uni.showToast({
					title:"账号登录成功",
					icon:"none",
				})
				setTimeout(()=>{
					// #ifdef H5
					uni.switchTab({
						url:"/pages/index/index",
					})
					// #endif
					
					// #ifndef H5
					uni.navigateBack({})
					// #endif
				},1500)
			},
			//传递this.$refs.form给CodeBtn组件，让它处理发送请求
			getForm(cb){
				cb && cb(this.$refs.form);
			},
			/* 跳转到注册页面 */
			goRegisterPage(){
				uni.navigateTo({
					url:"/pages/userInfo/register/register"
				})
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
@import "./login.scss";
</style>
