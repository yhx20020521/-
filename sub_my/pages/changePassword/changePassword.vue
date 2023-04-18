<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="修改密码" />
		<view class="content">
			<view class="row-input">
				<i class="iconfont icon-shouji" />
				<input placeholder="请输入手机号码" maxlength="11" />
			</view>
			<view class="row-input">
				<i class="iconfont icon-verCode" />
				<input placeholder="请输入验证码" maxlength="6" />
				<view class="code">
					<text>获取验证码</text>
				</view>
			</view>
			<view class="row-input">
				<i class="iconfont icon-mima" />
				<input placeholder="请输入您的密码" maxlength="16" />
			</view>
			<view class="row-input">
				<i class="iconfont icon-mima" />
				<input placeholder="请再次输入您的密码" maxlength="16" />
			</view>
			<view class="forget-btn">提交</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				Theme:'',
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
			
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40upx;
	
		.row-input {
			margin: 30upx 0upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 20upx;
			height: 100upx;
			border: 1upx solid var(--primary-color);
			border-radius: 20upx;
			
			image {
				padding: 0upx 10upx 0upx 10upx;
				width: 50upx;
				height: 50upx;
				flex-shrink: 0;
			}
			
			.iconfont {
				color: var(--primary-color);
				padding: 0upx 10upx 0upx 10upx;
				flex-shrink: 0;
				font-size: 40upx;
			}
	
			input {
				flex: 1;
				font-size: 30upx;
				padding: 0upx 40upx;
				color: var(--primary-color);
				border-left: 3upx solid var(--primary-color);
			}
	
			.code {
				display: flex;
				justify-content: flex-end;
				letter-spacing: 2upx;
				width: 180upx;
				color: var(--primary-color);
			}
		}
	
		.forget-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			height: 100upx;
			margin: 40upx 0 40upx 0;
			border-radius: 20upx;
			color: #FFFFFF;
			background-color: var(--btn-bg-color);
		}
	}
</style>
