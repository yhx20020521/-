const bannerList = [{
		imgUrl:'/static/banner/banner1.png'
	},
	{
		imgUrl:'/static/banner/banner2.png'
	},
	{
		imgUrl:'/static/banner/banner3.png'
	},
	{
		imgUrl:'/static/banner/banner4.png'
	}]
	
// 首页功能
const menuList = [
	{
		id:0,
		name:'会员中心',
		icon:'icon-vips',
		path: '/member/memberCenter',
		image:'/static/tool/nxbz.png'
	},
	{
		id:1,
		name:'积分兑换',
		icon:'icon-dui',
		path: '/exchange/exchangeList',
		image:'/static/tool/nxbz.png'
	},
	// {
	// 	id: 2,
	// 	name:'特惠专区',
	// 	icon:'icon-te',
	// 	path: '/coupon/couponCenter',
	// 	image:'/static/tool/nxbz.png'
	// },
	// {
	// 	id:3,
	// 	name:'精心商品',
	// 	icon:'icon-jing',
	// 	path: '/coupon/couponCenter',
	// 	image:'/static/tool/nxbz.png'
	// },
	{
		id:4,
		name:'领券中心',
		icon:'icon-quans',
		path: '/coupon/couponCenter',
		image:'/static/tool/nxbz.png'
	},
	{
		id:5,
		name:'游戏抽奖',
		icon:'icon-jiang',
		path: '/lottery/index',
		image:'/static/tool/nxbz.png'
	},
	{
		id:6,
		name:'每日签到',
		icon:'icon-qian',
		path: '/sign/signIn',
		image:'/static/tool/nxbz.png'
	},
	{
		id:7,
		name:'限时秒杀',
		icon:'icon-miao',
		path: '/goods/seckillList',
		image:'/static/tool/nxbz.png'
	},
	{
		id:8,
		name:'团购活动',
		icon:'icon-tuan',
		path: '/goods/collageList',
		image:'/static/tool/nxbz.png'
	},
	{
		id:9,
		name:'商铺列表',
		icon:'icon-dian',
		path: '/store/storeList',
		image:'/static/tool/nxbz.png'
	}
]
	
const goodsList = [
	{
		id: 1,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '219.00',
		current_price: '129.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 2,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '139.00',
		current_price: '99.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 1,
	},{
		id: 3,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '219.00',
		current_price: '129.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 4,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '139.00',
		current_price: '99.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 1,
	},{
		id: 5,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '168.00',
		current_price: '158.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 1,
	},{
		id: 6,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '68.00',
		current_price: '36.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	},{
		id: 7,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '68.00',
		current_price: '59.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 8,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '83.00',
		current_price: '78.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 1,
	},{
		id: 9,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '68.00',
		current_price: '48.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 1,
	},{
		id: 10,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '29.00',
		current_price: '19.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	},{
		id: 11,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '168.00',
		current_price: '160.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 12,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '89.00',
		current_price: '78.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	},{
		id: 13,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '1190.00',
		current_price: '1100.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 14,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '699.00',
		current_price: '599.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	},{
		id: 15,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '5899.00',
		current_price: '5800.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 16,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '3699.00',
		current_price: '3600.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	},{
		id: 17,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '4888.00',
		current_price: '4999.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 18,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '4888.00',
		current_price: '3600.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	},{
		id: 19,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '18200.00',
		current_price: '18200.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 20,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '8299.00',
		current_price: '8200.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	},{
		id: 21,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '288.00',
		current_price: '282.00',
		img: '/static/img/goods_thumb_21.png',
		is_special: 0,
	},{
		id: 22,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '188.00',
		current_price: '99.00',
		img: '/static/img/goods_thumb_22.png',
		is_special: 0,
	}]
	
// 商品信息
const productInfo = {
	id:1,
	// 商铺信息
	storeCode:'202207111039590001',
	storeName:'商店名称',
	storeimage:'/static/store.png',
	// 商品编号
	code: '16020023685645312',
	name: '新鲜土鸡蛋40枚整箱包邮农家散养',
	price: '80.00',
	current_price: '60.00',
	sellQty:10000,
	stockQty:1000,
	// 商品类型
	typeid:12,
	typename:'生鲜',
	// 商品轮播图
	imgList: [
		{
			imgUrl:'/static/img/product1.jpg'
		},
		{
			imgUrl:'/static/img/product2.jpg'
		},
		{
			imgUrl:'/static/img/product3.jpg'
		},
		{
			imgUrl:'/static/img/product4.jpg'
		}
	],
	content:`
		<img src="/static/img/product1.jpg" />
		<img src="/static/img/product2.jpg" />
		<img src="/static/img/product3.jpg" />
		<img src="/static/img/product4.jpg" />
	`,
	
}

