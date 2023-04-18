<template>
	<view class="service-box" v-show="isShow" @click="hide">
		<view class="service-content">
			<view class="service-list" v-for="(item,index) in List" :key="index">
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
	 * sju-service 服务弹窗
	 * @description 商品服务数据弹窗展示
	 * @property {Array} serviceList 服务列表
	 * @event {Function} show 弹窗展示
	 * @event {Function} hide 弹窗隐藏
	 */
	export default {
		name:'sju-service',
		emits: ['show', 'hide'],
		props: {
			serviceList: {
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
				isShow: false,
				List:[
					{
						title:'正品保障',
						content:'正品保障，假一赔四'
					},
					{
						title:'七天无理由退换',
						content:'满足相应条件,可享受“七天无理由退换货”,包邮商品需要买家承担退货运费,非包邮商品需要买家承担发货和退货运费'
					},
					{
						title:'运费险',
						content:'卖家为您购买的商品投保退货运费险'
					}
				]
			}
		},
		methods:{
			show(){
				this.isShow = true
				if(this.serviceList.length > 0) {
					 this.List = this.serviceList
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
			// 服务列
			.service-list{
				width: 100%;
				.title{
					width: 100%;
					height: 80upx;
					display: flex;
					align-items: center;
					font-size: 26upx;
					color: #212121;
					font-weight: bold;
				}
				.content{
					display: flex;
					padding: 10upx 0;
					font-size: 24upx;
					color: #B9B9B9;
				}
			}
		}
	}
</style>
