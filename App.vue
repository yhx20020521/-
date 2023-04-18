<script>
	// #ifdef H5
	(function() {
	  if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
	   handleFontSize();
	  } else {
	   if (document.addEventListener) {
	    document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
	   } else if (document.attachEvent) {
	    document.attachEvent('WeixinJSBridgeReady', handleFontSize);
	    document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
	   }
	  }
	
	  function handleFontSize() {
	   // 设置网页字体为默认大小
	   WeixinJSBridge.invoke('setFontSizeCallback', {
	    'fontSize': 0
	   });
	   // 重写设置网页字体大小的事件
	   WeixinJSBridge.on('menu:setfont', function() {
	    WeixinJSBridge.invoke('setFontSizeCallback', {
	     'fontSize': 0
	    });
	   });
	  }
	 })();
	// #endif
	// 引入常用方法类
	import * as tools from './common/sju.tools.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef MP 
			tools.VersionUpdate() //小程序模式下检测小程序更新
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/static/iconfont.css";
	/*每个页面公共css */
	page{
		background-color: $bg-color;
		font-size: $font-size-base;
		color: $text-color;
		padding-bottom: 120upx;
	}
	/* #ifdef H5 */
	body { /* IOS禁止微信调整字体大小 */
	            -webkit-text-size-adjust: 100% !important;
	            text-size-adjust: 100% !important;
	            -moz-text-size-adjust: 100% !important;
	}
	/* #endif */
	
	/* 解决小程序和app滚动条的问题 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
		::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
			color: transparent;
		}
	/* #endif */
	
	/* 解决H5 的问题 */
	/* #ifdef H5 */
	    uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
			/* 隐藏滚动条，但依旧具备可以滚动的功能 */
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
			color: transparent;
		}
	/* #endif */
	
</style>