// 商品规格
const skuList = [
    {
        id: 10,
        name: '规格类型1',
        goodsId: 1,
        children: [
            {
                skuId: 30,
				goodsId: 1,
				skuType: 10,
                name: '规格名称1'
            }
        ]
    },
    {
		id: 11,
		name: '规格类型2',
		goodsId: 1,
		children: [
            {
				skuId: 31,
				goodsId: 1,
				skuType: 11,
				name: '规格名称2'
            },
            {
            	skuId: 32,
            	goodsId: 1,
            	skuType: 11,
            	name: '规格名称3'
            },
			{
				skuId: 33,
				goodsId: 1,
				skuType: 11,
				name: '规格名称4'
			},
			{
				skuId: 34,
				goodsId: 1,
				skuType: 11,
				name: '规格名称5'
			}
        ]
    }
]

// 商品规格价格
const priceList = [
    {
        id: 1,
		goodsId: 1,
        skuIds: "30,31",
        skuText: [ "规格名称1","规格名称2" ],
        image: "/static/img/product1.jpg",
        stock: 50,
        price: "80.00",
        current_price: "60.00"
    },
    {
        id: 2,
    	goodsId: 1,
        skuIds: "30,32",
        skuText: [ "规格名称1","规格名称3" ],
        image: "/static/img/product2.jpg",
        stock: 40,
        price: "70.00",
        current_price: "55.00"
    },
	{
	    id: 3,
		goodsId: 1,
	    skuIds: "30,33",
	    skuText: [ "规格名称1","规格名称4" ],
	    image: "/static/img/product3.jpg",
	    stock: 30,
	    price: "60.00",
	    current_price: "50.00"
	},
	{
	    id: 4,
		goodsId: 1,
	    skuIds: "30,34",
	    skuText: [ "规格名称1","规格名称5" ],
	    image: "/static/img/product4.jpg",
	    stock: 20,
	    price: "50.00",
	    current_price: "40.00"
	},
]

// 商品参数
const paramList = [
	{
		title:'参数名称1',
		content:'参数内容1'
	},
	{
		title:'参数名称2',
		content:'参数内容2'
	},
	{
		title:'参数名称3',
		content:'参数内容3'
	},
	{
		title:'参数名称4',
		content:'参数内容4'
	},
	{
		title:'参数名称5',
		content:'参数内容5'
	},
	{
		title:'参数名称6',
		content:'参数内容6'
	}
]

// 商品评价列表
const evaluate ={
	count: 10000,
	list:[
		{
			id:1,
			code:'16020023685645312',
			image:'/static/my/user.jpg',
			name:'用户名称',
			date:'2022/07/12',
			score:4.5,
			content:'鸡蛋很新鲜，价格很划算，土鸡蛋很有营养，吃起来比普通鸡蛋香很多，客服态度也很好',
			imagesList:[
				'/static/img/product1.jpg',
				'/static/img/product2.jpg'
			]
		},
		{
			id:2,
			code:'16020023685645311',
			image:'/static/my/user.jpg',
			name:'用户名称',
			date:'2022/07/12',
			score:4.5,
			content:'鸡蛋很新鲜，价格很划算，土鸡蛋很有营养，吃起来比普通鸡蛋香很多，客服态度也很好',
			imagesList:[
				'/static/img/product1.jpg',
				'/static/img/product2.jpg',
				'/static/img/product3.jpg'
			]
		},
		{
			id:3,
			code:'16020023685645315',
			image:'/static/my/user.jpg',
			name:'用户名称',
			date:'2022/07/12',
			score:5,
			content:'鸡蛋很新鲜，价格很划算，土鸡蛋很有营养，吃起来比普通鸡蛋香很多，客服态度也很好',
			imagesList:[
				'/static/img/product1.jpg',
				'/static/img/product2.jpg',
				'/static/img/product3.jpg',
				'/static/img/product1.jpg'
			]
		},
		{
			id:4,
			code:'16020023685645316',
			image:'/static/my/user.jpg',
			name:'用户名称',
			date:'2022/07/12',
			score:3,
			content:'鸡蛋很新鲜，价格很划算，土鸡蛋很有营养，吃起来比普通鸡蛋香很多，客服态度也很好',
			imagesList:[
				'/static/img/product1.jpg',
				'/static/img/product2.jpg',
				'/static/img/product3.jpg',
				'/static/img/product2.jpg',
				'/static/img/product3.jpg'
			]
		}
	]
}


