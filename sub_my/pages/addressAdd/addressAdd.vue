<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="新建地址" />
		<view class="content">
			<view class="row-input">
				<i class="iconfont icon-user" />
				<input placeholder="请输入收货人名称" />
			</view>
			<view class="row-input">
				<i class="iconfont icon-shouji" />
				<input placeholder="请输入收货人手机号码" maxlength="11" />
			</view>
			<view class="row-input">
				<i class="iconfont icon-dizhi" />
				<view class="region">
					<regionSelect @changeRegion="changeRegion">
					</regionSelect>
				</view>
			</view>
			<view class="row-textarea">
				<textarea placeholder="请输入详细地址" />
			</view>
			
			<view class="default-box">
				<view>
					默认地址
				</view>
				<switch :checked="isDefault" color="var(--primary-color)" style="transform:scale(0.7)"/>
			</view>
			
			<view class="add-btn">提交</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import regionSelect from '../../components/regionSelect/regionSelect.vue'
	export default {
		data() {
			return {
				Theme:'',
				region:'',
				isDefault: false
			}
		},
		components: {
			uniNavBar,
			regionSelect
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
		},
		methods: {
			// 选择地址
			changeRegion(param){
				this.region= param.cityValue
			}
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
				height: 60upx;
				font-size: 30upx;
				padding: 0upx 40upx;
				border-left: 3upx solid var(--primary-color);
			}
			
			// 地区选择
			.region{
				width: calc(100% - 40upx);
				height: 60upx;
				padding-left: 40upx;
				border-left: 3upx solid var(--primary-color);
			}
		}
		
		// 详细地址
		.row-textarea{
			padding:20upx;
			margin: 30upx 0upx;
			display: flex;
			justify-content: flex-start;
			border-radius: 20upx;
			border: 1upx solid var(--primary-color);
			textarea{
				width: 100%;
				font-size: 30upx;
			}
		}
		
		.default-box {
			margin: 30upx 0upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	
		.add-btn {
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
