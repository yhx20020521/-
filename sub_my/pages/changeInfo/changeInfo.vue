<template>
  <view :style="Theme">
    <uni-nav-bar leftIcon="arrowleft" fixed="true" title="修改信息" />
    <view class="content">
      <view class="row-input">
        <i class="iconfont icon-user" />
        <input placeholder="请输入用户名称" />
      </view>
      <view class="row-input">
        <i class="iconfont icon-shouji" />
        <input placeholder="请输入手机号码" maxlength="11" />
      </view>
      <view class="forget-btn">提交</view>
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
  onLoad() {
    uni.request({
      url: "/api/newList",
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
        console.log("请求失败：", err);
      },
    });
  },
  onShow() {
    this.Theme = this.$store.state.Theme;
  },
  methods: {
    changeRegion(param) {
      console.log(param, 1111222);
    },
  },
};
</script>

<style lang="scss">
.content {
  padding: 40upx;

  .row-input {
    margin: 30upx 0upx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20upx;
    height: 100upx;
    border: 1upx solid var(--primary-color);
    border-radius: 20upx;

    image {
      padding: 0upx 10upx 0upx 10upx;
      width: 50upx;
      height: 50upx;
      flex-shrink: 0;
    }

    .iconfont {
      color: var(--primary-color);
      padding: 0upx 10upx 0upx 10upx;
      flex-shrink: 0;
      font-size: 40upx;
    }

    input {
      flex: 1;
      font-size: 30upx;
      padding: 0upx 40upx;
      color: var(--primary-color);
      border-left: 3upx solid var(--primary-color);
    }
  }

  .forget-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32upx;
    height: 100upx;
    margin: 40upx 0 40upx 0;
    border-radius: 20upx;
    color: #ffffff;
    background-color: var(--btn-bg-color);
  }
}
</style>