// 商品分类
const typeList = [{
		code: 1,
		name: '商品分类1',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			},
			{
				id: 13,
				name: '二级分类13',
				image: "/static/category.png"
			},
			{
				id: 14,
				name: '二级分类14',
				image: "/static/category.png"
			},
			{
				id: 15,
				name: '二级分类15',
				image: "/static/category.png"
			},
			{
				id: 16,
				name: '二级分类16',
				image: "/static/category.png"
			},
			{
				id: 17,
				name: '二级分类17',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 2,
		name: '商品分类2',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			},
			{
				id: 13,
				name: '二级分类13',
				image: "/static/category.png"
			},
			{
				id: 14,
				name: '二级分类14',
				image: "/static/category.png"
			},
			{
				id: 15,
				name: '二级分类15',
				image: "/static/category.png"
			},
			{
				id: 16,
				name: '二级分类16',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 3,
		name: '商品分类3',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			},
			{
				id: 13,
				name: '二级分类13',
				image: "/static/category.png"
			},
			{
				id: 14,
				name: '二级分类14',
				image: "/static/category.png"
			},
			{
				id: 15,
				name: '二级分类15',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 4,
		name: '商品分类4',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			},
			{
				id: 13,
				name: '二级分类13',
				image: "/static/category.png"
			},
			{
				id: 14,
				name: '二级分类14',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 5,
		name: '商品分类5',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			},
			{
				id: 13,
				name: '二级分类13',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 6,
		name: '商品分类6',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 7,
		name: '商品分类7',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 8,
		name: '商品分类8',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 9,
		name: '商品分类9',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 10,
		name: '商品分类10',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 11,
		name: '商品分类11',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 12,
		name: '商品分类12',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 13,
		name: '商品分类13',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 14,
		name: '商品分类14',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 15,
		name: '商品分类15',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 16,
		name: '商品分类16',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	},
	{
		code: 17,
		name: '商品分类17',
		children:[
			{
				id: 1,
				name: '二级分类1',
				image:"/static/category.png" 
			},
			{
				id: 2,
				name: '二级分类2',
				image: "/static/category.png"
			},
			{
				id: 3,
				name: '二级分类3',
				image: "/static/category.png"
			},
			{
				id: 4,
				name: '二级分类4',
				image: "/static/category.png"
			},
			{
				id: 5,
				name: '二级分类5',
				image: "/static/category.png"
			},
			{
				id: 6,
				name: '二级分类6',
				image: "/static/category.png"
			},
			{
				id: 7,
				name: '二级分类7',
				image: "/static/category.png"
			},
			{
				id: 8,
				name: '二级分类8',
				image: "/static/category.png"
			},
			{
				id: 9,
				name: '二级分类9',
				image: "/static/category.png"
			},
			{
				id: 10,
				name: '二级分类10',
				image: "/static/category.png"
			},
			{
				id: 11,
				name: '二级分类11',
				image: "/static/category.png"
			},
			{
				id: 12,
				name: '二级分类12',
				image: "/static/category.png"
			}
		]
	}
	]
	
// 地址列表
const addressList = [
	{
		code:1,
		userName: '用户名称1',
		userPhone: '18888888888',
		tag:true,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:2,
		userName: '用户名称2',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:3,
		userName: '用户名称3',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:4,
		userName: '用户名称4',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:5,
		userName: '用户名称5',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:6,
		userName: '用户名称6',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:7,
		userName: '用户名称7',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:8,
		userName: '用户名称8',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:9,
		userName: '用户名称9',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:10,
		userName: '用户名称10',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:11,
		userName: '用户名称11',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:12,
		userName: '用户名称10',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	},
	{
		code:13,
		userName: '用户名称13',
		userPhone: '18888888888',
		tag:false,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	}
]

// 我的优惠券列表
const couponList = [
	{
		id: 1,
		code: '6900001',
		name: '￥50',
		value: '50',
		limitAmount: 300,
		describe: '满300元减50元',
		type: 1,
		typeName: '限品类券',
		title: '仅可购买酒水部分商品',
		date: '2022/03/09-2022/03/15'
	},
	{
		id: 2,
		code: '6900002',
		name: '￥50',
		value: '50',
		limitAmount: 300,
		describe: '满300元减50元',
		type: 2,
		typeName: '全品类券',
		title: '可购买全品类商品',
		date: '2022/03/09-2022/03/15'
	},
	{
		id: 3,
		code: '6900003',
		name: '98折',
		value: '0.98',
		limitAmount: 10,
		describe: '满10元98折',
		type: 3,
		typeName: '折扣券',
		title: '可购买全品类商品',
		date: '2022/03/09-2022/03/15'
	},
	{
		id: 4,
		code: '6900004',
		name: '￥50',
		value: '50',
		limitAmount: 300,
		describe: '满300元减50元',
		type: 4,
		typeName: '通用券',
		title: '可购买全品类商品',
		date: '2022/03/09-2022/03/15'
	},
	{
		id: 5,
		code: '6900005',
		name: '￥6',
		value: '6',
		limitAmount: 0,
		describe: '运费优惠6元',
		type: 5,
		typeName: '运费券',
		title: '商城部分自营商品',
		date: '2022/03/09-2022/03/15'
	},
	{
		id: 6,
		code: '6900006',
		name: '￥50',
		value: '50',
		limitAmount: 300,
		describe: '满50元减50元',
		type: 6,
		typeName: '立减券',
		title: '商城部分自营商品',
		date: '2022/03/09-2022/03/15'
	}
]

