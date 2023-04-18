<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="设置" />
		<view class="menu">
			<menuList leftIcon="icon-edit" menuName="修改信息" rightIcon="icon-right" @onClick="navTo('/my/changeInfo')" @clickRight="navTo('/my/changeInfo')"  />
			<menuList leftIcon="icon-change" menuName="修改密码" rightIcon="icon-right" @onClick="navTo('/my/changePassword')" @clickRight="navTo('/my/changePassword')" />
			<menuList leftIcon="icon-purge" menuName="清除缓存" rightIcon="icon-right" @onClick="clearStorage" @clickRight="clearStorage" />
			<menuList leftIcon="icon-theme" menuName="主题切换" rightIcon="icon-right" @onClick="showColorModal" @clickRight="showColorModal" />
		</view>
		<view class="exitBtn" @click="exitLogin">退出登录</view>
		<!-- 选择颜色模态框 -->
		<Modal title="选择主题" v-model:showModal="themeModal">
			<view class="themePadding">
				<view class="themeBox">
					<view v-for="(item,index) in themes" :key="index" @click="themeChange(index)" class="theme" :style="{'background-color':item.value[0].value}">
					</view>
				</view>
			</view>
		</Modal>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import menuList from '@/components/menuList/menuList.vue'
	import Modal from '@/components/Modal/Modal.vue'
	import * as theme from '@/common/theme.js'
	export default {
		data() {
			return {
				Theme:'',
				themeModal: false,
				themes:theme.themeList,
			}
		},
		components: {
			uniNavBar,
			menuList,
			Modal
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
		},
		methods: {
			// 页面跳转
			navTo(url){
				this.sjuNav.navigateTo(url)
			},
			// 清除数据
			clearStorage(){
				this.sjuAlert.showConfirm('是否确认清除数据', ()=>{
					// 确认
					this.sjuLogin.clearAll()
				}, ()=>{
					// 取消
					
				}, '提示')
			},
			// 退出登录 
			exitLogin(){
				this.sjuAlert.showConfirm('是否确认退出登录', ()=>{
					// 确认
					this.sjuLogin.clearAll()
					this.sjuNav.reLaunch('/intake/login')
				}, ()=>{
					// 取消
					
				}, '提示')
			},
			// 显示弹窗
			showColorModal() {
				this.themeModal = true;
			},
			// 主题切换
			themeChange(index) {
				this.themeModal = false
				this.$store.commit('setTheme',this.themes[index])
				this.Theme = this.$store.state.Theme
			}
		}
	}
</script>

<style lang="scss">
	.menu{
		width: 100%;
		height: auto;
		margin-top: 20upx;
		background-color: var(--accent-bg-color);
	}
	
	.exitBtn{
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		margin-top: 20upx;
		background-color: var(--accent-bg-color);
	}
	
	// 主题弹窗内容
	.themePadding{
		padding: 20upx;
		background-color: #fff;
		.themeBox{
			display: flex;
			flex-wrap: wrap;
			.theme {
				width: calc((100% - 100upx)/5);
				height: 0;
				padding-bottom: calc((100% - 100upx)/5);
				margin: 10upx;
				border-radius: 10upx;
				text-align: center;
			}
		}
	}
	
</style>
