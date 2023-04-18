import {apiUrl} from '@/common/sju.ajax.js'

//微信js-sdk引入
import * as jweixin from 'weixin-js-sdk'
// var jweixin = require('jweixin-module')

// let weixin = {
	// apiUrl: ajax.apiUrl,
/**
 * @description  获取微信jsconfig参数
 * <br/>success回调方法的参数就是返回的原始数据
 * @param {string} title   分享标题
 * @param {string} linkUrl 分享页面路径
 * @param {string} imgUrl  图片路径
 * @param {string} desc    分享描述   
 * @param {function} success 成功后回调的方法
 */
function weixinJSConfig(title, linkUrl, imgUrl,desc) {
	var url = window.location.href;	//H5当前页面路径
	console.info('------------url--------------');
	console.info(url);
	uni.request({
		url: apiUrl + '/home/getWeixinJSConfig', //请求后台接口获取权限验证配置参数
		data: {
			url: url
		},
		method: 'POST',
		timeout: 600000,
		success: (res) => {
			console.info('----------------------------jsconfig--------------------------');
			console.info(res.data);
			
			//微信分享权限验证配置参数构造
			var config = {
				debug: false, //是否启用调试
				appId: res.data.appId, //微信公众号appID
				timestamp: res.data.timestamp, //时间戳
				nonceStr: res.data.nonceStr,	//签名的随机串
				signature: res.data.signature,	//签名
				jsApiList: [					//需要使用的JS接口列表
					'checkJsApi',
					'updateTimelineShareData',
					'updateAppMessageShareData',
					'hideMenuItems'
				]
			};
			console.info('--------------------------jsconfig Value---------------');
			console.info(config);

			//微信注入权限验证配置
			jweixin.config(config);
			//需在用户可能点击分享按钮前就先调用
			jweixin.ready(function() {
				jweixin.hideMenuItems({// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
					menuList: ['menuItem:originPage','menuItem:openWithSafari','menuItem:openWithQQBrowser','menuItem:editTag','menuItem:copyUrl','menuItem:share:qq', 'menuItem:favorite', 'menuItem:share:QZone','menuItem:openWithSafari']
				});
				//分享到朋友圈
				jweixin.updateTimelineShareData({
					title: title, // 分享标题
					link: appUrl + linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl, // 分享图标
					success: function() {
						// alert("updateTimelineShareData");
					}
				})
				//分享给朋友
				jweixin.updateAppMessageShareData({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: appUrl + linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl, // 分享图标
					success: function() {
						// alert("updateAppMessageShareData");
					}
				})
			});
		}
	});
}

// 微信H5扫码功能
function scanQRCode() {
	var url = window.location.href; //H5当前页面路径
	uni.request({
		url: apiUrl + '/home/getWeixinJSConfig', //后台接口
		data: {
			url: url
		},
		method: 'POST',
		timeout: 600000,
		success: (res) => {
			// console.info('----------------------------jsconfig--------------------------');
			var config = {
				debug: false,
				appId: res.data.appId,
				timestamp: res.data.timestamp,
				nonceStr: res.data.nonceStr,
				signature: res.data.signature,
				jsApiList: [
					'checkJsApi',
					'updateTimelineShareData',
					'updateAppMessageShareData',
					'hideMenuItems',
					'scanQRCode'	//扫码权限
				]
			};
	
			// console.info('--------------------------jsconfig Value---------------');
			// console.info(config);
			//微信注入权限验证配置
			jweixin.config(config);
			jweixin.scanQRCode({
			  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			  success: function (res) {
			    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				if(res.resultStr.indexOf(',') > 0){
				 //条形码时返回的格式类似为【code128,123456789】		
				 var dealserialNumber=res.resultStr.split(',')[1];
				 dealserialNumber = dealserialNumber.replace(/[^a-z\d]/ig, "");//处理条形码扫描的字符
				 dealserialNumber=dealserialNumber.replace('sn','');
				 uni.setStorageSync('dealserialNumber', dealserialNumber);
				 //location.href='接收结果页面='+dealserialNumber;//扫描结果传递到的处理页面
				}else{
					//二维码时
					alert(res.resultStr);
					//location.href='接收结果页面='+res.resultStr;//扫描结果传递到的处理页面
				}
			  }
			});				
		}
	});
}
	
export {
	weixinJSConfig,
	scanQRCode
}