// 优惠券中心
const couponCenterList = [
	{
		id: 1,
		code: '6900001',
		name: '￥50',
		value: '50',
		limitAmount: 300,
		describe: '满300元减50元',
		type: 1,
		typeName: '限品类券',
		title: '仅可购买酒水部分商品',
		limitType:'10',
		date: '2022/03/09-2022/03/15',
		isReceive:true
	},
	{
		id: 2,
		code: '6900002',
		name: '￥50',
		value: '50',
		limitAmount: 300,
		describe: '满300元减50元',
		type: 2,
		typeName: '全品类券',
		title: '可购买全品类商品',
		limitType:'',
		date: '2022/03/09-2022/03/15',
		isReceive:false
	},
	{
		id: 3,
		code: '6900003',
		name: '98折',
		value: '0.98',
		limitAmount: 10,
		describe: '满10元减98折',
		type: 3,
		typeName: '折扣券',
		title: '可购买全品类商品',
		limitType:'',
		date: '2022/03/09-2022/03/15',
		isReceive:false
	},
	{
		id: 4,
		code: '6900004',
		name: '￥50',
		value: '50',
		limitAmount: 300,
		describe: '满300元减50元',
		type: 4,
		typeName: '通用券',
		title: '可购买全品类商品',
		limitType:'',
		date: '2022/03/09-2022/03/15',
		isReceive:false
	},
	{
		id: 5,
		code: '6900005',
		name: '￥6',
		value: '6',
		limitAmount: 0,
		describe: '运费优惠6元',
		type: 5,
		typeName: '运费券',
		title: '商城部分自营商品',
		limitType:'-2',
		date: '2022/03/09-2022/03/15',
		isReceive:false
	},
	{
		id: 6,
		code: '6900006',
		name: '￥50',
		value: '50',
		limitAmount: 50,
		describe: '满50元减50元',
		type: 6,
		typeName: '立减券',
		title: '商城部分自营商品',
		limitType:'-1',
		date: '2022/03/09-2022/03/15',
		isReceive:false
	}
]

// 订单列表
const orderList = [
	{
		id:1,
		orderCode:'16020023685645311',
		shopCode:'202207111039590001',
		shopName:'商店名称',
		shopimage:'/static/store.png',
		orderStatus:'待付款',
		statusId:1,
		goodsTotal:1,
		totalMoney:129.00,
		orderFreight:10.00,
		couponPrice:20.00,
		realPayment:119.00,
		goodList:[
			{
				id:1,
				code:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				count:1,
				specsId:12,
				specsName:'规格类型 规格名称 '
			}
		]
	},
	{
		id:2,
		orderCode:'16020023685645310',
		shopCode:'202207111039590001',
		shopName:'商店名称1',
		shopimage:'/static/store.png',
		orderStatus:'待付款',
		statusId:1,
		goodsTotal:2,
		totalMoney:258.00,
		orderFreight:10.00,
		couponPrice:20.00,
		realPayment:248.00,
		goodList:[
			{
				id:1,
				code:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				count:1,
				specsId:12,
				specsName:'规格类型 规格名称'
			},
			{
				id:1,
				code:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				count:1,
				specsId:12,
				specsName:'规格类型 规格名称'
			}
		]
	}
]

