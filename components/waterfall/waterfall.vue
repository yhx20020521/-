<template>
	<view class="waterfall">
		<view class="column" id="left-column">
			<slot name="left" :leftList="leftList"></slot>
		</view>
		<view class="column" id="right-column">
			<slot name="right" :rightList="rightList"></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'waterfall',
	data() {
		return {
			leftList: [], //左边的数据
			rightList: [] //右边的数据
		};
	},
	props: {
		// 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
		// 单位ms
		addTime: {
			type: [Number, String],
			default: 50
		}
	},
	methods: {
		// 清空数据
		onDel() {
			this.leftList = []; //左边的数据
			this.rightList = []; //右边的数据
		},
		// 设置数据
		setData(data) {
			// console.log(Array.isArray(data) || data.length === 0);
			if (!Array.isArray(data) || data.length === 0) return;
			this.setSplitData(data);
		},
		// 设置瀑布流数据
		async setSplitData(data = []) {
			// 如果data没有数据或者不是数组，不执行
			if (!Array.isArray(data) || data.length === 0) return;
			let data_deepClone = this.deepClone(data); //深拷贝
			let lefrRect = await this.getRect('#left-column');
			let rightRect = await this.getRect('#right-column');
			// 如果左边小于或等于右边，就添加到左边，否则添加到右边
			let item = data_deepClone[0];
			// 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
			// 数组可能变成[]，导致此item值可能为undefined
			if (!item) return;
			if (lefrRect.height < rightRect.height) {
				this.leftList.push(item);
			} else if (lefrRect.height > rightRect.height) {
				this.rightList.push(item);
			} else {
				// 这里是为了保证第一和第二张添加时，左右都能有内容
				// 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
				this.leftList.length <= this.rightList.length ? this.leftList.push(item) : this.rightList.push(item);
			}
			// 移除临时列表的第一项
			data_deepClone.splice(0, 1);
			// 如果临时数组还有数据，继续循环
			if (data_deepClone.length) {
				setTimeout(() => {
					this.setSplitData(data_deepClone);
				}, this.addTime);
			}
		},
		deepClone(target, map = new Map()) {
			if (target !== null && typeof target === 'object') {
				// 从缓存容器中读取克隆对象
				let cloneTarget = map.get(target);
				// 如果存在, 返回前面缓存的克隆对象
				if (cloneTarget) {
					return cloneTarget;
				}
				// 创建克隆对象(可能是{}或者[])
				if (target instanceof Array) {
					cloneTarget = [];
					// 缓存到map中
					map.set(target, cloneTarget);
					target.forEach((item, index) => {
						cloneTarget[index] = this.deepClone(item, map);
					});
				} else {
					cloneTarget = {};
					// 缓存到map中
					map.set(target, cloneTarget);
					Object.keys(target).forEach(key => {
						cloneTarget[key] = this.deepClone(target[key], map);
					});
				}
				return cloneTarget;
			}
			return target;
		},
		// 查询节点信息
		getRect(id) {
			if (!id) return '';
			return new Promise(resolve => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select(id)
					.boundingClientRect(data => {
						resolve(data);
					})
					.exec();
			}).catch((e) => { });
		}
	}
};
</script>

<style lang="scss" scoped>
.waterfall {
	width: calc(100% - 40upx);
	padding: 0 20upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	.column {
		width: calc(50% - 10upx);
		height: auto;
	}
}


</style>
