<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="优惠券" />
		<!-- 优惠券tab -->
		<view class="tab-box">
			<view class="tab-item" v-for="(item,index) in tabList" :key="index"
			  :class="{'active':tabIndex == item.id}" @click="onTab(item.id)">
				<text>{{item.name}}</text>
				<text class="active-line"></text>
			</view>
		</view>
		<!-- 优惠券列表 -->
		<view v-if="!isEmpty" class="coupon-list">
			<view class="coupon-item" :class="{'coupon-lapse': tabIndex != 0}" 
			  v-for="(item,index) in couponList" :key="index">
				<!-- 左侧内容 -->
				<view class="item-left">
					<view class="value">
						{{item.value}}
					</view>
					<view class="constraints">
						{{item.describe}}
					</view>
				</view>
				<!-- 优惠券信息 -->
				<view class="coupon-info">
					<view class="coupon-title">
						<view class="type">
							{{item.typeName}}
						</view>
						<view class="title">
							{{item.title}}
						</view>
					</view>
					<!-- 时间 -->
					<view class="date-range">
						<view class="date">
							{{item.date}}
						</view>
						<view class="use-btn" @click="couponUse" v-if="tabIndex===0">
							立即使用
						</view>
					</view>
				</view>
				<view class="coupon-status" v-if="tabIndex != 0">
					<view v-if="tabIndex == 1">已使用</view>
					<view v-if="tabIndex == 2">已失效</view>
				</view>
			</view>
		</view>
		<!-- 空数据 -->
		<sju-empty v-if="isEmpty" iconColor="var(--primary-color)"></sju-empty>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { couponList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				// 空数据
				isEmpty: false,
				tabIndex: 0,
				tabList: [
					{
						id: 0,
						name: '未使用'
					},
					{
						id: 1,
						name: '已使用'
					},
					{
						id: 2,
						name: '已失效'
					}
				],
				// 优惠券列表
				couponList: []
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
			this.couponList = couponList
		},
		methods: {
			// 优惠券tab点击
			onTab(id){
				this.tabIndex = id
			},
			// 使用优惠券
			couponUse(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/* 优惠券tab */
	.tab-box {
		z-index: 11;
		position: fixed;
		left: 0;
		top: calc(88upx + var(--statusBarHeight));
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		background-color: #ffffff;
		// 类型项
		.tab-item {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 33%;
			height: 100%;
		}
		// 类型选中
		.active {
			font-size: 30upx;
			font-weight: 600;
			color: var(--primary-color);
			// 底部下划线
			.active-line {
				width: 30%;
				height: 6upx;
				position: absolute;
				left: 50%;
				bottom: 10upx;
				background:var(--primary-color);
				transform: translate(-50%, 0);
			}
		}
	}
	
	/* 优惠券列表 */
	.coupon-list {
		padding: 20upx 4%;
		margin: 120upx auto 0;
		// 优惠券数据
		.coupon-item {
			position: relative;
			width: 100%;
			height: 200upx;
			// border-radius: 100upx;
			margin-bottom: 20upx;
			box-shadow: 0 0 10upx #EEEEEE;
			display: flex;
			align-items: center;
			.item-left {
				width: 35%;
				height: 100%;
				position: relative;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				background-color: var(--primary-color);
				border-style: none dotted none none;
				border-color: #FFFFFF;
				border-top-left-radius: 10upx;
				border-bottom-left-radius: 10upx;
				// 优惠券价值
				.value {
					display: flex;
					justify-content: center;
					align-items: flex-end;
					width: 100%;
					font-size: 48upx;
					color: #ffffff;
					font-weight: bold;
				}
				// 使用限制
				.constraints {
					width: 100%;
					height: 60upx;
					font-size: 24upx;
					color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.item-left:after {
				width: 40upx;
				height: 20upx;
				position: absolute;
				left: calc(100% - 16upx);
				top: -1px;
				border-radius: 0 0 40upx 40upx;
				content: "";
				display: block;
				background: #F7F7F7;
				border-top: 0px;
			}
			
			.item-left:before {
				width: 40upx;
				height: 20upx;
				position: absolute;
				left: calc(100% - 16upx);
				bottom: -1px;
				border-radius: 40upx 40upx 0 0;
				content: "";
				display: block;
				background: #F7F7F7;
				border-bottom: 0px;
			}
			// 优惠券信息
			.coupon-info {
				width: 65%;
				height: 100%;
				padding: 0 1%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				background-color: #FFFFFF;
				border-top-right-radius: 10upx;
				border-bottom-right-radius: 10upx;
				// 优惠券标题
				.coupon-title {
					width: 100%;
					height: 60upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					// 优惠券类型
					.type {
						height: 40upx;
						line-height: 40upx;
						text-align: center;
						font-size: 24upx;
						border-radius: 40upx;
						margin-right: 10upx;
						padding: 4upx 16upx;
						color: #ffffff;
						background-color: var(--primary-color);
					}
					// 标题
					.title {
						font-size: 24upx;
					}
				}
				// 时间范围
				.date-range {
					width: 100%;
					margin-top: 10upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					// 时间
					.date {
						font-size: 24upx;
						display: flex;
						align-items: center;
					}
					// 使用按钮
					.use-btn{
						width: 120upx;
						height: 50upx;
						line-height: 50upx;
						text-align: center;
						font-size: 24upx;
						border-radius: 50upx;
						color: #ffffff;
						background-color: var(--primary-color);
						border: 1px solid var(--primary-color);
					}
				}
			}
			
			// 优惠券状态
			.coupon-status {
				z-index: 10;
				width: 100upx;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				position: absolute;
				right: 10upx;
				bottom: 10upx;
				border: 1upx solid #CCCCCC;
				border-radius: 100%;
				view {
					display: inline-block;
					color: #c0c0c0;
					font-size: 24upx;
					transform: rotate(45deg);
				}
			}
		}
		// 优惠券失效
		.coupon-lapse{
			.item-left{
				background-color: #CCCCCC;
			}
			// 优惠券信息
			.coupon-info{
				.coupon-title{
					.type{
						background-color: #CCCCCC;
					}
					.title{
						color: #CCCCCC;
					}
				}
				// 时间范围
				.date-range{
					.date{
						color: #CCCCCC;
					}
				}
			}
		}
	}
	
</style>
