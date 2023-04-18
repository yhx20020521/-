/**
 * 对uni提供的所有api进行代理封装,让方法调用支持Promise
 * 
 * uni.request({url:'url',data:data,success:'',fail:''})
 * 引入封装包
 * import uniAsync from '@/common/sju.async.js';
 * 通过调用方法1:
 * uniAsync.request({url:'url',data:data}).then(res=>{成功执行的代码})
 * 通过调用方法2:res是成功返回的数据
 * function的前边需要添加async关键字
 * let res = await uniAsync.request({url:'url',data:data});
 */
// 使用proxy转换为异步化的uni方法
const uniAsync = new Proxy({}, {
	// target要代理的目标,name目标的key
	get(target, name) {
		return (obj) => new Promise((resolve, reject) => {
			uni[name]({
				...obj,
				success: res => {
					console.info('-success')
					resolve(res)
				},
				fail: res => {
					console.info('-fail')
					reject(res)
				},
				complete:res =>{
					console.info('-complete')
				}
			})
		}).catch((e) => { })
	}
})
export default uniAsync
