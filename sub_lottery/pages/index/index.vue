<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="游戏抽奖" />
		<!-- 抽奖信息 -->
		<view class="lottery-info">
			<view class="info-btn">
				次数:3
			</view>
			<view @click="navTo('/lottery/lotteryList')" class="info-btn">
				我的奖品
			</view>
		</view>
		<!-- 抽奖组件 -->
		<view class="lottery-box">
			<flopLottery themeColor="var(--primary-color)"
				selectColor="#DB7093" selectedColor="#DB7093"
				unSelectColor="#00BFFF" unSelectedColor="#33CCCC" 
				:lotteryList="lotteryList"
				@show="showTurn" @drawAgain="drawAgain"
				:showRenewed="true" renewedBtn="再次抽奖" >
			</flopLottery>
		</view>
		<!-- 抽奖规则 -->
		<view class="rules-box">
			<view class="title">
				<text>抽奖规则</text>
			</view>
			<view class="rules-content">
				<view>
					1. 每人免费抽奖1次
				</view>
				<view>
					2. 每人抽奖1次消耗20积分
				</view>
				<view>
					3. 抽奖规则抽奖规则抽奖规则
				</view>
				<view>
					4. 最终解析权归本平台所有
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import flopLottery from '../../components/flopLottery/flopLottery.vue'
	export default {
		data() {
			return {
				Theme:'',
				// tips_init: '点击',
				// no_z_init: '点击',
				// result_turn: '',
				// result_blow: '谢谢参与',
				lotteryList: [
					{
						id: 1,
						name: "谢谢参与",
					}, 
					{
						id: 2,
						name: "10积分",
					}, 
					{
						id:3,
						name: "20积分",
					}, 
					{
						id: 4,
						name: "谢谢参与",
					},
					{
						id:5,
						name: "100积分",
					},
					{
						id:6,
						name: "谢谢参与",
					}, 
					{
						id:7,
						name: "50积分",
					}, 
					{
						id:8,
						name: "10积分",
					}, 
					{
						id:9,
						name: "30积分",
					}]
			}
		},
		components: {
			uniNavBar,
			flopLottery
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
		},
		methods: {
			// 抽奖结果
			showTurn(e) {
				console.log(e,'抽奖结果')
			},
			// 再次抽奖
			drawAgain(e) {
				console.log(e)
			},
			navTo(path) {
				this.sjuNav.navigateTo(path)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lottery-info{
		width: calc(100% - 40upx);
		padding: 20upx;
		margin-top: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.info-btn{
			height: 60upx;
			line-height: 60upx;
			padding: 0 20upx;
			border-radius: 30upx;
			color: var(--primary-color);
			border: 1upx solid var(--primary-color);
		}
	}
	
	.lottery-box{
		width: 100%;
		margin: 20upx 0;
	}
	
	.rules-box{
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
		
		.rules-content{
			width: calc(100% - 80upx);
			margin: 0 auto;
			padding: 20upx;
			border-radius: 20upx;
			border: 1upx dashed var(--primary-color);
		}
	}
	
</style>
