<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="创建订单" />
		<!-- 地址信息 -->
		<view @click="navTo('/my/addressList')" class="address">
			<view class="address-box">
				<i class="iconfont icon-dizhi"></i>
				<view v-if="JSON.stringify(addressInfo) !='{}'" class="address-info">
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
				<view v-else class="address-info">
					<view class="no-address">
						请选择收货地址
					</view>
				</view>
			</view>
			<i class="iconfont icon-right"></i>
			
			<!-- 底部背景条 -->
			<view class="address-bg">
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="order-box" v-for="(item,id) in goodsList" :key="id">
			<!-- 商铺信息 -->
			<view class="shop-info">
				<view class="info-left">
					<image v-if="item.shopimage != ''" class="shop-image" :src="item.shopimage" mode="widthFix"></image>
					<i v-else class="iconfont icon-shop"></i>
					<view class="shop-name">{{item.shopName}}</view>
				</view>
				<i class="iconfont icon-right"></i>
			</view>
			<!-- 商品列表 -->
			<view class="goods-list" v-for="(items,index) in item.goodsList" :key="index">
				<!-- 商品图片 -->
				<image class="goods-image" :src="items.image" mode="widthFix" ></image>
				<view class="goods-info">
					<view class="info-box">
						<view class="goods-name">
							{{items.name}}
						</view>
						<view class="goods-specs">
							{{items.specsName}}
						</view>
					</view>
					<!-- 商品价格、数量 -->
					<view class="price-count">
						<view class="price-box">
							<!-- ￥{{items.current_price}} -->
							<span class="price">￥ {{ items.current_price }}</span>
							<span v-if="goodsInfo.orderType == 'score'" class="price" style="margin-left: 0;">
								+
								<i class="iconfont icon-bonus"></i>
								{{items.score}}
							</span>
						</view>
						<view class="goods-count">
							x {{items.goodsCount}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="info-item">
				<view class="title">
					商品金额
				</view>
				<view class="data price">
					￥{{orderAmount}}
				</view>
			</view>
			<view v-if="goodsInfo.orderType == 'score'" class="info-item">
				<view class="title">
					使用积分
				</view>
				<view class="data price">
					100
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					运费
				</view>
				<view class="data price">
					{{ orderFreight > 0 ? `￥${orderFreight}` : '包邮' }}
				</view>
			</view>
			<view v-if="goodsInfo.orderType == 'goods'" class="info-item">
				<view class="title">
					优惠券
				</view>
				<view @click="$refs['sjuCoupon'].show()" class="data price">
					{{ couponCredit }}
				</view>
			</view>
			<view v-if="discountMoney>0" class="info-item">
				<view class="title">
					会员优惠
				</view>
				<view class="data price">
					-￥{{discountMoney}}
				</view>
			</view>
			<view class="remark-item">
				<view class="title">
					备注
					<span>(选填)</span>
				</view>
				<textarea placeholder="请输入订单备注"></textarea>
			</view>
		</view>
		
		<!-- 提交订单 -->
		<view class="submit-box">
			<view class="order-price">
				实付款 
				<span class="price">￥ {{ orderMoney }}</span>
				<span v-if="goodsInfo.orderType == 'score'" class="price" style="margin-left: 0;">
					+
					<i class="iconfont icon-bonus"></i>
					{{orderScore}}
				</span>
			</view>
			<view class="submit-btn">
				提交订单
			</view>
		</view>
		<!-- 优惠券弹窗 -->
		<sju-coupon ref="sjuCoupon" 
		mode="use"
		:amount="orderAmount"
		:couponList="couponCenterList"
		@receive='couponReceive'></sju-coupon>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import sjuCoupon from '@/components/sju-coupon/sju-coupon.vue'
	import { cartList, couponCenterList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				addressInfo:{},
				goodsList:[],
				goodsInfo:{},
				couponCredit:'选择优惠券',
				couponCenterList:[],
				orderAmount:12200,
				orderFreight:12,
				discountMoney:12,
				orderMoney:0,
				orderScore:100
			}
		},
		components: {
			uniNavBar,
			sjuCoupon
		},
		onLoad(options) {
			console.log(JSON.parse(options.item), '商品数据')
			this.goodsInfo = JSON.parse(options.item)
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			this.goodsList = JSON.parse(JSON.stringify(cartList))
			// 选择地址,页面栈传值
			if(this.sjuTools.currentPage(1).addressInfo != undefined) {
				this.addressInfo = this.sjuTools.currentPage(1).addressInfo
			}
			this.couponCenterList = couponCenterList
			// 折扣金额
			this.discountMoney = this.orderAmount * (1 - this.$store.state.memberDiscount)
			this.orderMoney = this.orderFreight + this.orderAmount * this.$store.state.memberDiscount
		},
		methods: {
			navTo(page){
				this.sjuNav.navigateTo(page)
			},
			// 优惠券领取
			couponReceive(e) {
				console.log(e)
				this.discountCompute(e)
			},
			// 计算优惠券优惠金额
			discountCompute(item){
				if(item.type == 1 || item.type == 2 || item.type == 4 || item.type == 6) {
					// 限品类券、全品类券、通用券、立减券
					this.couponCredit = `-￥${item.value}`
					this.orderMoney = this.orderFreight + this.orderAmount - item.value
				} else if(item.type == 3) {
					// 折扣优惠券
					let discount = this.orderAmount*(1 - item.value).toFixed(2)
					this.couponCredit = `-￥${discount}`
					this.orderMoney = this.orderFreight +  this.orderAmount - discount
				} else if(item.type == 5) {
					// 运费券
					if(this.orderFreight > item.value) {
						this.couponCredit = `-￥${item.value}`
						this.orderMoney = this.orderFreight +  this.orderAmount - item.value
					} else {
						this.couponCredit = `-￥${this.orderFreight}`
						this.orderMoney = this.orderFreight +  this.orderAmount - this.orderFreight
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
// 地址信息
.address{
	width: calc(100% - 40upx);
	position: relative;
	padding:20upx;
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
			width: calc(100% - 100upx);
			margin: 0 20upx;
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
			
			// 无收货地址
			.no-address{
				width: 100%;
				height: 120upx;
				line-height: 120upx;
				font-size: 32upx;
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
		position: absolute;
		left: 0;
		bottom: 0;
		display: block;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAECAYAAADWIIyPAAAAkklEQVR42mP4jwR+7tr1/4OzM1Xwt46O/6SA3Yd//HeLeU0V3DXjE0H7GGCMvw8f/v/o5UUVT39KTPz/78cPoj398Omf/75Jb6ji6ZSyd/9//PxHnMdBjvyUlEQVT4MC7++DB0R7GuTIlPJ3VPE0KPAePvlDlL1gj3/r6qJaEv+5YwdJSbxn5meqJfGdh74TbS8A1dn662xhNdIAAAAASUVORK5CYII=");
	}
}

// 订单商品
.order-box{
	width: 100%;
	height: auto;
	margin-top: 20upx;
	background-color: #FFFFFF;
	// 商铺信息
	.shop-info{
		width: calc(100% - 40upx);
		height: 80upx;
		padding: 20upx;
		border-bottom: 1upx #E5E5E5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		// 信息
		.info-left{
			display: flex;
			align-items: center;
			.shop-image {
				width: 50upx;
			}
			.shop-name{
				height: 50upx;
				line-height: 50upx;
				font-size: 28upx;
				margin-left: 10upx;
			}
		}
		
		.iconfont{
			font-size: 50upx;
			color: var(--primary-color);
		}
	}
	
	// 商品列表
	.goods-list{
		width: 100%;
		display: flex;
		margin-bottom: 20upx;
		// 商品图片
		.goods-image{
			width: 200upx;
			margin: 0 20upx;
			border-radius: 10upx;
			flex-shrink: 0;
		}
		
		// 商品信息
		.goods-info{
			width: calc(100% - 300upx);
			display: flex;
			flex-direction: column;
			justify-content: space-between !important;
			.info-box{
				width: 100%;
				.goods-name{
					font-size: 28upx;
					color: #000000;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.goods-specs{
					margin: 10upx 0;
					font-size: 26upx;
					color: #CCCCCC;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
			
			// 价格、数量
			.price-count{
				width: 100%;
				height: 80upx;
				display: flex;
				align-items: center;
				flex-direction: row;
				
				.price-box{
					margin-right: 10upx;
					font-size: 32upx;
					color: $price-color;
					font-weight: bold;
				}
				
				// 商品数量
				.goods-count{
					color: #999;
				}
			}
		}
	}
}

// 订单信息
.order-info{
	width: 100%;
	margin: 20upx 0 100upx;
	background-color: #FFFFFF;
	
	.info-item{
		width: calc( 100% - 60upx);
		height: 80upx;
		line-height: 80upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #E5E5E5;
		.title{
			color: #999999;
		}
		.data{
			color: #000000;
		}
		.price{
			color: $price-color;
			font-weight: 600;
		}
	}
	
	// 备注
	.remark-item{
		width: calc( 100% - 60upx);
		height: 440upx;
		margin: 0 auto;
		.title{
			height: 80upx;
			line-height: 80upx;
			color: #999999;
		}
		
		textarea{
			width: calc(100% - 40upx);
			height: 300upx;
			padding: 20upx;
			font-size: 26upx;
			border-radius: 20upx;
			background-color: #F5F5F5;
		}
	}
}

// 提交订单
.submit-box{
	z-index: 10;
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #FFFFFF;
	box-shadow: 0 -10upx 10upx #EEEEEE;
	
	// 付款金额
	.order-price{
		font-size: 30upx;
		margin-left: 20upx;
		.price{
			color: $price-color;
			margin-left: 20upx;
		}
	}
	
	// 提交订单
	.submit-btn{
		width: 200upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin-right: 20upx;
		border-radius: 40upx;
		color: #FFFFFF;
		background-color: var(--primary-color);
		
	}
}

</style>
