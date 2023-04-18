<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="会员中心" />
		<!-- 会员信息 -->
		<view class="member-box">
			<image class="user-image" :src="headerUrl"></image>
			<view class="user-info">
				<view class="user-name">{{userName}}</view>
				<view class="member-tip">开通会员，享会员特权</view>
			</view>
		</view>
		
		<!-- 会员充值 -->
		<view class="main-title">
			<text>会员充值</text>
		</view>
		
		<!-- 充值类型 -->
		<view class="recharge-box">
			<scroll-view scroll-x="true">
				<view class="recharge-type">
					<view class="type-item" :class="current == index ? 'type-item-active': ''" 
					  v-for="(item, index) in rechargeOptions" :key="index"  @click="rechargeChange(index)">
						<text class="type-item-duration">{{ item.duration }}</text>
						<view class="type-item-price">
							<text>￥</text>
							<text class="type-item-price-text">{{ item.price }}</text>
						</view>
						<text class="type-item-des" v-for="(desItem, desIndex) in item.des" :key="desIndex">{{ desItem }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="submit-btn">立即充值</view>
		<!-- 会员权益 -->
		<view class="rights-box">
			<view class="title">
				<text>会员权益</text>
			</view>
			<view class="rights-content">
				<view class="content-box" v-for="(item,index) in rightsList" :key="index">
					<view class="member-type">{{item.type}}</view>
					<view class="member-content">{{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				Theme:'',
				// 用户信息
				headerUrl:'/static/my/user.jpg',
				userName: '用户名称',
				current:0,
				rechargeOptions: [
					{
						duration: '12个月',
						price: 60,
						des: [
							'白银会员'
						],
						showTag: true
					},
					{
						duration: '12个月',
						price: 120,
						des: [
							'黄金会员'
						],
						showTag: false
					},
					{
						duration: '12个月',
						price: 180,
						des: [
							'铂金会员'
						],
						showTag: false
					},
					{
						duration: '12个月',
						price: 240,
						des: [
							'钻石会员'
						],
						showTag: false
					},
					{
						duration: '12个月',
						price: 300,
						des: [
							'至尊会员'
						],
						showTag: false
					}
				],
				rightsList:[
					{
						type:'白银会员',
						content:'白银会员权益'
					},
					{
						type:'黄金会员',
						content:'黄金会员权益'
					},
					{
						type:'铂金会员',
						content:'铂金会员权益'
					},
					{
						type:'钻石会员',
						content:'钻石会员权益'
					},
					{
						type:'至尊会员',
						content:'至尊会员权益'
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
			// 跳转页面
			navTo(page) {
				this.sjuNav.navigateTo(page)
			},
			rechargeChange(index) {
				this.current = index
			}
		}
	}
</script>

<style lang="scss">
	// 会员信息
	.member-box{
		width: calc(100% - 80upx);
		padding: 20upx;
		margin: 20upx;
		display: flex;
		align-items: center;
		border-radius: 20upx;
		background-color: #FFFFFF;
		
		// 用户头像
		.user-image{
			width: 100upx;
			height: 100upx;
			margin-right: 20upx;
			border-radius: 60upx;
		}
		
		// 用户信息
		.user-info{
			width: calc(100% - 120upx);
			
			.user-name{
				width: 100%;
				height: 60upx;
				line-height: 60upx;
			}
			
			.member-tip{
				width: 100%;
				height: 40upx;
				line-height: 40upx;
				color: #A5A3A2;
				font-size: 22upx;
			}
		}
	}
	
	// 会员充值
	.main-title {
		color: #1C1C1C;
		padding: 20upx;
		font-size: 34upx;
	}
	
	// 会员类型
	.recharge-box{
		width: calc(100% - 80upx);
		padding: 20upx;
		margin: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
	}
	.recharge-type {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.type-item {
			position: relative;
			padding: 40upx 0;
			margin-right: 20upx;
			width: 200upx;
			height: 230upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			flex-direction: column;
			border: 1upx solid  #F2F2F3;
			border-radius: 12upx;
			
			.type-item-duration {
				margin-bottom: 30upx;
				font-size: 26upx;
				color: #1C1C1C;
			}
			
			.type-item-price {
				margin-bottom: 20upx;
				display: flex;
				flex-direction: row;
				align-items: baseline;
				color: var(--primary-color);
				
				.type-item-price-text {
					font-size: 48upx;
					// color: #E3BE83;
					// color: var(--primary-color);
				}
			}
			
			.type-item-des {
				font-size: 26upx;
				color: #A5A3A2;
			}
		}
		
		.type-item-active {
			// border-color: #EDD2A9;
			// background-color: #FBF1E5;
			border-color: var(--assist-color);
			background-color: var(--accent-color);
		}
	}
	
	.submit-btn {
		width: calc(100% - 40upx);
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin: 0 auto;
		color: #FFFFFF;
		border-radius: 40upx;
		background-image: linear-gradient(90deg, var(--primary-color), var(--assist-color));
	}
	
	// 会员权益
	.rights-box{
		width: 100%;
		.title{
			width: 100%;
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			text{
				margin: 0 20upx;
				font-size: 28upx;
				color: var(--primary-color);
			}
		}
		.title:before{
			width: 100upx;
			height: 2upx;
			content: "";
			background-color:var(--primary-color);
		}
		.title:after{
			width: 100upx;
			height: 2upx;
			content: "";
			background-color: var(--primary-color);
		}
		
		.rights-content{
			width: calc(100% - 80upx);
			margin: 0 auto;
			border-radius: 20upx;
			.content-box{
				width: 100%;
				display: flex;
				align-items: center;
				border: 1upx dashed var(--primary-color);
				.member-type{
					padding: 20upx;
				}
				
				.member-content{
					flex: 1;
					padding: 20upx;
					border-left: 1upx dashed var(--primary-color);
				}
			}
			
			.content-box:not(:first-child){
				border-top: none;
			}
		}
	}
	
</style>
