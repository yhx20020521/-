import * as ajax from '@/common/sju.ajax.js';
import * as nav from '@/common/sju.nav.js'
import * as jsAlert from '@/common/sju.alert.js'

/**
 * @description 微信H5调起微信支付
 * @param {object} wxJsApiParam 微信支付验证参数(后台接口调用微信商家支付平台回调)
 * @param {string} orderCodePay 订单编号
*/
function payWeixinH5(wxJsApiParam, orderCodePay) {
	console.info(wxJsApiParam);
	//内部函数
	function jsApiCall(jsStr, orderCodePay){
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', 
			{
				"appId": jsStr.appId,
				"nonceStr": jsStr.nonceStr,
				"package": jsStr.package,
				"paySign": jsStr.paySign,
				"signType": jsStr.signType,
				"timeStamp": jsStr.timeStamp
			},
			function(res) {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					//微信回调支付成功后，调用后台接口修改订单状态
					post('/api/xxx/xxx', {
						orderCodePay: orderCodePay
					}, (data) => {
						// nav.navigateTo("/my/order")  //支付成功跳转页面
						nav.navigateBack(1)				//支付成功返回上一页
					})
				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
					alert("已取消支付");
				} else {
					alert("支付失败,请重试");
					console.info(res);
				}
			}
		);
	}
	//方法内代码 --- 开始
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', jsApiCall);
			document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		}
	} else {
		jsApiCall(wxJsApiParam, orderCodePay);
		return false;
	}
}

/**
 * @description 微信小程序支付
 * @param {string} orderCodePay 订单编号
*/
function payWeiXinApp(orderCodePay, success, fail) {
	//根据运行环境获取支付的提供程序
	uni.getProvider({
		service: "payment",
		success: (res) => {
			//获取到提供程序
			var provider = res.provider;
			//小程序登录,获取临时code
			uni.login({
				provider: provider,
				success: (data) => {
					var code = data.code;
					//利用临时code获取用户的openID
					//后台接口调用微信接口回调：
					//provider:服务提供商
					//orderInfo:订单数据
					//timeStamp:时间戳从1970年1月1日至今的秒数，即当前的时间
					//nonceStr:随机字符串，长度为32个字符以下
					//package:统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx
					//signType:签名算法，暂支持 MD5
					//paySign: 签名 参考网址：https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3
					post('/api/xxx/xxx', {
						code: code
					}, (data) => {
						//利用openID和订单编号请求后台下单接口
						var openID = data.openID;
						post('/api/xxx/weixinPay', {
							openID: openID,
							orderCodePay: orderCodePay
						}, (data) => {
							var order = JSON.parse(data.orderInfo);
							uni.requestPayment({
								provider: provider,
								orderInfo: data.orderInfo,
								timeStamp: order.timeStamp,
								nonceStr: order.nonceStr,
								package: order.package,
								signType: order.signType,
								paySign: order.paySign,
								success: (res) => {
									//微信小程序支付成功回调，调用后台接口通知后台支付成功修改数据库订单支付状态
									post('/api/xxx/weixinPaySuccess', {
										orderCode: orderCode
										}, (data) => {
											// 支付成功后进行的操作
											success();
										})
								},
								fail: (res) => {
									// 支付失败
									fail();
								}
							});
						});
					});
				}
			})
		}
	})
}


export {
	payWeixinH5,
	payWeiXinApp
}
