<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="意见反馈" />
		<!-- 意见反馈 -->
		<view class="item-box">
			<view class="item-title">
				反馈类型
			</view>
			<view class="item-input">
				<picker  @change="bindPickerChange" :value="typeId" :range="typeList">
					<view>{{typeList[typeId]}}</view>
				</picker>
			</view>
		</view>
		<view class="item-box">
			<view class="item-title">
				反馈内容
			</view>
			<view class="item-input">
				<textarea placeholder="请描述您遇到的问题或对本产品的建议"/>
			</view>
		</view>
		<view class="item-box">
			<view class="item-title">
				上传图片
				<span class="item-tip">(选填)</span>
			</view>
			<view class="item-input">
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
		</view>
		<view class="item-box">
			<view class="item-title">
				联系方式
				<span class="item-tip">(选填)</span>
			</view>
			<view class="item-input">
				<input maxlength="11" placeholder="请输入您的手机号" />
			</view>
		</view>
		
		<view class="submit-btn">
			提交
		</view>
		
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
				typeId:0,
				typeList:[
					'问题类型1','问题类型2',
					'问题类型3','问题类型4'
				],
				imageList: [],
				fileCount:0,
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
	page{
		background-color: #FFFFFF;
	}
	
	.item-box{
		width: calc(100% - 40upx);
		margin: 20upx;
		.item-title{
			font-size: 28upx;
			font-weight: 600;
			.item-tip{
				color: #B9B9B9;
				font-size: 26upx;
				font-weight: 500;
			}
		}
		.item-input{
			font-size: 26upx;
			border-radius: 20upx;
			background-color: #F5F5F5;
			input{
				height: 80upx;
				line-height: 80upx;
				padding-left: 10upx;
				margin: 10upx;
			}
			
			picker{
				height: 80upx;
				line-height: 80upx;
				padding-left: 10upx;
				margin: 10upx;
			}
			
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
