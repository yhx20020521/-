<template>
	<view class="service-box" v-show="isShow" @click="hide">
		<view class="service-content">
			<view class="coupon-list">
				<view class="coupon-item" 
				  v-for="(item,index) in couponList" :key="index">
					<!-- 左侧内容 -->
					<view class="item-left">
						<view class="value">
							{{item.value}}
						</view>
						<view class="constraints">
							{{item.describe}}
						</view>
					</view>
					<!-- 优惠券信息 -->
					<view class="coupon-info">
						<view class="coupon-title">
							<view class="type">
								{{item.typeName}}
							</view>
							<view class="title">
								{{item.title}}
							</view>
						</view>
						<!-- 时间 -->
						<view class="date-range">
							<view class="date">
								{{item.date}}
							</view>
							<view v-if="amount >= item.limitAmount && !item.isReceive" class="use-btn" 
							@click="couponReceive(item)">
								{{ mode=='get' ? '立即领取' : '立即使用' }}
							</view>
						</view>
					</view>
					<view v-if="amount < item.limitAmount || item.isReceive" class="coupon-status" >
						<view>
							{{ mode=='get' ? '已领取' : '不可使用' }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * sju-coupon 优惠券弹窗
	 * @description 优惠券数据弹窗展示
	 * @property {Array} couponList 优惠券列表
	 * @property {String} mode 优惠券模式 get:领取 use:使用
	 * @property {Number} limitType 优惠券使用限制类型 -1:自营商品 -2:自营商品运费优惠券 1,2,3:限制品类优惠券  '':通用优惠券 
	 * @property {Number} amount 订单金额,判断订单金额是否满足优惠券消费限制
	 * @event {Function} show 弹窗展示
	 * @event {Function} hide 弹窗隐藏
	 * @event {Function} receive 领取优惠券
	 */
	export default {
		name:'sju-coupon',
		emits: ['show', 'hide', 'receive'],
		props: {
			couponList: {
				type: Array,
				default: ()=>[]
			},
			mode:{
				type:String,
				default: 'get'
			},
			limitType:{
				type:String,
				default:''
			},
			amount:{
				type:Number,
				default: 0
			}
		},
		data() {
			return {
				isShow: false
			}
		},
		methods:{
			show(){
				this.isShow = true
				this.$emit('show')
			},
			hide(){
				this.isShow = false
				this.$emit('hide')
			},
			// 领取优惠券
			couponReceive(data){
				this.$emit('receive',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-box {
		z-index: 1000;
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		overflow-x: hidden;
		overflow-y: auto;
		background: rgba(0,0,0,.5);
		
		// 服务内容
		.service-content{
			width: calc(100% - 80upx);
			max-height: 70%;
			padding: 40upx;
			position: fixed;
			left: 0;
			bottom: 0;
			overflow-x: hidden;
			overflow-y: auto;
			background-color: #FFFFFF;
			border-radius: 20upx 20upx 0 0;
			transition: all .3s ease-in-out;
			/* 优惠券列表 */
			.coupon-list {
				margin: 20upx auto 0;
				// 优惠券数据
				.coupon-item {
					position: relative;
					width: 100%;
					height: 200upx;
					border-radius: 10upx;
					margin-bottom: 20upx;
					box-shadow: 0 0 10upx #EEEEEE;
					display: flex;
					align-items: center;
					.item-left {
						width: 35%;
						height: 100%;
						position: relative;
						display: flex;
						align-items: center;
						flex-direction: column;
						justify-content: center;
						background-color: var(--primary-color);
						border-style: none dotted none none;
						border-color: #FFFFFF;
						border-top-left-radius: 10upx;
						border-bottom-left-radius: 10upx;
						// 优惠券价值
						.value {
							display: flex;
							justify-content: center;
							align-items: flex-end;
							width: 100%;
							font-size: 48upx;
							color: #ffffff;
							font-weight: bold;
						}
						// 使用限制
						.constraints {
							width: 100%;
							height: 60upx;
							font-size: 24upx;
							color: #ffffff;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.item-left:after {
						width: 40upx;
						height: 20upx;
						position: absolute;
						left: calc(100% - 16upx);
						top: -1px;
						border-radius: 0 0 40upx 40upx;
						content: "";
						display: block;
						background: #F7F7F7;
						border-top: 0px;
					}
					
					.item-left:before {
						width: 40upx;
						height: 20upx;
						position: absolute;
						left: calc(100% - 16upx);
						bottom: -1px;
						border-radius: 40upx 40upx 0 0;
						content: "";
						display: block;
						background: #F7F7F7;
						border-bottom: 0px;
					}
					// 优惠券信息
					.coupon-info {
						width: 65%;
						height: 100%;
						padding: 0 1%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						background-color: #FFFFFF;
						border-top-right-radius: 10upx;
						border-bottom-right-radius: 10upx;
						// 优惠券标题
						.coupon-title {
							width: 100%;
							height: 60upx;
							display: flex;
							flex-direction: row;
							align-items: center;
							// 优惠券类型
							.type {
								height: 40upx;
								line-height: 40upx;
								text-align: center;
								font-size: 24upx;
								border-radius: 40upx;
								margin-right: 10upx;
								padding: 4upx 16upx;
								color: #ffffff;
								background-color: var(--primary-color);
							}
							// 标题
							.title {
								font-size: 24upx;
							}
						}
						// 时间范围
						.date-range {
							width: 100%;
							margin-top: 10upx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							// 时间
							.date {
								font-size: 24upx;
								display: flex;
								align-items: center;
							}
							// 使用按钮
							.use-btn{
								width: 120upx;
								height: 50upx;
								line-height: 50upx;
								text-align: center;
								font-size: 24upx;
								border-radius: 50upx;
								color: #ffffff;
								background-color: var(--primary-color);
								border: 1px solid var(--primary-color);
							}
						}
					}
					
					// 优惠券状态
					.coupon-status {
						z-index: 10;
						width: 110upx;
						height: 110upx;
						line-height: 110upx;
						text-align: center;
						position: absolute;
						right: 10upx;
						bottom: 10upx;
						border: 1upx solid #CCCCCC;
						border-radius: 100%;
						view {
							display: inline-block;
							color: #c0c0c0;
							font-size: 24upx;
							transform: rotate(45deg);
						}
					}
				}
				// 优惠券失效
				.coupon-lapse{
					.item-left{
						background-color: #CCCCCC;
					}
					// 优惠券信息
					.coupon-info{
						.coupon-title{
							.type{
								background-color: #CCCCCC;
							}
							.title{
								color: #CCCCCC;
							}
						}
						// 时间范围
						.date-range{
							.date{
								color: #CCCCCC;
							}
						}
					}
				}
			}
		}
	}
</style>
