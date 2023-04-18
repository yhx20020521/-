<template>
	<view :style="Theme">
		<uni-nav-bar :statusBar="true" leftIcon="arrowleft" fixed="true"  title="商品详情" />
		<!-- 商品图片轮播 -->
		<swiper class="swiper" autoplay="true" interval="4000"
			duration="1000" :current="current" circular="true" @change="swiperChange">
			<swiper-item v-for="(item,index) in productInfo.imgList" :key="index">
				<image class="images" :src="item.imgUrl" @click="previewImage(objToArray(productInfo.imgList),index)" mode="aspectFit"></image>
				<view class="laber">{{index+1}} / {{productInfo.imgList.length}}</view>
			</swiper-item>
		</swiper>
		
		<!-- 商品名称 -->
		<view class="goods-info">
			<view class="goods-price">
				<view class="present-price">
					<!-- ￥<text>{{selectedSku.current_price || productInfo.current_price}}</text> -->
					<view v-if="+productInfo.current_price > 0" class="price-content">
						￥<text>{{ selectedSku.current_price || productInfo.current_price }} + </text>
					</view>
					<view class="socre-box">
						<i class="iconfont icon-bonus"></i>
						<view class="score-text">
							100 
							<!-- {{ item.score }} -->
						</view>
					</view>
				</view>
				<view class="original-price">￥{{selectedSku.price || productInfo.price}}</view>
			</view>
			<view class="goods-name">{{productInfo.name}}</view>
			
			<view class="goods-amount">
				<view class="sold">已售{{productInfo.sellQty}}件</view>
				<view class="sold">库存剩余{{productInfo.stockQty}}件</view>
			</view>
		</view>
		
		<!-- 属性规格 -->
		<view class="tool-box">
			<view class="tool-item" @click="$refs['sjuSpecs'].show()">
				<view class="item-left">
					<view class="item-title">规格</view>
					<view class="item-center">
						{{ skuStr }}
					</view>
				</view>
				<i class="iconfont icon-right"></i>
			</view>
			<view class="tool-item" @click="$refs['sjuService'].show()">
				<view class="item-left">
					<view class="item-title">服务</view>
					<view class="item-center">
						{{serviceList.map(item => { return item.title }).join(",")}}
					</view>
				</view>
				<i class="iconfont icon-right"></i>
			</view>
			<view class="tool-item" @click="$refs['sjuParams'].show()">
				<view class="item-left">
					<view class="item-title">
						参数
					</view>
					<view class="item-center">
						{{ paramText }}
					</view>
				</view>
				<i class="iconfont icon-right"></i>
			</view>
		</view>
		
		<!-- 评论模块 -->
		<view class="comment">
			<!-- 评论标题 -->
			<view class="title-box">
				<view class="title">
					宝贝评价<text>({{evaluate.count}})</text>
				</view>
				<view class="icon-box" @click="navTo(`/goods/evaluateList?code=${this.productCode}`)">
					<view class="icon-name">查看全部</view>
					<i class="iconfont icon-right"></i>
				</view>
			</view>
			<!-- 评价列表 -->
			<view class="comment-list" v-for="(item,index) in evaluate.list.slice(0,2)" :key="index">
				<!-- 评论用户 -->
				<view class="item-user">
					<image class="user-image" :src="item.image" ></image>
					<view class="user-info">
						<view class="user-name">{{filters_name(item.name)}}</view>
						<view class="date">{{item.date}}</view>
					</view>
				</view>
				<view class="comment-content">
					{{item.content}}
				</view>
				<view class="comment-images">
					<image v-for="(items,index) in item.imagesList" :key="index" 
						:src="items" @click="previewImage(item.imagesList,index)" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<!-- 商品详情 -->
		<view class="products-introduction">
		  <view class="title">
		    <text>商品详情</text>
		  </view>
		  <view class="product-content" v-html="productInfo.content">
		  </view>
		</view>
		
		<!-- 商品导航 -->
		<view class="goods-nav">
			<view class="nav-left">
				<view class="item-box">
					<i class="iconfont icon-kefu"></i>
					<view>客服</view>
				</view>
				<!-- <view class="item-box" @click="navTo(`/store/storeDetail?code=${productInfo.storeCode}`)">
					<i class="iconfont icon-shop"></i>
					<view>商铺</view>
				</view>
				<view class="item-box" @click="sjuNav.switchTab('/tab/cart')">
					<i class="iconfont icon-cart"></i>
					<view>购物车</view>
				</view> -->
			</view>
			<view class="nav-right">
				<!-- <view @click="$refs['sjuSpecs'].show()" class="add-btn">
					加入购物车
				</view> -->
				<view @click="$refs['sjuSpecs'].show()" class="buy-btn">
					立即兑换
				</view>
			</view>
		</view>
		<!-- 服务弹窗 -->
		<sju-service ref="sjuService" :serviceList="serviceList"></sju-service>
		<!-- 属性规格 -->
		<sju-specs ref="sjuSpecs" 
		:isScore="true"
		:goodsInfo="productInfo" 
		:skuList="skuList" 
		:priceList="priceList" 
		bgColor="var(--primary-color)"
		@onAdd ="onAdd"
		@onBuy ="onBuy"
		@onChange="onSkuChange">
		</sju-specs>
		<!-- 商品参数 -->
		<sju-params ref="sjuParams" :paramList="paramList"></sju-params>
	</view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import sjuService from '@/components/sju-service/sju-service.vue'