// 订单详情
const orderInfo = {
	id:1,
	orderCode:'16020023685645310',
	shopCode:'202207111039590001',
	shopName:'商店名称1',
	shopimage:'/static/store.png',
	createTime:'2022/07/11 12:00:00',
	payTime:'2022/07/11 12:01:00',
	deliveryTime:'2022/07/12 12:01:00',
	receiptTime:'2022/07/15 12:01:00',
	orderStatus:'待付款',
	statusId:1,
	goodsTotal:2,
	totalMoney:258.00,
	orderFreight:10.00,
	couponPrice:20.00,
	realPayment:248.00,
	goodList:[
		{
			id:1,
			code:'16020023685645300',
			name: '2022 新版电商案例商品名称',
			image:'/static/img/goods_thumb_22.png',
			price: '219.00',
			current_price: '129.00',
			count:1,
			specsId:12,
			specsName:'规格类型 规格名称'
		},
		{
			id:1,
			code:'16020023685645300',
			name: '2022 新版电商案例商品名称',
			image:'/static/img/goods_thumb_22.png',
			price: '219.00',
			current_price: '129.00',
			count:1,
			specsId:12,
			specsName:'规格类型 规格名称'
		}
	],
	addressInfo:{
		code:1,
		userName: '用户名称1',
		userPhone: '18888888888',
		tag:true,
		region:'江苏省南京市雨花台区',
		address:'铁心桥街道龙西路6号1101室'
	}
}


const collectList =[
	{
		id:1,
		code:'16020023685645300',
		name: '2022 新版电商案例商品名称',
		image:'/static/img/goods_thumb_21.png',
		price: '219.00',
		current_price: '129.00',
		shopCode:'202207111039590001',
		shopName:'商店名称1',
		specsId:12,
		specsName:'规格类型 规格名称'
	},
	{
		id:1,
		code:'16020023685645300',
		name: '2022 新版电商案例商品名称',
		image:'/static/img/goods_thumb_22.png',
		price: '219.00',
		current_price: '129.00',
		shopCode:'202207111039590001',
		shopName:'商店名称1',
		specsId:12,
		specsName:'规格类型 规格名称'
	},
	{
		id:1,
		code:'16020023685645300',
		name: '2022 新版电商案例商品名称',
		image:'/static/img/goods_thumb_21.png',
		price: '219.00',
		current_price: '129.00',
		shopCode:'202207111039590001',
		shopName:'商店名称1',
		specsId:12,
		specsName:'规格类型 规格名称'
	}
]

const concernList = [
	{
		id:1,
		code:'202207220930010001',
		name:'商铺名称',
		image:'/static/img/shopLogo.png',
		concern:1111,
		score:4.5,
		count:100,
		flagship:true,
		proprietary:false
	},
	{
		id:2,
		code:'202207220930010002',
		name:'商铺名称2',
		image:'/static/img/shopLogo.png',
		concern:1111,
		score:4.5,
		count:100,
		flagship:false,
		proprietary:true
	},
	{
		id:3,
		code:'202207220930010003',
		name:'商铺名称3',
		image:'/static/img/shopLogo.png',
		concern:1111,
		score:4.5,
		count:100,
		flagship:false,
		proprietary:false
	}
]

const cartList = [
	{
		id:1,
		cartcode:'16020023685645300',
		shopId: 1,
		shopCode:'202207111039590001',
		shopName:'商店名称1',
		shopimage:'/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				score:100,
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				score:100,
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
		
	},
	{
		id:2,
		cartcode:'16020023685645302',
		shopId: 2,
		shopCode:'202207111039590002',
		shopName:'商店名称2',
		shopimage:'/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				score:100,
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			}
		]
	},
	{
		id:3,
		cartcode:'16020023685645303',
		shopId: 3,
		shopCode:'202207111039590003',
		shopName:'商店名称3',
		shopimage:'/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				score:100,
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.13',
				current_price: '129.12',
				score:100,
				specsId:11,
				specsName:'规格类型 规格名称',
				goodsCount:1,
				checked:false
			},
			{
				goodsCode:'16020023685645305',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.12',
				current_price: '129.13',
				score:100,
				specsId:13,
				specsName:'规格类型 规格名称',
				goodsCount:1,
				checked:false
			}
		]
		
	}
]

const logisticsInfo = {
	delivery_status: 1, //快递状态 1已签收 2配送中
	post_name: '韵达快递', //快递名称
	logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
	exp_phone: '95546', //快递电话
	post_no: '4304670552325', //快递单号
	addr: '江苏省南京市雨花台区铁心桥街道龙西路6号1101室', //收货地址
	//物流信息
	list: [
		{
			"time": "2022-04-12 13:00:57",
			"timeArr": ['2022-04-12', '13:00:57'],
			"context": "江苏省南京市雨花台区铁心桥街道龙西路6号1101室 快件已被 丰巢智能柜 代签收。",
			"location": ""
		},
		{
			"time": "2022-04-12 12:58:53",
			"timeArr": ['2022-04-12', '12:58:53'],
			"context": "江苏省南京市雨花台区 进行派件扫描；派送业务员：张三；联系电话：18888888888",
			"location": ""
		},
		{
			"time": "2022-04-11 15:45:44",
			"timeArr": ['2022-04-11', '15:45:44'],
			"context": "江苏省南京市分拨中心 从站点发出，本次转运目的地：江苏省南京市雨花台区",
			"location": ""
		},
		{
			"time": "2022-04-11 15:08:45",
			"timeArr": ['2022-04-11', '15:08:45'],
			"context": "江苏省南京市分拨中心 在分拨中心进行卸车扫描",
			"location": ""
		},
		{
			"time": "2022-04-10 17:42:41",
			"timeArr": ['2022-04-10', '17:42:41'],
			"context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
			"location": ""
		},
		{
			"time": "2022-04-10 17:39:38",
			"timeArr": ['2022-04-10', '17:39:38'],
			"context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
			"location": ""
		},
		{
			"time": "2022-04-10 16:02:46",
			"timeArr": ['2022-04-10', '16:02:46'],
			"context": "浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包",
			"location": ""
		},
		{
			"time": "2022-04-10 15:48:42",
			"timeArr": ['2022-04-10', '15:48:42'],
			"context": "浙江义乌城西公司城西营销部 进行揽件扫描",
			"location": ""
		}
	]
}

// 店铺列表
const storeList =[
	{
		id: 0,
		storeCode:'69384270700121',
		storeName:'商铺名称1',
		storeLevel: 5,
		storeCredit: 5,
		storeScore:5,
		flagship:true,
		proprietary:false,
		image: '/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
	},
	{
		id: 1,
		storeCode:'69384270700111',
		storeName:'商铺名称2',
		storeLevel: 5,
		storeCredit: 5,
		storeScore:5,
		flagship:true,
		proprietary:false,
		image: '/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
	},
	{
		id: 2,
		storeCode:'69384270700122',
		storeName:'商铺名称2',
		storeLevel: 5,
		storeCredit: 5,
		storeScore:5,
		flagship:true,
		proprietary:false,
		image: '/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
	},
	{
		id: 0,
		storeCode:'69384270700121',
		storeName:'商铺名称1',
		storeLevel: 5,
		storeCredit: 5,
		storeScore:5,
		flagship:true,
		proprietary:false,
		image: '/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
	},
	{
		id: 3,
		storeCode:'69384270700123',
		storeName:'商铺名称3',
		storeLevel: 5,
		storeCredit: 5,
		storeScore:5,
		flagship:true,
		proprietary:false,
		image: '/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
	},
	{
		id: 4,
		storeCode:'69384270700124',
		storeName:'商铺名称4',
		storeLevel: 5,
		storeCredit: 5,
		storeScore:5,
		flagship:true,
		proprietary:false,
		image: '/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
	},
	{
		id: 5,
		storeCode:'69384270700125',
		storeName:'商铺名称5',
		storeLevel: 5,
		storeCredit: 5,
		storeScore:5,
		flagship:true,
		proprietary:false,
		image: '/static/store.png',
		goodsList:[
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称 ',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			},
			{
				goodsCode:'16020023685645300',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_22.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:2,
				checked:false
			},
			{
				goodsCode:'16020023685645301',
				name: '2022 新版电商案例商品名称',
				image:'/static/img/goods_thumb_21.png',
				price: '219.00',
				current_price: '129.00',
				specsId:12,
				specsName:'规格类型 规格名称',
				goodsCount:3,
				checked:false
			}
		]
	}
]

const storeInfo = {
	id:1,
	storeCode:'202207220930010001',
	storeName:'商铺名称',
	image:'/static/img/shopLogo.png',
	concern:1111,
	count:100,
	storeLevel: 5,
	storeCredit: 5,
	storeScore:4.5,
	isConcern:true,
	flagship:true,
	proprietary:false
}

const pointsList =[
	{
		code: 1223123,
		title: '商城购物',
		count: '-199',
		date: '2022/11/11 12:00:00',
		remainder:401,
		type:'use'
	},
	{
		code: 1223124,
		title: '签到',
		count: '99',
		date: '2022/11/11 12:00:00',
		remainder:699,
		type:'add'
	},
	{
		code: 1223134,
		title: '订单评价',
		count: '99',
		date: '2022/11/11 12:00:00',
		remainder:600,
		type:'add'
	},
	{
		code: 1223234,
		title: '商城购物',
		count: '-999',
		date: '2022/11/11 12:00:00',
		remainder:501,
		type:'use'
	},
	{
		code: 1233234,
		title: '游戏抽奖',
		count: '+500',
		date: '2022/11/11 12:00:00',
		remainder:1500,
		type:'add'
	},
	{
		code: 1033234,
		title: '系统充值',
		count: '+500',
		date: '2022/11/11 12:00:00',
		remainder:1000,
		type:'add'
	},
	{
		code: 1933234,
		title: '系统充值',
		count: '+500',
		date: '2022/11/11 12:00:00',
		remainder:500,
		type:'add'
	}
]

// 余额明细
const balanceList =[
	{
		code: 1223123,
		title: '商城购物',
		count: '-199',
		date: '2022/11/11 12:00:00',
		remainder:401,
		type:'use'
	},
	{
		code: 1223124,
		title: '签到',
		count: '99',
		date: '2022/11/11 12:00:00',
		remainder:699,
		type:'add'
	},
	{
		code: 1223134,
		title: '订单评价',
		count: '99',
		date: '2022/11/11 12:00:00',
		remainder:600,
		type:'add'
	},
	{
		code: 1223234,
		title: '商城购物',
		count: '-999',
		date: '2022/11/11 12:00:00',
		remainder:501,
		type:'use'
	},
	{
		code: 1233234,
		title: '游戏抽奖',
		count: '+500',
		date: '2022/11/11 12:00:00',
		remainder:1500,
		type:'add'
	},
	{
		code: 1033234,
		title: '系统充值',
		count: '+500',
		date: '2022/11/11 12:00:00',
		remainder:1000,
		type:'add'
	},
	{
		code: 1933234,
		title: '系统充值',
		count: '+500',
		date: '2022/11/11 12:00:00',
		remainder:500,
		type:'add'
	}
]

const lotteryList = [
	{
		id: 1,
		lotteryType: '积分',
		lotteryName: '20积分',
		lotteryDate: '2022/11/11 12:00:00'
	},
	{
		id: 2,
		lotteryType: '积分',
		lotteryName: '100积分',
		lotteryDate: '2022/11/11 12:00:00'
	},
	{
		id: 3,
		lotteryType: '积分',
		lotteryName: '10积分',
		lotteryDate: '2022/11/11 12:00:00'
	},
	{
		id: 4,
		lotteryType: '积分',
		lotteryName: '50积分',
		lotteryDate: '2022/11/11 12:00:00'
	},
	{
		id: 5,
		lotteryType: '优惠券',
		lotteryName: '5元',
		lotteryDate: '2022/11/11 12:00:00'
	},
	{
		id: 6,
		lotteryType: '谢谢参与',
		lotteryName: '谢谢参与',
		lotteryDate: '2022/11/11 12:00:00'
	}
]

const serviceList = [
	{
		title:'正品保障',
		content:'正品保障，假一赔四'
	},
	{
		title:'七天无理由退换',
		content:'满足相应条件,可享受“七天无理由退换货”,包邮商品需要买家承担退货运费,非包邮商品需要买家承担发货和退货运费'
	},
	{
		title:'运费险',
		content:'卖家为您购买的商品投保退货运费险'
	}
]

const issuesList = [
	{
		id: 1,
		title: '常见问题1',
		content:`问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容1`
	},
	{
		id: 2,
		title: '常见问题2',
		content:`问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容2`
	},
	{
		id: 3,
		title: '常见问题3',
		content:`问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容3`
	},
	{
		id: 4,
		title: '常见问题4',
		content:`问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容4`
	},
	{
		id: 5,
		title: '常见问题5',
		content:`问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容
		问题内容问题内容问题内容问题内容问题内容5`
	}
]

// 积分商品列表
const scoreGoodsList = [
	{
		id: 1,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '219.00',
		current_price: '29.00',
		score: 300,
		img: '/static/img/goods_thumb_21.png',
	},{
		id: 2,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '139.00',
		current_price: '9.00',
		score: 200,
		img: '/static/img/goods_thumb_22.png',
	},{
		id: 3,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '219.00',
		current_price: '129.00',
		score: 200,
		img: '/static/img/goods_thumb_22.png',
	},{
		id: 4,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '139.00',
		current_price: '99.00',
		score: 200,
		img: '/static/img/goods_thumb_21.png',
	},{
		id: 5,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '168.00',
		current_price: '158.00',
		score: 200,
		img: '/static/img/goods_thumb_22.png',
	},{
		id: 6,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '68.00',
		current_price: '36.00',
		score: 50,
		img: '/static/img/goods_thumb_21.png',
	},{
		id: 7,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '68.00',
		current_price: '19.00',
		score: 50,
		img: '/static/img/goods_thumb_21.png',
	},{
		id: 8,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '83.00',
		current_price: '18.00',
		score: 50,
		img: '/static/img/goods_thumb_22.png',
	},{
		id: 9,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '68.00',
		current_price: '28.00',
		score: 40,
		img: '/static/img/goods_thumb_22.png',
	},{
		id: 10,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '29.00',
		current_price: '0.00',
		score: 29,
		img: '/static/img/goods_thumb_21.png',
	},{
		id: 11,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '168.00',
		current_price: '0.00',
		score: 200,
		img: '/static/img/goods_thumb_22.png',
	},{
		id: 12,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '89.00',
		current_price: '19.00',
		score: 70,
		img: '/static/img/goods_thumb_22.png',
	},{
		id: 13,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '1190.00',
		current_price: '0.00',
		score: 1200,
		img: '/static/img/goods_thumb_21.png',
	}
]

// 积分商品信息
const scoreGoodsInfo = {
	id:1,
	// 商铺信息
	storeCode:'202207111039590001',
	storeName:'商店名称',
	storeimage:'/static/store.png',
	// 商品编号
	code: '16020023685645312',
	name: '新鲜土鸡蛋40枚整箱包邮农家散养',
	price: '80.00',
	current_price: '5.00',
	score: 100,
	sellQty:10000,
	stockQty:1000,
	// 商品类型
	typeid:12,
	typename:'生鲜',
	// 商品轮播图
	imgList: [
		{
			imgUrl:'/static/img/product1.jpg'
		},
		{
			imgUrl:'/static/img/product2.jpg'
		},
		{
			imgUrl:'/static/img/product3.jpg'
		},
		{
			imgUrl:'/static/img/product4.jpg'
		}
	],
	content:`
		<img src="/static/img/product1.jpg" />
		<img src="/static/img/product2.jpg" />
		<img src="/static/img/product3.jpg" />
		<img src="/static/img/product4.jpg" />
	`,
	
}

// 积分商品规格价格
const scorePriceList = [
    {
        id: 1,
		goodsId: 1,
        skuIds: "30,31",
        skuText: [ "规格名称1","规格名称2" ],
        image: "/static/img/product1.jpg",
        stock: 50,
        price: "80.00",
        current_price: "5.00",
		score: 100
    },
    {
        id: 2,
    	goodsId: 1,
        skuIds: "30,32",
        skuText: [ "规格名称1","规格名称3" ],
        image: "/static/img/product2.jpg",
        stock: 40,
        price: "70.00",
        current_price: "5.00",
		score: 90
    },
	{
	    id: 3,
		goodsId: 1,
	    skuIds: "30,33",
	    skuText: [ "规格名称1","规格名称4" ],
	    image: "/static/img/product3.jpg",
	    stock: 30,
	    price: "60.00",
	    current_price: "5.00",
		score: 80
	},
	{
	    id: 4,
		goodsId: 1,
	    skuIds: "30,34",
	    skuText: [ "规格名称1","规格名称5" ],
	    image: "/static/img/product4.jpg",
	    stock: 20,
	    price: "50.00",
	    current_price: "5.00",
		score: 70
	},
]

// 时间列表
const timeList = [
	{
		time:'07:00',
		start:0,
		end:7
	},
	{
		time:'8:00',
		start:8,
		end:9
	},
	{
		time:'10:00',
		start:10,
		end:11
	},
	{
		time:'12:00',
		start:12,
		end:13
	},
	{
		time:'14:00',
		start:14,
		end:15
	},
	{
		time:'16:00',
		start:16,
		end:17
	},
	{
		time:'18:00',
		start:18,
		end:19
	},
	{
		time:'20:00',
		start:20,
		end:21
	},
	{
		time:'22:00',
		start:22,
		end:23
	}
]

// 时间列表
const seckillList = [
	{
		id: 1,
		code:'16020023685645312',
		name: '2022 新版电商案例商品名称',
		price: '219.00',
		current_price: '129.00',
		img: '/static/img/goods_thumb_21.png',
		bar_width: '80%'
	},
	{
		id: 2,
		code:'16020023685645313',
		name: '2022 新版电商案例商品名称',
		price: '219.00',
		current_price: '129.00',
		img: '/static/img/goods_thumb_21.png',
		bar_width: '70%'
	},
	{
		id: 2,
		code:'16020023685645314',
		name: '2022 新版电商案例商品名称',
		price: '219.00',
		current_price: '129.00',
		img: '/static/img/goods_thumb_21.png',
		bar_width: '90%'
	}
]

export {
	bannerList,
	menuList,
	goodsList,
	productInfo,
	skuList,
	priceList,
	paramList,
	evaluate,
	typeList,
	addressList,
	couponList,
	couponCenterList,
	orderList,
	orderInfo,
	logisticsInfo,
	collectList,
	concernList,
	cartList,
	storeList,
	storeInfo,
	pointsList,
	balanceList,
	lotteryList,
	serviceList,
	issuesList,
	scoreGoodsList,
	scoreGoodsInfo,
	scorePriceList,
	timeList,
	seckillList
}