/**
 * ajax相关方法的封装
 */
import * as base from '@/common/sju.base.js';
import * as login from '@/common/sju.login.js'
import * as alert from '@/common/sju.alert.js'

//基准地址域名，这些地址域名按照自己需要添加
let appUrl = ''
let apiUrl = ''
let adminUrl = ''
// 开发环境
if (process.env.NODE_ENV === 'development') {
	appUrl = 'https://www.xxx.com/';//H5部署域名
	apiUrl = 'https://www.xxxx.com/';//接口域名
	adminUrl = 'https://www.xxx.com/';//后台地址域名
}
// 生产环境(发布环境)
if (process.env.NODE_ENV === 'production') {
	appUrl = 'https://www.xxx.com/';//H5部署域名
	apiUrl = 'https://www.xxxx.com/';//接口域名
	adminUrl = 'https://www.xxx.com/';//后台地址域名
}
	
/**
 * @description ajax Post请求,返回json数据
 * <br/>success回调方法的参数就是返回数据res的.data.data属性值
 * <br/>res.data.result为true时才执行success回调方法,为false是封装统一处理
 * @param {string} url 请求的地址
 * @param {object} data 请求参数
 * @param {function} success 成功后回调的方法
 * @param {function} fail 失败后回调的方法
 * @param {bool} showLoading 是否显示加载框(默认false)
 * @param {string} type 内容类型(默认application/x-www-form-urlencoded 表单默认的提交数据的格式）)
 * /api/xxx/xxx
*/
function post(url, data, success, showLoading,type) {
	if (base.isNull(showLoading))
		showLoading = false;
	if (base.isNull(type))
		type = 'application/x-www-form-urlencoded';	//默认表单提交数据的格式

	base.logInfo(" post url:" + url);
	if (showLoading == true)
		alert.showLoading();
	console.info(apiUrl + url);
	uni.request({
		url: apiUrl + url,
		data: data,
		method: 'POST',
		timeout: 600000,//超时时间，单位 ms
		header: {
			'content-type':type,
			'token': login.getValue('token')
		},
		success: (res) => {
			console.info(res);
			if (res.statusCode == "200") { 	//和后台接口协定请求成功返回的状态
				console.info('------api请求返回数据:' + url);
				success(res.data); 			//接口请求成功后返回结果数据
			} else {
				if(res.data.error!="")
				{
					alert.showError(res.data.error);	//接口请求出错，弹窗展示接口报错内容
				}
				else
				{
					alert.showError('系统繁忙，请稍后再试'); //接口不返回报错内容，展示
				}
			}
		},
		fail: (res) => { //接口调用失败的回调
			console.info(res);
			alert.showError('系统繁忙，请稍后再试');
		},
		complete: (res) => { //接口调用结束的回调
			console.info('ajax complete');
			if (showLoading == true)
				uni.hideLoading();
		}
	});
}

/**
 * @description  ajax get请求,返回数据格式不定
 * success回调方法的参数就是返回的原始数据
 * @param {string} url 请求的地址
 * @param {object} data 请求参数
 * @param {function} success 成功后回调的方法
 */
function get(url, data, success) {
	base.logInfo(" get url:" + url);
	alert.showLoading();
	uni.request({
		url: apiUrl + url,
		method: 'GET',
		timeout: 600000,
		header: {
			'token': login.getValue('token')
		},
		data: data,
		success: (res) => {
			if (res.statusCode == "200") {
				console.info('------api请求返回数据:' + url);
				success(res.data);
			} else {
				if(res.data.error!="")
				{
					alert.showError(res.data.error);
				}
				else
				{
					alert.showError('系统繁忙，请稍后再试');
				}
			}
		},
		fail: (res) => {
			console.info(res);
			alert.showError('网络请求出错');
		},
		complete: (res) => {
			alert.hideLoading();
		}
	});
}

/**
 * @description ajax PUT请求,返回json数据
 * @param {string} url 请求的地址
 * @param {object} data 请求参数
 * @param {function} success 成功后回调的方法
 * @param {function} fail 失败后回调的方法
 * @param {bool} showLoading 是否显示加载框(默认false)
 * /api/xxx/xxx
*/
function put(url, data, success, showLoading) {
	if (base.isNull(showLoading))
		showLoading = false;
	base.logInfo(" put url:" + url);
	if (showLoading == true)
		alert.showLoading();
	console.info(apiUrl + url);
	uni.request({
		url: apiUrl + url,
		data: data,
		method: 'PUT',
		timeout: 600000,
		header: {
			// 'content-type':'application/x-www-form-urlencoded',application/json 
			'content-type':'application/json',
			'token': login.getValue('token')
		},
		success: (res) => {
			console.info(res);
			if (res.statusCode == "200") {
				console.info('------api请求返回数据:' + url);
				success(res.data);
			} else {
				if(res.data.error!="")
				{
					alert.showError(res.data.error);
				}
				else
				{
					alert.showError('系统繁忙，请稍后再试');
				}
			}
			// uni.hideLoading();
		},
		fail: (res) => {
			console.info(res);
			alert.showError('系统繁忙，请稍后再试');
		},
		complete: (res) => {
			console.info('ajax complete');
			if (showLoading == true)
				uni.hideLoading();
		}
	});
}
	
/**
 * @description ajax DELETE请求,返回json数据
 * @param {string} url 请求的地址
 * @param {object} data 请求参数
 * @param {function} success 成功后回调的方法
 * @param {function} fail 失败后回调的方法
 * @param {bool} showLoading 是否显示加载框(默认false)
 * /api/xxx/xxx
*/
function APIdelete(url, data, success, showLoading) {
	if (base.isNull(showLoading))
		showLoading = false;

	base.logInfo(" delete url:" + url);
	if (showLoading == true)
		alert.showLoading();
	console.info(apiUrl + url);
	uni.request({
		url: apiUrl + url,
		data: data,
		method: 'DELETE',
		timeout: 600000,
		header: {
			// 'content-type':'application/x-www-form-urlencoded',application/json 
			'content-type':'application/json',
			'token': login.getValue('token')
		},
		success: (res) => {
			console.info(res);
			if (res.statusCode == "200") {
				console.info('------api请求返回数据:' + url);
				success(res.data);
			} else {
				if(res.data.error!="")
				{
					alert.showError(res.data.error);
				}
				else
				{
					alert.showError('系统繁忙，请稍后再试');
				}
			}
			// uni.hideLoading();
		},
		fail: (res) => {
			console.info(res);
			alert.showError('系统繁忙，请稍后再试');
		},
		complete: (res) => {
			console.info('ajax complete');
			if (showLoading == true)
				uni.hideLoading();
		}
	});
}

	

export {
	appUrl,
	apiUrl,
	adminUrl,
	post,
	get,
	put,
	APIdelete
}
