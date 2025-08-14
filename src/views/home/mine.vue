<template>
  <div class="mine-container">
    <!-- 顶部用户信息区域 -->
    <div class="user-info-section">
      <div class="user-header">
        <div class="user-avatar">
          <van-image
            round
            width="60px"
            height="60px"
            :src="userInfo.avatar || 'https://img01.yzcdn.cn/vant/cat.jpeg'"
          />
          <div class="online-status" v-if="userInfo.online"></div>
        </div>
        <div class="user-details">
          <div class="user-name">{{ userInfo.name || '未登录' }}</div>
          <div class="user-verified" v-if="userInfo.verified">
            <van-icon name="certificate" />
            已实名认证
          </div>
        </div>
        <div class="edit-profile" @click="editProfile">
          <van-button size="small" round plain type="default">编辑资料</van-button>
        </div>
      </div>

      <!-- 用户数据统计 -->
      <div class="user-stats">
        <div class="stat-item" @click="goToOrders">
          <div class="stat-value">{{ userInfo.orderCount || 0 }}</div>
          <div class="stat-label">我的订单</div>
        </div>
        <div class="stat-item" @click="goCoupons">
          <div class="stat-value">{{ userInfo.coupons || 0 }}</div>
          <div class="stat-label">优惠券</div>
        </div>
        <div class="stat-item" @click="goToPoints">
          <div class="stat-value">{{ userInfo.points || 0 }}</div>
          <div class="stat-label">我的积分</div>
        </div>
      </div>
    </div>

    <!-- 订单管理 -->
    <div class="order-section">
      <van-grid :column-num="4" :border="false" :clickable="true">
        <van-grid-item icon="bag" text="全部订单" @click="goToOrders('all')" />
        <van-grid-item icon="logistics" text="待收货" @click="goToOrders('pending')" />
        <van-grid-item icon="comment-o" text="待评价" @click="goToOrders('review')" />
        <van-grid-item icon="exchange" text="退换货" @click="goToOrders('refund')" />
      </van-grid>
    </div>

    <!-- 常用功能 -->
    <div class="common-functions">
      <div class="section-header">
        <van-icon name="apps-o" color="#ee0a24" />
        <span>常用功能</span>
      </div>
      <van-grid :column-num="3" :border="false" :clickable="true">
        <van-grid-item>
          <template #icon>
            <div class="function-icon purple">
              <van-icon name="like-o" />
            </div>
          </template>
          <template #text>
            <span>我的收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <div class="function-icon yellow">
              <van-icon name="gift-o" />
            </div>
          </template>
          <template #text>
            <span>我的礼品卡</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <div class="function-icon red">
              <van-icon name="star-o" />
            </div>
          </template>
          <template #text>
            <span>会员中心</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <div class="function-icon blue">
              <van-icon name="location-o" />
            </div>
          </template>
          <template #text>
            <span>收货地址</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <div class="function-icon green">
              <van-icon name="credit-pay" />
            </div>
          </template>
          <template #text>
            <span>支付方式</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <div class="function-icon gray">
              <van-icon name="ellipsis" />
            </div>
          </template>
          <template #text>
            <span>更多</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 服务功能 -->
    <div class="service-section">
      <div class="service-item" @click="goToHelp">
        <div class="service-icon blue">
          <van-icon name="question-o" />
        </div>
        <span class="service-text">帮助中心</span>
        <van-icon name="arrow" class="service-arrow" />
      </div>
      <div class="service-item" @click="contactService">
        <div class="service-icon green">
          <van-icon name="service-o" />
        </div>
        <span class="service-text">联系客服</span>
        <van-icon name="arrow" class="service-arrow" />
      </div>
      <div class="service-item" @click="aboutUs">
        <div class="service-icon orange">
          <van-icon name="shield-o" />
        </div>
        <span class="service-text">关于我们</span>
        <van-icon name="arrow" class="service-arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MineIndex',
  data () {
    return {
      userInfo: {
        name: '张小明',
        avatar: '',
        verified: true,
        online: true,
        orderCount: 128,
        totalSpent: 2680,
        points: 562,
        balance: 126.50,
        coupons: 3
      }
    }
  },
  created () {
    // 如果有用户信息，则使用store中的用户信息
    if (this.$store.state.userStore.userInfo) {
      console.log('user:' + this.$store.state.userStore.userInfo.id, this.$store.state.userStore.userInfo.token)
    }
  },
  methods: {
    editProfile () {
      this.$toast('编辑资料功能开发中')
    },
    goToOrders (type = 'all') {
      this.$router.push('/order')
      this.$toast(`查看${type}订单`)
    },
    goToPoints () {
      this.$toast('积分功能开发中')
    },
    goCoupons () {
      this.$toast('优惠券功能开发中')
    },
    goToHelp () {
      this.$toast('帮助中心功能开发中')
    },
    contactService () {
      this.$toast('联系客服功能开发中')
    },
    aboutUs () {
      this.$toast('关于我们功能开发中')
    }
  }
}
</script>

<style lang="scss" scoped>
.mine-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px; // 为底部导航栏留空间
}

.user-info-section {
  background-color: #ff6b5a;
  color: white;
  padding: 20px 15px;
  position: relative;
}

.user-header {
  display: flex;
  align-items: center;
}

.user-avatar {
  position: relative;
  margin-right: 15px;
}

.online-status {
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 10px;
  height: 10px;
  background-color: #4cd964;
  border-radius: 50%;
  border: 2px solid white;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
}

.user-verified {
  font-size: 12px;
  display: flex;
  align-items: center;

  .van-icon {
    margin-right: 4px;
  }
}

.edit-profile {
  .van-button {
    color: white;
    border-color: white;
    background-color: transparent;
    font-size: 12px;
    padding: 0 10px;
    height: 28px;
  }
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  text-align: center;
}

.stat-item {
  flex: 1;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
}

.order-section {
  background-color: white;
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
}

.common-functions {
  background-color: white;
  margin: 10px 0;
  border-radius: 8px;
  padding: 15px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;

  .van-icon {
    margin-right: 8px;
    font-size: 18px;
  }
}

.function-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .van-icon {
    font-size: 20px;
    color: white;
  }
}

.purple {
  background-color: #e9d7f4;

  .van-icon {
    color: #9c27b0;
  }
}

.yellow {
  background-color: #fff8e1;

  .van-icon {
    color: #ffc107;
  }
}

.red {
  background-color: #ffebee;

  .van-icon {
    color: #f44336;
  }
}

.blue {
  background-color: #e3f2fd;

  .van-icon {
    color: #2196f3;
  }
}

.green {
  background-color: #e8f5e8;

  .van-icon {
    color: #4caf50;
  }
}

.gray {
  background-color: #f5f5f5;

  .van-icon {
    color: #9e9e9e;
  }
}

.orange {
  background-color: #fff3e0;

  .van-icon {
    color: #ff9800;
  }
}

.service-section {
  background-color: white;
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
}

.service-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f9fa;
  }
}

.service-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;

  .van-icon {
    font-size: 20px;
  }
}

.service-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.service-arrow {
  color: #c8c9cc;
  font-size: 16px;
}
</style>
