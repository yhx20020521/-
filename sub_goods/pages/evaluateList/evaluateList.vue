<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="评论列表" />
		<!-- 评价类型 -->
		<view class="evaluate-type">
			<view class="type-item" :class="current == index ? 'type-item-active': ''" 
			v-for="(item,index) in typeList" :key="index"  @click="typeChange(index)">
				{{item.title}}({{item.count}})
			</view>
		</view>
		
		<!-- 评价内容 -->
		<view class="evaluate-list">
			<view class="evaluate-item" v-for="(item,index) in evaluate.list" :key="index">
				<!-- 用户信息 -->
				<view class="item-top">
					<view class="user-info">
						<image class="user-image" :src="item.image" mode="aspectFit"></image>
						<view class="user-name">
							<view class="name-info">
								{{filters_name(item.name)}}
							</view>
							<view>
								<uni-rate :size="14" :readonly="true" :value="item.score" />
							</view>
						</view>
					</view>
					<view class="evaluate-date">
						{{item.date}}
					</view>
				</view>
				<!-- 评价信息 -->
				<view class="evaluate-content">
					{{item.content}}
				</view>
				<view class="evaluate-images">
					<image v-for="(items,index) in item.imagesList" :key="index" 
						:src="items" @click="previewImage(item.imagesList,index)" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import { evaluate } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				current:0,
				typeList:[
					{
						id:0,
						title:'全部',
						count:200
					},
					{
						id:1,
						title:'好评',
						count:180
					},
					{
						id:2,
						title:'中/差评',
						count:20
					}
				],
				code:'',
				evaluate:[]
			}
		},
		components: {
			uniNavBar
		},
		onLoad(options) {
			this.code = options.code
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
			this.evaluate = evaluate
		},
		methods: {
			typeChange(index) {
				this.current = index
			},
			// 过滤用户名称
			filters_name(value){
				if (!value || value === '') 
					return ''
				let name = ''
				if(value.length>2) {
					name = this.sjuTools.strFilter(value,1,-2)
				} else {
					name = value[0] + '****'
				}
				return name
			},
			// 预览图片
			previewImage(urlList, index){
				uni.previewImage({
					current: index,
					urls: urlList
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 评价类型
	.evaluate-type{
		width: calc(100% - 40upx);
		height: 80upx;
		line-height: 80upx;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		
		.type-item{
			margin-right: 20upx;
			font-size: 28upx;
		}
		
		.type-item-active{
			color: var(--primary-color);
		}
	}
	
	// 评价列表
	.evaluate-list{
		width: 100%;
		.evaluate-item{
			width: calc(100% - 80upx);
			padding: 20upx;
			margin: 20upx;
			border-radius: 20upx;
			background-color: #FFFFFF;
			
			// 评价顶部信息
			.item-top{
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				
				// 用户信息
				.user-info{
					display: flex;
					flex-direction: row;
					align-items: center;
					
					.user-image{
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
						margin-right: 20upx;
					}
					
					// 用户名称
					.user-name{
						font-size: 16upx;
						.name-info{
							height: 50upx;
							line-height: 50upx;
						}
					}
				}
				
				// 评价时间
				.evaluate-date{
					flex-shrink: 0;
					font-size: 22upx;
					color: #C0C0C0;
					margin-left: 20upx;
				}
			}
			
			// 评价内容
			.evaluate-content{
				width: 100%;
				padding: 20upx 0;
			}
			
			// 评价图片
			.evaluate-images{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				image{
					width: 200upx;
					height: 200upx;
					margin:0 2% 20upx 0;
					border-radius: 20upx;
				}
				image:nth-child(3n){
					margin-right: 0;
				}
			}
		}
	}
</style>
