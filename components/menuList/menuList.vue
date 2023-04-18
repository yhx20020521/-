<template>
		<view class="menuList" :style="{color: color,backgroundColor: backgroundColor}" @tap="menuClick">
			<view class="menuLeft">
				<slot></slot>
				<i v-if="leftIcon" class="iconfont" :class="leftIcon" />
				<image v-if="leftImage" :src="leftImage" />
			</view>
			<view class="menuMiddle">{{menuName}}</view>
			<view class="menuRight">
				<slot name="right"></slot>
				<i v-if="rightIcon" class="iconfont" :class="rightIcon" @click.stop="onClickRight" />
				<image v-if="rightImage" :src="rightImage" @click.stop="onClickRight" />
			</view>
		</view>
</template>

<script>
	/**
	 * menuList 菜单列
	 * @description 个人中心功能菜单列
	 * @property {String} leftImage 左侧图标图片
	 * @property {String} leftIcon 左侧图标
	 * @property {String} menuName 功能名称
	 * @property {String} color 字体颜色
	 * @property {String} backgroundColor 背景颜色
	 * @property {String} rightImage 右侧图标图片
	 * @property {String} rightIcon 右侧图标
	 * @event {Function} onClick 点击菜单出触发
	 * @event {Function} clickRight 右侧按钮点击时触发
	 */
	export default {
		name: 'menuList',
		data() {
			return {
			}
		},
		emits: ['onClick','clickRight'],
		props: {
			leftImage: {
				type: String,
				default: ''
			},
			leftIcon: {
				type: String,
				default: ''
			},
			menuName: {
				type: String,
				default: ''
			},
			rightImage: {
				type: String,
				default: ''
			},
			rightIcon: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#000000'
			},
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
		},
		onShow() {

		},
		methods: {
			menuClick(){
				this.$emit('onClick');
			},
			onClickRight(){
				this.$emit('clickRight');
			}
		}
	}
</script>

<style lang="scss">
	.menuList {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx #E5E5E5 solid;

		.menuLeft {
			width: 80upx;
			height: 100upx;
			float: left;

			image {
				width: 60upx;
				height: 60upx;
				margin: 20upx 10upx 20upx 10upx;
			}
			
			.iconfont {
				color: var(--primary-color);
				/* #ifdef H5 */
				margin: 20upx 10upx 20upx 10upx;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				margin: 0 10upx 0 10upx;
				/* #endif */
				// flex-shrink: 0;
				font-size: 60upx;
			}
		}

		.menuMiddle {
			width: 500upx;
			height: 100ux;
			line-height: 100upx;
			float: left;
		}

		.menuRight {
			width: 80upx;
			height: 100upx;
			float: right;

			image {
				width: 60upx;
				height: 60upx;
				margin: 20upx 10upx 20upx 10upx;
			}
			
			.iconfont {
				color: var(--primary-color);
				/* #ifdef H5 */
				margin: 20upx 10upx 20upx 10upx;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				margin: 0 10upx 0 10upx;
				/* #endif */
				// flex-shrink: 0;
				font-size: 60upx;
			}
		}
	}
</style>
