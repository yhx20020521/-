<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="物流信息" />
		
		<!-- 物流信息 -->
		<logistics :logisticsInfo="logisticsInfo"></logistics>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import logistics from '@/components/sju-logistics/sju-logistics.vue'
	import { logisticsInfo } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme:'',
				orderCode:'',
				logisticsInfo:{}
			}
		},
		components: {
			uniNavBar,
			logistics
		},
		onLoad(options) {
			this.orderCode = options.code
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
			this.logisticsInfo = logisticsInfo
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
</style>
