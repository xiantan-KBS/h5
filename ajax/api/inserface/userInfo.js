import http from "../../http.js";


//登录后用户信息
export const sendUserData = data =>{
	return http({name:'send-user-data',data})
}


// 验证码
export const getCode = data =>{
	return http({name:'get-code',data})
}