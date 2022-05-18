import http from "../../http.js";



//获取当前app的版本信息
export const get_current_version = data =>{
	return http({name:'get_current_version',data})
}