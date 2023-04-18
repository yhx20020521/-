<template>
	<view :style="Theme">
		<uni-nav-bar leftIcon="arrowleft" fixed="true" title="每日签到" />
		<!-- 签到数据 -->
		<view class="sign-box">
			<view class="sign-date">
				已连续签到<span>1</span>天
			</view>
			<view class="sign-points">
				今日签到获得10积分
			</view>
		</view>
		<!-- 日历组件 -->
		<view class="calendar-box">
			<uni-calendar
			  :selected="selected" itemBgColor="var(--primary-color)" 
			  :lunar="true" :showMonth="false"
			  @change="change" @monthSwitch="monthSwitch" />
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniCalendar from '../../components/uni-calendar/uni-calendar.vue'
	export default {
		data() {
			return {
				Theme:'',
				selected: [],
				signInfo: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			}
		},
		components: {
			uniNavBar,
			uniCalendar
		},
		onLoad() {

		},
		onShow() {
			this.Theme = this.$store.state.Theme
			
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				// this.signInfo.date = this.getDate(new Date(), -30).fullDate
				// this.signInfo.startDate = this.getDate(new Date(), -60).fullDate
				// this.signInfo.endDate = this.getDate(new Date(), 30).fullDate
				this.selected = [{
						date: this.getDate(new Date(), -3).fullDate,
						info: '签到'
					},
					{
						date: this.getDate(new Date(), -2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: this.getDate(new Date(), -1).fullDate,
						info: '签到'
					}
				]
			}, 300)
		},
		methods: {
			getDate(date, AddDayCount = 0) {
				if (!date) {
					date = new Date()
				}
				if (typeof date !== 'object') {
					date = date.replace(/-/g, '/')
				}
				const dd = new Date(date)
			
				dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
			
				const y = dd.getFullYear()
				const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
				const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
				return {
					fullDate: y + '-' + m + '-' + d,
					year: y,
					month: m,
					date: d,
					day: dd.getDay()
				}
			},
			// 模拟动态签到
			change(e) {
				let result = this.compareDate(e.fulldate)
				if(result == false) {
					return
				} else if(result == true) {
					this.selected.push({
						date: e.fulldate,
						info: '签到'
					})
				} else {
					this.selected.push({
						date: e.fulldate,
						info: '已签到'
					})
				}
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			//日期比较
			compareDate(enterDate) {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				let nowDate = `${year}-${month}-${day}`
				
				let date1 = (new Date(nowDate)).getTime()
				let date2 = (new Date(enterDate)).getTime()
				if (date1 > date2) {
					return true
				} else if(date1 == date2) {
					return 'none'
				} else {
					return false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 签到数据
	.sign-box{
		width: calc(100% - 80upx);
		padding: 20upx;
		margin: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		
		.sign-date{
			width: 100%;
			height: 60upx;
			line-height: 60upx;
			font-size: 30upx;
			font-weight: 600;
			span{
				margin: 0 10upx;
				color: var(--primary-color);
			}
		}
		
		.sign-points{
			height: 40upx;
			line-height: 40upx;
			color: var(--primary-color);
		}
	}
	
	.calendar-box{
		width: calc(100% - 40upx);
		margin: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
	}
</style>
