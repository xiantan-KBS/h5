// router.js  路由守卫
import {RouterMount,createRouter} from 'uni-simple-router';
import store from "./store/index";
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log(to,store.state.userInfo)
	if (to.meta.needLogin && !store.state.userInfo) {
		next({
			name:'login',
			NAVTYPE :"push"   //跳转到普通页面，新开保留历史记录
		})
	}else{
		next();
	}
	next()
	
});
//全局路由后置守卫
// router.afterEach((to, from) => {
//     console.log(to.meta)
// })

export {
	router,
	RouterMount
}