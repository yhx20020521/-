<template>
  <view :style="Theme">
    <uni-nav-bar :statusBar="true" fixed="true" title="个人中心" />
    <!-- 个人信息 -->
    <view class="userInformation" @click="navTo('/my/changeInfo')">
      <image :src="headerUrl"></image>
      <view class="userName">{{ userName }}</view>
    </view>

    <!-- 账户信息区 -->
    <view class="userArea">
      <view class="areaList" @click="navTo('/my/balance')">
        <view class="num">
          <text>28</text>
        </view>
        <view class="areaTitle">
          <text>账户余额</text>
        </view>
      </view>
      <view class="areaList" @click="navTo('/my/pointsLog')">
        <view class="num">
          <text>28</text>
        </view>
        <view class="areaTitle">
          <text>积分</text>
        </view>
      </view>
      <view class="areaList" @click="navTo('/my/couponList')">
        <view class="num">
          <text>28</text>
        </view>
        <view class="areaTitle">
          <text>优惠券</text>
        </view>
      </view>
    </view>

    <!-- 会员西悉尼 -->
    <view class="vipView">
      <view class="vipInfo">
        <view class="info-left">
          <view class="level"> 普通会员 </view>
          <view class="vipExplain"> 普通会员普通商品可享95折 </view>
        </view>
        <view @click="navTo('/member/memberCenter')" class="vipBtn"> 立即升级 </view>
      </view>
    </view>

    <!-- 订单导航 -->
    <view class="tab">
      <view class="tab-box" @click="navTo('/my/orderList?id=1')">
        <view class="tab-icon">
          <i class="iconfont icon-daizhifu"></i>
          <view class="tab-num">10</view>
        </view>
        <view class="tab-title"> 待付款 </view>
      </view>
      <view class="tab-box" @click="navTo('/my/orderList?id=2')">
        <view class="tab-icon">
          <i class="iconfont icon-daifahuo"></i>
          <view class="tab-num">12</view>
        </view>
        <view class="tab-title"> 待发货 </view>
      </view>
      <view class="tab-box" @click="navTo('/my/orderList?id=3')">
        <view class="tab-icon">
          <i class="iconfont icon-daishouhuo"></i>
          <view class="tab-num">20</view>
        </view>
        <view class="tab-title"> 待收货 </view>
      </view>
      <view class="tab-box" @click="navTo('/my/orderList?id=4')">
        <view class="tab-icon">
          <i class="iconfont icon-daipingjia"></i>
          <view class="tab-num">10</view>
        </view>
        <view class="tab-title"> 待评价 </view>
      </view>
      <view class="tab-box">
        <view class="tab-icon">
          <i class="iconfont icon-returned"></i>
          <view class="tab-num">3</view>
        </view>
        <view class="tab-title"> 退换 </view>
      </view>
    </view>

    <!-- 功能服务 -->
    <view class="menu">
      <menuList
        leftIcon="icon-dingdan"
        menuName="我的订单"
        rightIcon="icon-right"
        @onClick="navTo('/my/orderList?id=0')"
        @clickRight="navTo('/my/orderList?id=0')"
      />
      <menuList
        leftIcon="icon-shoucang"
        menuName="商品收藏"
        rightIcon="icon-right"
        @onClick="navTo('/my/collect')"
        @clickRight="navTo('/my/collect')"
      />
      <menuList
        leftIcon="icon-concern"
        menuName="关注店铺"
        rightIcon="icon-right"
        @onClick="navTo('/my/concern')"
        @clickRight="navTo('/my/concern')"
      />
      <menuList
        leftIcon="icon-dizhi"
        menuName="地址管理"
        rightIcon="icon-right"
        @onClick="navTo('/my/addressList')"
        @clickRight="navTo('/my/addressList')"
      />
      <!-- <menuList leftIcon="icon-share" menuName="分享推荐" rightIcon="icon-right" @onClick="navTo('/my/setting')" @clickRight="navTo('/my/setting')"  /> -->
      <menuList
        leftIcon="icon-feedback"
        menuName="意见反馈"
        rightIcon="icon-right"
        @onClick="navTo('/my/feedback')"
        @clickRight="navTo('/my/feedback')"
      />
      <menuList
        leftIcon="icon-common"
        menuName="常见问题"
        rightIcon="icon-right"
        @onClick="navTo('/my/issuesList')"
        @clickRight="navTo('/my/issuesList')"
      />
      <menuList
        leftIcon="icon-setting"
        menuName="我的设置"
        rightIcon="icon-right"
        @onClick="navTo('/my/setting')"
        @clickRight="navTo('/my/setting')"
      />
    </view>
  </view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import menuList from "@/components/menuList/menuList.vue";
