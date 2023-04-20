<template>
  <view :style="Theme">
    <uni-nav-bar title="登录" :show-back-btn="true" @click-left="onClickLeft">
      <template v-slot:left>
        <custom-home-icon @click="onClickHome">返回首页</custom-home-icon>
      </template>
    </uni-nav-bar>
    <view class="logo">
      <image src="/static/logo.png"></image>
    </view>
    <view class="loginForm">
      <view class="row-input">
        <i class="iconfont icon-shouji" />
        <input
          placeholder="请输入手机号"
          maxlength="11"
          placeholder-class="placeholder"
        />
      </view>
      <view class="row-input">
        <i class="iconfont icon-mima" />
        <input
          placeholder="请输入密码"
          maxlength="18"
          password
          placeholder-class="placeholder"
        />
      </view>
      <view class="loginBtn" @click="act()">立即登录</view>
      <view class="menuLink">
        <text @click="navTo('/intake/register')">注册账号</text>
        <text @click="navTo('/intake/forget')">忘记密码</text>
      </view>
    </view>
  </view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
export default {
  data() {
    return {
      Theme: "",
    };
  },
  components: {
    uniNavBar,
  },
  onLoad() {},
  onShow() {
    this.Theme = this.$store.state.Theme;
  },
  methods: {
    navTo(path) {
      this.sjuNav.navigateTo(path);
    },
    act() {
      uni.setStorageSync("my_cookie", "王永胜的奇妙异世界大冒险");
      this.sjuNav.switchTab("/tab/index");
    },
    onClickLeft() {
      uni.navigateBack();
    },
    onClickHome() {
      this.sjuNav.switchTab("/tab/index");
    },
  },
};
</script>

<style lang="scss">
.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300upx;
  image {
    width: 200upx;
    height: 200upx;
  }
}

.loginForm {
  padding: 20rpx 60rpx;

  .row-input {
    margin: 30rpx 0rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20rpx;
    height: 100rpx;
    border: 1rpx solid var(--primary-color);
    border-radius: 20rpx;

    image {
      padding: 0rpx 10rpx 0rpx 10rpx;
      width: 50rpx;
      height: 50rpx;
      flex-shrink: 0;
    }

    .iconfont {
      color: var(--primary-color);
      padding: 0rpx 10rpx 0rpx 10rpx;
      flex-shrink: 0;
      font-size: 40upx;
    }

    .placeholder {
      font-size: 30rpx;
      color: var(--primary-color);
    }

    input {
      font-size: 30rpx;
      padding: 0rpx 40rpx;
      color: var(--primary-color);
      border-left: 3rpx solid var(--primary-color);
    }
  }

  .loginBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35rpx;
    height: 100rpx;
    border-radius: 20rpx;
    color: #ffffff;
    background-color: var(--btn-bg-color);
  }

  .menuLink {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    color: var(--btn-bg-color);
    letter-spacing: 3rpx;
    line-height: 80rpx;
  }
}
</style>
