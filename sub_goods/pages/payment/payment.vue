<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="支付" />
		<view class="pay-title">
			支付金额
		</view>
		<view class="pay-money">
			￥<span>1200.00</span>
		</view>
		<!-- 支付类型 -->
		<view class="pay-type">
			<view class="type-item" v-for="(item,index) in payList" :key="index">
				<view class="item-left">
					<i class="iconfont" :class="item.icon"></i>
					<view class="item-type">
						<view class="type-title">{{item.name}}</view>
						<view class="type-tip">
							{{item.tip}}
							<span v-if="item.name == '余额支付'" class="balance">
								￥1200
							</span>
						</view>
					</view>
				</view>
				<view class="item-right">
					<radio color="var(--primary-color)"
					 @click="selectType(item.id)"
					 :checked="item.checked" >
					</radio>
				</view>
			</view>
			
		</view>
		
		<!-- 确认支付 -->
		<view class="pay-btn">
			确认支付
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				Theme:'',
				payList:[
					{
						id: 0,
						icon: 'icon-weixinzhifu',
						name: '微信支付',
						tip: '推荐使用微信支付',
						checked:true
					},
					{
						id: 1,
						icon: 'icon-zhifubaozhifu',
						name: '支付宝支付',
						tip: '',
						checked:false
					},
					{
						id: 2,
						icon: 'icon-available',
						name: '余额支付',
						tip: '可用余额',
						checked:false
					}
				]
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
		},
		methods: {
			// 选择支付类型
			selectType(id) {
				this.payList.map(item => {
					if(item.id == id) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #FFFFFF;
	}
	// 支付标题
	.pay-title{
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin: 40upx 0 0;
		color: #C0C0C0;
		font-size: 32upx;
	}
	// 支付金额
	.pay-money{
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		color: $price-color;
		span{
			font-size: 44upx;
		}
	}
	
	// 支付类型
	.pay-type{
		width: 100%;
		margin: 40upx 0;
		.type-item{
			width: calc( 100% - 40upx);
			margin: 0 auto;
			padding: 10upx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid #E5E5E5;
			
			.item-left{
				height: 80upx;
				display: flex;
				align-items: center;
				.iconfont{
					font-size: 50upx;
					color: var(--primary-color);
				}
				.item-type{
					width: 100%;
					margin-left: 20upx;
					.type-title{
						font-size: 32upx;
					}
					.type-tip{
						margin-top: 10upx;
						color: #999999;
						.balance{
							color: $price-color;
						}
					}
				}
			}
			
			.item-right{
				width: 60upx;
				height: 80upx;
				display: flex;
				align-items: center;
				flex-shrink: 0;
				radio {
					transform:scale(0.7);
				}
			}
		}
	}
	
	// 确认支付
	.pay-btn{
		width: calc( 100% - 40upx);
		height: 80upx;
		line-height: 80upx;
		margin: 0 auto;
		text-align: center;
		border-radius: 10upx;
		color: #FFFFFF;
		background-color: var(--primary-color);
	}
</style>
