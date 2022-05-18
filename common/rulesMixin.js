export default {
	//安装插件
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					phoneReg: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
					userRules: {
						
						loginName: {
							rules: [{
								required: true,
								"errorMessage": "账号名不能为空"
							}, {
								validateFunction: this.validateLoginName
							}]
						},
						password: {
							rules: [{
								required: true,
								errorMessage: "密码不能为空"
							}]
						},
						phone: {
							rules: [{
								required: true,
								errorMessage: "手机号不能为空"
							}, {
								validateFunction: this.validatePhone
							}]
						},
						vCode: {
							rules: [{
								required: true,
								errorMessage: "验证码不能为空"
							}, {
								validateFunction: this.validateCode
							}]
						}
					}

				}
			},
			methods: {
				//用户名验证函数
				//四个参数分别是被绑定的rule规则,输入的数据，整个表单的数据，错误后的回调函数
				validateLoginName(rule, data, formData, callback) {
					// console.log(data.length)
					switch (true) {
						case data.length < 5:
							callback('用户名长度不正确')
							break;
						default:
							return true;
					}
				},
				//验证手机号的函数
				validatePhone(rule, data, formData, callback) {
					switch (true) {
						case !this.phoneReg.test(data):
							callback('手机格式不正确');
							break;
						default:
							return true;
					}
				},
				//验证手机验证码
				validateCode(rule, data, formData, callback) {
					// console.log(this.returnCode)
					switch (true) {
						case data != this.returnCode:
							callback('请输入正确的验证码');
							break;
						default:
							return true;
					}
				}
			}
		})
	}
}
