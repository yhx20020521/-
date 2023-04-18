<template>
	<picker class="form-item-picker" 
		mode="multiSelector" 
		@click="init" 
		@change="changeAddress"
		@columnchange="columnChange" 
		:value="cityIndex" 
		:range="cityArray" 
		range-key="name">
		<view class="region-value">{{cityValue}}</view>
		<!-- <slot></slot> -->
	</picker>
</template>

<script>
	/**
	 * regionSelect 地区选择
	 * @description 地区三级联动选择
	 * @property {String} xxx  组件参数
	 * @event {Function} onClick 点击事件
	 */
	import geo from "./geo.json"
	export default {
		name: "regionSelect",
		props: {
			defaultIndex: {
				type: Array,
				default () {
					return []
					// return [0, 0, 0]
				}
			},
			defaultAddress: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				//城市
				cityData: [], //整理后的原始数据
				cityArray: [], //显示在picker的数据格式
				cityIndex: [0, 0, 0],
				cityCode: "",
				cityValue: ''
			};
		},
		mounted() {
			// 初始化地址
			this.init()
		},
		methods: {
			//初始化数据
			init() {
				if(this.defaultIndex.length >0) {
					this.cityIndex = this.defaultIndex
				}
				if(this.defaultAddress!=''){
					this.cityValue = this.defaultAddress
				}
				this.getCityData().then(res => {
					this.cityData = res.provinceData
					this.cityArray = res.cityArray
					if(this.cityValue!=''){
						this.getIndex('cityValue')
					} else if(this.defaultAddress!=''){
						this.getIndex('defaultAddress')
					} else {
						this.cityValue = '北京市市辖区东城区'
					}
				})
			},
			// 获取索引
			getIndex(type){
				let str = ''
				if(type =='defaultAddress') {
					str = this.defaultAddress
				} else {
					str = this.cityValue
				}
				let reg = /.+?(省|市|自治区|自治州|行政区|县|区)/g // 省市区的正则
				let addressList = str.match(reg)
				if( addressList[0].trim() == '北京市' 
					|| addressList[0].trim() == '天津市'
					|| addressList[0].trim() == '上海市' 
					|| addressList[0].trim() == '重庆市') 
				{
					let Regex = /.+?(市|市辖区|区)/g
					addressList = str.match(Regex)
				} else if( addressList[0].trim() == '香港特别行政区') {
					let Regex1 = /.+?(行政区|香港|界|岛|龙|区)/g
					addressList = str.match(Regex1)
				} else if( addressList[0].trim() == '澳门特别行政区' ) {
					let Regex2 = /.+?(行政区|岛|区)/g
					addressList = str.match(Regex2)
				}
				
				// 获取省市区索引
				let province = this.indexOfStr(this.cityData,addressList[0])
				let city = this.indexOfStr(this.cityData[province].children,addressList[1])
				let area = this.indexOfStr(this.cityData[province].children[city].children,addressList[2])
				
				// 设置显示在picker的第二列、第三列数据
				this.cityArray[1] = this.cityData[province].children
				this.cityArray[2] = this.cityData[province].children[city].children
				
				this.cityIndex = [province,city,area]
			},
			//选择城市
			changeAddress(e) {
				this.cityIndex = e.detail.value;
				const cityIndex = e.detail.value;
				const cityArray = this.cityArray;
				this.cityValue = cityArray[0][cityIndex[0]].name + cityArray[1][cityIndex[
					1]].name + (cityArray[2][cityIndex[2]] ? cityArray[2][cityIndex[2]]
					.name : '')
				this.cityCode = cityArray[2][cityIndex[2]] ? cityArray[2][cityIndex[2]].code : cityArray[1][cityIndex[1]].code
				
				this.$emit("changeRegion", {
					cityCode: this.cityCode,
					cityValue: this.cityValue,
					cityIndex: cityIndex
				})
			},
			columnChange(e) {
				let column = e.detail.column;
				let currentIndex = e.detail.value;
				
				const cityData = this.cityData;
				let cityArray = this.cityArray;
				switch (column) {
					case 0:
						let arrayIndex = this.indexOf(cityArray[0],cityArray[0][currentIndex])
						let cityList = cityData[arrayIndex].children
						let secondColumn = []; //存放第二列数据，即市的列
						let thirdColumn = []; //存放第三列数据，即县的列
						let areaList = [];
						for (let i = 0; i < cityList.length; i++) {
							secondColumn.push({
								"code": cityList[i].code,
								"name": cityList[i].name,
								'province': cityList[i].province,
								'city': cityList[i].city
							})
						}
						areaList = cityList[0].children
						if (areaList && areaList.length > 0) {
							for (let j = 0; j < areaList.length; j++) {
								thirdColumn.push({
									"code": areaList[j].code,
									"name": areaList[j].name,
									'province': areaList[j].province,
									'city': areaList[j].city,
									"area": areaList[j].area
								})
							}
						}
						this.cityArray[1] = secondColumn;
						this.cityArray[2] = thirdColumn;
						this.cityIndex = [currentIndex, 0, 0]
						break;
					case 1:
						let arrayIndex21 = this.indexOf(cityArray[0],cityArray[0][this.cityIndex[0]])
						let arrayIndex22 = this.indexOf(cityArray[1],cityArray[1][currentIndex])
						let thirdColumn2 = []; //存放第三列数据，即县的列
						let areaList2 = cityData[arrayIndex21].children[arrayIndex22].children;
						if (areaList2) {
							for (let j = 0; j < areaList2.length; j++) {
								thirdColumn2.push({
									"code": areaList2[j].code,
									"name": areaList2[j].name,
									'province': areaList2[j].province,
									'city': areaList2[j].city,
									"area": areaList2[j].area
								})
							}
						}

						this.cityArray[2] = thirdColumn2;
						this.cityIndex = [this.cityIndex[0], currentIndex, 0];
						break;
					case 2:
						//滑动右列
						this.cityIndex = [this.cityIndex[0], this.cityIndex[1], currentIndex]
						break;
				}
			},
			//三级地址数据
			getCityData() {
				return new Promise((resolve, reject) => {
					//定义三列空数组
					const cityArray = [
						[],
						[],
						[],
					]
					let provinceData = geo
					let cityList = []
					for (let i = 0; i < provinceData.length; i++) {
						cityArray[0].push({
							"code": provinceData[i].code,
							"name": provinceData[i].name,
							'province': provinceData[i].province
						})
						cityList = provinceData[this.cityIndex[0]].children
					}
					let areaList = []
					if (cityList && cityList.length > 0) {
						for (let j = 0; j < cityList.length; j++) {
							cityArray[1].push({
								"code": cityList[j].code,
								"name": cityList[j].name,
								'province': cityList[j].province,
								'city': cityList[j].city
							})
							areaList = cityList[this.cityIndex[1]].children
						}
					}
					if (areaList && areaList.length > 0) {
						for (let j = 0; j < areaList.length; j++) {
							cityArray[2].push({
								"code": areaList[j].code,
								"name": areaList[j].name,
								'province': areaList[j].province,
								'city': areaList[j].city,
								"area": areaList[j].area
							})
						}
					}
					resolve({
						cityArray,
						provinceData
					})
					uni.hideLoading();
				})
			},
			indexOf(arr, item) {
				if (Array.prototype.indexOf) {
					return arr.indexOf(item);
				} else {
					for (var i = 0; i < arr.length; i++) {
						if (arr[i] === item) {
							return i;
						}
					}
				}
				return -1;
			},
			indexOfStr(arr, str) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].name === str) {
						return i
					}
				}
				return -1
			}
		}
	}
</script>

<style lang="scss">
.form-item-picker{
	width:100%;
	height: 60upx;
	position: relative !important;
	.region-value {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		height: 60upx;
		line-height:60upx;
		font-size:28upx;
	}
}

</style>
