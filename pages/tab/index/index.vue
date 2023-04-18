<template>
	<view :style="Theme">
		<uni-nav-bar :statusBar="true" fixed="true" title="电商平台案例" />
		<!-- banner图 -->
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration" :circular="circular" indicator-active-color="#fff">
			<swiper-item v-for="(swiper,index) in swiperList" :key="index">
				<image :src="swiper.imgUrl"></image>
			</swiper-item>
		</swiper>

		<!-- 工具导航栏 -->
		<view class="menu">
			<view class="menuItem" @click="navTo(item.path)"
			v-for="(item, index) in menuList" :key="index">
				<i class="iconfont" :class="item.icon"></i>
				<!-- <image :src="item.image"></image> -->
				<text>{{item.name}}</text>
			</view>
		</view>

		<!-- 产品推荐 -->
		<view class="title-box">
			<view class="title">产品推荐</view>
			<i class="iconfont icon-right" @click="navTo('/goods/goodsList')"></i>
		</view>

		<!-- 产品列表 -->
		<waterfall ref="waterfall" >
			<template v-slot:left="{leftList}">
				<view class="goods-item" @click="navTo(`/goods/goodsDetail?id=${item.id}`)" v-for="(item, index) in leftList" :key="index">
					<!-- 商品图片 -->
					<image class="goods-image" :src="item.img" lazy-load="true" mode="widthFix"></image>
					<view class="goods-title">
						<view class="title">
							<text class="tag" v-if="item.is_special === 1">特价</text>
							{{item.name}}
						</view>
					</view>
					<!-- 商品价格 -->
					<view class="price-box">
						<view class="price">
							￥<span>{{item.price}}</span>
						</view>
						<view class="current-price">
							￥<span>{{item.current_price}}</span>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="goods-item"  @click="navTo(`/goods/goodsDetail?id=${item.id}`)" v-for="(item, index) in rightList" :key="index">
					<!-- 商品图片 -->
					<image class="goods-image" :src="item.img" lazy-load="true" mode="widthFix"></image>
					<view class="goods-title">
						<view class="title">
							<text class="tag" v-if="item.is_special === 1">特价</text>
							{{item.name}}
						</view>
					</view>
					<!-- 商品价格 -->
					<view class="price-box">
						<view class="price">
							￥<span>{{item.price}}</span>
						</view>
						<view class="current-price">
							￥<span>{{item.current_price}}</span>
						</view>
					</view>
				</view>
			</template>
		</waterfall>

		<!-- 加载更多 -->
		<view class="loadingText">{{loadingText}}</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import waterfall from '@/components/waterfall/waterfall.vue'
	import { bannerList, menuList, goodsList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme: '',
				// 是否首页哀悼模式
				isMourn: false,
				// banner图设置参数
				indicatorDots: true,
				circular: true,
				autoplay: true,
				interval: 1500,
				duration: 500,
				swiperList: [],
				menuList:[],
				// 产品列表
				goodsList: [],
				loadingText: '上拉加载更多',
			}
		},
		components: {
			uniNavBar,
			waterfall
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			if(this.isMourn) {
				this.Theme = this.$store.state.Theme + this.$store.state.mourningStyle
			}
			//设置 tabBar 选择颜色改为主题色
			uni.setTabBarStyle({
				selectedColor: this.Theme.split(/\;|\:/)[1],
			})
			// 设置tabBar图标
			if(this.sjuLogin.getValue('themeName') != '') {
				this.sjuTools.setTabBar()
			}
			// 设置购物车数量
			this.setcartNum()
			
			this.swiperList = bannerList
			this.menuList = menuList
			this.goodsList = goodsList
			setTimeout(() => {
				this.$refs.waterfall.setData(this.goodsList)
			}, 1000)
		},
		onReachBottom() {
			if( this.goodsList .length < 200) {
				this.goodsList = this.goodsList.concat(this.goodsList)
				this.$refs.waterfall.setData(this.goodsList)
			} else {
				this.loadingText = '已加载全部数据';
			}
			
		},
		methods: {
			navTo(page){
				this.sjuNav.navigateTo(page)
			},
			// 设置tabBar购物车数量
			setcartNum(){
				if( this.$store.state.cartNum > 0) {
					let cartNum = this.$store.state.cartNum > 99 ? '99+' : this.$store.state.cartNum.toString()
					uni.setTabBarBadge({
					  index: 2,
					  text: cartNum
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 轮播图 */
	.swiper {
		$swiper-width: 100%;
		$swiper-height: 400upx;
		$text-align: center;
		width: $swiper-width;
		height: $swiper-height;

		image {
			width: $swiper-width;
			height: $swiper-height;
		}
	}

	/* 导航栏 */
	.menu{
		width: 100%;
		padding-top: 20upx;
		margin-top: 20upx;
		height: 300upx;
		background-color: var(--accent-bg-color);
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
		.menuItem{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			height: 130upx;
			margin-bottom: 20upx;
			image{
				width: 80upx;
				height: 80upx;
			}
			.iconfont{
				font-size: 80upx;
				color: var(--primary-color);
				// color: transparent;
				// background: radial-gradient(circle, var(--assist-color) 0%, var(--primary-color) 100%);
				// background-clip: text;
			}
			text{
				font-size: 26upx;
				color: $text-color;
				margin-top: 10upx;
			}
		}
	}

	// 产品推荐
	.title-box{
		width: calc(100% - 40upx);
		height: 100upx;
		line-height: 100upx;
		margin:20upx 0;
		padding: 0 20upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: var(--accent-bg-color);
		border-bottom: 1upx solid var(--border-color);
		
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
		.iconfont{
			font-size: 60upx;
			color: var(--primary-color);
		}
	}

	// 商品
	.goods-item {
		width: 100%;
		margin-bottom:20upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		overflow: hidden;
		
		// 商品图片
		.goods-image {
			width: 100%;
		}
		
		// 标题
		.goods-title{
			padding: 20upx;
			height: 100%;
			// 标签
			.tag{
				padding: 4upx 16upx;
				margin-right: 10upx;
				border-radius: 6upx;
				font-size: 24upx;
				color: #FFFFFF;
				background: linear-gradient(to right, #fe3b0f, #fc603a);
			}
			// 标题
			.title{
				float: left;
				font-size: 26upx;
				line-height: 40upx;
				margin-right: 10upx;
			}
		}
		
		// 价格信息
		.price-box {
			width: calc(100% - 40upx);
			line-height: 60upx;
			padding: 0 20upx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			
			// 原价
			.price {
				display: flex;
				align-items: center;
				color: $price-color;
				font-size: 22upx;
				text-decoration: line-through;
				span{
					font-size: 28upx;
				}
			}
			
			// 当前价格
			.current-price {
				color: $price-color;
				span{
					font-size: 34upx;
					font-weight: 600;
				}
			}
		}
	}

	.loadingText {
		width: 100%;
		line-height: 80upx;
		text-align: center;
		color: #c0c0c0;
	}
</style>
