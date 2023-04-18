<template>
	<view>
		<!-- 快递公司 -->
		<view class="express">
			<view class="express-info">
				<image class="express-image" mode="aspectFill" :src="logisticsInfo.logo"></image>
				<view class="info-box">
					<view class="express-name">{{logisticsInfo.post_name}}</view>
					<view class="express-phone">官方电话 {{logisticsInfo.exp_phone}}</view>
				</view>
			</view>
			<view class="code-box">
				快递单号：{{logisticsInfo.post_no}}
			</view>
		</view>

		<!-- 物流信息 -->
		<view class="content">
			<view class="content-box">
				<!-- 收货地址 -->
				<view class="content-list">
					<view class="time"></view>
					<view class="info">
						<i class="iconfont icon-shou"></i>
						<view class="title address">[收货地址]{{logisticsInfo.addr}}</view>
					</view>
				</view>
				<view class="content-list" :class="{one: index == 0 && logisticsInfo.delivery_status == 1}" v-for="(item, index) in logisticsInfo.list" :key="index">
					<view class="time">
						<view class="day">{{item.timeArr[0]}}</view>
						<view>{{item.timeArr[1]}}</view>
					</view>
					<view class="info">
						<i v-if="index == 0" class="iconfont icon-zhixiang"></i>
						<view class="title">{{index == 0 && logisticsInfo.delivery_status == 1 ? '已签收' : '配送中'}}</view>
						<view class="text">{{item.context}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bgColor: {
				type: String,
				default: '#48b8d0'
			},
			logisticsInfo: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {}
		},

		onLoad() {

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	// 快递公司
	.express {
		width: calc(100% - 80upx);
		margin: 20upx auto;
		padding: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		
		.express-info{
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: row;
			// 快递公司logo
			.express-image{
				width: 100upx;
				height: 100upx;
				margin-right: 20upx;
				border-radius: 50%;
			}
			.info-box{
				width: calc(100% - 120upx);
				.express-name{
					color: #000000;
					font-size: 28upx;
					margin-bottom: 10upx;
				}
				.express-phone{
					color: #000000;
					font-size: 20upx;
				}
			}
		}
		
		.code-box{
			width: 100%;
			height: 60upx;
			line-height: 60upx;
			margin-top: 20upx;
			color: #666666;
			font-size: 26upx;
		}
	}
	
	// 物流信息
	.content{
		width: calc(100% - 80upx);
		margin: 20upx auto;
		padding: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		.content-box{
			width: 100%;
			.content-list{
				display: flex;
				flex-direction: row;
				.info{
					flex: 1;
					position: relative;
					padding-top: 12upx;
					color: #999;
					
					.iconfont{
						z-index: 10;
						position: absolute;
						left: -25upx;
						top: 0upx;
						font-size: 50upx;
						color: var(--primary-color);
					}
					
					&::before {
						content: "";
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						z-index: 1;
						width: 0;
						border-left: 1px solid #e5e5e5;
					}
					
					.title {
						position: relative;
						margin-bottom: 10upx;
						padding-left: 32upx;
						font-size: 28upx;
					
						&::before {
							content: "";
							position: absolute;
							left: -3px;
							top: 0;
							bottom: 0;
							z-index: 1;
							width: 7px;
							height: 7px;
							margin: auto 0;
							border-radius: 50%;
							background-color: #cecece;
						}
					
						&.address {
							font-size: 24upx;
							color: #333;
						}
					}
					
					.text {
						padding: 0 0 44upx 32upx;
					}
				}
				
				// 时间
				.time {
					width: 200upx;
					padding-right: 30upx;
					font-size: 20upx;
					text-align: right;
					color: #999;
				
					.day {
						margin-bottom: 4upx;
					}
				}
				
				&:last-child {
					.info::before {
						height: 32upx;
					}
				}
				
				&.one {
					.info::before {
						margin-top: 20upx;
					}
				
					.title {
						color: #1a1a1a;
					}
				
					.text {
						color: #666;
					}
				
					.time {
						color: #333;
						.day {
							font-size: 24upx;
						}
					}
				}
			}
		}
	}
</style>
