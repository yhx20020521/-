/**
 * 常用工具方法类
**/
import * as base from './sju.base.js'
import * as theme from './theme.js'

/*
 * @description 检测小程序更新
*/
function VersionUpdate() {
    // 获取小程序更新机制兼容 
    if (uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager()
        // 检查是否有新版本发布
        updateManager.onCheckForUpdate(function(res) {
            if (res.hasUpdate) {
                //小程序有新版本，则静默下载新版本，做好更新准备
                updateManager.onUpdateReady(function() {
                    uni.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function(res) {
                            if (res.confirm) {
                                //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate()
                            } else if (res.cancel) {
                                //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                                uni.showModal({
                                    title: '温馨提示',
                                    content: '我们已经做了新的优化，请及时更新哦~',
                                    showCancel: false, //隐藏取消按钮，也可显示，取消会走res.cancel，然后从新开始提示
                                    success: function(res) {
                                        //第二次提示后，强制更新           
                                        if (res.confirm) {
                                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                            updateManager.applyUpdate()
                                        } 
										// else if (res.cancel) {
                                            // 重新回到版本更新提示
                                            // autoUpdate()
                                        // }
                                    }
                                })
                            }
                        }
                    })
                })
                  // 新的版本下载失败
                updateManager.onUpdateFailed(function() {
                    uni.showModal({
                        title: '温馨提示',
                        content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
                    })
                })
            }
        })
    } else {
        // 提示用户在最新版本的客户端上体验
        uni.showModal({
            title: '温馨提示',
            content: '当前微信版本过低，可能无法使用该功能，请升级到最新版本后重试。'
        })
    }
}

/**
* @description px转upx
* @param {string} val 要处理的数据
**/
function px2upx(val){
	return val/(uni.upx2px(val)/val);
}
	
/**
* @description upx转px
* @param {string} val 要处理的数据
*/
function upx2px(val){
	return uni.upx2px(val);
}

/**
* @description 字符掩码
* @param {string} val 要处理的数据
* @param {int} start 掩码开始位置
* @param {int} end	掩码结束位置
*/
function strFilter(val,start,end){
	let str=val.trim()	//去除空格
	// let maskCode=str.replace(str.substring(start, end), "****")
	let maskCode=str.substring(0, start) + '****' + str.slice(end, -1)
	return maskCode;
}

/**
* @description 获取链接参数
* @param {string} path 网址链接Url路径
* @param {string} name 参数名
*/
function getUrlParam(path,name) {
	if(base.isNull(path))
	{
		path=window.location.search
	}
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = path.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
* @description 判断是否在微信内置浏览器
*/
function isWechat(){
	let ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;  
	}else{
	    return false;  
	}
}

/**
* @description 小程序的原生菜单中显示分享按钮
*/
function showShareMenu(){
	// 小程序分享功能
	uni.showShareMenu({
		withShareTicket:true,
		//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
		menus:["shareAppMessage","shareTimeline"]//不设置默认只能发送给朋友
	})
}


/**
* @description 对象数组去重
* @param {Array} arr 数组
* @param {String} key 去重的字段名
*/
function uniqueArrayObject (arr = [], key = 'id'){
	if (arr.length === 0) return
		let list = []
		const map = {}
		arr.forEach((item) => {
			if (!map[item[key]]) {
			map[item[key]] = item
		}
	})
	list = Object.values(map)
	return list
}
	
/**
* @description 遍历树节点
* @param {Array} tree 树数组
* @param {Function} callback 回调函数
* @param {String} childrenName 树节点名称
*/
/* 
使用方式
foreachTree(treeData, (item) => {
	if (item.id === 7) {
		datd = item
	}
}) */
function foreachTree (tree, callback, childrenName = 'children'){
	for(let i = 0; i < tree.length; i++) {
		callback(tree[i])
		if (tree[i][childrenName] && tree[i][childrenName].length > 0) {
			this.foreachTree(tree[i][childrenName], callback, childrenName)
		}
	}
}

/**
* @description 金额格式化
* @param {number} number 		要格式化的数字
* @param {number} decimals		保留几位小数
* @param {string} dec_point		小数点符号
* @param {string} thousands_sep	千分位符号
*/
function moneyFormat (number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+-Ee.]/g, '')
	const n = !isFinite(+number) ? 0 : +number
	const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
	const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
	const dec = typeof dec_point === 'undefined' ? '.' : dec_point
	let s = ''
	const toFixedFix = function(n, prec) {
		const k = Math.pow(10, prec)
		return '' + Math.ceil(n * k) / k
	}
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
	const re = /(-?\d+)(\d{3})/
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, '$1' + sep + '$2')
	}
	
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || ''
		s[1] += new Array(prec - s[1].length + 1).join('0')
	}
	return s.join(dec)
}

