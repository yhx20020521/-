/**
 * 页面跳转的相关方法
 */

import * as base from '@/common/sju.base.js';
import * as login from '@/common/sju.login.js'

/**
 * @description url地址的转换
 * <br/>pages内页面访问,参数路径规范:/页面名
 * <br/>pages内子目录中页面访问,参数路径规范:/子目录名/页面名,实际访问页面:/pages/子目录名/页面名/页面名,
 * <br/>分包页面访问,参数路径规范:/分包名/页面名,实际访问页面:/sub_分包名/pages/页面名/页面名
 */
function tranferUrl(url) {
	//地址和参数分离
	let para = '';
	if (url.indexOf('?')) {
		let arrPara = url.split('?');
		url = arrPara[0];
		para = arrPara[1];
	}
	//获取页面名称
	let arrPath = url.split('/');
	let fileName = arrPath[arrPath.length - 1];
	//处理路径
	let count = url.split('/').length;
	let result;
	if (count == 2) {
		//pages内页面访问
		result = "/pages/";
	}
	if (count == 3) {
		if (url.indexOf('tab') > 0) {
			//tab页面
			result = "/pages/tab/";
		} else {
			//分包页面
			let path = arrPath[1];
			result = "/sub_" + path + "/pages/";
		}
	}
	//拼接页面名称
	result += fileName + "/" + fileName;
	//拼接参数
	if (base.isNotNull(para))
		result += "?" + para;
	//输出结果
	base.logInfo('tranferUrl:' + result);
	return result;
}

/**
 * @description 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
 * @param {string} url 跳转的地址
 */
function navigateTo(url) {
	// 判断打开页面是否需要登录
	if (login.checkLogin(url)) {
		url = tranferUrl(url);
		uni.navigateTo({
			url: url,
			fail: function() {
				base.logInfo('navigateTo 失败');
			}
		})
	}
}

/**
 * @description 关闭当前页面，跳转到应用内的某个页面。
 * @param {sting} url 跳转的地址
 * @param {string} para 页面参数
 */

function redirectTo(url) {
	// 判断打开页面是否需要登录
	if (login.checkLogin(url)) {
		url = tranferUrl(url);
		uni.redirectTo({
			url: url,
			fail: function() {
				base.logInfo('navigateTo 失败');
			}
		});
	}
}
	
/**
 * @description 关闭所有页面，打开到应用内的某个页面。
 * @param {sting} url 跳转的地址
 * @param {string} para 页面参数
 */
function reLaunch(url) {
	// 判断打开页面是否需要登录
	if (login.checkLogin(url)) {
		url = tranferUrl(url);
		uni.reLaunch({
			url: url,
				fail: function() {
				base.logInfo('reLaunch 失败')
			}
		})
	}
}

/**
 * @description 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 * @param {sting} url 跳转的地址
 */
function switchTab(url) {
	if (login.checkLogin(url)) {
		url = tranferUrl(url);
		uni.switchTab({
			url: url,
			fail: function() {
				base.logInfo('switchTab 失败')
			}
		})
	}
}
	
/**
 * @description 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
 * @param {number} delta 返回的页面数
 */
function navigateBack(delta) {
	uni.navigateBack({
		delta: delta
	});
}

export{
	navigateTo,
	redirectTo,
	reLaunch,
	switchTab,
	navigateBack
}
