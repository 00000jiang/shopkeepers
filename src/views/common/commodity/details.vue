<template>
  <div class="product-detail">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="share-o" size="18" />
      </template>
    </van-nav-bar>

    <!-- 商品图片轮播 -->
    <div class="product-images">
      <van-swipe :autoplay="0" indicator-color="#fff" class="image-swipe">
        <van-swipe-item v-for="(image, index) in product.images" :key="index">
          <div class="image-container">
            <van-image
              :src="image"
              fit="cover"
              class="product-image"
              :lazy-load="true"
            />
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="image-indicator">
        {{ currentImageIndex + 1 }} / {{ product.images.length }}
      </div>
    </div>

    <!-- 商品基本信息 -->
    <div class="product-info">
      <div class="price-section">
        <div class="current-price">¥{{ product.currentPrice }}</div>
        <div class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</div>
        <div class="discount-tag" v-if="product.discount">{{ product.discount }}折</div>
      </div>

      <div class="product-title">{{ product.title }}</div>
      <div class="product-subtitle">{{ product.subtitle }}</div>

      <div class="product-tags">
        <van-tag v-for="tag in product.tags" :key="tag" type="danger" size="mini">{{ tag }}</van-tag>
      </div>

      <div class="sales-info">
        <span class="sales-count">已售{{ product.salesCount }}件</span>
        <span class="stock-count">库存{{ product.stock }}件</span>
        <div class="rating">
          <van-icon name="star" color="#ffd21e" size="12" />
          <span class="rating-score">{{ product.rating }}</span>
          <span class="review-count">({{ product.reviewCount }}条评价)</span>
        </div>
      </div>
    </div>

    <!-- 优惠券/活动 -->
    <div class="promotion-section" v-if="product.promotions && product.promotions.length">
      <div class="promotion-title">
        <van-icon name="gift-o" color="#ff6b35" size="14" />
        <span>优惠活动</span>
      </div>
      <div class="promotion-list">
        <div v-for="promo in product.promotions" :key="promo.id" class="promotion-item">
          <van-tag type="danger" size="mini">{{ promo.type }}</van-tag>
          <span class="promotion-desc">{{ promo.description }}</span>
        </div>
      </div>
    </div>

    <!-- 规格选择 -->
    <div class="spec-section" @click="showSpecPopup = true">
      <div class="spec-title">规格</div>
      <div class="spec-selected">
        <span>{{ selectedSpec.color }} {{ selectedSpec.size }}</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="detail-section">
      <div class="detail-tabs">
        <div
          v-for="tab in detailTabs"
          :key="tab.key"
          :class="['tab-item', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </div>
      </div>

      <div class="detail-content">
        <div v-if="activeTab === 'detail'" class="product-detail-content">
          <div class="detail-images">
            <img v-for="(img, index) in product.detailImages" :key="index" :src="img" alt="商品详情" />
          </div>
        </div>

        <div v-if="activeTab === 'params'" class="product-params">
          <div v-for="param in product.params" :key="param.name" class="param-item">
            <span class="param-name">{{ param.name }}</span>
            <span class="param-value">{{ param.value }}</span>
          </div>
        </div>

        <div v-if="activeTab === 'reviews'" class="product-reviews">
          <div v-for="review in product.reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <div class="user-info">
                <van-image :src="review.avatar" round width="32" height="32" />
                <span class="username">{{ review.username }}</span>
              </div>
              <div class="review-rating">
                <van-icon
                  v-for="i in 5"
                  :key="i"
                  name="star"
                  :color="i <= review.rating ? '#ffd21e' : '#ddd'"
                  size="12"
                />
              </div>
            </div>
            <div class="review-content">{{ review.content }}</div>
            <div class="review-images" v-if="review.images">
              <van-image
                v-for="(img, index) in review.images"
                :key="index"
                :src="img"
                width="60"
                height="60"
                class="review-image"
              />
            </div>
            <div class="review-time">{{ review.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-actions">
      <div class="action-buttons">
        <div class="icon-buttons">
          <div class="icon-button" @click="toggleFavorite">
            <van-icon :name="isFavorite ? 'star' : 'star-o'" :color="isFavorite ? '#ff6b35' : '#666'" size="20" />
            <span>收藏</span>
          </div>
          <div class="icon-button" @click="goToCart">
            <van-icon name="shopping-cart-o" color="#666" size="20" />
            <span>购物车</span>
            <van-badge v-if="cartCount > 0" :content="cartCount" class="cart-badge" />
          </div>
        </div>
        <div class="main-buttons">
          <van-button
            type="warning"
            size="large"
            class="add-cart-btn"
            @click="addToCart"
          >
            加入购物车
          </van-button>
          <van-button
            type="danger"
            size="large"
            class="buy-now-btn"
            @click="buyNow"
          >
            立即购买
          </van-button>
        </div>
      </div>
    </div>

    <!-- 规格选择弹窗 -->
    <van-popup v-model="showSpecPopup" position="bottom" class="spec-popup">
      <div class="spec-popup-content">
        <div class="spec-popup-header">
          <div class="spec-product-info">
            <van-image :src="product.images[0]" width="80" height="80" />
            <div class="spec-product-detail">
              <div class="spec-price">¥{{ product.currentPrice }}</div>
              <div class="spec-stock">库存{{ product.stock }}件</div>
            </div>
          </div>
          <van-icon name="cross" @click="showSpecPopup = false" />
        </div>

        <div class="spec-options">
          <div class="spec-group">
            <div class="spec-group-title">颜色</div>
            <div class="spec-items">
              <div
                v-for="color in product.specs.colors"
                :key="color"
                :class="['spec-item', { active: selectedSpec.color === color }]"
                @click="selectedSpec.color = color"
              >
                {{ color }}
              </div>
            </div>
          </div>

          <div class="spec-group">
            <div class="spec-group-title">尺寸</div>
            <div class="spec-items">
              <div
                v-for="size in product.specs.sizes"
                :key="size"
                :class="['spec-item', { active: selectedSpec.size === size }]"
                @click="selectedSpec.size = size"
              >
                {{ size }}
              </div>
            </div>
          </div>

          <div class="spec-group">
            <div class="spec-group-title">数量</div>
            <van-stepper v-model="quantity" min="1" :max="product.stock" />
          </div>
        </div>

        <div class="spec-popup-footer">
          <van-button type="danger" size="large" block @click="confirmSpec">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'CmddetailIndex',
  data () {
    return {
      currentImageIndex: 0,
      activeTab: 'detail',
      showSpecPopup: false,
      isFavorite: false,
      cartCount: 0,
      quantity: 1,
      selectedSpec: {
        color: '黑色',
        size: 'M'
      },
      detailTabs: [
        { key: 'detail', label: '商品详情' },
        { key: 'params', label: '规格参数' },
        { key: 'reviews', label: '用户评价' }
      ],
      product: {
        id: 1,
        title: 'iPhone 15 Pro Max',
        subtitle: '钛金属设计，A17 Pro芯片，专业级摄像头系统',
        currentPrice: 9999,
        originalPrice: 10999,
        discount: 9.1,
        salesCount: 1234,
        stock: 99,
        rating: 4.8,
        reviewCount: 2567,
        images: [
          'https://via.placeholder.com/375x375/007bff/ffffff?text=Image+1',
          'https://via.placeholder.com/375x375/28a745/ffffff?text=Image+2',
          'https://via.placeholder.com/375x375/dc3545/ffffff?text=Image+3',
          'https://via.placeholder.com/375x375/ffc107/ffffff?text=Image+4'
        ],
        tags: ['官方正品', '全国联保', '顺丰包邮'],
        promotions: [
          { id: 1, type: '满减', description: '满5000减200' },
          { id: 2, type: '赠品', description: '购买即送无线充电器' }
        ],
        specs: {
          colors: ['黑色', '白色', '蓝色', '紫色'],
          sizes: ['128GB', '256GB', '512GB', '1TB']
        },
        params: [
          { name: '品牌', value: 'Apple' },
          { name: '型号', value: 'iPhone 15 Pro Max' },
          { name: '屏幕尺寸', value: '6.7英寸' },
          { name: '操作系统', value: 'iOS 17' },
          { name: '处理器', value: 'A17 Pro' },
          { name: '机身材质', value: '钛金属' }
        ],
        detailImages: [
          'https://via.placeholder.com/375x500/007bff/ffffff?text=Detail+1',
          'https://via.placeholder.com/375x500/28a745/ffffff?text=Detail+2',
          'https://via.placeholder.com/375x500/dc3545/ffffff?text=Detail+3'
        ],
        reviews: [
          {
            id: 1,
            username: '用户***123',
            avatar: 'https://via.placeholder.com/32x32/007bff/ffffff?text=U1',
            rating: 5,
            content: '手机很不错，拍照效果很好，系统流畅，值得购买！',
            images: [
              'https://via.placeholder.com/60x60/007bff/ffffff?text=R1',
              'https://via.placeholder.com/60x60/28a745/ffffff?text=R2'
            ],
            time: '2024-01-15'
          },
          {
            id: 2,
            username: '用户***456',
            avatar: 'https://via.placeholder.com/32x32/28a745/ffffff?text=U2',
            rating: 4,
            content: '整体满意，就是价格有点贵，不过质量确实好。',
            time: '2024-01-10'
          }
        ]
      }
    }
  },
  mounted () {
    // 确保页面加载时滚动到顶部
    this.scrollToTop()
  },
  methods: {
    scrollToTop () {
      // 滚动到页面顶部
      window.scrollTo(0, 0)
      // 或者使用 document.documentElement.scrollTop = 0
      // document.body.scrollTop = 0
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      // 分享功能
      this.$toast('分享功能')
    },
    toggleFavorite () {
      this.isFavorite = !this.isFavorite
      this.$toast(this.isFavorite ? '已收藏' : '已取消收藏')
    },
    goToCart () {
      this.$router.push('/shoppingCart')
    },
    addToCart () {
      this.showSpecPopup = true
    },
    buyNow () {
      this.showSpecPopup = true
    },
    confirmSpec () {
      this.showSpecPopup = false
      this.$toast('已添加到购物车')
      this.cartCount += this.quantity
    }
  }
}
</script>

<style scoped>
.product-detail {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* 商品图片轮播 */
.product-images {
  position: relative;
  background: #fff;
}

.image-swipe {
  height: 375px;
}

.image-container {
  height: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
}

.product-image {
  width: 100%;
  height: 100%;
}

.image-indicator {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

/* 商品基本信息 */
.product-info {
  background: #fff;
  padding: 16px;
  margin-bottom: 8px;
}

.price-section {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.current-price {
  font-size: 24px;
  font-weight: bold;
  color: #ff6b35;
  margin-right: 8px;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-right: 8px;
}

.discount-tag {
  background: #ff6b35;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.product-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.4;
}

.product-tags {
  margin-bottom: 12px;
}

.product-tags .van-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}

.sales-info {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.sales-count, .stock-count {
  margin-right: 16px;
}

.rating {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.rating-score {
  margin: 0 4px;
  color: #333;
}

.review-count {
  color: #999;
}

/* 优惠券/活动 */
.promotion-section {
  background: #fff;
  padding: 16px;
  margin-bottom: 8px;
}

.promotion-title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.promotion-title span {
  margin-left: 4px;
}

.promotion-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.promotion-desc {
  margin-left: 8px;
  font-size: 14px;
  color: #666;
}

/* 规格选择 */
.spec-section {
  background: #fff;
  padding: 16px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.spec-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.spec-selected {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.spec-selected .van-icon {
  margin-left: 4px;
}

/* 商品详情 */
.detail-section {
  background: #fff;
}

.detail-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  position: relative;
}

.tab-item.active {
  color: #ff6b35;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: #ff6b35;
}

.detail-content {
  padding: 16px;
}

/* 商品详情内容 */
.detail-images img {
  width: 100%;
  display: block;
  margin-bottom: 8px;
}

/* 规格参数 */
.param-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.param-name {
  color: #666;
  font-size: 14px;
}

.param-value {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

/* 用户评价 */
.review-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.user-info {
  display: flex;
  align-items: center;
}

.username {
  margin-left: 8px;
  font-size: 14px;
  color: #333;
}

.review-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 8px;
}

.review-images {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.review-image {
  border-radius: 4px;
}

.review-time {
  font-size: 12px;
  color: #999;
}

/* 底部操作栏 */
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
  padding: 8px 16px;
  z-index: 100;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-buttons {
  display: flex;
  gap: 16px;
}

.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.icon-button span {
  font-size: 10px;
  color: #666;
  margin-top: 2px;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
}

.main-buttons {
  flex: 1;
  display: flex;
  gap: 8px;
}

.add-cart-btn, .buy-now-btn {
  flex: 1;
  height: 44px;
  border-radius: 22px;
  font-weight: bold;
}

/* 规格选择弹窗 */
.spec-popup {
  border-radius: 16px 16px 0 0;
}

.spec-popup-content {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.spec-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.spec-product-info {
  display: flex;
  gap: 12px;
}

.spec-product-detail {
  flex: 1;
}

.spec-price {
  font-size: 20px;
  font-weight: bold;
  color: #ff6b35;
  margin-bottom: 4px;
}

.spec-stock {
  font-size: 12px;
  color: #999;
}

.spec-popup-header .van-icon {
  cursor: pointer;
  padding: 4px;
}

.spec-options {
  margin-bottom: 24px;
}

.spec-group {
  margin-bottom: 20px;
}

.spec-group-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.spec-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.spec-item {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.spec-item.active {
  border-color: #ff6b35;
  background: #fff2ed;
  color: #ff6b35;
}

.spec-popup-footer {
  padding-top: 16px;
  border-top: 1px solid #eee;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .current-price {
    font-size: 20px;
  }

  .product-title {
    font-size: 16px;
  }

  .main-buttons {
    gap: 6px;
  }

  .add-cart-btn, .buy-now-btn {
    height: 40px;
    font-size: 14px;
  }
}

/* 滚动优化 */
.detail-content {
  -webkit-overflow-scrolling: touch;
}

/* 图片懒加载优化 */
.product-image, .review-image {
  transition: opacity 0.3s;
}

.product-image[lazy="loading"], .review-image[lazy="loading"] {
  opacity: 0.6;
}
</style>
