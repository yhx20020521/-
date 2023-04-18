<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="积分明细" />
		<!-- 积分明细列表 -->
		<view v-if="!isEmpty" class="points-box">
			<view class="points-item" v-for="(item,index) in pointsList" :key="index">
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
		<!-- 暂无数据 -->
		<sju-empty v-if="isEmpty" iconColor="var(--primary-color)"></sju-empty>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { pointsList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				// 空数据
				isEmpty: false,
				pointsList:[]
			}
		},
		components: {
			uniNavBar,
			Empty
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
			this.pointsList = pointsList
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.points-box{
		width: 100%;
		margin-top: 20upx;
		background-color: #FFFFFF;
		
		.points-item{
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
