<template>
  <div class="cart-container">
    <div class="cart-header">
      <h1>
        购物车
        <van-icon name="shopping-cart-o" size="18" />
      </h1>
    </div>

    <!-- 购物车内容 -->
    <div class="cart-content">
      <!-- 购物车商品列表 -->
      <div class="cart-items" v-if="cartItems.length > 0">
        <div
          class="cart-item"
          v-for="(item, index) in cartItems"
          :key="item.id"
        >
          <!-- 勾选框 -->
          <div class="item-checkbox">
            <van-checkbox
              v-model="item.checked"
              @change="onItemCheck(item)"
            />
          </div>

          <!-- 商品图片 -->
          <div class="item-image">
            <div class="image-placeholder">
              <span class="item-icon">{{ item.icon }}</span>
            </div>
          </div>

          <!-- 商品信息 -->
          <div class="item-info">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-price">¥{{ item.price.toFixed(2) }}</div>
            <div class="quantity-control">
              <van-stepper
                v-model="item.quantity"
                min="1"
                @change="onQuantityChange(item)"
              />
            </div>
          </div>

          <!-- 商品总价 -->
          <div class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</div>

          <!-- 删除按钮 -->
          <div class="item-actions">
            <van-icon
              name="delete-o"
              size="20"
              class="delete-btn"
              @click="removeItem(index)"
            />
          </div>
        </div>
      </div>

      <!-- 空购物车状态 -->
      <div class="empty-cart" v-else>
        <van-empty description="购物车是空的" />
      </div>
    </div>

    <!-- 底部结算栏 -->
    <div class="cart-footer" v-if="cartItems.length > 0">
      <div class="footer-top">
        <div class="select-all">
          <van-checkbox
            v-model="allChecked"
            @change="toggleAllItems"
          >全选</van-checkbox>
        </div>
        <div class="total-section">
          <span class="total-label">总计:</span>
          <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
      <van-button
        type="primary"
        block
        class="checkout-btn"
        @click="goToCheckout"
      >
        去结算
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartIndex',
  data () {
    return {
      cartItems: [
        {
          id: 1,
          name: '智能手机',
          price: 3999.00,
          quantity: 1,
          icon: '📱',
          checked: false
        },
        {
          id: 2,
          name: '无线耳机',
          price: 899.00,
          quantity: 1,
          icon: '🎧',
          checked: false
        },
        {
          id: 3,
          name: '智能手表',
          price: 1299.00,
          quantity: 1,
          icon: '⌚',
          checked: false
        }
      ],
      allChecked: false
    }
  },
  computed: {
    totalPrice () {
      return this.cartItems.reduce((total, item) => {
        return item.checked ? total + (item.price * item.quantity) : total
      }, 0)
    },
    checkedItems () {
      return this.cartItems.filter(item => item.checked)
    }
  },
  methods: {
    onItemCheck (item) {
      console.log('商品选择状态变更:', item.name, item.checked)
      this.updateAllChecked()
    },

    updateAllChecked () {
      this.allChecked = this.cartItems.length > 0 && this.cartItems.every(item => item.checked)
    },

    toggleAllItems (checked) {
      this.cartItems.forEach(item => {
        item.checked = checked
      })
    },

    onQuantityChange (item) {
      console.log('数量变更:', item.name, item.quantity)
      // 这里可以调用API更新购物车数量
    },

    removeItem (index) {
      this.$dialog.confirm({
        title: '确认删除',
        message: '确定要删除这个商品吗？'
      }).then(() => {
        this.cartItems.splice(index, 1)
        this.updateAllChecked()
        this.$toast('商品已删除')
      }).catch(() => {
        // 用户取消删除
      })
    },

    goToCheckout () {
      const checkedItems = this.checkedItems
      if (checkedItems.length === 0) {
        this.$toast('请选择要结算的商品')
        return
      }
      console.log('去结算，选中商品:', checkedItems.length, '总金额:', this.totalPrice)
      this.$toast('跳转到结算页面')
      // 这里可以跳转到结算页面
      // this.$router.push('/order')
    }
  },
  created () {
    console.log('user:' + this.$store.state.userStore.userInfo.id, this.$store.state.userStore.userInfo.token)
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; // 为底部导航栏留空间
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  text-align: center;

  h1 {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
}

.cart-content {
  flex: 1;
  padding: 15px;
  background-color: #f5f5f5;
}

.cart-items {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.cart-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  .item-checkbox {
    display: flex;
    align-items: center;
    margin-right: 12px;

    :deep(.van-checkbox) {
      .van-checkbox__icon {
        font-size: 16px;
      }
    }
  }

  .item-image {
    width: 60px;
    height: 60px;
    margin-right: 12px;
    flex-shrink: 0;

    .image-placeholder {
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;

      .item-icon {
        font-size: 28px;
      }
    }
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 12px;

    .item-name {
      font-size: 14px;
      color: #333;
      margin-bottom: 8px;
    }

    .item-price {
      font-size: 16px;
      color: #ee0a24;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .quantity-control {
      :deep(.van-stepper) {
        .van-stepper__minus,
        .van-stepper__plus {
          width: 24px;
          height: 24px;
          background-color: #f5f5f5;
          border: none;
          color: #333;
        }

        .van-stepper__input {
          width: 30px;
          height: 24px;
          background-color: transparent;
          border: none;
          color: #333;
          font-size: 14px;
        }
      }
    }
  }

  .item-total {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-right: 12px;
  }

  .item-actions {
    display: flex;
    align-items: center;

    .delete-btn {
      color: #bbb;
      padding: 4px;
    }
  }
}

.empty-cart {
  background: white;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
}

.cart-footer {
  position: fixed;
  bottom: 50px; // 为底部导航栏留空间
  left: 0;
  right: 0;
  background: white;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select-all {
      :deep(.van-checkbox) {
        .van-checkbox__label {
          font-size: 14px;
          color: #333;
        }
      }
    }

    .total-section {
      display: flex;
      align-items: center;
      gap: 8px;

      .total-label {
        font-size: 14px;
        color: #333;
      }

      .total-price {
        font-size: 18px;
        color: #ee0a24;
        font-weight: bold;
      }
    }
  }

  .checkout-btn {
    height: 40px;
    border-radius: 4px;
    background-color: #ee0a24;
    border: none;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
