<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="常见问题" />
		<!-- 常见问题列表 -->
		<view v-if="!isEmpty" class="issues-box">
			<view class="issues-list" @click="open(index)" 
			v-for="(item,index) in issuesList" :key="index">
				<!-- 标题 -->
				<view class="title" :class="{'item-border': index != currentIndex}">
					<view class="item-title">
						{{item.title}}
					</view>
					<i class="iconfont icon-down" :class="{'arrow-active':index == currentIndex}"></i>
				</view>
				<!-- 内容 -->
				<view v-if="index == currentIndex" class="content-box" :class="{'item-border': index == currentIndex}">
					{{item.content}}
				</view>
			</view>
		</view>
		<sju-empty v-if="isEmpty" iconColor="var(--primary-color)"></sju-empty>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { issuesList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				// 空数据
				isEmpty: false,
				currentIndex:0,
				issuesList:[]
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
			this.issuesList = issuesList
		},
		methods: {
			open(index) {
				if(this.currentIndex != index) {
					this.currentIndex = index
				} else {
					this.currentIndex = -1
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.issues-box{
		width: 100%;
		
		.issues-list{
			width: 100%;
			// 问题标题
			.title{
				width: calc(100% - 40upx);
				padding: 20upx;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				
				.item-title{
					color: #333333;
					font-size: 28upx;
					font-weight: 500;
				}
				
				.iconfont{
					flex-shrink: 0;
					color: #B9B9B9;
					font-size: 40upx;
					margin-left: 20upx;
				}
				
				.arrow-active{
					transform: rotate(-180deg);
					transition-property: transform;
					transition-duration: 0.3s;
					transition-timing-function: ease;
				}
			}
			
			.content-box{
				padding: 20upx;
			}
			
			.item-border{
				border-bottom: 1upx solid #EEEEEE;
			}
		}
	}
</style>
