/**
 * 正则表达式的封装
 */
import * as base from '@/common/sju.base.js';
import * as alert from '@/common/sju.alert.js';

/**
 * @description 检查注册用户名是否合法
 * <br/>this.$Regex_username -> this.sjuRegex.username
 * @param {string} val 要检查的值
*/
function username(val) {
	let regex_s = /^[\u4E00-\u9FA5\·]+$/;
	if (regex_s.test(val)) {
		return true;
	} else {
		return false;
	}
}

/**
 * @description 检查密码是否合法 - 8为长度,包含数字和字母
 * <br/>this.$Regex_password -> this.sjuRegex.password
 * @param {string} val 要检查的值
 */
function password(val) {
	let regex_s = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
	if (regex_s.test(val)) {
		return true;
	} else {
		return false;
	}
}

/**
 * @description 检查注册手机号是否合法
 * <br/>this.$Regex_phonenumber -> this.sjuRegex.phoneNumber
 * @param {string} val 要检查的值
 */
function phoneNumber(val) {
	let regex_s = /^[1]([1-9])[0-9]{9}$/;
	if (regex_s.test(val)) {
		return true;
	} else {
		return false;
	}
}
	
/**
 * @description 检查身份证是否合法
 * <br/>this.$Regex_IDnumer -> this.sjuRegex.idCard
 * @param {string} val 要检查的值
 */
function idCard(val) {
	let regex_s = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	if (regex_s.test(val)) {
		return true;
	} else {
		return false;
	}
}

/**
 * @description 检查金额是否合法
 * @param {Number} val 要检查的值
 * this.$Regex_money -> this.sjuRegex.money
 */
function money(val) {
	let regex_s =
		/(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9]$)|(^\d\.[1-9]{1,2}$)|(^\d\.[0]{1}[1-9]{1}$|(^\d\.[1-9]{1}[0]{1}$)$)/;
	if (regex_s.test(val)) {
			return true;
	} else {
		return false;
	}
}

/**
 * @description 检查银行卡号是否合法
 * <br/>this.$Regex_Banknumber -> this.sjuRegex.bankNumber
 * @param {Number} val 要检查的值
 */
function bankNumber(str) {
	let regex_s = /^([1-9]{1})(\d{11}|\d{12}|\d{13}|\d{14}|\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20}|\d{21})$/;
	if (regex_s.test(str)) {
		return true;
	} else {
		return false;
	}
}

/**
 * @description 检查Email地址是否合法
 * <br/>this.$Regex_Email -> this.sjuRegex.Email
 * @param {Number} val 要检查的值
 */
function Email(str) {
	let regex_s = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
	if (regex_s.test(str)) {
		return true;
	} else {
		return false;
	}
}
	
/**
 * @description 检查税号是否合法
 * <br/>this.$Regex_TaxNum -> this.sjuRegex.TaxNum
 * @param {Number} val 要检查的值
 */
function TaxNum(str) {
	let regex_s = /^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
	if (regex_s.test(str)) {
		return true;
	} else {
		return false;
	}
}
	
/**
 * @description 检查支付宝扫码的值
 * <br/>this.$Regex_zfbNumber -> this.sjuRegex.zfbNumber
 * @param {Number} val 要检查的值
 */
function zfbNumber(str) {
	let regex_s = /^(2[5-9]|30)\d{14,22}$/;
	if (regex_s.test(str)) {
		return true;
	} else {
		return false;
	}
}

/**
 * @description 检查银联扫码的值
 * <br/>this.$Regex_ylNumber -> this.sjuRegex.ylNumber
 * @param {Number} val 要检查的值
 */
function ylNumber(str) {
	let regex_s = /^62\\d{17}$/;
	if (regex_s.test(str)) {
		return true;
	} else {
		return false;
	}
}

/**
 * @description 多个属性值一起检查,有一个不合法,则返回false,并显示错误提示 
 * @param {array} arr 要检查数据的数组描述
 * <br/>参数格式:[{val:'属性值',type:'检查类型',msg:'错误提示'} ... ] 
 * <br/>例如: [{val:'12',type:'bankNumber',msg:'xx不是银行卡号'},...]
 */
function checkArray(arr) {
	var msg = "";
	var isNotPetch = true;
	if (typeof(arr) == 'object') {
		for (let item of arr) {
			if (item.type == 'username') {
				if (regex.username(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			} else if (item.type == 'password') {
				if (regex.password(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			} else if (item.type == 'phoneNumber') {
				if (regex.phoneNumber(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			} else if (item.type == 'idCard') {
				if (regex.idCard(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			} else if (item.type == 'money') {
				if (regex.money(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			} else if (item.type == 'bankNumber') {
				if (regex.bankNumber(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			}else if (item.type == 'Email') {
				if (regex.Email(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			}else if (item.type == 'TaxNum') {
				if (regex.TaxNum(item.val) == false) {
					isNotPetch = false;
					msg = item.msg;
				}
			}else {
				isNotPetch = false;
				msg = '传入的检查类型不支持:'+item.type;
				alert.showError(msg, '调用有误');
				break;
			}
			// 检查不通过
			if(isNotPetch==false)
			{
				alert.showError(msg, '检查不通过');
				break;
			}
		}
	} else {
		isNotPetch = false;
		alert.showError('参数不合法', '调用有误');
	}
	return isNotPetch;
}

function testCheckArray() {
	// 数据合并检查测试
	var result = regex.checkArray([{
			val: '18651669817',
			type: 'phoneNumber',
			msg: '手机号不合法'
		},
		{
			val: '122323',
			type: 'money',
			msg: '金额不合法'
		},
		{
			val: 'abc@yoo.com.cn',
			type: 'Email',
			msg: '邮箱不合法'
		},
		{
			val: '1234rr',
			type: 'TaxNum',
			msg: '税号不合法'
		}
		
	]);
	base.logInfo(result);
}


export {
	username,
	password,
	phoneNumber,
	idCard,
	money,
	bankNumber,
	Email,
	TaxNum,
	zfbNumber,
	ylNumber,
	checkArray,
	testCheckArray
}
