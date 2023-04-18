<template>
	<view :style="{ height: statusBarHeight,'background-image':bgImageColor }" class="uni-status-bar" :class="{'uni-status--fixed':fixed}">
		<slot />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		name: 'UniStatusBar',
		data() {
			return {
				statusBarHeight: statusBarHeight
			}
		},
		/* 
		* @property {String} bgImage 导航栏背景颜色或者背景图片
		 */
		props:{
			fixed: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		computed:{
			bgImageColor() {
				// 默认值
				if (this.bgImage) {
					return this.bgImage
				} else {
					return this.$store.state.bgImage||'linear-gradient(90deg, #ec008c, #6739b6)'
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-status-bar {
		width: 750upx;
		height: 20px;
		// color: #FFFFFF;
		// background-color: #FFFFFF;
		// height: var(--status-bar-height);
	}
	.uni-status--fixed {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 998;
	}
</style>
