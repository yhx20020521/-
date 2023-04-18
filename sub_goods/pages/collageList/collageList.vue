<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="立即拼团" />
		<!-- 顶部时间 -->
		<!-- <sjuTime class="time-box" :timeList="timeList" @onChange="onChange"></sjuTime> -->
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" @click="navTo(`/goods/goodsDetail?id=${item.id}&goodsType=group`)"
			v-for="(item,index) in seckillList" :key="index">
				<view class="thumb">
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<view class="item">
					<view class="goods-name">
						{{item.name}}
					</view>
					<view class="price-data">
						<view class="price">
							<text>￥{{item.price}}</text>
							<text class="lineation ">￥{{item.current_price}}</text>
						</view>
						<view class="data">
							<view class="btn">
								<text>立即抢购</text>
							</view>
							<view class="schedule">
								<view class="bar">
									<text :style="`width: ${item.bar_width}`"></text>
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
	import sjuTime from '@/components/sju-time/sju-time.vue'
	import {timeList, seckillList} from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				timeList:[],
				seckillList:[]
			}
		},
		components: {
			uniNavBar,
			sjuTime
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			this.timeList = timeList
			this.seckillList = seckillList
		},
		methods: {
			// 时间选择
			// onChange(item) {
			// 	console.log(item)
			// },
			// 页面跳转
			navTo(page) {
				this.sjuNav.navigateTo(page)
			},
		}
	}
</script>

<style lang="scss" scoped>
	// 商品列表
	.goods-list{
		padding: 0 20upx;
		margin: calc(20upx + var(--statusBarHeight)) auto;
		.goods-item{
			height: auto;
			padding: 20upx;
			display: flex;
			align-items: center;
			border-radius: 20upx;
			margin-bottom: 20upx;
			background-color: #FFFFFF;
			.thumb{
				width: 180upx;
				height: 100%;
				display: flex;
				align-items: center;
				image{
					width: 160upx;
					border-radius: 10upx;
				}
			}
			.item{
				width: calc(100% - 180upx);
				.goods-name{
					width: 100%;
					font-size: 28upx;
					font-weight: 500;
					line-height: 42upx;
					min-width: 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.price-data{
					width: 100%;
					height: 140upx;
					display: flex;
					align-items: center;
					.price{
						width: 40%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						
						text{
							color: $price-color;
							font-size: 32upx;
							font-weight: bold;
						}
						.lineation{
							font-size: 24upx;
							color: $price-color;
							font-weight: normal;
							text-decoration: line-through;
						}
					}
					.data{
						width: 60%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-end;
						
						.btn{
							width: 160upx;
							height: 60upx;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 70upx;
							font-size: 26upx;
							color: #FFFFFF;
							background:var(--primary-color);
						}
						.schedule{
							width: 100%;
							height: 40upx;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							.bar{
								width: 160upx;
								height: 12upx;
								border: 2upx solid var(--assist-color);
								border-radius: 10upx;
								margin-left: 10upx;
								text{
									display: flex;
									height: 14upx;
									margin-left: -2upx;
									margin-top: -1upx;
									padding: 0;
									border-radius: 10upx;
									background-color: var(--assist-color);
									animation: bar 1s linear;
								}
								@keyframes bar{
									0%{
										width: 0;
									}
									100%{
										width: 50%;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
