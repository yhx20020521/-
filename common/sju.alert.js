/**
 * 消息框,错误框,确认框,等待框等封装
 */
import * as base from '@/common/sju.base.js';

/**
 * @description 提示消息,一会就自动消失
 * @param {string} msg 要显示的消息
 * @param {number} second 显示时间(毫秒,默认1000秒)
 */
function showInfo(msg, second) {		
	if (base.isNull(second))
		second = 1000;
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: second
	});	
}
	
/**
 * @description 提示错误消息,需要点击确认后关闭
 * @param {string} msg 错误消息
 * @param {type} title 错误标题[默认'提示']
 */
function showError(msg, title) {
	if (base.isNull(title))
		title = "提示";
	uni.showModal({
		title: title,
		content: msg,
		showCancel: false
	});
}

/**
 * @description 显示提示,确认后进行页面跳转
 * @param {string} msg 错误消息
 * @param {type} url 跳转地址
 * @param {type} title 错误标题[默认'提示']
 */
function showAndRedirect(msg, url, title) {
	if (base.isNull(title))
		title = "提示";
	uni.showModal({
		title: title,
		content: msg,
		showCancel: false,
		success: function() {
			uni.redirectTo({url: url});
		}
	});
}

/**
 * @description 提示确认框,需要点击确认后关闭
 * @param {string} msg 消息
 * @param {function} confirm 点击确认后执行的回调
 * @param {function} cancel 点击取消后执行的回调
 * @param {string} title 标题[默认'请确认']
 */
function showConfirm(msg, confirm, cancel, title) {
	if (base.isNull(title))
		title = "请确认";
	uni.showModal({
		title: title,
		content: msg,
		success: function(e) {
			if (e.confirm == true)
				confirm();
			else
				cancel();
		}
	});
}

/**
 * @description 显示等待框,需要点击确认后关闭
 */
function showLoading() {
	uni.showLoading({
		title: '请等待',
		mask: true
	});
}

/**
 * @description 隐藏等待框,需要点击确认后关闭
 */
function hideLoading() {
	uni.hideLoading();
}

	

export{
	showInfo,
	showError,
	showAndRedirect,
	showConfirm,
	showLoading,
	hideLoading
}
