<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="订单评价" />
		
		<!-- 评价内容信息 -->
		<view class="evaluate-box">
			<!-- 商品信息 -->
			<view class="goods-box">
				<image class="goods-image" src="/static/img/goods_thumb_01.png" mode="widthFix"></image>
				<view class="goods-info">
					<view class="name-info">
						<view class="goods-name">
							BANDALY 2022夏季女装连衣裙韩版大码宽松显瘦套装裙子两件套 
						</view>
						<view class="goods-specs">
							JX19301 上豆绿下米白 M
						</view>
					</view>
					<view class="goods-data">
						<view class="goods-price">
							￥129.00
						</view>
						<view class="goods-count">
							x2
						</view>
					</view>
				</view>
			</view>
			
			<!-- 评分 -->
			<view class="score-box">
				<view class="item">
					<view class="item-title">
						商品评价
					</view>
					<uni-rate :value="goodsValue" allow-half :size="16" />
				</view>
				<view class="item">
					<view class="item-title">
						物流评价
					</view>
					<uni-rate :value="logisticsValue" allow-half :size="16" />
				</view>
				<view class="item">
					<view class="item-title">
						服务评价
					</view>
					<uni-rate :value="serviceValue" allow-half :size="16" />
				</view>
			</view>
			
			<!-- 评价内容 -->
			<view class="content-box">
				<textarea placeholder="请您输入评价内容(选填)" />
			</view>
			<!-- 上传图片 -->
			<view class="image-list">
				<view class="image-uploader">
					<view class="image-uploader-files">
						<block v-for="(image,index) in imageList" :key="index">
							<view class="image-uploader-file">
								<view class="deleteImage" @click="deleteImage(index)">
									<image src="/static/upload/close.png" ></image>
								</view>
								<image class="image-uploader-img" mode="aspectFit" :src="image" :data-src="image"></image>
							</view>
						</block>
						<view v-if="imageList.length != 9" class="uploader-box">
							<view class="uploader-input" @click="openPopup()"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="submit-btn"> 提交 </view>
		
		<!-- 选择文件方式 -->
		<uni-popup ref="popupDialog" type="bottom" :maskClick="true">
			<view class="uploadTitle" @click="closePopup()">
				<view></view>
				<view class="uploadText">
					选择上传方式
				</view>
				<image class="uploadClose" src="/static/upload/uploadclose.png"></image>
			</view>
			<view class="uploadType">
				<view class="popupTab" @click="shot()">
					<image src="/static/upload/shot.png"></image>
					<view>拍照</view>
				</view>
				<view class="popupTab" @click="chooseImage()">
					<image src="/static/upload/album.png"></image>
					<view>相册上传</view>
				</view>
				<view class="popupTab" @click="chooseMessageFile()">
					<image src="/static/upload/weixin.png"></image>
					<view>微信上传</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				Theme:'',
				orderCode:'',
				goodsValue: 0,
				logisticsValue: 0,
				serviceValue: 0,
				imageList:[]
			}
		},
		components: {
			uniNavBar
		},
		onLoad(options) {
			this.orderCode = options.code
		},
		onShow() {
			this.Theme = this.$store.state.Theme
		},
		methods: {
			bindPickerChange(e) {
				this.typeId = e.detail.value
			},
			// 打开选择文件方式弹窗
			openPopup(){
				this.$refs.popupDialog.open();
			},
			// 关闭选择文件方式弹窗
			closePopup(){
				this.$refs.popupDialog.close();
			},
			// 使用相机拍摄
			shot: async function(){
				this.closePopup()
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				let that=this;
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original'],
				    sourceType: ['camera'], 
				    success: function (res) {
						that.imageList = that.imageList.concat(res.tempFilePaths)
				    }
				});
			},
			// 从相册选择图片
			chooseImage: async function(){
				this.closePopup()
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				let that=this;
				uni.chooseImage({
				    count: 9-this.imageList.length,
				    sizeType: ['original'], 
				    sourceType: ['album'], 
				    success: function (res) {
						that.imageList = that.imageList.concat(res.tempFilePaths)
				    }
				});
			},
			// 从聊天消息获取文件
			chooseMessageFile : async function(){
				this.closePopup()
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				let that=this;
				wx.chooseMessageFile({
				  count: 9-this.imageList.length,
				  type: 'image',
				  success (res) {
					that.imageList = that.imageList.concat(list)
				  }
				})
			},
			// 删除照片
			deleteImage(id){
				this.imageList.splice(id,1);//删除第id个元素
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true)
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			// 预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	// 订单评价信息
	.evaluate-box{
		width: calc(100% - 80upx);
		padding: 20upx;
		margin: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		
		// 商品信息
		.goods-box{
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 20upx;
			// 商品图片
			.goods-image{
				width: 200upx;
				margin-right: 20upx;
				border-radius: 10rpx;
			}
			// 商品信息
			.goods-info{
				width: calc(100% - 220upx);
				height: 100%;
				display: flex;
				align-items: center;
				// 名称信息
				.name-info{
					.goods-name{
						font-size: 28upx;
						color: #000000;
					}
					.goods-specs{
						font-size: 26upx;
						color: #CCCCCC;
					}
				}
				.goods-data{
					text-align: end;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					// 商品价格
					.goods-price{
						font-size: 34upx;
						color: var(--primary-color);
					}
					.goods-count{
						font-size: 28upx;
						color: #CCCCCC;
					}
				}
			}
		}
		
		// 评分信息
		.score-box{
			width: 100%;
			
			// 评分项
			.item{
				width: 100%;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.item-title{
					font-size: 28upx;
				}
			}
		}
		
		// 评价内容
		.content-box{
			width: 100%;
			font-size: 26upx;
			border-radius: 20upx;
			background-color: #F5F5F5;
			
			textarea{
				width: calc(100% - 40upx);
				height: 300upx;
				padding: 10upx;
				margin: 10upx;
				display: block;
			}
		}
	}
	
	// 上传图片列表
	.image-list {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		
		// 上传
		.image-uploader {
			margin-top: 20upx;
			flex: 1;
			flex-direction: column;
			.image-uploader-files {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				
				.image-uploader-file {
					position: relative;
					margin: 8rpx;
					width: 210rpx;
					height: 210rpx;
					.image-uploader-img {
						display: block;
						width: 210rpx;
						height: 210rpx;
					}
				}
				
				
				.deleteImage{
					width: 36upx;
					height: 36upx;
					position: absolute;
					top: 10upx;
					right: 10upx;
					image{
						width: 36upx;
						height: 36upx;
						z-index: 20;
					}
				}
				
				.uploader-box{
					width: 210rpx;
					height: 210rpx;
					margin:10rpx;
					position: relative;
					border: 1rpx solid #D9D9D9;
					.uploader-input {
						position: absolute;
						z-index: 1;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				}
				.uploader-box:before,
				.uploader-box:after {
					content: " ";
					position: absolute;
					top: 50%;
					left: 50%;
					-webkit-transform: translate(-50%, -50%);
					transform: translate(-50%, -50%);
					background-color: #D9D9D9;
				}
				.uploader-box:before {
					width: 4rpx;
					height: 79rpx;
				}
				.uploader-box:after {
					width: 79rpx;
					height: 4rpx;
				}
				.uploader-box:active {
					border-color: #999999;
				}
				.uploader-box:active:before,
				.uploader-box:active:after {
					background-color: #999999;
				}
			}
		}
	}
	
	
	/* 弹窗标题 */
	.uploadTitle{
		width: calc(100% - 40upx);
		height: 120upx;
		line-height: 120upx;
		padding: 0 20upx;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #EEEEEE;
		border-radius: 20upx 20upx 0upx 0upx;
		.uploadText{
			font-size: 30upx;
		}
		.uploadClose{
			width: 30upx;
			height: 30upx;
		}
	}
	
	/* 弹窗内容 */
	.uploadType{
		width: 100%;
		height: 240upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
		.popupTab{
			height: 120upx;
			margin: 60upx 0;
			text-align: center;
			image{
				width: 80upx;
				height: 80upx;
			}
			view{
				// display: block;
				color: #666666;
			}
		}
	}
	
	// 提交
	.submit-btn{
		width: calc(100% - 40upx);
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin: 40upx 20upx;
		color: #FFFFFF;
		border-radius: 20upx;
		background-color: var(--primary-color);
	}
	
</style>
