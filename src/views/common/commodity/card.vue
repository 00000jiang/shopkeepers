<template>
    <div
      class="product-card"
      @click="goToProduct()"
    >
      <div class="product-image">
        <div class="image-placeholder"></div>
      </div>
      <div class="product-info">
        <h4 class="product-title">{{ product.title }}</h4>
        <div class="product-price">
          <span class="current-price">¥{{ product.price }}</span>
          <span class="origin-price">¥{{ product.originPrice }}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'commodityCard',
  props: {
    product: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goToProduct () {
      // 跳转到商品详情页
      this.$router.replace(`/details/${this.product.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
    .product-card {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      transition: transform 0.2s ease;

      &:active {
        transform: scale(0.98);
      }

      .product-image {
        width: 100%;
        height: 120px;
        margin-bottom: 12px;
        border-radius: 8px;
        overflow: hidden;

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          &::after {
            content: '📱';
            font-size: 32px;
            opacity: 0.6;
          }
        }
      }

      .product-info {
        .product-title {
          font-size: 14px;
          line-height: 1.4;
          color: #333;
          margin: 0 0 8px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 8px;

          .current-price {
            color: #ee0a24;
            font-size: 16px;
            font-weight: bold;
          }

          .origin-price {
            color: #999;
            font-size: 12px;
            text-decoration: line-through;
          }
        }
      }
    }
</style>
