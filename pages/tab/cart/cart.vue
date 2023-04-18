<template>
	<view :style="Theme">
		<uni-nav-bar :statusBar="true" fixed="true"  title="购物车" />
		<!-- 提示信息 -->
		<view class="tip-box">
			<view class="tip-item" v-for="(item,index) in tipList" :key="index">
				<i :class="item.icon" class="iconfont tip-icon"></i>
				<view>{{item.name}}</view>
			</view>
		</view>
		
		<!-- 管理 -->
		<view class="manage-box">
			<view class="manage-count">
				商品数量
				<span>{{cartNum}}</span>
			</view>
			<view @click="editCancel" :class="[isEdit ? 'cancel-btn' : 'manage-btn']">
				{{ isEdit ? '取消' : '管理'}}
			</view>
		</view>
		
		<!-- 购物车列表 -->
		<view v-if="!isEmpty" class="list-box">
			<view class="list-item" v-for="(item,id) in cartList" :key="id">
				<!-- 商铺名称 -->
				<view class="shop-info">
					<!-- 选择商铺 -->
					<view class="choose-box">
						<radio color="var(--primary-color)"
						 :checked="item.checked" @click="storeCheck(id)" >
						</radio>
					</view>
					<image v-if="item.shopimage != ''" class="shop-image" :src="item.shopimage" mode="widthFix"></image>
					<i v-else class="iconfont icon-shop"></i>
					<view class="shop-name">{{item.shopName}}</view>
					<i class="iconfont icon-right"></i>
				</view>
				<!-- 商品列表 -->
				<view class="goods-list" v-for="(items,index) in item.goodsList" :key="index">
					<!-- 选择商品 -->
					<view class="choose-box">
						<radio color="var(--primary-color)"
						 :checked="items.checked" @click="checkClick(id,index)" >
						</radio>
					</view>
					<!-- 商品图片 -->
					<image class="goods-image" :src="items.image" mode="widthFix" ></image>
					<view class="goods-info">
						<view class="info-box">
							<view class="goods-name">
								{{items.name}}
							</view>
							<view class="goods-specs">
								{{items.specsName}}
							</view>
						</view>
						<!-- 商品价格、数量 -->
						<view class="price-count">
							<view class="price-box">
								￥{{items.current_price}}
							</view>
							<view class="goods-count">
								<uni-number-minbox bgColor="var(--primary-color)"
								:index='id' :childrenIndex="index"
								:min="1"  :value="items.goodsCount" @change="change" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 全选、结算 -->
		<view class="settlement-box">
			<view class="settlement-left">
				<radio color="var(--primary-color)"
				 :checked="isAll" @click="allCheck(isAll)" >
					全选
				</radio>
			</view>
			<!-- 结算 -->
			<view v-if="!isEdit" class="settlement-right">
				<view class="settlement-price">
					<view class="settlement-text">
						合计
					</view>
					<view class="price">
						¥{{price}}
					</view>
				</view>
				<view class="settlement-btn">
					结算
				</view>
			</view>
			<!-- 删除 -->
			<view v-if="isEdit" class="settlement-right">
				<view @click="deleteList()" class="settlement-btn delete-btn">
					删除
				</view>
			</view>
		</view>
		
		<!-- 空数据 -->
		<sju-empty v-if="isEmpty" iconColor="var(--primary-color)"></sju-empty>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Empty from '@/components/sju-empty/sju-empty.vue'
	import uninumberbox from "@/components/uni-number-minbox/uni-number-minbox.vue"
	import { cartList } from '@/mock/mock.js'
	export default {
		data() {
			return {
				Theme: '',
				cartNum: 0,
				//是否全选
				isAll: false,
				//是否为编辑状态
				isEdit: false,
				// 空数据
				isEmpty: false,
				price:0,
				// 提示列表
				tipList:[
					{
						icon:'icon-yes',
						name:'100%正品保证'
					},
					{
						icon:'icon-yes',
						name:'所有商品精挑细选'
					},
					{
						icon:'icon-yes',
						name:'售后无忧'
					}
				],
				cartList:[]
			}
		},
		components: {
			uniNavBar,
			Empty,
			uninumberbox
		},
		onLoad() {
			
		},
		onShow() {
			this.Theme = this.$store.state.Theme
			this.cartNum = this.$store.state.cartNum
			//设置 tabBar 选择颜色改为主题色
			uni.setTabBarStyle({
				selectedColor: this.Theme.split(/\;|\:/)[1],
			})
			// 设置tabBar图标
			if(this.sjuLogin.getValue('themeName') != '') {
				this.sjuTools.setTabBar()
			}
			// 设置购物车数量
			this.setcartNum()
			// 设置购物车数量
			this.$store.commit('setcartNum', 5)
			
			this.cartList = JSON.parse(JSON.stringify(cartList))
			this.isEmpty = false
			
		},
		methods: {
			// 设置tabBar购物车数量
			setcartNum(){
				if( this.$store.state.cartNum > 0) {
					let cartNum = this.$store.state.cartNum > 99 ? '99+' : this.$store.state.cartNum.toString()
					uni.setTabBarBadge({
					  index: 2,
					  text: cartNum
					})
				}
			},
			// 输入修改商品数量
			change(value,index,childrenIndex) {
				if(value == 0)
					value= 1
				this.cartList[index].goodsList[childrenIndex].goodsCount = value
				this.computeAmount()
			},
			// 边界、取消
			editCancel(){
				this.isEdit = !this.isEdit
			},
			// 全选
			allCheck(value) {
				// 是否空数据
				if (this.isEmpty) {
					this.isAll = !this.isAll
				} else {
					this.isAll = !this.isAll
					// 购物车列表
					this.cartList.map(item =>{
						item.checked = this.isAll
						// 商品列表
						item.goodsList.map( children => {
							children.checked = this.isAll
						})
					})
					this.computeAmount()
				}
			},
			// 单选
			checkClick(id,index){
				this.cartList[id].goodsList[index].checked = !this.cartList[id].goodsList[index].checked
				this.computeAmount()
				// 判断商铺下的商品全选
				for(let j in this.cartList[id].goodsList) {
					if(this.cartList[id].goodsList[j].checked == false) {
						this.cartList[id].checked = false
						return
					} else {
						this.cartList[id].checked = true
					}
				}
				// 判断购物车所有商品全选
				for(let i in this.cartList) {
					for(let j in this.cartList[i].goodsList) {
						if(this.cartList[i].goodsList[j].checked == false) {
							this.isAll = false
							return
						} else {
							this.isAll = true
						}
					}
				}
			},
			// 选择商铺
			storeCheck(id){
				// 商铺下的商品全选，取消商铺下的商品选择
				if(this.cartList[id].checked) {
					this.cartList[id].checked = false
					for(let j in this.cartList[id].goodsList) {
						this.cartList[id].goodsList[j].checked = false
					}
				} else {
					// 商铺下的商品未全选，全选商铺下的商品选择
					this.cartList[id].checked = true
					for(let j in this.cartList[id].goodsList) {
						this.cartList[id].goodsList[j].checked = true
					}
				}
				this.computeAmount()
			},
			// 计算金额
			computeAmount() {
				// 计算总金额
				this.price = 0
				this.cartList.map(item =>{
					// 商品列表
					item.goodsList.map( children => {
						if(children.checked){
							this.price = this.price + (+children.current_price) * children.goodsCount
						}
					})
				})
			},
			// 删除购物车数组
			deleteList(){
				this.cartList.map((item, i) => {
					item.goodsList.splice(item.goodsList.findIndex(item => item.checked == true))
					if(item.goodsList.length <=0) {
						this.cartList = this.cartList.filter(items => {
							return items.goodsList.length > 0
						})
					}
					// 判空
					if(this.cartList.length <= 0 ){
						this.isEmpty = true
						this.isAll = false
					} else {
						this.isEmpty = false
					}
					this.computeAmount()
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		padding-bottom: 220upx;
	}
	// 提示信息
	.tip-box{
		z-index: 10;
		width: calc(100% - 40upx);
		height: 80upx;
		padding: 0 20upx;
		position: fixed;
		left: 0;
		top:calc(88upx + var(--statusBarHeight));
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f5f5f5;
		.tip-item{
			color: #CCCCCC;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.tip-icon{
				display: block;
				margin:2upx 10upx 0 0;
				font-size: 30upx;
				color: #CCCCCC;
			}
		}
	}
	
	// 管理
	.manage-box{
		z-index: 10;
		width: calc(100% - 40upx);
		height: 80upx;
		padding: 0 20upx;
		position: fixed;
		left: 0;
		top:calc(168upx + var(--statusBarHeight));
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		
		// 购物车商品数量
		.manage-count{
			font-size: 28upx;
			font-weight: bold;
			span{
				color: $price-color;
			}
		}
		
		// 管理按钮
		.manage-btn{
			width: 120upx;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			border-radius: 10upx;
			// border: 1upx solid #EEEEEE;
		}
		// 取消
		.cancel-btn{
			width: 120upx;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			color: $price-color;
			border-radius: 10upx;
			// border: 1upx solid $price-color;
		}
	}
	
	// 购物车列表
	.list-box{
		width: 100%;
		margin-top: 188upx;
		
		// 商品项
		.list-item{
			width: calc(100% - 80upx);
			padding: 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin:0 20upx 20upx;
			
			// 商铺信息
			.shop-info{
				width: 100%;
				height: 80upx;
				display: flex;
				align-items: center;
				.choose-box{
					width: 60upx;
					display: flex;
					align-items: center;
					flex-shrink: 0;
					radio {
						transform:scale(0.7);
					}
				}
				.shop-image {
					width: 50upx;
				}
				.shop-name{
					height: 40upx;
					font-size: 28upx;
					margin-left: 10upx;
				}
				.iconfont{
					font-size: 40upx;
					color: var(--primary-color);
				}
				.icon-right{
					color: #CCCCCC;
				}
			}
			
			// 商品列表
			.goods-list{
				width: 100%;
				display: flex;
				margin-bottom: 20upx;
				.choose-box{
					width: 60upx;
					display: flex;
					align-items: center;
					flex-shrink: 0;
					radio {
						transform:scale(0.7);
					}
				}
				// 商品图片
				.goods-image{
					width: 200upx;
					margin: 0 20upx;
					border-radius: 10upx;
					flex-shrink: 0;
				}
				
				// 商品信息
				.goods-info{
					width: calc(100% - 300upx);
					display: flex;
					flex-direction: column;
					justify-content: space-between !important;
					.info-box{
						width: 100%;
						.goods-name{
							font-size: 28upx;
							color: #000000;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.goods-specs{
							margin: 10upx 0;
							font-size: 26upx;
							color: #CCCCCC;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
					
					// 价格、数量
					.price-count{
						width: 100%;
						height: 80upx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex-direction: row;
						
						.price-box{
							margin-right: 10upx;
							font-size: 32upx;
							color: $price-color;
							font-weight: bold;
						}
						
						// 商品数量
						.goods-count{
							width: 50%;
						}
					}
					
				}
			}
		}
	}
	
	// 全选、结算
	.settlement-box{
		z-index: 2;
		width: calc(100% - 40upx);
		height: 120upx;
		padding: 0 20upx;
		position: fixed;
		left: 0;
		bottom: 0;
		/* #ifdef H5 || APP */
			bottom: 100upx;
		/* #endif */
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #EEEEEE;
		// 左侧信息
		.settlement-left{
			radio {
				transform:scale(0.7);
			}
		}
		// 右侧信息
		.settlement-right{
			flex-shrink: 0;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			
			// 商品总价
			.settlement-price{
				padding: 0 10upx;
				margin-right: 20upx;
				display: flex;
				align-items: center;
				flex-direction: row;
				.settlement-text{
					margin-right: 10upx;
				}
				.price{
					font-size: 36upx;
					font-weight: bold;
					color: $price-color;
				}
			}
			// 结算
			.settlement-btn{
				width: 120upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 30upx;
				color: #FFFFFF;
				background-color: var(--primary-color);
			}
			
			// 删除
			.delete-btn{
				color: $price-color;
				border: 1upx solid $price-color;
				background-color: #FFFFFF;
			}
		}
	}
</style>
