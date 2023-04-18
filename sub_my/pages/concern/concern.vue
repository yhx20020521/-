<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="关注店铺" />
		
		<!-- 收藏列表 -->
		<view class="list-box" v-if="!isEmpty">
			<uni-swipe-action>
				<view class="list-item" v-for="(item,id) in concernList" :key="id">
					<uni-swipe-action-item :right-options="swipe_options" @click="bindClick" @change="swipeChange($event, index)">
						<view @click="navTo(`/store/storeDetail?code=${item.code}`)" class="item-box">
							<!-- 商铺图片 -->
							<image class="shop-image" :src="item.image" mode="widthFix"></image>
							<view class="shop-info">
								<view class="shop-name">
									<view v-if="item.proprietary" class="tag">自营</view>
									<view v-if="item.flagship" class="tag">旗舰店</view>
									<view class="name">
										{{item.name}}
									</view>
								</view>
								<view class="concern-count">
									{{item.concern}}人关注
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
	import { concernList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				isEmpty:false,
				concernList:[],
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
			this.concernList = concernList
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
			// 店铺图片
			.shop-image{
				width: 100upx;
				margin-right: 20upx;
				border-radius: 10rpx;
			}
			
			// 商铺信息
			.shop-info{
				width: calc(100% - 120upx);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.shop-name{
					width: 100%;
					display: flex;
					flex-direction: row;
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
				.concern-count{
					color: #CCCCCC;
				}
			}
		}
	}
}

</style>
