<template>
	<view :style="bgColor" class="specs-box" v-show="isShow" @click.stop="hide">
		<view class="specs-content" @click.stop="show">
			<!-- 规格头部商品信息 -->
			<view class="specs-header">
				<image class="specs-image" :src="selectedSku.image || goodsInfo.imgList[0].imgUrl" mode="aspectFit">
				</image>
				<view class="header-right">
					<view class="goods-name">
						{{goodsInfo.name}}
					</view>
					<view class="goods-data">
						<view class="item-left">
							<view v-if="goodsInfo.current_price > 0" class="goods-price">
								￥{{ selectedSku.current_price || goodsInfo.current_price}}
							</view>
							<!-- 积分 -->
							<view v-if="goodsInfo.current_price > 0 && goodsInfo.score > 0" class="socre-box">
								<view class="score-text"> + </view>
								<i class="iconfont icon-bonus"></i>
								<view class="score-text">
									{{ 
										selectedSku.score ?
										selectedSku.score :
										goodsInfo.score 
									}}
								</view>
							</view>
						</view>

						<view class="stock-data">
							库存
							{{
								selectedSku.stock ? 
								selectedSku.stock : 
								goodsInfo.stockQty
							}}
						</view>
					</view>
				</view>
			</view>
			<!-- 规格内容 -->
			<view class="sku-content ss-flex-1">
				<scroll-view scroll-y="true" class="sku-content-scroll" @touchmove.stop>
					<view class="specs-item" v-for="item in skuList" :key="item.id">
						<view class="label-text">{{ item.name }}</view>
						<view class="btn-box">
							<button class="spec-btn" :class="[
								{
									'active-btn': skuArray[childrenItem.skuType] == childrenItem.skuId,
								},
								{
									'disabled-btn': childrenItem.disabled == true,
								}]" v-for="childrenItem in item.children" :key="childrenItem.skuId" :disabled="childrenItem.disabled == true"
								@click.stop="selectSku(childrenItem.skuType, childrenItem.skuId)">
								{{ childrenItem.name }}
							</button>
						</view>
					</view>
					<view class="buy-num-box">
						<view class="label-text">购买数量</view>
						<view>
							<uni-number-minbox :bgColor="bgColor" :min="1" :max="selectedSku.stock" :value="count"
								@change="change" />
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="specs-footer">
				<view v-if="!isScore" class="footer-box">
					<view v-if="goodType =='ordinary'" class="add-btn" @click.stop="add">
						加入购物车
					</view>
					<view v-if="goodType =='ordinary'" class="buy-btn" @click.stop="buy">
						立即购买
					</view>
					<view class="seckill-btn" v-if="goodType =='seckill'" @click.stop="buy">
						立即秒杀
					</view>
					<view class="seckill-btn" v-if="goodType =='group'" @click.stop="buy">
						立即团购
					</view>
					<view class="seckill-btn" v-if="goodType =='collage'" @click.stop="buy">
						立即拼团
					</view>
				</view>
				<view v-if="isScore" class="footer-box">
					<view class="score-btn" @click.stop="buy">
						立即兑换
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uninumberbox from "@/components/uni-number-minbox/uni-number-minbox.vue"
	/**
	 * sju-specs 商品规格弹窗
	 * @description 商品规格弹窗展示
	 * @property {Object} goodsInfo 商品信息
	 * @property {Array} skuList 商品规格列表
	 * @property {Array} priceList 商品价格列表
	 * @property {String} bgColor 背景颜色
	 * @property {String} goodType 商品类型
	 * @property {Boolean} isScore 是否积分商品
	 * @event {Function} show 弹窗展示
	 * @event {Function} hide 弹窗隐藏
	 * @event {Function} onChange 规格选择切换
	 * @event {Function} onAdd 加入购物车
	 * @event {Function} onBuy 立即购买
	 */
	export default {
		name: 'sju-specs',
		components: {
			uninumberbox
		},
		emits: ['show', 'hide', 'onChange', 'onAdd', 'onBuy'],
		props: {
			goodsInfo: {
				type: Object,
				default: () => {},
			},
			skuList: {
				type: Array,
				default: () => [],
			},
			priceList: {
				type: Array,
				default: () => [],
			},
			bgColor: {
				type: String,
				default: '#007AFF'
			},
			goodType: {
				type: String,
				default: 'ordinary'
			},
			isScore: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				isShow: false,
				count: 1,
				selectedSku: {},
				skuArray: []
			}
		},
		watch: {
			selectedSku: {
				handler(newVal, oldVal) {
					this.$emit('onChange', newVal)
				},
				immediate: true, // 立即执行
				deep: true, // 深度监听
			}
		},
		mounted() {
			this.priceList.forEach(item => {
				item.skuidList = item.skuIds.split(',')
			})
		},
		methods: {
			// 展示弹窗
			show() {
				this.isShow = true
				this.$emit('show')
			},
			// 隐藏弹窗
			hide() {
				this.isShow = false
				this.$emit('hide')
			},
			// 修改购买数量
			change(value) {
				if (value == 0)
					value = 1
				this.count = value
			},
			// 选择规格
			selectSku(skuType, skuId) {
				let isChecked = true
				if (this.skuArray[skuType] != undefined && this.skuArray[skuType] == skuId) {
					// 取消选择
					isChecked = false
					this.skuArray.splice(skuType, 1, '')
				} else {
					// 选择
					this.skuArray[skuType] = skuId
				}

				// 选中的规格大类
				let selectedSkuId = []
				this.skuArray.forEach(item => {
					if (item != '') {
						selectedSkuId.push(item)
					}
				})

				// 当前所选规格下，所有可以选择的 skuPric
				let newPrice = this.getCanSelectSku()

				// 判断所有规格大类是否选择完成
				if (selectedSkuId.length == this.skuList.length && newPrice.length) {
					// newPrice[0].goods_num = this.selectedSku.goods_num || 1
					newPrice[0].count = this.selectedSku.count || 1
					this.selectedSku = newPrice[0]
				} else {
					this.selectedSku = {}
				}

				// // 改变规格项禁用状态
				// this.changeDisabled(isChecked, skuType, skuId)
			},
			// 改变规格禁用状态
			changeDisabled(isChecked = false, skuType = 0, skuId = 0) {
				// 可以选择的规格列表
				let newPriceList = []
				if (isChecked) {
					// 当前选中规格下所有可用 priceList
					for (let item of this.priceList) {
						if (item.stock <= 0) {
							continue
						}
						if (item.skuidList.indexOf(skuId.toString()) >= 0) {
							newPriceList.push(item)
						}
					}
				} else {
					// 取消选中
					newPriceList = this.getCanSelectSku()
				}

				// 所有存在并且有库存未选择的规格项的规格Id
				let notSelectedSkuIds = []
				for (let item of newPriceList) {
					notSelectedSkuIds = notSelectedSkuIds.concat(item.skuidList)
				}

				// 数组去重
				notSelectedSkuIds = Array.from(new Set(notSelectedSkuIds))

				if (isChecked) {
					// 去除当前选中的规格项
					let index = notSelectedSkuIds.indexOf(skuId.toString())
					notSelectedSkuIds.splice(index, 1)
				} else {
					// 循环去除当前已选择的规格项
					this.skuArray.forEach(item => {
						if (item.toString() != '') {
							let index = notSelectedSkuIds.indexOf(item.toString())
							if (index >= 0) {
								// item 存在于 notSelectedSkuIds
								notSelectedSkuIds.splice(index, 1)
							}
						}
					})
				}

				// 当前已选择的规格大类
				let chooseSkuKey = []
				if (!isChecked) {
					// 当前已选择的规格大类
					this.skuArray.forEach((item, key) => {
						if (item != '') {
							chooseSkuKey.push(key)
						}
					})
				} else {
					// 当前点击选择的规格类型
					chooseSkuKey = [skuType]
				}

				for (let i in this.skuList) {
					// 当前点击的规格，或者取消选择时候 已选中的规格 不进行处理
					if (chooseSkuKey.indexOf(this.skuList[i]['skuId']) >= 0) {
						continue
					}

					for (let j in this.skuList[i]['children']) {
						if (notSelectedSkuIds.indexOf(this.skuList[i]['children'][j]['skuId'].toString()) >= 0) {
							this.skuList[i]['children'][j]['disabled'] = false
						} else {
							this.skuList[i]['children'][j]['disabled'] = true
						}
					}
				}
			},
			// 当前规格下, 获取可选择的规格
			getCanSelectSku() {
				let newPriceList = []
				for (let item of this.priceList) {
					if (item.stock <= 0) {
						continue
					}
					let canSelect = true
					this.skuArray.forEach(skuItem => {
						// 规格不为空并且这个规格没有被选中
						if (skuItem.toString() != '' && item.skuidList.indexOf(skuItem.toString()) < 0) {
							canSelect = false
						}
					})
					if (canSelect) {
						newPriceList.push(item)
					}
				}
				return newPriceList
			},
			// 添加购物车
			add() {
				if (this.selectedSku.goodsId) {
					if (this.selectedSku.stock <= 0) {
						uni.showToast({
							title: '商品库存不足',
							icon: 'none'
						})
					} else {
						this.$emit('onAdd', this.selectedSku)
					}
				} else {
					uni.showToast({
						title: '请选择商品规格',
						icon: 'none'
					})
				}
			},
			// 立即购买
			buy() {
				if (this.selectedSku.goodsId) {
					if (this.selectedSku.stock <= 0) {
						uni.showToast({
							title: '商品库存不足',
							icon: 'none'
						})
					} else {
						this.$emit('onBuy', this.selectedSku)
					}
				} else {
					uni.showToast({
						title: '请选择商品规格',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.specs-box {
		z-index: 998;
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		overflow-x: hidden;
		overflow-y: auto;
		background: rgba(0, 0, 0, .5);

		// 规格内容
		.specs-content {
			width: 100%;
			max-height: 70%;
			padding: 40upx 0 0;
			position: fixed;
			left: 0;
			bottom: 0;
			overflow-x: hidden;
			overflow-y: auto;
			background-color: #FFFFFF;
			border-radius: 20upx 20upx 0 0;
			transition: all .3s ease-in-out;

			// 顶部信息
			.specs-header {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 40upx;

				.specs-image {
					width: 160upx;
					height: 160upx;
					margin-right: 20upx;
					border-radius: 10upx;
				}

				.header-right {
					flex: 1;
					height: 160upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					// 商品名称
					.goods-name {
						font-size: 28upx;
						font-weight: 500;
						line-height: 42upx;
						min-width: 0;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					// 商品数据
					.goods-data {
						display: flex;
						align-items: center;
						flex-direction: row;
						justify-content: space-between;

						.item-left {
							display: flex;
							align-items: center;
							flex-direction: row;

							// 商品价格
							.goods-price {
								color: $price-color;
								font-size: 30upx;
								font-weight: 500;
							}

							// 积分
							.socre-box {
								height: 50upx;
								display: flex;
								align-items: center;
								flex-direction: row;

								.score-text {
									font-size: 30upx;
									font-weight: 500;
									color: $price-color;
								}

								.iconfont {
									color: $price-color;
								}
							}
						}

						// 库存数量
						.stock-data {
							color: #999999;
							font-size: 26upx;
							margin-left: 20upx;
						}
					}
				}
			}

			// 规格内容
			.sku-content {
				width: calc(100% - 80upx);
				padding: 0 40upx;

				.sku-content-scroll {
					width: 100%;
					max-height: 600upx;

					// 规格
					.specs-item {
						width: 100%;
						margin-bottom: 20upx;

						.label-text {
							font-size: 26upx;
							font-weight: 500;
							margin-bottom: 20upx;
						}

						.btn-box {
							width: 100%;
							display: flex;
							flex-wrap: wrap;
							flex-direction: row;
							align-items: center;
							justify-content: flex-start;

							.spec-btn {
								min-width: 100upx;
								height: 60upx;
								line-height: 60upx;
								padding: 0;
								margin: 0;
								color: #434343;
								font-size: 26upx;
								padding: 0 30upx;
								margin-right: 10upx;
								margin-bottom: 10upx;
								background: #f4f4f4;
								border-radius: 30upx;
							}

							.spec-btn::after {
								border: none;
							}

							.active-btn {
								color: #FFFFFF;
								background-color: var(--primary-color);
							}

							.disabled-btn {
								font-weight: 400;
								color: #c6c6c6;
								background: #f8f8f8;
							}
						}
					}

					// 购买数量
					.buy-num-box {
						width: 100%;
						height: 100upx;
						margin-bottom: 40upx;
						display: flex;
						align-items: center;
						flex-direction: row;
						justify-content: space-between;
					}
				}
			}

			// 规格底部
			.specs-footer {
				width: calc(100% - 80upx);
				padding: 0 40upx;
				border-top: 1upx solid #EEEEEE;

				.footer-box {
					padding: 20upx 0;
					display: flex;
					align-items: center;
					flex-direction: row;
					justify-content: center;

					.add-btn {
						width: 50%;
						height: 80upx;
						line-height: 80upx;
						text-align: center;
						border-radius: 40upx 0 0 40upx;
						color: var(--primary-color);
						background-color: var(--accent-color);
					}

					.buy-btn {
						width: 50%;
						height: 80upx;
						line-height: 80upx;
						text-align: center;
						border-radius: 0 40upx 40upx 0;
						color: #FFFFFF;
						background: linear-gradient(90deg, var(--primary-color), var(--assist-color));
					}
					
					.seckill-btn{
						width: 100%;
						height: 80upx;
						line-height: 80upx;
						text-align: center;
						color: #FFFFFF;
						border-radius: 40upx;
						background: linear-gradient(90deg, var(--primary-color), var(--assist-color));
					}

					.score-btn {
						width: 100%;
						margin: 0 20upx;
						height: 80upx;
						line-height: 80upx;
						text-align: center;
						border-radius: 40upx;
						color: #FFFFFF;
						background: linear-gradient(90deg, var(--primary-color), var(--assist-color));
					}
				}
			}
		}
	}
</style>
