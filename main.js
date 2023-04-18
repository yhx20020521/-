import App from './App'
import store from './store'
//导入自己封装的类库
import * as sjuAsync from './common/sju.async.js'
import * as sjuAjax from './common/sju.ajax.js'
import * as sjuBase from './common/sju.base.js'
import * as sjuAlert from './common/sju.alert.js'
import * as sjuRegex from './common/sju.regex.js'
import * as sjuLogin from './common/sju.login.js'
import * as sjuNav from './common/sju.nav.js'
import * as sjuPay from './common/sju.pay.js'
import * as sjuTools from './common/sju.tools.js'

// #ifdef H5
import * as sjuWeixin from './common/sju.weixin.js'
// #endif


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
// 将封装库引入Vue原型链
Vue.prototype.sjuAsync = sjuAsync;
Vue.prototype.sjuAjax = sjuAjax;
Vue.prototype.sjuBase = sjuBase;
Vue.prototype.sjuAlert = sjuAlert;
Vue.prototype.sjuRegex = sjuRegex;
Vue.prototype.sjuLogin = sjuLogin;
Vue.prototype.sjuNav = sjuNav;
Vue.prototype.sjuPay = sjuPay;
Vue.prototype.sjuTools = sjuTools;

// #ifdef H5
Vue.prototype.sjuWeixin = sjuWeixin;
// #endif

// 全局变量
// 设置H5分享参数全局变量
Vue.prototype.$title='分享标题';
Vue.prototype.$desc = '分享描述';
Vue.prototype.$shareImage = '图片路径'; 
// 设置小程序分享参数全局变量
// #ifdef MP
Vue.prototype.$shareAppMessage = {
	title: '分享标题',
	path: '页面路径',
	imageUrl: '分享图片路径'
};
Vue.prototype.$shareTimeline = {
	title: '分享标题',
	query:'id=11&code=userCode',//自定义query参数
	imageUrl: '分享图片路径'
};
// #endif
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	// 将封装库引入
	app.config.globalProperties.sjuBase= sjuBase
	app.config.globalProperties.sjuAlert= sjuAlert
	app.config.globalProperties.sjuAjax= sjuAjax
	app.config.globalProperties.sjuAsync= sjuAsync
	app.config.globalProperties.sjuLogin= sjuLogin
	app.config.globalProperties.sjuNav= sjuNav
	app.config.globalProperties.sjuPay= sjuPay
	app.config.globalProperties.sjuTools= sjuTools
	
	// #ifdef H5
	app.config.globalProperties.sjuWeixin= sjuWeixin
	// #endif
	
	// 全局变量
	// 设置H5分享参数全局变量
	app.config.globalProperties.$title='分享标题';
	app.config.globalProperties.$desc = '分享描述';
	app.config.globalProperties.$shareImage = '图片路径'; 
	// 设置小程序分享参数全局变量
	// #ifdef MP
	app.config.globalProperties.$shareAppMessage = {
		title: '分享标题',
		path: '页面路径',
		imageUrl: '分享图片路径'
	};
	app.config.globalProperties.$shareTimeline = {
		title: '分享标题',
		query:'id=11&code=userCode',//自定义query参数
		imageUrl: '分享图片路径'
	};
	// #endif
	return {
		app
	}
}
// #endif
