/**
 * 用户登录状态的相关封装
 */

import * as base from '@/common/sju.base.js';
import * as nav from '@/common/sju.nav.js';

	/**
	 * @description 保存不需要登录的页面路径地址
	 * /intake/login		用户登录页面
	 * /intake/register		用户注册页面
	 * @param {数组}  
	 */
	const noLogin = ['/intake/login', '/intake/register','/tab/index']
	
	/**
	 * @description 判断访问的Page是否需要登录
	 * 如果需要登录, 则判断是否已登录,未登录则跳转到登陆界面
	 * @param {string} url 打开的页面
	 */
	function checkLogin(url) {
		// 保存不需要登录的页面,如果pageUrl不在数组中存在,则需要登录
		let needLogin = false;
		for (let item of noLogin) {
			if (item == url)
				needLogin = false;
		}
		// 如果需要登录,并且没有登录token标识,则跳转到登陆页面
		let token = getValue('token');
		if (needLogin && base.isNull(token)) {
			base.logInfo("需要登录:" + url);
			//微信小程序,提供登录提醒
			//#ifdef MP-WEIXIN
			weixinInfo()
			//#endif
			
			//其它平台,直接跳转登录
			//#ifdef APP-PLUS || H5
			nav.redirectTo('/intake/login');
			//#endif

		} else {
			return true;
		}
		return false;
	}
	
	/**
	 * @description 微信小程序获取用户信息
	 */
	function weixinInfo(){
		uni.getUserProfile({
			desc: "用于个人中心信息展示",
			success: (res) => {
				var rawData = JSON.parse(res.rawData);
				weixinLogin(rawData.nickName,rawData.avatarUrl);
			},
			fail: (res) => {
				console.info('获取失败')
			}
		});
	}
	
	/**
	 * @description 微信小程序获取openID
	 * @param {string} nickName 微信用户名称
	 * @param {string} avatarUrl 用户用户头像
	 */
	function weixinLogin(nickName,avatarUrl){
		uni.login({
		  provider: 'weixin',
		  scopes:'auth_user',
		  success: function (loginRes) {
			// 获取临时code
			var code=loginRes.code;
			console.log(code)
			// 请求接口把微信用户信息传给后台保存
			ajax.post('/xxx/getOpenID',{
				code:code,
				nickname:nickName,
				portrait:avatarUrl
			},data=>{
				// 把后台返回的openID保存到本地存储
				saveValue('openID',data.openID);
			},true)
		  }
		});
	}
	
	/**
	 * @description 本地存储 
	 * @param {string} key 保存变量的标识
	 * @param {any} value 保存的值 
	 */
	function saveValue(key, value) {
		uni.setStorageSync(key, value);
	}
	
	/**
	 * @description 从本地存储获取key数据
	 * @param {string} key 保存变量的标识
	 */
	function getValue(key) {
		let value = uni.getStorageSync(key);
		return value;
	}
	
	/**
	 * @description 从本地存储清除某个key 
	 * @param {string} key 保存变量的标识
	 */
	function clearKey(key) {
		uni.removeStorageSync(key);
	}
	
	/**
	 * @description 从本地存储清除所有数据 
	 * @param {string} key 保存变量的标识
	 */
	function clearAll() {
		uni.clearStorageSync();
	}

export {
	checkLogin,
	weixinInfo,
	weixinLogin,
	saveValue,
	getValue,
	clearKey,
	clearAll
}
