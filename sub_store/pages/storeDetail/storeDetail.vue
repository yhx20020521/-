<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="商铺详情" />
		<!-- 店铺详情 -->
		<view class="store-info">
			<view class="info-left">
				<image class="store-image" :src="storeInfo.image" mode="aspectFit"></image>
				<view class="info-box">
					<view class="store-name">
						<view v-if="storeInfo.proprietary" class="tag">自营</view>
						<view v-if="storeInfo.flagship" class="tag">旗舰店</view>
						<view class="name">
							{{storeInfo.storeName}}
						</view>
						<!-- {{storeInfo.storeName}} -->
					</view>
					<view>
						<uni-rate :size="14" :readonly="true" :value="storeInfo.storeScore" />
					</view>
				</view>
			</view>
			<view :class="storeInfo.isConcern ? 'concern-btn followed-btn' : 'concern-btn'">
				{{ storeInfo.isConcern ? '已关注' : '关注'}}
			</view>
		</view>
		<!-- 筛选排序 -->
		<view class="sort-box">
			<view class="sort-left">
				<view class="sort-item" @click="sortSelect(item.id)" v-for="(item,index) in sortList" :key="index">
					<view class="sort-title">
						{{item.name}}
					</view>
					<i v-if="item.id != sortId" class="iconfont icon-sort"></i>
					<i v-if="item.id == sortId" :class="[item.desc ? 'desc' : 'asc']" class="iconfont icon-sort"></i>
				</view>
			</view>
			<view class="sort-right">
				<view class="sort-item" @click="showDrawer">
					<view class="sort-title">
						筛选
					</view>
					<i class="iconfont icon-filter"></i>
				</view>
			</view>
		</view>
		
		<!-- 商品列表 -->
		<view v-if="!isEmpty" class="list-box">
			<!-- 瀑布流列表 -->
			<waterfall ref="waterfall">
				<template v-slot:left="{leftList}">
					<view v-if="isMode" class="goods-item" @click="navTo(`/goods/goodsDetail?id=${item.id}`)"
						v-for="(item, index) in leftList" :key="index">
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
					<view v-if="isMode" class="goods-item" @click="navTo(`/goods/goodsDetail?id=${item.id}`)"
						v-for="(item, index) in rightList" :key="index">
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
			<!-- 商品列表展示 -->
			<view v-if="!isMode" class="goods-list" @click="navTo(`/goods/goodsDetail?id=${item.id}`)"
				v-for="(item,index) in goodsList" :key="index">
				<image class="goods-image" :src="item.img" mode="widthFix"></image>
				<view class="item-right">
					<!-- 商品标题 -->
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
			</view>
		</view>
		
		<!-- 抽屉 -->
		<uni-drawer ref="showRight" mode="right" 
			:width="drawerWidth" @close="closeDrawer()">
			<view class="drawer-box">
				<scroll-view class="drawer-scroll" scroll-y :style="{height:drawerHeight+'px'}">
					<view class="drawer-title">
						<text class="title-box">价格区间</text>
						<view class="price-range">
							<text>请输入价格区间</text>
						</view>
					</view>
					<view class="drawer-content">
						<input placeholder-class="drawer-phcolor" v-model="minPrice" class="drawer-input" placeholder="最低价" maxlength="11" type='number' />
						<text> — </text>
						<input placeholder-class="drawer-phcolor" v-model="maxPrice"  class="drawer-input" placeholder="最高价" maxlength="11" type='number' />
					</view>
					<view class="drawer-title">
						<text class="title-box">全部分类</text>
					</view>
					<view class="drawer-content flex-attr">
						<view class="content-item" 
							:class="[item.isActive ? 'item-active' : 'item-normal']" 
							v-for="(item, index) in typeList" :key="item.id" 
							@click.stop="cateBtnSelected(index)">
							<view class="item-ellipsis">{{ item.title }}</view>
						</view>
					</view>
					<view class="drawer-title">
						<text class="title-box">全部分类</text>
					</view>
					<view class="drawer-content flex-attr">
						<view class="content-item" 
							:class="[item.isActive ? 'item-active' : 'item-normal']" 
							v-for="(item, index) in typeList" :key="item.id" 
							@click.stop="cateBtnSelected(index)">
							<view class="item-ellipsis">{{ item.title }}</view>
						</view>
					</view>
					<view class="drawer-title">
						<text class="title-box">全部分类</text>
					</view>
					<view class="drawer-content flex-attr">
						<view class="content-item" 
							:class="[item.isActive ? 'item-active' : 'item-normal']" 
							v-for="(item, index) in typeList" :key="item.id" 
							@click.stop="cateBtnSelected(index)">
							<view class="item-ellipsis">{{ item.title }}</view>
						</view>
					</view>
					<view class="drawer-title">
						<text class="title-box">全部分类</text>
					</view>
					<view class="drawer-content flex-attr">
						<view class="content-item" 
							:class="[item.isActive ? 'item-active' : 'item-normal']" 
							v-for="(item, index) in typeList" :key="item.id" 
							@click.stop="cateBtnSelected(index)">
							<view class="item-ellipsis">{{ item.title }}</view>
						</view>
					</view>
					<view class="drawer-title">
						<text class="title-box">全部分类</text>
					</view>
					<view class="drawer-content flex-attr">
						<view class="content-item" 
							:class="[item.isActive ? 'item-active' : 'item-normal']" 
							v-for="(item, index) in typeList" :key="item.id" 
							@click.stop="cateBtnSelected(index)">
							<view class="item-ellipsis">{{ item.title }}</view>
						</view>
					</view>
					<view class="drawer-title">
						<text class="title-box">全部分类</text>
					</view>
					<view class="drawer-content flex-attr">
						<view class="content-item" 
							:class="[item.isActive ? 'item-active' : 'item-normal']" 
							v-for="(item, index) in typeList" :key="item.id" 
							@click.stop="cateBtnSelected(index)">
							<view class="item-ellipsis">{{ item.title }}</view>
						</view>
					</view>
					<view class="content-bottom"></view>
				</scroll-view>
				<view class="drawer-bottom">
					<view class="reset-btn">重置</view>
					<view class="sure-btn">确定</view>
				</view>
			</view>
		</uni-drawer>
		
		<!-- 加载更多 -->
		<view class="loadingText">{{loadingText}}</view>
		
		<sju-empty iconColor="var(--primary-color)" v-if="isEmpty"></sju-empty>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { storeInfo, goodsList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				isEmpty:false,
				// 列表视图切换
				isMode: true,
				storeCode:'',
				storeInfo:{},
				// 排序
				sortId: -1,
				sortList: [{
						id: 0,
						name: '综合',
						desc: false
					},
					{
						id: 1,
						name: '价格',
						desc: false
					},
					{
						id: 2,
						name: '销量',
						desc: false
					}
				],
				drawer: false,
				drawerWidth:uni.upx2px(650),
				drawerHeight: 0, //抽屉内部scrollview高度
				minPrice: '',
				maxPrice: '',
				// 分类
				typeList:[
					{
						id:0,
						title:'分类',
						isActive:false
					},
					{
						id:1,
						title:'分类1',
						isActive:false
					},
					{
						id:2,
						title:'分类2',
						isActive:false
					},
					{
						id:3,
						title:'分类3',
						isActive:false
					},
					{
						id:4,
						title:'分类4',
						isActive:false
					},
					{
						id:5,
						title:'分类5',
						isActive:false
					}
				],
				// 产品列表
				goodsList: [],
				loadingText: '上拉加载更多',
			}
		},
		components: {
			uniNavBar,
			uniDrawer,
			Empty
		},
		onLoad(options) {
			this.storeCode = options.code
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			this.storeInfo = storeInfo
			
			uni.getSystemInfo({
				success: (res) => {
					let height = res.statusBarHeight + uni.upx2px(88) + uni.upx2px(20)
					this.drawerHeight = res.windowHeight  - height
				}
			})
			this.goodsList = goodsList
			setTimeout(() => {
				this.$refs.waterfall.setData(this.goodsList)
			}, 1000)
		},
		onReachBottom() {
			if (this.goodsList.length < 200) {
				setTimeout(() => {
					this.goodsList = this.goodsList.concat(this.goodsList)
					this.$refs.waterfall.setData(this.goodsList)
				}, 2000)
			} else {
				this.loadingText = '已加载全部数据';
			}
		},
		methods: {
			// 页面跳转
			navTo(page) {
				this.sjuNav.navigateTo(page)
			},
			// 条件筛选排序
			sortSelect(id) {
				if (this.sortId == id) {
					this.sortList[this.sortId].desc = !this.sortList[this.sortId].desc
				} else {
					this.sortId = id
				}
			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			cateBtnSelected(index) {
				// this.currentCateStr = '';
				this.$set(this.typeList[index], "isActive", !this.typeList[index].isActive)
				// const productCateArr = [];
				// this.productCateList.forEach(item => {
				//   if (item.isActive) {
				//     productCateArr.push(item.title);
				//   }
				// });
				// this.currentCateStr = productCateArr.join(',');
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		// height: 100%;
	}
	// 店铺信息
	.store-info{
		width: calc(100% - 40upx);
		padding: 20upx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		background-color: #FFFFFF;
		
		.info-left{
			width: calc(100% - 140upx);
			display: flex;
			align-items: center;
			flex-direction: row;
			
			// 店铺图标
			.store-image{
				width: 100upx;
				height: 100upx;
				margin-right: 20upx;
				border-radius: 50upx;
				background-color: #F5F5F5;
			}
			
			// 名称、等级
			.info-box{
				width: calc(100% - 120upx);
				display: flex;
				flex-direction: column;
				.store-name{
					width: 100%;
					display: flex;
					flex-direction: row;
					font-size: 32upx;
					margin-bottom: 10upx;
					// word-break: break-all;
					// overflow: hidden;
					// text-overflow: ellipsis;
					// display: -webkit-box;
					// -webkit-box-orient: vertical;
					// -webkit-line-clamp: 1;
					.tag{
						width: 80upx;
						height: 40upx;
						line-height: 40upx;
						text-align: center;
						margin-right: 10upx;
						border-radius: 6upx;
						color: #FFFFFF;
						background-color: var(--primary-color);
					}
					.name{
						font-size: 32upx;
					}
				}
			}
		}
		
		// 关注
		.concern-btn{
			width: 120upx;
			height: 60upx;
			color: #FFFFFF;
			margin-left: 20upx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 30upx;
			background-color: var(--primary-color);
		}
		
		// 已关注
		.followed-btn{
			color: #999999;
			background-color: #F5F5F5;
		}
	}
	
	// 排序、筛选
	.sort-box {
		z-index: 100;
		width: calc(100% - 40upx);
		height: 100upx;
		padding: 0 20upx;
		position: sticky;
		left: 0;
		top: calc(84upx + var(--statusBarHeight));
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
	
		.sort-left {
			width: 75%;
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.sort-item {
				display: flex;
				align-items: center;
	
				.sort-title {
					height: 100upx;
					line-height: 100upx;
				}
	
				.iconfont {
					font-size: 40upx;
					// color: transparent;
					// background: linear-gradient(to bottom,var(--primary-color) 0%, var(--primary-color) 50%, #C0C0C0 51%, #C0C0C0 100%);
					// background-clip: text;
					color: #DDDDDD;
				}
	
				.desc {
					color: transparent;
					background: linear-gradient(to bottom, var(--primary-color) 0%, var(--primary-color) 50%, #DDDDDD 51%, #DDDDDD 100%);
					background-clip: text;
				}
	
				.asc {
					color: transparent;
					background: linear-gradient(to bottom, #DDDDDD 0%, #DDDDDD 50%, var(--primary-color) 51%, var(--primary-color) 100%);
					background-clip: text;
				}
			}
	
		}
	
		// 筛选
		.sort-right {
			width: 25%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
	
			.sort-item {
				display: flex;
				align-items: center;
	
				.sort-title {
					height: 100upx;
					line-height: 100upx;
				}
	
				.iconfont {
					color: #DDDDDD;
					font-size: 40upx;
					// color: var(--primary-color);
				}
			}
		}
	}
	
	// 商品
	.list-box {
		width: 100%;
		margin-top: calc(20upx + var(--statusBarHeight));
	
		// 商品瀑布流展示
		.goods-item {
			width: 100%;
			margin-bottom: 20upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
			overflow: hidden;
	
			// 商品图片
			.goods-image {
				width: 100%;
			}
	
			// 标题
			.goods-title {
				padding: 20upx;
				height: 100%;
	
				// 标签
				.tag {
					padding: 4upx 16upx;
					margin-right: 10upx;
					border-radius: 6upx;
					font-size: 24upx;
					color: #FFFFFF;
					background: linear-gradient(to right, #fe3b0f, #fc603a);
				}
	
				// 标题
				.title {
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
	
					span {
						font-size: 28upx;
					}
				}
	
				// 当前价格
				.current-price {
					color: $price-color;
	
					span {
						font-size: 34upx;
						font-weight: 600;
					}
				}
			}
		}
	
		// 商品列表展示
		.goods-list {
			width: calc(100% - 40upx);
			padding: 20upx;
			display: flex;
			align-items: center;
			background-color: #ffffff;
			border-bottom: 1upx solid #EEEEEE;
	
			// 商品图片
			.goods-image {
				width: 200upx;
				border-radius: 10upx;
			}
	
			// 右侧内容
			.item-right {
				width: calc(100% - 220upx); //70%;
				height: 100%;
				margin-left: 20upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
	
				// 标题
				.goods-title {
					height: 100%;
	
					// 标签
					.tag {
						padding: 4upx 16upx;
						margin-right: 10upx;
						border-radius: 6upx;
						font-size: 24upx;
						color: #FFFFFF;
						background: linear-gradient(to right, #fe3b0f, #fc603a);
					}
	
					// 标题
					.title {
						float: left;
						font-size: 26upx;
						line-height: 40upx;
					}
				}
	
				// 价格信息
				.price-box {
					width: calc(100% - 40upx);
					line-height: 40upx;
					margin-top: 20upx;
	
					// 原价
					.price {
						display: flex;
						align-items: center;
						color: $price-color;
						font-size: 22upx;
						text-decoration: line-through;
	
						span {
							font-size: 28upx;
						}
					}
	
					// 当前价格
					.current-price {
						color: $price-color;
	
						span {
							font-size: 34upx;
							font-weight: 600;
						}
					}
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
	
	/*顶部下拉选择 综合*/
	.drawer-box{
		width: 650upx;
		font-size: 24upx;
		overflow: hidden;
		position: relative;
		padding-bottom: 100upx;
		
		// 滚动视图
		.drawer-scroll{
			width: 100%;
			padding-top: calc(88upx + var(--statusBarHeight));
			// 抽屉标题
			.drawer-title {
				height: 80upx;
				padding: 0 30upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.title-box {
					font-size: 26upx;
					font-weight: bold;
					flex-shrink: 0;
				}
				.price-range {
					width: 70%;
					color: var(--primary-color);
					text-align: right;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			
		}
		
		// 抽屉内容
		.drawer-content {
			padding: 20upx 30upx 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.drawer-phcolor {
				text-align: center;
				color: #C0C0C0;
				font-size: 24upx;
			}
			.drawer-input {
				border: 0;
				width: 45%;
				height: 60upx;
				color: #333;
				text-align: center;
				border-radius: 32upx;
				background: #E5E5E5;
			}
			
			.content-item {
				width: 30%;
				height: 60upx;
				margin: 0 1% 20upx;
				padding: 0 2upx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 30upx;
				.item-ellipsis {
					width: 96%;
					text-align: center;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
			
			.content-item:nth-of-type(3n) {
				margin-right: 0%;
			}
			
			.item-active {
				border-radius: 32upx;
				font-weight: bold;
				color: #FFFFFF;
				background-color: var(--primary-color);
			}
			.item-normal {
				border: 1upx solid rgba(0, 0, 0, 0.12);
			}
		}
		
		.flex-attr {
			flex-wrap: wrap;
			justify-content: flex-start;
		}
		
		.content-bottom {
			width: 100%;
			height: 140upx;
		}
		
		// 抽屉底部
		.drawer-bottom {
			z-index: 10;
			width: calc(100% - 60upx);
			height: 140upx;
			padding: 0 30upx;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #FFFFFF;
			// 重置
			.reset-btn{
				width: 47%;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 30upx;
				color: var(--primary-color);
				border: 1upx solid var(--primary-color);
			}
			// 确定
			.sure-btn{
				width: 47%;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 30upx;
				color: #FFFFFF;
				background-color: var(--primary-color);
			}
		}
	}
</style>
