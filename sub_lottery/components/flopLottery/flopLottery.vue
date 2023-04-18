<template>
	<view class="lottery-box">
		<view @click="draw(index)" v-for="(item,index) in newList" :key="index" class="lottery-item"
		:class="[selectedIndex == index + 1 ?'animate':'',selectedIndex != index+1 && surplus ? 'animate' : '',selectedIndex == '' ? 'item-size lottery-item' + (index + 1) : '']"
		:style="selectedIndex == index + 1 && implement > 1 ? selectedStyle : unSelectedStyle">
			{{selectedIndex == index+1? flopResult :''}}
			{{selectedIndex != index+1 && selectedIndex != ''?item.name:''}}
			{{selectedIndex == ''?tipsText:''}}
		</view>
	</view>
	<view v-if="showRenewed" class="renewed-btn" @click="drawAgain"
	:style="{'background-color': themeColor,color: btnColor }" >
		{{renewedBtn}}
	</view>
</template>

<script>
	/**
	 * flopLottery 抽奖
	 * @description 翻牌抽奖组将
	 * @property {String} themeColor 组件主题颜色
	 * @property {String} btnColor 再次抽奖按钮文本颜色
	 * @property {String} selectColor 选中项左下角颜色
	 * @property {String} selectedColor 选中项右上角颜色
	 * @property {String} unSelectColor 未选中项左下角颜色
	 * @property {String} unSelectedColor 未选中项右上角颜色
	 * @property {Boolean} showRenewed 是否展示再次抽奖按钮
	 * @property {String} renewedBtn 再次抽奖按钮文本
	 * @property {String} tipsText 提示文本
	 * @property {String} selectedImage 选中选项背景图片
	 * @property {String} unSelectedImage 未选中选项背景图片
	 * @property {Array} lotteryList 抽奖列表数组
	 * @event {Function} show 抽奖
	 * @event {Function} drawAgain 再次抽格
	 */
	export default {
		name: 'flopLottery',
		emits: ['show', 'drawAgain'],
		props: {
			themeColor: {
				type: String,
				default: '#48b8d0',
			},
			btnColor: {
				type: String,
				default: '#ffffff',
			},
			selectColor: {
				type: String,
				default: '#f43f3b',
			},
			selectedColor: {
				type: String,
				default: '#98FB98',
			},
			unSelectColor: {
				type: String,
				default: '#00BFFF',
			},
			unSelectedColor: {
				type: String,
				default: '#33CCCC',
			},
			showRenewed: {
				type: Boolean,
				default: false
			},
			renewedBtn: {
				type: String,
				default: '再次抽奖',
			},
			tipsText: {
				type: String,
				default: '翻',
			},
			selectedImage: {
				type: String,
				default: '',
			},
			unSelectedImage: {
				type: String,
				default: '',
			},
			lotteryList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				flopResult:'',
				selectedIndex: '',
				implement: 0,
				surplus: false,
				oldList:[],
				newList:[]
			}
		},
		// watch:{
		//     lotteryList:{
		// 		handler(newVal,oldVal){
		// 			let dislocateList = this.dislocateArray(this.lotteryList)
		// 			this.newList = JSON.parse(JSON.stringify(dislocateList))
		// 			this.oldList = JSON.parse(JSON.stringify(dislocateList))
		// 		},
		// 		deep:true 
		// 	}
		// },
		computed: {
			selectedStyle() {
				let style = ''
				if (this.selectedImage.length > 0) {
					style = `background-image: url(${this.selectedImage});`
				} else {
					style = `background-image: linear-gradient(45deg, ${this.selectColor}, ${this.selectedColor});`

				}
				return style
			},
			unSelectedStyle() {
				let style = ''
				if (this.selectedImage.length > 0) {
					style = `background-image: url(${this.unSelectedImage});`
				} else {
					style = `background-image: linear-gradient(45deg, ${this.unSelectColor}, ${this.unSelectedColor});`
				}
				return style
			},
		},
		mounted() {
			let dislocateList = this.dislocateArray(this.lotteryList)
			this.newList = JSON.parse(JSON.stringify(dislocateList))
			this.oldList = JSON.parse(JSON.stringify(dislocateList))
		},
		methods: {
			// 再次抽奖
			drawAgain(e) {
				if (this.implement == 3) {
					// 数组打乱
					let dislocateList = this.dislocateArray(this.lotteryList)
					this.newList = JSON.parse(JSON.stringify(dislocateList))
					this.oldList = JSON.parse(JSON.stringify(dislocateList))
					this.selectedIndex = ''
					this.implement = 0
					this.surplus = false
					let data = {}
					this.$emit('drawAgain', data)
				} else {
					uni.showToast({
						title: '正在抽奖中...',
						icon: 'none',
						duration: 2000
					})
					return false
				}
			},
			// 抽奖
			draw(index) {
				if (this.selectedIndex == '') {
					this.flopResult = ''
					this.newList.map(item => {
						item.name = ''
					})
					this.selectedIndex = index + 1
					this.implement = 1
					
					setTimeout(() => {
						let data = this.oldList[index]
						this.flopResult = data.name
						this.$emit('show', data)
						this.surplus = true
						this.implement = 2
					}, 1200)
					
					setTimeout(() => {
						this.newList =  JSON.parse(JSON.stringify(this.oldList))
						this.implement = 3
					}, 2500)
				}
			},
			// 随机打乱数组
			dislocateArray(arr) {
				let len = arr.length
				for (let i = 0; i < len - 1; i++) {
					let index = parseInt(Math.random() * (len - i))
					let temp = arr[index]
					arr[index] = arr[len - i - 1]
					arr[len - i - 1] = temp
				}
				return arr
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lottery-box {
		width: calc(100% - 40upx);
		padding: 20upx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.lottery-item {
		width: 220upx;
		height: 220upx;
		line-height: 220upx;
		text-align: center;
		margin-bottom: 26upx;
		position: relative;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		flex-direction: column;
		border-radius: 10upx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.item-size {
		font-size: 32upx;
	}

	.lottery-item1 {
		animation: lottery-item1 alternate linear 2 1s;
	}

	@keyframes lottery-item1 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 230upx;
			left: 230upx;
		}
	}

	.lottery-item2 {
		animation: lottery-item2 alternate linear 2 1s;
	}

	@keyframes lottery-item2 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 230upx;
			left: 0upx;
		}
	}

	.lottery-item3 {
		animation: lottery-item3 alternate linear 2 1s;
	}

	@keyframes lottery-item3 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 230upx;
			left: -230upx;
		}
	}

	.lottery-item4 {
		animation: lottery-item4 alternate linear 2 1s;
	}

	@keyframes lottery-item4 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 0upx;
			left: 230upx;
		}
	}

	.lottery-item6 {
		animation: lottery-item6 alternate linear 2 1s;
	}

	@keyframes lottery-item6 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: 0upx;
			left: -230upx;
		}
	}

	.lottery-item7 {
		animation: lottery-item7 alternate linear 2 1s;
	}

	@keyframes lottery-item7 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: -230upx;
			left: 230upx;
		}
	}

	.lottery-item8 {
		animation: lottery-item8 alternate linear 2 1s;
	}

	@keyframes lottery-item8 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: -230upx;
			left: 0upx;
		}
	}

	.lottery-item9 {
		animation: lottery-item9 alternate linear 2 1s;
	}

	@keyframes lottery-item9 {
		from {
			top: 0;
			left: 0;
		}

		to {
			top: -230upx;
			left: -230upx;
		}
	}

	.animate {
		animation: turn 1.2s;
	}

	@keyframes turn {
		0% {
			transform: perspective(150px) rotateY(0deg);
		}

		50% {
			transform: perspective(150px) rotateY(0deg);
		}

		100% {
			transform: perspective(150px) rotateY(179.9deg);
		}
	}

	// 再次抽奖
	.renewed-btn {
		width: calc(100% - 40upx);
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin: 20upx auto;
		border-radius: 10upx;
	}
</style>
