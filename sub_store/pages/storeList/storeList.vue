<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="商铺列表" />
		<!-- 搜索 -->
		<view class="search">
			<view class="search-box">
				<i class="iconfont icon-search"></i>
				<input type="text" v-model="keyword" placeholder="请输入商铺名称" />
				<i v-if="keyword != '' " @click="clearSearch" class="iconfont icon-cuo"></i>
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
		
		<!-- 店铺列表 -->
		<view v-if="!isEmpty" class="list-box">
			<view class="store-item" v-for="(item, index) in storeList" :key="index">
				<!-- 店铺信息 -->
				<view class="store-info">
					<view class="info-left">
						<image class="store-image" :src="item.image" mode="aspectFit"></image>
						<view class="info-box">
							<view class="store-name">
								{{item.storeName}}
							</view>
							<view>
								<uni-rate :size="14" :readonly="true" :value="item.storeScore" />
							</view>
						</view>
					</view>
					<view @click="navTo(`/store/storeDetail?code=${item.storeCode}`)" class="info-right">
						进店
					</view>
				</view>
				<!-- 商品列表 -->
				<view class="goods-list">
					<scroll-view scroll-x="true">
						<view class="item-box">
							<view class="goods-item" @click="navTo(`/goods/goodsDetail?id=${item.id}`)"
							 v-for="(items, indexs) in item.goodsList" :key="indexs">
								<image class="goods-image" :src="items.image" mode="aspectFill"></image>
								<view class="goods-price">
									￥{{items.current_price}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
		<!-- 抽屉 -->
		<uni-drawer ref="showRight" mode="right" 
			:width="drawerWidth" @close="closeDrawer()">
			<view class="drawer-box">
				<scroll-view class="drawer-scroll" scroll-y :style="{height:drawerHeight+'px'}">
					<view class="drawer-title">
						<text class="title-box">商铺类型</text>
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
						<text class="title-box">好评率</text>
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
						<text class="title-box">信用等级</text>
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
		
		<!-- 暂无数据 -->
		<sju-empty iconColor="var(--primary-color)" v-if="isEmpty"></sju-empty>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { storeList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				isEmpty:false,
				keyword:'',
				// 排序
				sortId: -1,
				sortList: [{
						id: 0,
						name: '综合',
						desc: false
					},
					{
						id: 1,
						name: '销量',
						desc: false
					},
					{
						id: 2,
						name: '信用',
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
				
				storeList:[]
			}
		},
		components: {
			uniNavBar,
			uniDrawer,
			Empty
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
			uni.getSystemInfo({
				success: (res) => {
					let height = res.statusBarHeight + uni.upx2px(88) + uni.upx2px(20)
					this.drawerHeight = res.windowHeight  - height
				}
			})
			
			this.storeList = storeList
		},
		methods: {
			// 清空搜索内容
			clearSearch(){
				this.keyword = ''
			},
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
	/* 搜索 */
	.search {
		z-index: 10;
		width: 100%;
		height: 100upx;
		position: fixed;
		left: 0;
		top: calc(86upx + var(--statusBarHeight));
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
	
		.iconfont {
			color: #CCCCCC;
		}
	
		.search-box {
			width: calc(100% - 80upx);
			height: 60upx;
			margin-left: 20upx;
			display: flex;
			align-items: center;
			background-color: #f6f6f6;
			border-radius: 30upx;
			padding: 0 20upx;
	
			input {
				width: 90%;
				height: 100%;
				font-size: 26upx;
				margin-left: 10upx;
			}
			
			.icon-cuo{
				flex-shrink: 0;
				margin-left: 10upx;
			}
		}
	}
	
	// 排序、筛选
	.sort-box {
		z-index: 10;
		width: calc(100% - 40upx);
		height: 100upx;
		padding: 0 20upx;
		position: fixed;
		left: 0;
		top: calc(186upx + var(--statusBarHeight));
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
	
	// 店铺列表
	.list-box{
		width: 100%;
		margin-top: calc(220upx + var(--statusBarHeight));
		
		.store-item{
			width: calc(100% - 80upx);
			padding: 20upx;
			margin: 20upx;
			border-radius: 20upx;
			background-color: #FFFFFF;
			
			// 店铺信息
			.store-info{
				width: 100%;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				
				.info-left{
					width: calc(100% - 120upx);
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
							font-size: 32upx;
							margin-bottom: 10upx;
							word-break: break-all;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}
					}
				}
				.info-right{
					width: 120upx;
					height: 60upx;
					line-height: 60upx;
					margin-left: 20upx;
					flex-shrink: 0;
					text-align: center;
					color: #FFFFFF;
					border-radius: 30upx;
					background-color: var(--primary-color);
				}
			}
			
			// 商品列表
			.goods-list{
				width: 100%;
				margin-top: 20upx;
				
				.item-box{
					width: 100%;
					display: flex;
					flex-direction: row;
					
					.goods-item{
						width: 210upx;
						height: 210upx;
						margin-right: 20upx;
						flex-shrink: 0;
						position: relative;
						background-color: #007AFF;
						
						.goods-image{
							width: 210upx;
							height: 210upx;
							margin: 0;
							padding: 0;
						}
						
						// 商品价格
						.goods-price{
							max-width: 150upx;
							height: 50upx;
							line-height: 50upx;
							text-align: center;
							padding: 0 20upx;
							color: #FFFFFF;
							border-radius: 25upx;
							position: absolute;
							left: 10upx;
							bottom: 10upx;
							background-color: rgba(0,0,0,.5);
							word-break: break-all;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}
					}
				}
			}
		}
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
