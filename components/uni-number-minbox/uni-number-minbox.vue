<template>
	<view class="uni-numbox">
		<view @click.stop="_calcValue('minus')" class="uni-numbox__minus uni-cursor-point">
			<text class="uni-numbox--text" style="color: #999999;" :class="{ 'uni-numbox--disabled': inputValue <= min || disabled }">-</text>
		</view>
		<input :disabled="disabled" @click.stop.native="_onFocus" @blur="_onBlur" class="uni-numbox__value" type="number" v-model="inputValue" />
		<view @click.stop="_calcValue('plus')" 
		:style="{'background-color': bgColor}"
		class="uni-numbox__plus uni-cursor-point">
			<text class="uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue >= max || disabled }">+</text>
		</view>
	</view>
</template>
<script>
	/**
	 * NumberBox 数字输入框
	 * @description 带加减按钮的数字输入框
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=31
	 * @property {Number} value 输入框当前值
	 * @property {Number} min 最小值
	 * @property {Number} max 最大值
	 * @property {Number} step 每次点击改变的间隔大小
	 * @property {Boolean} disabled = [true|false] 是否为禁用状态
	 * @event {Function} change 输入框值改变时触发的事件，参数为输入框当前的 value
	 */

	export default {
		name: "UniNumberMinBox",
		emits: ['change', 'input', 'update:modelValue', 'blur', 'focus'],
		props: {
			bgColor:{
				type: String,
				default: '#007AFF'
			},
			index:{
				type: [Number, String],
				default: 0
			},
			childrenIndex:{
				type: [Number, String],
				default: 0
			},
			value: {
				type: [Number, String],
				default: 1
			},
			modelValue: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 10000
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: 0
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			modelValue(val) {
				this.inputValue = +val;
			}
		},
		created() {
			if (this.value === 1) {
				this.inputValue = +this.modelValue;
			}
			if (this.modelValue === 1) {
				this.inputValue = +this.value;
			}
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < (this.min * scale)) {
						return;
					}
					if (value > (this.max * scale)) {
						value = this.max * scale
					}
				}

				if (type === "plus") {
					value += step;
					if (value > (this.max * scale)) {
						return;
					}
					if (value < (this.min * scale)) {
						value = this.min * scale
					}
				}
				
				this.inputValue = (value / scale).toFixed(String(scale).length - 1);
				// this.$emit("change", this.boxIndex,+this.inputValue);
				// // TODO vue2 兼容
				// this.$emit("input", this.boxIndex, +this.inputValue);
				// // TODO vue3 兼容
				// this.$emit("update:modelValue", this.boxIndex, +this.inputValue);
				
				this.$emit("change", +this.inputValue, this.index, this.childrenIndex);
				// TODO vue2 兼容
				this.$emit("input", +this.inputValue, this.index, this.childrenIndex);
				// TODO vue3 兼容
				this.$emit("update:modelValue", +this.inputValue, this.index, this.childrenIndex);
			},
			_getDecimalScale() {

				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, String(this.step).split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				this.$emit('blur', event)
				let value = event.detail.value;
				if (!value) {
					this.inputValue = this.min;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				const scale = this._getDecimalScale();
				this.inputValue = value.toFixed(String(scale).length - 1);
				// this.$emit("change",this.boxIndex, +this.inputValue);
				// this.$emit("input",this.boxIndex, +this.inputValue);
				
				this.$emit("change", +this.inputValue, this.index, this.childrenIndex);
				// TODO vue2 兼容
				this.$emit("input", +this.inputValue, this.index, this.childrenIndex);
				// TODO vue3 兼容
				this.$emit("update:modelValue", +this.inputValue, this.index, this.childrenIndex);
			},
			_onFocus(event) {
				this.$emit('focus', event)
			}

		}
	};
</script>
<style scoped>
	/* #ifdef APP-NVUE */
	/* #endif */
	.uni-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: 70upx;
		line-height: 70upx;
		width: 100%;
	}

	.uni-cursor-point {
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-numbox__value {
		background-color: #ffffff;
		width: 120upx;
		height: 70upx;
		text-align: center;
		font-size: 16px;
		border-width: 1rpx;
		border-style: solid;
		border-color: #e5e5e5;
		border-left-width: 0;
		border-right-width: 0;
		z-index: 1;
	}

	.uni-numbox__minus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 70rpx;
		height: 70rpx;
		font-size: 20px;
		color: #333;
		background-color: #f8f8f8;
		border-width: 1rpx;
		border-style: solid;
		border-color: #e5e5e5;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		border-right-width: 0;
	}

	.uni-numbox__plus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 70rpx;
		height: 70rpx;
		border-width: 1rpx;
		border-style: solid;
		border-color: #e5e5e5;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		/* background-color: #f8f8f8; */
		/* background-color: #007AFF; */
		border-left-width: 0;
	}

	.uni-numbox--text {
		font-size: 40rpx;
		color: #FFFFFF;
	}

	.uni-numbox--disabled {
		color: #c0c0c0;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}
</style>