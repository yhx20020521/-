<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="地址列表" />
		<!-- 地址列表 -->
		<view v-if="!isEmpty" class="address-box">
			<uni-swipe-action>
				<view class="address-item" @click="selectAddress(item)" v-for="(item,index) in addressList" :key="index">
					<uni-swipe-action-item :right-options="swipe_options" @click="bindClick" @change="swipeChange($event, index)">
						<view class="item-box">
							<view class="item-left">
								<view class="info-box">
									<view class="user-name">
										{{item.userName}}
									</view>
									<view class="user-phone">
										<text>{{item.userPhone}}</text>
										<text v-if="item.tag" class="tag">默认</text>
									</view>
								</view>
								<view class="address">
									{{item.region}}{{item.address}}
								</view>
							</view>
							<view class="item-right" @click.stop="navTo('/my/addressEdit',item)">
								<i class="iconfont icon-edit"></i>
							</view>
						</view>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
		<view class="add-btn">
			<view class="btn" @click="navTo('/my/addressAdd','')">新建收货地址</view>
		</view>
		
		<!-- 暂无数据 -->
		<sju-empty v-if="isEmpty" iconColor="var(--primary-color)" ></sju-empty>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import { addressList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				isEmpty:false,
				addressList: [],
				swipe_options:[
				    {
				        text: '取消',
				        style: {
				            backgroundColor: 'var(--primary-color)'
				        }
				    },
					{
				        text: '删除',
				        style: {
				            backgroundColor: '#E64340'
				        }
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
			this.addressList = addressList
		},
		methods: {
			// 页面跳转
			navTo(path,item){
				let info = ''
				if(item !='') {
					info ='?info=' + JSON.stringify(item)
				}
				this.sjuNav.navigateTo(path+info)
			},
			// 选择地址
			selectAddress(item){
				this.sjuTools.currentPage().addressInfo = item
				this.sjuNav.navigateBack()
			},
			bindClick(e){
				console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			},
			swipeChange(e,index){
				console.log('当前状态：'+ e +'，下标：' + index)
			}
		}
	}
</script>

<style lang="scss" scoped>
/* 地址列表 */
.address-box{
	width: 100%;
	margin-top: 20upx;
	background-color: #FFFFFF;
	.address-item{
		width: 92%;
		margin: 0 4%;
		border-bottom: 1upx solid #EEEEEE;
		.item-box{
			width: 100%;
			padding: 10upx 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			// 左侧内容
			.item-left{
				width: calc(100% - 60upx);
				display: flex;
				flex-direction: column;
				justify-content: center;
				// 收货人、手机号
				.info-box{
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.user-name{
						width: 30%;
						display: flex;
						align-items: center;
						font-size: 26upx;
						font-weight: bold;
					}
					.user-phone{
						width: 70%;
						display: flex;
						align-items: center;
						text{
							font-size: 28upx;
							font-weight: bold;
						}
						.tag{
							border-radius: 4upx;
							margin-left: 20upx;
							padding: 4upx 8upx;
							font-size: 24upx;
							color: #FFFFFF;
							background-color: var(--primary-color);
						}
					}
				}
				// 地址
				.address{
					margin-top: 10upx;
					font-size: 26upx;
				}
			}
			// 右侧图标
			.item-right{
				width: 60upx;
				i{
					font-size: 40upx;
					color: var(--primary-color);
					margin-left: 10upx;
					margin-right: 10upx;
				}
			}
		}
	}
}
	
	/* 添加地址 */
	.add-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		.btn{
			width: 80%;
			height: 70upx;
			line-height: 70upx;
			border-radius: 70upx;
			text-align: center;
			color: #FFFFFF;
			background-color:var(--btn-bg-color);
		}
	}
</style>
