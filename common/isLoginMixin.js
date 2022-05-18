import {mapState,mapMutations} from "vuex";
export default {
	install(Vue){
		Vue.mixin({
			data(){},
			methods:{
				/* 判断用户是否登录 */
				isLogin(){
					return new Promise(resolve=>{
						if (this.userInfo) {
							resolve();
						}else{
							uni.navigateTo({
								url:'/pages/userInfo/login/login',
							})
						}
					})
				},
				...mapMutations(['setUserInfo'])
			},
			computed:{
				...mapState(['userInfo']),
			}
		})
	}
}