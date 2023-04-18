<template>
    <view class="Modal" :class="{ show: showModal }">
		<view class="Dialog">
			<view class="titleBar justify-end">
				<view class="title">{{title}}</view>
				<view class="closeIcon" @click="closeClick()">
					<uni-icons type="closeempty" color="red" :size="size" ></uni-icons>
				</view>
			</view>
			<slot></slot>
		</view>
    </view>
</template>

<script>
	/**
	 * @description 模态弹窗
	 * @property {Boolean} showModal  是否显示弹窗
	 * @property {String} title  弹窗标题
	 * @event {Function} close 关闭弹窗
	 */
	export default {
		name: 'Modal',
		data() {
			return {
				size:uni.upx2px(60)
			}
		},
		emits: ['close'],
		props: {
			showModal:{
				type: Boolean,
				default: false
			},
			title:{
				type: String,
				default: '对话弹窗'
			}
			
		},
		onShow() {

		},
		methods: {
			closeClick(){
				this.$emit('update:showModal',false)
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	/* ==================
	         模态窗口
	 ==================== */
	.Modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}
	
	.Modal::before {
		content: " ";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	
	.Modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	
	.Dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}
	
	.Modal.bottom-modal::before {
		vertical-align: bottom;
	}
	
	.Modal.bottom-modal .Dialog {
		width: 100%;
		border-radius: 0;
	}
	
	.Modal.bottom-modal {
		margin-bottom: -1000upx;
	}
	
	.Modal.bottom-modal.show {
		margin-bottom: 0;
	}
	
	.Modal.drawer-modal {
		transform: scale(1);
		display: flex;
	}
	
	.Modal.drawer-modal .Dialog {
		height: 100%;
		min-width: 200upx;
		border-radius: 0;
		margin: initial;
		transition-duration: 0.3s;
	}
	
	.Modal.drawer-modal.justify-start .Dialog {
		transform: translateX(-100%);
	}
	
	.Modal.drawer-modal.justify-end .Dialog {
		transform: translateX(100%);
	}
	
	.Modal.drawer-modal.show .Dialog {
		transform: translateX(0%);
	}
	
	.Modal .Dialog>.titleBar:first-child .closeIcon {
		min-width: 100upx;
		margin-right: 0;
		min-height: 100upx;
	}
	
	/* ==================
			弹窗标题
	 ==================== */
	.titleBar{
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		position: relative;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		min-height: 100upx;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	}
	
	.justify-end {
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
	}

	
	.title{
		position: absolute;
		text-align: center;
		width: calc(100% - 350upx);
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60upx;
		font-size: 32upx;
		line-height: 60upx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.closeIcon{
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		height: 100%;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		max-width: 100%;
	}
</style>