/**
* @description 获取一个随机数
* @param {Object} min
* @param {Object} max
*/
function random(min, max) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * min + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (max - min + 1) + min, 10);
			break;
		default:
			return 0;
			break;
	}
}

/**
 * @description 对象转params参数
 * @param {Object} val
 * @return {String} 
 */
function parseParams(val) {
	const params = []
	if (typeof(val) == 'object') {
		Object.keys(val).forEach((key) => {
			let value = val[key]
			// 如果值为undefined我们将其置空
			if (typeof value === 'undefined') {
				value = ''
			}
			// 对于需要编码的文本（比如说中文）我们要进行编码
			params.push([key, encodeURIComponent(value)].join('='))
		})
	}
	return params.join('&')
}

/**
 * @description 对象转params参数网址
 * @param {String} url 路径
 * @param {Object} val 对象参数
 * @return {String} 
 */
function parseParamUrl(url, val) {
	url = url || '/'
	let params = ''
	if (typeof(val) == 'object') {
		params = this.parseParams(val)
		params && (url += '?')
		url += params
	}
	return url
}

/**
 * @description 获取url网址参数
 * @param {String} val 路径
 * @return {String} 
 */
function getParams(url ='') {
	let obj = {}
	let params = url.split('?')[1]
	if (params != undefined) {
		let paramsList = params.split('&')
		paramsList.map(item=>{
			obj[item.split('=')[0]] = item.split('=')[1]
		})
	}
	return obj
}

/**
 * @description 判断两个对象是否相同
 * @param {Object} param1 对象1
 * @param {Object} param2 对象2
 * @return {String} 
 */
function objectEqual(param1, param2) {
	if (param1 === param2) {
		return true;
	} else if (typeof param1 == 'object' && param1 != null && 
			   typeof param2 == 'object' && param2 != null) {
		
		if (Object.keys(param1).length != Object.keys(param2).length) return false;
		for (var prop in param1) {
			if (param2.hasOwnProperty(prop)) {
				if (!this.objectEqual(param1[prop], param2[prop])) return false;
			} else {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
}


/**
* @description 返回页面栈的实例
* @description this.sjuTools.currentPage().address = item; this.sjuNav.navigateBack();
* @param {Number} index 返回页数
*/
function currentPage(index=2) {
	//获取当前页面栈的实例
	let pages = getCurrentPages() 
	// 上 index-1 页数据
	let page  = pages[pages.length - index]
	// #ifdef H5
	return page
	// #endif
	return page.$vm
}

/**
 * @description 获取节点信息
 * @param {String} selector 匹配选择器 selector 的节点
 * @param {String} isAll 是否匹配所有节点
 * @param {String} that this
 * @return {String} 
 */
function getRect(selector, isAll,that) {
	return new Promise((resolve) => {
		uni.createSelectorQuery()
			.in(that)[isAll ? 'selectAll' : 'select'](selector)
			.boundingClientRect((rect) => {
				if (isAll && Array.isArray(rect) && rect.length) {
					resolve(rect)
				}
				if (!isAll && rect) {
					resolve(rect)
				}
		}).exec()
	})
}

/**
 * @description 动态设置tabBar
 * @param {String}
 */
function setTabBar() {
	let tabBar = theme.tabBarList.find(item => item.themeName == uni.getStorageSync('themeName'))
	uni.setTabBarItem({
		index: 0,
		selectedIconPath: tabBar.home
	})
	uni.setTabBarItem({
		index: 1,
		selectedIconPath: tabBar.category
	})
	uni.setTabBarItem({
		index: 2,
		selectedIconPath: tabBar.cart
	})
	uni.setTabBarItem({
		index: 3,
		selectedIconPath: tabBar.user
	})
}

export {
	VersionUpdate,
	px2upx,
	upx2px,
	strFilter,
	getUrlParam,
	isWechat,
	showShareMenu,
	uniqueArrayObject,
	foreachTree,
	moneyFormat,
	random,
	parseParams,
	parseParamUrl,
	getParams,
	objectEqual,
	currentPage,
	getRect,
	setTabBar
}