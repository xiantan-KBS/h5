'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		type,
		password,
		loginName,
		phone
	} = event;

/* 将电话号码转为数字类型 */
	phone = +phone;
	
	
	const {
		affectedDocs,
		data
	} = await db.collection('user')
		.aggregate()
		.match(type === "account" ? {
			loginName,
			password
		} : {
			phone
		})
		.end()

	//返回数据给客户端
	return affectedDocs ? {
		code: 0,
		msg: "获取用户信息成功",
		data: data[0],
	} : {
		code: 1,
		msg: type === "account" ? "获取用户信息失败,账号或密码错误" : '获取用户信息失败,手机号或验证码不正确'
	}
};
