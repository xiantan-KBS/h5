'use strict';
exports.main = async (event, context) => {
	const {
		phone
	} = event;
	/* 随机生成一个四位数验证码 */
	const mobeilCode = Math.random().toString().substr();
	try {
		const res = await uniCloud.sendSms({
			appid: '__UNI__2D1EA26', //工程ID
			smsKey: 'bc84ef655fbdb84b6bb15c1e93c5641c',
			smsSecret: 'a814631039dc2d252bbd9ec615fbd9ea',
			phone,
			templateId: "12333", // 请替换为自己申请的模板id
			data: {
				code: mobeilCode,
				expMinute: '1',
			}
		})
		// 调用成功，请注意这时不代表发送成功
		return {
			code: 0,
			data: {
				msg: "请在手机上查收验证码",
				mobeilCode,
			}
		}
	} catch (err) {
		return {
				code: 1,
				msg: "短信验证码发送失败"
			}
	}
};