import sjuSpecs from '@/components/sju-specs/sju-specs.vue'
import sjuParams from '@/components/sju-params/sju-params.vue'
import { 
	scoreGoodsInfo, serviceList, skuList, scorePriceList, 
	paramList, evaluate
} from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				current:0,
				productCode: '',	//商品编号
				productInfo:{},
				serviceList:[],
				skuList:[],
				priceList:[],
				paramList:[],
				skuStr:'请选择商品规格',
				selectedSku: {},
				evaluate:{},
			}
		},
		components: {
			uniNavBar,
			sjuService,
			sjuSpecs,
			sjuParams
		},
		onLoad(option) {
			this.productCode = option.id
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			this.productInfo = scoreGoodsInfo
			this.serviceList = serviceList
			this.skuList = skuList
			this.priceList = scorePriceList
			this.paramList = paramList
			this.evaluate = evaluate
			this.paramText = this.paramList.map(item =>{return item.title}).join(' · ')
		},
		methods: {
			// 过滤用户名称
			filters_name(value){
				if (!value || value === '') 
					return ''
				let name = ''
				if(value.length>2) {
					name = this.sjuTools.strFilter(value,1,-2)
				} else {
					name = value[0] + '****'
				}
				return name
			},
			// 轮播图切换
			swiperChange(e){
				this.current = e.detail.current
			},
			// 页面跳转
			navTo(path){
				this.sjuNav.navigateTo(path)
			},
			// 对象数组属性转数组
			objToArray(List){
				let arrNew = List.map(item => {
				   return item.imgUrl
				})
				return arrNew
			},
			// 预览图片
			previewImage(urlList, index){
				uni.previewImage({
					current: index,
					urls: urlList
				})
			},
			// 规格选择
			onSkuChange(e) {
				this.selectedSku = e
				if(JSON.stringify(this.selectedSku) !='{}' && this.selectedSku.skuText.length >0) {
					let str = ''
					this.selectedSku.skuText.forEach((item, index) => {
						str += this.skuList[index].name + ':' + item + ' '
					})
					this.skuStr = str
				}
			},
			// 立即购买
			onBuy(e){
				let type = {orderType:'score'}
				let item = Object.assign(type,e)
				this.sjuNav.navigateTo('/goods/createOrder?item='+JSON.stringify(item))
			},
			// 加入购物车
			onAdd(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 商品轮播图 */
	.swiper {
		$swiper-width: 750upx;
		$swiper-height: 750upx;
		width: $swiper-width;
		height: $swiper-height;
		swiper-item image{
			width: $swiper-width;
			height: $swiper-height;
		}
		// 轮播页标
		.laber {
			width: fit-content;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			padding: 0 15upx;
			font-size: 20upx;
			position: absolute;
			right: 15upx;
			bottom: 20upx;
			color: #FFFFFF;
			border-radius: 20upx;
			background-color: rgba(0, 0, 0, 0.4);
		}
	}
	
	// 商品信息
	.goods-info{
		margin: 20upx;
		padding: 0upx 20upx;
		border-radius: $border-radius;
		background-color: var(--accent-bg-color);
		.goods-price{
			padding: 20upx 0;
			display: flex;
			align-items: center;
			// 商品售价
			.present-price{
				font-size: 30upx;
				font-weight: $font-weight-md;
				color: $price-color;
				display: flex;
				align-items: center;
				flex-direction: row;
				
				.price-content{
					text{
						font-size: $price-font-size;
					}
				}
				
				// 积分
				.socre-box {
					margin-left: 10upx;
					display: flex;
					align-items: center;
					flex-direction: row;
					.score-text{
						font-size: $price-font-size;
					}
				
					.iconfont {
						font-size: 40upx;
						margin-right: 6upx;
						font-weight: 600;
						color: $price-color;
					}
				}
			}
			// 商品标价
			.original-price{
				color: #999999;
				font-size: 28upx;
				margin: 10upx 0 0 20upx;
				text-decoration: line-through;
			}
		}
		// 商品名称
		.goods-name{
			color: #222222;
			font-size: $font-size-lg;
			font-weight: $font-weight-md;
		}
		// 销售量、库存量
		.goods-amount{
			padding: 20upx 0;
			color: #999999;
			font-size: $font-size-sm;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
		}
	}
	
	// 属性规格
	.tool-box {
		margin: 20upx;
		padding: 0upx 20upx;
		background-color: #FFFFFF;
		border-radius: $border-radius;
		.tool-item{
			padding: 20upx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid var(--border-color);
			.item-left{
				width: calc(100% - 160upx);
				flex-shrink: 0;
				color: #999999;
				display: flex;
				align-items: center;
				font-size: $font-size-md;
				
				.item-title{
					color: #999999;
					flex-shrink: 0;
					font-size: $font-size-md;
				}
				
				.item-center{
					width: 100%;
					color: #555555;
					font-size: 28upx;
					flex-shrink: 0;
					margin-left: 20upx;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
				
				.item-coupon{
					width: 60%;
					// flex-shrink: 0;
					margin-left: 20upx;
					display: flex;
					align-items: center;
					flex-direction: row;
					
					.coupon-box{
						flex-shrink: 0;
						padding: 10upx;
						margin-right: 10upx;
						border-radius: 10upx;
						color: var(--primary-color);
						background-color: var(--accent-color);
					}
				}
			}
			
			.iconfont{
				color: #C0C0C0;
			}
		}
	}

	// 评论模块
	.comment{
		width: calc(94% - 40upx);
		padding: 20upx;
		margin: 20upx auto;
		background-color: var(--accent-bg-color);
		border-radius: $border-radius;
		.title-box{
			height: 80upx;
			line-height: 80upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			background-color: var(--accent-bg-color);
			
			.title{
				font-size: $font-size-md;
				font-weight: $font-weight-lg;
				text{
					font-size: $font-size-xs;
					margin-left: 8upx;
				}
			}
			
			.title:before {
				content: '';
				width: 6upx;
				height: 40upx;
				margin-right: 10upx;
				display: inline-block;
				vertical-align: middle;
				border-radius: 6upx;
				background-color: var(--primary-color);
			}
			// 右侧内容
			.icon-box{
				height: 80upx;
				line-height: 80upx;
				display: flex;
				align-items: center;
				.icon-name{
					height: 80upx;
					line-height: 80upx;
					color: var(--primary-color);
					// color: #999999;
					font-size: 30upx;
				}
				.iconfont{
					// color: #999999;
					font-size: 40upx;
					color: var(--primary-color);
				}
			}
			
		}
		// 评论列表
		.comment-list{
			padding: 20upx;
			background-color: var(--accent-bg-color);
			border-bottom: 1upx solid #EEEEEE;
			// 用户信息
			.item-user{
				display: flex;
				align-items: center;
				// 用户头像
				.user-image{
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
				}
				.user-info{
					width: calc(100% - 72upx);
					margin-left: 12upx;
					
					.user-name{
						color: #000000;
						font-size: $font-size-lg;
					}
					.date{
						color: #999999;
						font-size: 20upx;
					}
				}
			}
			// 评价内容
			.comment-content{
				margin: 16upx auto;
				color: #000000;
				font-size: $font-size-base;
			}
			
			// 评价图片
			.comment-images{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				image{
					width: 200upx;
					height: 200upx;
					margin:0 2% 20upx 0;
					border-radius: 20upx;
				}
				image:nth-child(3n){
					margin-right: 0;
				}
			}
		}
		// 选择最后一个元素
		.comment-list:last-child{
			border-bottom: none;
		}
	}
	
	/* 商品详情 */
	.products-introduction{
		width: 750upx;
		height: auto;
		margin-bottom: 120upx;
		.title{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 80upx;
			text{
				font-size: 28upx;
				color: #212121;
				margin: 0 20upx;
			}
		}
		.title:before{
			content: "";
			width: 100upx;
			height: 2upx;
			background-color:#EEEEEE;
		}
		.title:after{
			content: "";
			width: 100upx;
			height: 2upx;
			background-color: #EEEEEE;
		}
		// 商品详情
		.product-content{
			margin-bottom: 20upx;
			::v-deep {
			  img {
			    overflow: hidden;
			    width: 750upx;
			    height: auto;
			  }
			  p {
			    margin: 0;
			    padding: 0;
			    font-size: 0;
			  }
			}
		}
	}
	
	// 商品导航
	.goods-nav{
		z-index: 100;
		width: calc(100% - 40upx);
		height: 100upx;
		padding: 0 20upx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		box-shadow: 0 0 10upx 0 rgb(0 0 0 / 10%);
		
		// 导航左侧
		.nav-left{
			width: 20%;
			display: flex;
			align-items: center;
			.item-box{
				flex: 1;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				font-size: 24upx;
				color: #606266;
				.iconfont{
					font-size: 50upx;
				}
			}
		}
		// 导航右侧
		.nav-right{
			width: 80%;
			text-align: center;
			color: #FFFFFF;
			font-size: 32upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.add-btn{
				width: 50%;
				height: 80upx;
				line-height: 80upx;
				color: var(--primary-color);
				border-top-left-radius: 40upx;
				border-bottom-left-radius: 40upx;
				background-color: var(--accent-color);
				// background: linear-gradient(90deg, #FFCD1E, #FF8A18);
			}
			.buy-btn{
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				color: #FFFFFF;
				border-radius: 40upx;
				background: linear-gradient(90deg, var(--primary-color), var(--assist-color));
				// background: linear-gradient(90deg, #FE6035, #EF1224);
			}
		}
	}
	
</style>
