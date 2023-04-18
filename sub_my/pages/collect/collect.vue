<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="商品收藏" />
		
		<!-- 收藏列表 -->
		<view class="list-box" v-if="!isEmpty">
			<uni-swipe-action>
				<view class="list-item" v-for="(item,id) in collectList" :key="id">
					<uni-swipe-action-item :right-options="swipe_options" @click="bindClick" @change="swipeChange($event, index)">
						<view class="item-box">
							<!-- 商品图片 -->
							<image class="goods-image" :src="item.image" mode="widthFix"></image>
							<!-- 商品信息 -->
							<view class="goods-info">
								<view class="name-info">
									<!-- 商品名称 -->
									<view class="goods-name">
										{{item.name}}
									</view>
									<!-- 商品规格 -->
									<view class="goods-specs">
										{{item.specsName}}
									</view>
									<!-- 商品规格 -->
									<view class="goods-price">
										￥{{item.current_price}}
									</view>
								</view>
								<view class="btns">
									<view @click="navTo(`/store/storeDetail?code=${item.code}`)" class="shop-btn">去店铺</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
		
		<!-- 暂无数据 -->
		<sju-empty iconColor="var(--primary-color)" v-if="isEmpty"></sju-empty>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { collectList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				isEmpty:false,
				collectList:[],
				swipe_options:[
				    {
				        text: '取消',
				        style: {
				            backgroundColor: 'var(--primary-color)'
				        }
				    },
					{
				        text: '删除',
				        style: {
				            backgroundColor: '#E64340'
				        }
				    }
				]
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
			this.collectList = collectList
		},
		methods: {
			// 页面跳转
			navTo(page) {
				this.sjuNav.navigateTo(page)
			},
			bindClick(e){
				console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			},
			swipeChange(e,index){
				console.log('当前状态：'+ e +'，下标：' + index)
			}
		}
	}
</script>

<style lang="scss">
// 收藏列表
.list-box{
	width: 100%;
	margin-top: 20upx;
	
	.list-item{
		width: calc(100% - 40upx);
		border-radius: 10upx;
		background-color: #fff;
		margin:0 20upx 20upx;
		
		.item-box{
			width: calc(100% - 40upx);
			padding: 20upx;
			display: flex;
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
				flex-direction: column;
				justify-content: space-between;
				.name-info{
					// 名称信息
					.goods-name{
						font-size: 28upx;
						color: #000000;
					}
					// 商品规格
					.goods-specs{
						font-size: 26upx;
						color: #CCCCCC;
					}
					// 商品价格
					.goods-price{
						font-size: 34upx;
						color: var(--primary-color);
					}
				}
				// 底部按钮
				.btns{
					width: 100%;
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.shop-btn{
						min-width: 120upx;
						height: 60upx;
						line-height: 60upx;
						text-align: center;
						padding: 0 20upx;
						font-size: 28upx;
						border-radius: 60upx;
						color: var(--primary-color);
						border: 1upx solid  var(--primary-color);
					}
				}
			}
		}
	}
}

</style>
