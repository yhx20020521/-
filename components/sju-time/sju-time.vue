<template>
	<scroll-view class="tab-box" scroll-x :scroll-left="scrollLeft" :scroll-with-animation="true">
		<view v-for="(item, index) in timeList" :key="item.index" 
			:class="['tab-list',index == tabIndex ? 'active' : '']"
			:id="index" @click="getItem(item, index)">
			<view class="tab-item" >
				<text class="tab-time">{{item.time}}</text>
				<text class="tab-status" v-if="item.start <= getTime && getTime <= item.end">进行中</text>
				<text class="tab-status" v-if="getTime < item.start">即将开始</text>
				<text class="tab-status" v-if="getTime > item.end">已开始</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	/**
	 * sju-time 时间选择
	 * @description 抢购时间选择
	 * @property {Array} timeList 抢购时间列表
	 * @event {Function} onChange 时间选择切换
	 */
	export default {
		name: 'sju-time',
		emits: [ 'onChange' ],
		props: {
			timeList: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				//选中项下标
				tabIndex: 0,
				//滚动位置
				scrollLeft:0	
			}
		},
		computed: {
			getTime(){
				// 计算时间
				let state = '已开抢'
				let nowTime = new Date()
				let h = nowTime.getHours()
				return h
			}
		},
		mounted(){
			for(let i in this.timeList){
				if (this.timeList[i].start <= this.getTime){
					this.tabIndex = i
					this.scrollLeft = i*60
				}
			}
		},
		methods: {
			getItem(item, index) {
				if (this.tabIndex !== index) {
					this.tabIndex = index
					this.scrollLeft = index*60
					this.$emit('onChange', item)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.tab-box {
		width: 100%;
		height: 116upx;
		line-height: 64upx;
		white-space: nowrap;
		font-size:24upx;
		border:0;
		.tab-list {
			width: 180upx;
			line-height:20px;
			font-size: 30upx;
			padding: 10upx 0;
			color: #FFFFFF;
			display: inline-block;
			text-align: center;
			background: #000000;
			.tab-item{
				display:flex;
				align-items: center;
				flex-direction: column;
				.tab-time{
					font-size: 32upx;
					font-weight: bold;
				}
				.tab-status{
					font-size: 24upx;
				}
			}
		}
		.active {
			color: #FFFFFF;
			background:var(--primary-color);
		}
	}
</style>
