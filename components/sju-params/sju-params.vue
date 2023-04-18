<template>
	<view class="params-box" v-show="isShow" @click="hide">
		<view class="params-content">
			<view class="params-list" v-for="(item,index) in List" :key="index">
				<view class="title">
					{{item.title}}
				</view>
				<view class="content">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * sju-params 参数弹窗
	 * @description 商品参数数据弹窗展示
	 * @property {Array} paramList 参数列表
	 * @event {Function} show 弹窗展示
	 * @event {Function} hide 弹窗隐藏
	 */
	export default {
		name:'sju-params',
		emits: ['show', 'hide'],
		props: {
			paramList: {
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
				isShow: false,
				List:[]
			}
		},
		methods:{
			show(){
				this.isShow = true
				if(this.paramList.length > 0) {
					this.List = this.paramList
				}
				this.$emit('show')
			},
			hide(){
				this.isShow = false
				this.$emit('hide')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.params-box {
		z-index: 1000;
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		overflow-x: hidden;
		overflow-y: auto;
		background: rgba(0,0,0,.5);
		
		// 参数内容
		.params-content{
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
			// 参数列
			.params-list{
				width: 100%;
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #EEEEEE;
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				.title{
					line-height: 40upx;
					display: flex;
					align-items: center;
					font-size: 26upx;
				}
				.content{
					flex: 1;
					line-height: 40upx;
					margin-left: 20rpx;
					color: #999999;
				}
			}
		}
	}
</style>
