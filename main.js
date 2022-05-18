import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from "./store/index.js";
import modules from "./ajax/api/index";
// 表单的校验规则，提出混入
import ruleMixin from "./common/rulesMixin.js";
import isLoginMixin from "./common/isLoginMixin.js";

/* 引入router文件 */
import {router,RouterMount} from './router.js' 
Vue.use(router)

Vue.use(isLoginMixin);
Vue.use(ruleMixin);
import "@/components/u-parse/u-parse.css";

//把modules对象挂载到原型上供实例使用
Vue.prototype.$http = modules;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store,
})
// app.$mount()


//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif