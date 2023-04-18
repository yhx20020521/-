<template>
    <view>
        <view class="noData">
        	<i class="iconfont icon-noData" :style="{'color':iconColor}"></i>
        	<view class="text">{{emptyInfo || '暂无相关数据'}}</view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        props: {
			iconColor: {
				type: String,
				default: '#CCCCCC'
			},
            emptyInfo: {
            	type: String,
            	default: '没有相关数据'
            }
        },
        methods: {
			
		}
    }
</script>
<style lang="scss" scoped>
.noData{
	width: 100%;
	height: 400upx;
	margin: 300upx auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	.iconfont{
		font-size: 250upx;
		// color: var(--primary-color);
	}
	.text{
		height: 80upx;
		line-height: 80upx;
		color: #CCCCCC;
	}
}
</style>