export default {
  data() {
    return {
      Theme: "",
      // 用户信息
      headerUrl: "/static/my/user.jpg",
      userName: "用户名称",
      memberType: "",
    };
  },
  components: {
    uniNavBar,
    menuList,
  },
  onLoad() {
    // 存储 Cookie
    // uni.setStorageSync("my_cookie", "王永胜的奇妙异世界大冒险");
    // 读取 Cookie
    let cookie = uni.getStorageSync("my_cookie");
    console.log(cookie);
    if (cookie == "王永胜的奇妙异世界大冒险") {
    } else {
      this.sjuNav.reLaunch("/intake/login");
    }
  },
  onShow() {
    this.Theme = this.$store.state.Theme;

    //设置 tabBar 选择颜色改为主题色
    uni.setTabBarStyle({
      selectedColor: this.Theme.split(/\;|\:/)[1],
    });
    // 设置tabBar图标
    if (this.sjuLogin.getValue("themeName") != "") {
      this.sjuTools.setTabBar();
    }
  },
  methods: {
    // 页面跳转
    navTo(page) {
      this.sjuNav.navigateTo(page);
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  padding-bottom: 120upx;
}
/* 个人信息 */
.userInformation {
  width: 100%;
  height: 160upx;
  background-color: var(--primary-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  image {
    width: 100upx;
    height: 100upx;
    margin: 0 20upx;
    border-radius: 50%;
  }
  // 用户名称
  .userName {
    color: var(--inverse-text-color);
  }
}

// 账户信息区
.userArea {
  width: 100%;
  height: 120upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary-color);
  .areaList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: 100%;
    .num {
      display: flex;
      align-items: center;
      text {
        color: var(--inverse-text-color);
        font-size: $font-size-lg;
        font-weight: $font-weight-md;
      }
    }
    .areaTitle {
      display: flex;
      align-items: center;
      margin-top: 5upx;
      text {
        color: var(--inverse-text-color);
        font-size: $font-size-sm;
      }
    }
  }
}

// 会员信息
.vipView {
  width: 100%;
  height: 90upx;
  background-color: var(--primary-color);
  border-radius: 0 0 50% 50% / 0% 0% 30% 30%;
  .vipInfo {
    width: 90%;
    height: 80upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4%;
    background-color: #464c5b;
    transform: translate(1%, 10upx);
    border-radius: 10upx 10upx 50% 50% / 10upx 10upx 30% 30%;
    .info-left {
      display: flex;
      align-items: center;
      // 会员等级
      .level {
        height: 40upx;
        line-height: 40upx;
        color: #ffe678;
        font-size: $font-size-base;
      }
      .level:after {
        content: "";
        width: 2upx;
        height: 20upx;
        margin: 0 10upx;
        border-radius: 2upx;
        display: inline-block;
        vertical-align: middle;
        background-color: #ffe678;
      }
      // 会员权益
      .vipExplain {
        height: 40upx;
        line-height: 40upx;
        color: #ffe678;
        font-size: $font-size-base;
      }
    }
    // 会员升级
    .vipBtn {
      width: 140upx;
      height: 40upx;
      font-size: $font-size-sm;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffe678;
      border-radius: 30upx;
    }
  }
}

/* 订单信息 */
.tab {
  width: 96%;
  height: 190upx;
  margin: 10upx auto;
  display: flex;
  align-items: center;
  background-color: var(--accent-bg-color);
  border-radius: 10upx;
  .tab-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    .tab-icon {
      position: relative;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 60upx;
        color: var(--primary-color);
      }
      // 角标数量
      .tab-num {
        min-width: 30upx;
        min-height: 30upx;
        position: absolute;
        right: -20upx;
        top: -20upx;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 4upx;
        font-size: 18upx;
        color: var(--primary-color);
        background-color: #ffffff;
        border: 1upx solid var(--primary-color);
        border-radius: 100%;
      }
    }
    .tab-title {
      display: flex;
      align-items: center;
      margin-top: 10upx;
    }
  }
}

// 功能菜单
.menu {
  width: 96%;
  height: auto;
  border-radius: 10upx;
  margin: 10upx auto;
  background-color: var(--accent-bg-color);
}
</style>
