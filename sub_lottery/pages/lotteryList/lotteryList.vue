<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="页面标题" />
		<view class="list-box">
			<view v-if="!isEmpty" class="list-item" v-for="(item,index) in lotteryList" :key="index">
				<view class="item-data">
					<view>奖品类型: {{item.lotteryType}}</view>
					<view>奖品名称: {{item.lotteryName}}</view>
				</view>
				<view class="item-data">
					<view>抽奖时间: {{item.lotteryDate}}</view>
				</view>
			</view>
			<view v-if="!isEmpty" class="loading-text">{{loadingText}}</view>
			<sju-empty iconColor="var(--primary-color)" v-if="isEmpty"></sju-empty>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import { lotteryList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				isEmpty:false,
				isShow:true,
				lotteryList:[],
				loadingText: '上拉加载更多',
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
			this.lotteryList = lotteryList
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.list-box{
		width: 100%;
		height: auto;
		margin-top: 20upx;
		
		.list-item{
			width: calc(100% - 40upx);
			margin:0 20upx;
			font-size: 30upx;
			border-bottom: 1upx solid #EEEEEE;
			
			.item-data{
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
	
	/* 加载更多 */
	.loading-text {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #C0C0C0;
	}
</style>
