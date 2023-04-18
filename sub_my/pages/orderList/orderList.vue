<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="我的订单" />
		<!-- 搜索 -->
		<view class="type-box">
			<view class="type-list">
				<view class="item" :class="{'active':typeId == item.id}"
				  v-for="(item,index) in typeList" :key="index"
				  @click="changeTab(item.id)">
					{{item.name}}
				</view>
			</view>
		</view>
		
		<!-- 订单列表 -->
		<view class="list-box" v-if="!isEmpty">
			<view class="list-item" v-for="(item,id) in orderList" :key="id">
				<!-- 标题信息 -->
				<view class="title-info">
					<view class="shop-info">
						<i class="iconfont icon-shop"></i>
						<view class="shop-name">{{item.shopName}}</view>
						<i class="iconfont icon-right"></i>
					</view>
					<view class="status">
						{{item.orderStatus}}
					</view>
				</view>
				<!-- 商品列表 -->
				<view class="goods-list" @click="navTo(`/my/orderDetail?code=${item.orderCode}`)">
					<view class="goods-item" v-for="(items,index) in item.goodList" :key="index">
						<image class="goods-image" :src="items.image" mode="widthFix"></image>
						<view class="goods-info">
							<view class="name-info">
								<view class="goods-name">
									{{items.name}}
								</view>
								<view class="goods-specs">
									{{items.specsName}}
								</view>
							</view>
							<view class="goods-data">
								<view class="goods-price">
									￥{{items.current_price}}
								</view>
								<view class="goods-count">
									x{{items.count}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 数据汇总 -->
				<view class="summary-box">
					共{{item.goodsTotal}}件商品 
					合计￥<span>{{item.totalMoney}}</span>
					(含运费￥{{item.orderFreight}})
				</view>
				<!-- 订单按钮 -->
				<view class="order-btns">
					<block v-if="item.orderStatus=='待付款'">
						<view class="btn default">删除订单</view>
						<view class="btn pay">继续付款</view>
					</block>
					<block v-if="item.orderStatus=='待发货'">
						<view class="btn default">取消订单</view>
						<!-- <view class="btn default">申请退款</view> -->
					</block>
					<block v-if="item.orderStatus=='待收货'">
						<view @click="navTo(`/my/logisticsInfo?code=${orderInfo.orderCode}`)" class="btn default">查看物流</view>
						<view class="btn default">申请退货</view>
						<view class="btn pay">确认收货</view>
					</block>
					<block v-if="item.orderStatus=='待评价'">
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
		</view>
		
		<!-- 暂无数据 -->
		<sju-empty iconColor="var(--primary-color)" v-if="isEmpty"></sju-empty>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { orderList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				typeId: 0,
				typeList:[
					{
						id:0,
						name:'全部'
					},
					{
						id:1,
						name:'待付款'
					},
					{
						id:2,
						name:'待发货'
					},
					{
						id:3,
						name:'待收货'
					},
					{
						id:4,
						name:'待评价'
					}
				],
				isEmpty:false,
				orderList:[]
			}
		},
		components: {
			uniNavBar,Empty
		},
		onLoad(options) {
			this.typeId =options.id || 0
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			this.orderList = orderList
		},
		methods: {
			// 类型切换
			changeTab(id){
				this.typeId = id
			},
			navTo(path){
				this.sjuNav.navigateTo(path)
			}
		}
	}
</script>

<style lang="scss">
/* 订单类型 */
.type-box {
	z-index: 10;
	width: 100%;
	height: 100upx;
	position: fixed;
	left: 0;
	top: calc(88upx + var(--statusBarHeight));
	background-color: #ffffff;
	.type-list{
		width: 96%;
		height: 80upx;
		line-height: 80upx;
		margin: 10upx 2%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.item{
			margin: 0 20upx;
		}
		.active{
			color: var(--primary-color);
			border-bottom: 6upx solid var(--primary-color);
		}
	}
}

// 订单列表
.list-box{
	width: 100%;
	margin-top: 120upx;
	
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
			.status{
				color: var(--primary-color);
			}
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
		// 数据汇总
		.summary-box{
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			text-align: end;
			span{
				font-size: 34upx;
			}
		}
		// 订单按钮
		.order-btns{
			width: 100%;
			// height: 80upx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: flex-end;
			.btn{
				min-width: 120upx;
				height: 60upx;
				padding: 0 20upx;
				margin:0 0 20upx 20upx;
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
	}
}

</style>
