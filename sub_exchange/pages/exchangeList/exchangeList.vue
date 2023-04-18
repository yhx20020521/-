<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="兑换列表" />
		<!-- 搜索 -->
		<view class="search">
			<view class="search-left">
				<i class="iconfont icon-search"></i>
				<input type="text" v-model="keyword" placeholder="请输入商品名称" />
				<i v-if="keyword != '' " @click="clearSearch" class="iconfont icon-cuo"></i>
			</view>
			<i class="iconfont search-right" @click="isMode = !isMode"
				:class="isMode ? 'icon-ListBox' : 'icon-shitu'"></i>
		</view>
		<!-- 筛选排序 -->
		<view class="sort-box">
			<view class="sort-item" @click="sortSelect(item.id)" v-for="(item,index) in sortList" :key="index">
				<view class="sort-title">
					{{item.name}}
				</view>
				<i v-if="item.id != sortId" class="iconfont icon-sort"></i>
				<i v-if="item.id == sortId" :class="[item.desc ? 'desc' : 'asc']" class="iconfont icon-sort"></i>
			</view>
		</view>
		<!-- 商品列表 -->
		<view v-if="!isEmpty" class="list-box">
			<!-- 瀑布流列表 -->
			<waterfall ref="waterfall">
				<template v-slot:left="{leftList}">
					<view v-if="isMode" class="goods-item" @click="navTo(`/exchange/scoreGoods?id=${item.id}`)"
						v-for="(item, index) in leftList" :key="index">
						<!-- 商品图片 -->
						<image class="goods-image" :src="item.img" lazy-load="true" mode="widthFix"></image>
						<view class="goods-title">
							<view class="title">
								<!-- <text class="tag" v-if="item.is_special === 1">特价</text> -->
								{{item.name}}
							</view>
						</view>
						<!-- 商品价格 -->
						<view class="price-box">
							<view class="price">
								￥<span>{{item.price}}</span>
							</view>
							<view class="current-price">
								<view v-if="+item.current_price >0" class="price-content">
									￥{{item.current_price}} 
									<span>+</span>
								</view>
								<view class="socre-box">
									<i class="iconfont icon-bonus"></i>
									<view class="score-text">
										{{ item.score }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view v-if="isMode" class="goods-item" @click="navTo(`/exchange/scoreGoods?id=${item.id}`)"
						v-for="(item, index) in rightList" :key="index">
						<!-- 商品图片 -->
						<image class="goods-image" :src="item.img" lazy-load="true" mode="widthFix"></image>
						<view class="goods-title">
							<view class="title">
								<!-- <text class="tag" v-if="item.is_special === 1">特价</text> -->
								{{item.name}}
							</view>
						</view>
						<!-- 商品价格 -->
						<view class="price-box">
							<view class="price">
								￥<span>{{item.price}}</span>
							</view>
							<view class="current-price">
								<view v-if="+item.current_price >0" class="price-content">
									￥{{item.current_price}}
									<span>+</span>
								</view>
								<view class="socre-box">
									<i class="iconfont icon-bonus"></i>
									<view class="score-text">
										{{ item.score }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
			</waterfall>
			<!-- 商品列表展示 -->
			<view v-if="!isMode" class="goods-list" @click="navTo(`/exchange/scoreGoods?id=${item.id}`)"
				v-for="(item,index) in scoreGoodsList" :key="index">
				<image class="goods-image" :src="item.img" mode="widthFix"></image>
				<view class="item-right">
					<!-- 商品标题 -->
					<view class="goods-title">
						<view class="title">
							<!-- <text class="tag" v-if="item.is_special === 1">特价</text> -->
							{{item.name}}
						</view>
					</view>
					<!-- 商品价格 -->
					<view class="price-box">
						<view class="price">
							￥<span>{{item.price}}</span>
						</view>
						<view class="current-price">
							<view v-if="+item.current_price >0" class="price-content">
								￥{{item.current_price}} 
								<span>+</span>
							</view>
							<view class="socre-box">
								<i class="iconfont icon-bonus"></i>
								<view class="score-text">
									{{ item.score }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { scoreGoodsList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				isEmpty:false,
				keyword: '',
				// 列表视图切换
				isMode: true,
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
				// 产品列表
				scoreGoodsList: [],
				loadingText: '上拉加载更多',
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
			
			this.scoreGoodsList = scoreGoodsList
			setTimeout(() => {
				this.$refs.waterfall.setData(this.scoreGoodsList)
			}, 1000)
		},
		onReachBottom() {
			if (this.scoreGoodsList.length < 200) {
				setTimeout(() => {
					this.scoreGoodsList = this.scoreGoodsList.concat(this.scoreGoodsList)
					this.$refs.waterfall.setData(this.scoreGoodsList)
				}, 2000)
			} else {
				this.loadingText = '已加载全部数据';
			}
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
	
		.search-left {
			width: 80%;
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
	
		.search-right {
			font-size: 50upx;
			margin: 0 20upx;
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
		justify-content: space-around;
		background-color: #ffffff;
	
		.sort-item {
			display: flex;
			align-items: center;
			
			.sort-title {
				height: 100upx;
				line-height: 100upx;
			}
			
			.iconfont {
				font-size: 40upx;
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
	
	// 商品
	.list-box {
		width: 100%;
		margin-top: calc(220upx + var(--statusBarHeight));
	
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
				// .tag {
				// 	padding: 4upx 16upx;
				// 	margin-right: 10upx;
				// 	border-radius: 6upx;
				// 	font-size: 24upx;
				// 	color: #FFFFFF;
				// 	background: linear-gradient(to right, #fe3b0f, #fc603a);
				// }
	
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
				padding: 20upx;
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
					font-size: 30upx;
					font-weight: 600;
					color: $price-color;
					display: flex;
					align-items: center;
					flex-direction: row;
					// 积分
					.socre-box {
						margin-left: 6upx;
						display: flex;
						align-items: center;
						flex-direction: row;
					
						.iconfont {
							font-size: 40upx;
							margin-right: 6upx;
							font-weight: 600;
							color: $price-color;
						}
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
					// .tag {
					// 	padding: 4upx 16upx;
					// 	margin-right: 10upx;
					// 	border-radius: 6upx;
					// 	font-size: 24upx;
					// 	color: #FFFFFF;
					// 	background: linear-gradient(to right, #fe3b0f, #fc603a);
					// }
	
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
						font-size: 30upx;
						font-weight: 600;
						color: $price-color;
						display: flex;
						align-items: center;
						flex-direction: row;
						// 积分
						.socre-box {
							margin-left: 6upx;
							display: flex;
							align-items: center;
							flex-direction: row;
						
							.iconfont {
								font-size: 40upx;
								margin-right: 6upx;
								font-weight: 600;
								color: $price-color;
							}
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
</style>
