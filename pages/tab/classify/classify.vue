<template>
	<view :style="Theme">
		<uni-nav-bar :statusBar="true" fixed="true"  title="分类" />
		<!-- 分类内容 -->
		<view class="content" :style="{ 'height':contentHeight }">
			<!-- 左侧 -->
			<view class="contentLeft">
				<scroll-view scroll-y class="content-list">
					<view class="itemType" v-for="(item,index) in typeList" :key="index"
					:class="{ 'active':typeCode==item.code }" @click="changeType(item.code)">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			
			<!-- 右侧 -->
			<view class="contentRight">
				<!-- 滚动视图 -->
				<scroll-view :scroll-y="true" class="scroll">
					<view class="classify-list">
						<view class="list" v-for="(item,index) in typeList[typeCode-1].children" :key="index">
							<image :src="item.image"></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import { typeList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				// 内容高度
				contentHeight: '',
				// 商品类型
				typeList:[],
				typeCode:1,
				
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {
			
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			// 获取界面内容高度
			this.contentHeight = (uni.getSystemInfoSync().screenHeight - uni.upx2px(188)) + 'px';
			this.typeList = typeList
			
			//设置 tabBar 选择颜色改为主题色
			uni.setTabBarStyle({
				selectedColor: this.Theme.split(/\;|\:/)[1],
			})
			// 设置tabBar图标
			if(this.sjuLogin.getValue('themeName') != '') {
				this.sjuTools.setTabBar()
			}
		},
		methods: {
			// 选择商品分类
			changeType(code){
				// 切换选择
				this.typeCode = code
			}
		}
	}
</script>

<!-- <style>
	page{
		padding-bottom: 0;
	}
</style> -->

<style lang="scss" scoped>
	// 主区域内容
	.content {
		width: 100%;
		display: flex;
		background-color: var(--accent-bg-color);
		
		// 左侧内容
		.contentLeft {
			width: 25%;
			height: 100%;
			text-align: center;
			background-color:var(--assist-bg-color);
			
			.content-list {
				z-index: 10;
				width: 25%;
				height: calc(100% - 188upx - var(--statusBarHeight));
				position: fixed;
				overflow: hidden;
				// 商品类型
				.itemType {
					height: 80upx;
					line-height: 80upx;
				}
				
				// 选择商品类型
				.active {
					border-left: 6upx solid var(--primary-color);
					color: var(--primary-color);
					background-color: var(--accent-bg-color);
				}
			}
		}
		
		// 右侧内容
		.contentRight {
			width: 70%;
			height: 100%;
			padding-left: 2.5%;
			margin-top: 20upx;
			.scroll{
				width: 100%;
				height: 100%;
				float: right; 
				.classify-list{
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					.list{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 32%;
						height: 140upx;
						margin-right: 2%;
						image{
							width: 80upx;
							height: 80upx;
						}
						text{
							color: #212121;
							font-size: 24upx;
							margin-top: 10upx;
						}
					}
					.list:nth-child(3n){
						margin-right: 0;
					}
				}
			}
		}
	}


</style>
