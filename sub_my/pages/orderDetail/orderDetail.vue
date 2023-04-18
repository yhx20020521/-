<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="商品详情" />
		
		<!-- 订单状态 -->
		<view class="status-box">
			<i class="iconfont icon-courier"></i>
			<view class="status-info">
				<view class="status-title">
					{{orderInfo.orderStatus}}
				</view>
				<view class="status-date">
					{{orderInfo.createTime}}
				</view>
			</view>
		</view>
		
		<!-- 地址信息 -->
		<view class="address">
			<view class="address-box">
				<i class="iconfont icon-dizhi"></i>
				<view class="address-info">
					<view class="user-info">
						<view class="user-name">
							{{addressInfo.userName}}
						</view>
						<view class="user-phone">
							{{addressInfo.userPhone}}
						</view>
					</view>
					<view class="adddress-detail">
						{{addressInfo.region}}{{addressInfo.address}}
					</view>
				</view>
			</view>
			<!-- 底部背景条 -->
			<view class="address-bg">
			</view>
		</view>
		
		<view class="list-box">
			<view class="list-item">
				<!-- 标题信息 -->
				<view class="title-info">
					<view class="shop-info">
						<i class="iconfont icon-shop"></i>
						<view class="shop-name">{{orderInfo.shopName}}</view>
						<i class="iconfont icon-right"></i>
					</view>
					<!-- <view class="status">
						{{item.orderStatus}}
					</view> -->
				</view>
				<!-- 商品列表 -->
				<view class="goods-list" @click="navTo(`/my/orderDetail?code=${item.orderCode}`)">
					<view class="goods-item" v-for="(item,index) in orderInfo.goodList" :key="index">
						<image class="goods-image" :src="item.image" mode="widthFix"></image>
						<view class="goods-info">
							<view class="name-info">
								<view class="goods-name">
									{{item.name}}
								</view>
								<view class="goods-specs">
									{{item.specsName}}
								</view>
							</view>
							<view class="goods-data">
								<view class="goods-price">
									￥{{item.current_price}}
								</view>
								<view class="goods-count">
									x{{item.count}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 汇总信息 -->
		<view class="total">
			<view class="total-item">
				<view class="item-left">商品总价</view>
				<view class="item-right item-price">
					<span>￥</span>
					{{orderInfo.totalMoney}}
				</view>
			</view>
			<view class="total-item">
				<view class="item-left">运费</view>
				<view class="item-right item-price">
					<span>￥</span>
					{{orderInfo.orderFreight}}
				</view>
			</view>
			<view class="total-item">
				<view class="item-left">优惠券</view>
				<view class="item-right item-price">
					-<span>￥</span>
					{{orderInfo.couponPrice}}
				</view>
			</view>
			<view class="total-item">
				<view class="item-left">实付款</view>
				<view class="item-right item-price">
					<span>￥</span>
					{{orderInfo.realPayment}}
				</view>
			</view>
		</view>
		
		<!-- 汇总信息 -->
		<view class="total">
			<view class="total-item">
				<view class="item-left">订单编号</view>
				<view class="item-info">
					<view>{{orderInfo.orderCode}}</view>
					<view class="copy-btn" @click="copyCode(orderInfo.orderCode)">复制</view>
				</view>
			</view>
			<view class="total-item">
				<view class="item-left">创建时间</view>
				<view class="item-info">
					{{orderInfo.createTime}}
				</view>
			</view>
			<view class="total-item">
				<view class="item-left">付款时间</view>
				<view class="item-info">
					{{orderInfo.payTime}}
				</view>
			</view>
			<view class="total-item">
				<view class="item-left">发货时间</view>
				<view class="item-info">
					{{orderInfo.deliveryTime}}
				</view>
			</view>
			<view class="total-item">
				<view class="item-left">收货时间</view>
				<view class="item-info">
					{{orderInfo.receiptTime}}
				</view>
			</view>
		</view>
		
		<!-- 操作按钮 -->
		<view class="control-box">
			<block v-if="orderInfo.orderStatus=='待付款'">
				<view class="btn default">删除订单</view>
				<view class="btn pay">继续付款</view>
			</block>
			<block v-if="orderInfo.orderStatus=='待发货'">
				<view class="btn default">取消订单</view>
			</block>
			<block v-if="orderInfo.orderStatus=='待收货'">
				<view @click="navTo(`/my/logisticsInfo?code=${orderInfo.orderCode}`)" class="btn default">查看物流</view>
				<view class="btn default">申请退货</view>
				<view class="btn pay">确认收货</view>
			</block>
			<block v-if="orderInfo.orderStatus=='待评价'">
				<view class="btn default">申请开票</view>
				<view @click="navTo(`/my/logisticsInfo?code=${orderInfo.orderCode}`)" class="btn default">
					查看物流
				</view>
				<view @click="navTo(`/my/orderEvaluate?code=${orderInfo.orderCode}`)" class="btn default">
					商品评价
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import { orderInfo, addressList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				orderCode:'',
				orderInfo:{},
				addressInfo:{},
			}
		},
		components: {
			uniNavBar
		},
		onLoad(options) {
			this.orderCode = options.code
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			this.orderInfo = orderInfo
			this.addressInfo = orderInfo.addressInfo
		},
		methods: {
			navTo(path){
				this.sjuNav.navigateTo(path)
			},
			// 复制订单编号
			copyCode(content){
				uni.setClipboardData({
					data: content,
					success: function () {
						console.log('success')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 订单状态
	.status-box{
		width: calc(100% - 80upx);
		height: 200upx;
		padding: 0 40upx;
		display: flex;
		align-items: center;
		background-color: var(--primary-color);
		.iconfont{
			color: #FFFFFF;
			font-size: 100upx;
			margin-right: 20upx;
		}
		.status-info{
			width: calc(100% - 120upx);
			color: #FFFFFF;
			.status-title{
				height: 60upx;
				line-height: 60upx;
				font-size: 34upx;
			}
			.status-date{
				height: 40upx;
				line-height: 40upx;
			}
		}
	}
	
	// 地址信息
	.address{
		width: calc(100% - 80upx);
		padding:20upx;
		margin: 20upx;
		border-radius: 20upx;
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		background-color: #FFFFFF;
		
		// 地址信息
		.address-box{
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: row;
			.address-info{
				width: 100%;
				margin: 0 0 20upx 20upx;
				.user-info{
					width: 100%;
					height: 40upx;
					line-height: 40upx;
					display: flex;
					align-items: center;
					margin-bottom: 10upx;
					.user-name{
						font-size: 32upx;
					}
					.user-phone{
						margin-left: 40upx;
						color: #333333;
					}
				}
				.adddress-detail{
					width: 100%;
					color:#909399;
				}
			}
		}
	
		.iconfont{
			font-size: 50upx;
			color: var(--primary-color);
		}
	
		// 背景
		.address-bg{
			width: 100%;
			height: 4upx;
			border-radius: 20upx;
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAECAYAAADWIIyPAAAAkklEQVR42mP4jwR+7tr1/4OzM1Xwt46O/6SA3Yd//HeLeU0V3DXjE0H7GGCMvw8f/v/o5UUVT39KTPz/78cPoj398Omf/75Jb6ji6ZSyd/9//PxHnMdBjvyUlEQVT4MC7++DB0R7GuTIlPJ3VPE0KPAePvlDlL1gj3/r6qJaEv+5YwdJSbxn5meqJfGdh74TbS8A1dn662xhNdIAAAAASUVORK5CYII=");
		}
	}
	
	// 订单列表
	.list-box{
		width: 100%;
		margin-top: 20upx;
		
		.list-item{
			width: calc(100% - 80upx);
			padding: 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin:0 20upx 20upx;
			// 商店信息、订单状态
			.title-info{
				width: 100%;
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.shop-info{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.shop-name{
						height: 40upx;
						font-size: 28upx;
						margin-left: 10upx;
					}
					.iconfont{
						font-size: 40upx;
						color: var(--primary-color);
					}
					.icon-right{
						color: #CCCCCC;
					}
				}
				// 订单状态
				// .status{
				// 	color: var(--primary-color);
				// }
			}
			
			// 商品信息列表
			.goods-list{
				width: 100%;
				.goods-item{
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 20upx;
					// 商品图片
					.goods-image{
						width: 200upx;
						margin-right: 20upx;
						border-radius: 10rpx;
					}
					// 商品信息
					.goods-info{
						width: calc(100% - 220upx);
						height: 100%;
						display: flex;
						align-items: center;
						// 名称信息
						.name-info{
							// width: 60%;
							.goods-name{
								font-size: 28upx;
								color: #000000;
							}
							.goods-specs{
								font-size: 26upx;
								color: #CCCCCC;
							}
						}
						.goods-data{
							// width: 40%;
							text-align: end;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							// 商品价格
							.goods-price{
								font-size: 34upx;
								color: var(--primary-color);
							}
							.goods-count{
								font-size: 28upx;
								color: #CCCCCC;
							}
						}
					}
				}
			}
		}
	}
	
	// 汇总信息
	.total{
		width: calc(100% - 80upx);
		padding: 20upx;
		margin: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		
		.total-item{
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid #EEEEEE;
			
			.item-left{
				color: #333333;
			}
			// 右侧
			.item-right{
				font-size: 32upx;
				color: #C0C0C0;
				span{
					font-size: 26upx;
				}
			}
			// 价格
			.item-price{
				color: $price-color;
			}
			// 右侧信息
			.item-info{
				color: #C0C0C0;
				font-size: 26upx;
				display: flex;
				align-items: center;
				// 复制
				.copy-btn{
					width: 80upx;
					height: 40upx;
					line-height: 40upx;
					color: #999999;
					text-align: center;
					margin-left: 20upx;
					border-radius: 10upx;
					border: 1upx solid #999999;
				}
			}
		}
	}
	
	// 操作按钮
	.control-box{
		z-index: 10;
		width: calc(100% - 40upx);
		height: 100upx;
		padding: 0 20upx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-shadow: 0 -10upx 10upx #EEEEEE;
		background-color: #FFFFFF;
		
		.btn{
			min-width: 120upx;
			height: 60upx;
			padding: 0 20upx;
			margin-left: 20upx;
			font-size: 28upx;
			border-radius: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.default{
			color: #333333;
			border: 1upx solid  #CCCCCC;
		}
		.pay{
			color: var(--primary-color);
			border:1upx solid  var(--primary-color);
		}
	}
</style>
