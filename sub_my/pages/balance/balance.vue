<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="余额明细" />
		<!-- 余额明细列表 -->
		<view class="balance-box">
			<view class="balance-item" v-for="(item,index) in balanceList" :key="index">
				<view class="item-info">
					<view class="item-title">
						{{item.title}}
					</view>
					<view :class="item.type =='use' ? 'use-count' :'add-count'">
						{{item.count}}
					</view>
				</view>
				<view class="item-data">
					<view>
						{{item.date}}
					</view>
					<view>
						剩余:{{item.remainder}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import { balanceList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				balanceList:[]
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
			this.balanceList = balanceList
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.balance-box{
		width: 100%;
		margin-top: 20upx;
		background-color: #FFFFFF;
		
		.balance-item{
			width: calc(100% - 40upx);
			padding: 20upx;
			border-bottom: 1upx solid #EEEEEE;
			
			.item-info{
				width: 100%;
				height: 60upx;
				font-size: 30upx;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				
				.item-title{
					font-weight: 500;
				}
				.use-count{
					color: $price-color;
				}
				.add-count{
					color: var(--primary-color);
				}
			}
			.item-data{
				width: 100%;
				height: 40upx;
				color: #B9B9B9;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
			}
		}
	}
</style>
