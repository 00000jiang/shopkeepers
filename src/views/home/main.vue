<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="header-content">
        <div class="logo">
          <van-icon name="shopping-bag" color="#fff" size="20" />
          <span class="logo-text">易购</span>
        </div>
        <div class="header-search" @click="goToSearch">
          <van-search
            v-model="searchValue"
            placeholder="搜索商品、品牌、店铺"
            shape="round"
            readonly
            @focus="goToSearch"
          />
        </div>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="banner-section">
      <van-swipe :autoplay="3000" indicator-color="#fff" class="banner-swipe">
        <van-swipe-item v-for="(banner, index) in banners" :key="index">
          <div class="banner-item">
            <img :src="banner.image" :alt="banner.title" class="banner-image" />
            <!-- <div class="banner-overlay">
              <h3 class="banner-title">{{ banner.title }}</h3>
            </div> -->
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类网格 -->
    <div class="category-section">
      <div class="category-grid">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="category-item"
          @click="goToCategory(category)"
        >
          <div class="category-icon" :style="{ backgroundColor: category.color }">
            <van-icon :name="category.icon" size="16" color="#fff" />
          </div>
          <span class="category-text">{{ category.name }}</span>
        </div>
      </div>
    </div>

    <!-- 促销标签 -->
    <div class="promotion-section">
      <div class="promotion-tags">
        <div class="promotion-tag blue">30% OFF</div>
        <div class="promotion-tag pink">SALE</div>
      </div>
    </div>

    <!-- 精选商品 -->
    <div class="products-section">
      <div class="section-header">
        <van-icon name="fire-o" color="#ff6b35" size="16" />
        <span class="section-title">精选商品</span>
        <span class="refresh-btn" @click="refreshLikeProducts">
          <van-icon name="replay" size="12" />
          换一批
        </span>
      </div>

      <div class="products-grid">
        <commodityCard v-for="(product, index) in (recommendProducts || []).slice(0, 4)" :key="index" :product="product"></commodityCard>
      </div>
    </div>

    <!-- 品牌专区 -->
    <div class="brand-section">
      <div class="section-header">
        <van-icon name="star-o" color="#ffa726" size="16" />
        <span class="section-title">品牌专区</span>
        <!-- <span class="view-more" @click="goToBrands">查看更多 ></span> -->
      </div>
      <div class="brand-grid">
        <div v-for="(brand, index) in brands.slice(0, 6)" :key="index" class="brand-item" @click="goToBrand(brand)">
          <div class="brand-logo"></div>
          <span class="brand-name">{{ brand.name }}</span>
        </div>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="recommend-section">
      <div class="section-header">
        <van-icon name="like-o" color="#ff6b35" size="16" />
        <span class="section-title">猜你喜欢</span>
      </div>
      <div class="products-grid">
        <commodityCard v-for="(product, index) in (recommendProducts || []).slice(0, 4)" :key="index" :product="product"></commodityCard>
      </div>
      <div class="load-more-btn" @click="loadMoreProducts">
        加载更多
      </div>
    </div>
  </div>
</template>

<script>
import commodityCard from '@/views/common/commodity/card.vue'
export default {
  name: 'MainIndex',
  components: {
    commodityCard
  },
  data () {
    return {
      searchValue: '',
      cartCount: 3,
      banners: [
        {
          title: '春季新品上市',
          image: require('@/static/img/image.png')
        },
        {
          title: '夏日清仓特惠',
          image: require('@/static/img/image2.png')
        },
        {
          title: '秋冬时尚精选',
          image: require('@/static/img/image3.png')
        }
      ],
      categories: [
        { name: '手机', icon: 'phone-o', color: '#ff6b6b' },
        { name: '电脑', icon: 'desktop-o', color: '#4ecdc4' },
        { name: '耳机', icon: 'music-o', color: '#45b7d1' },
        { name: '相机', icon: 'photograph', color: '#f9ca24' },
        { name: '游戏', icon: 'play-circle-o', color: '#6c5ce7' },
        { name: '手表', icon: 'clock-o', color: '#fd79a8' },
        { name: '服饰', icon: 'shirt-o', color: '#a29bfe' },
        { name: '家居', icon: 'home-o', color: '#00b894' },
        { name: '礼品', icon: 'gift-o', color: '#e17055' },
        { name: '更多', icon: 'more-o', color: '#636e72' }
      ],
      recommendProducts: [
        {
          id: 1,
          title: '最新款智能手机 高清拍照 大内存',
          price: '1299',
          originPrice: '1999',
          thumb: ''
        },
        {
          id: 2,
          title: '无线蓝牙耳机 主动降噪 长续航',
          price: '299',
          originPrice: '499',
          thumb: ''
        },
        {
          id: 3,
          title: '智能手表 运动监测 健康管理',
          price: '599',
          originPrice: '899',
          thumb: ''
        },
        {
          id: 4,
          title: '笔记本电脑 轻薄便携 高性能',
          price: '3999',
          originPrice: '5999',
          thumb: ''
        }
      ],
      brands: [
        { id: 1, name: 'Apple', logo: '' },
        { id: 2, name: 'Samsung', logo: '' },
        { id: 3, name: 'Huawei', logo: '' },
        { id: 4, name: 'Xiaomi', logo: '' },
        { id: 5, name: 'Sony', logo: '' },
        { id: 6, name: 'Nike', logo: '' }
      ]
    }
  },
  created () {
    // console.log('user:' + this.$store.state.userStore.userInfo.id, this.$store.state.userStore.userInfo.token)
  },
  methods: {
    goToSearch () {
      console.log('跳转到搜索页面')
      this.$router.push('/search')
    },
    // goToCart () {
    //   this.$router.push('/shoppingCart')
    // },
    // goToProfile () {
    //   this.$router.push('/mine')
    // },
    goToCategory (category) {
      console.log('进入分类:', category.name)
      this.$router.push(`/classification?category=${category.name}`)
    },
    // goToRecommend () {
    //   console.log('查看全部限时抢购')
    //   this.$router.push('/classification?type=flash')
    // },
    // goToBrands () {
    //   console.log('查看更多品牌')
    //   this.$router.push('/classification?type=brands')
    // },
    goToBrand (brand) {
      console.log('查看品牌:', brand.name)
      this.$router.push(`/classification?brand=${brand.name}`)
    },
    refreshLikeProducts () {
      console.log('换一批商品')
      // 这里可以重新获取推荐商品数据
      this.$toast('换一批商品')
    },
    loadMoreProducts () {
      console.log('加载更多商品')
      // 这里可以加载更多商品数据
      this.$toast('加载更多商品')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; // 为底部导航留空间
}

// 顶部导航栏
.header {
  background: linear-gradient(135deg, #ee0a24 0%, #f14f5d 100%);
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 100;

  .header-content {
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 16px;

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;

      .logo-text {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
      }
    }

    .header-search {
      flex: 1;
      cursor: pointer;

      :deep(.van-search) {
        background: transparent;
        padding: 0;
        pointer-events: none;

        .van-search__content {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .van-field__control {
          font-size: 14px;
          color: #fff;
          cursor: pointer;

          &::placeholder {
            color: rgba(255, 255, 255, 0.8);
          }
        }

        .van-search__action {
          display: none;
        }
      }
    }
  }
}

// 轮播图
.banner-section {
  margin: 0;

  .banner-item {
    // height: 200px;
    position: relative;
    overflow: hidden;

    .banner-image {
      width: 95%;
      // height: 95%;
      object-fit: cover;
      margin: 8px 0px 0px 10px;
    }

    .banner-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
      padding: 20px;
      display: flex;
      align-items: flex-end;

      .banner-title {
        color: white;
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

// 分类网格
.category-section {
  background: white;
  margin: 16px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .category-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px 10px;
  }

  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    .category-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .category-text {
      font-size: 12px;
      color: #333;
      text-align: center;
      line-height: 1.2;
    }

    &:active .category-icon {
      transform: scale(0.95);
    }
  }
}

.products-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

// 促销标签
.promotion-section {
  margin: 16px;

  .promotion-tags {
    display: flex;
    gap: 12px;

    .promotion-tag {
      flex: 1;
      padding: 20px;
      border-radius: 12px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      &.blue {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }

      &.pink {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }
    }
  }
}

// 商品区域通用样式
.products-section,
.brand-section,
.recommend-section {
  background: white;
  margin: 16px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .view-more {
      margin-left: auto;
      font-size: 12px;
      color: #ff6b35;
      font-weight: normal;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: #e55a2b;
      }

      &:active {
        color: #cc4f24;
      }
    }

    .refresh-btn {
      margin-left: auto;
      font-size: 12px;
      color: #ee0a24;
      font-weight: normal;
      cursor: pointer;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      gap: 4px;

      &:hover {
        color: #d81e06;
      }

      &:active {
        color: #c41e3a;
      }
    }
  }

  .load-more-btn {
    text-align: center;
    padding: 12px 0;
    margin: 20px 16px 0px;
    color: #ee0a24;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #ee0a24;
    border-radius: 25px;
    background: #fff;

    &:hover {
      background: #fee;
      border-color: #d81e06;
      color: #d81e06;
    }

    &:active {
      background: #fdd;
      border-color: #c41e3a;
      color: #c41e3a;
      transform: scale(0.98);
    }
  }

  // .recommend-grid {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   gap: 12px;

  //   .product-card {
  //     background: #f8f9fa;
  //     border-radius: 12px;
  //     padding: 12px;
  //     cursor: pointer;
  //     transition: transform 0.2s ease;

  //     &:active {
  //       transform: scale(0.98);
  //     }

  //     .product-image {
  //       width: 100%;
  //       height: 120px;
  //       margin-bottom: 12px;
  //       border-radius: 8px;
  //       overflow: hidden;

  //       .image-placeholder {
  //         width: 100%;
  //         height: 100%;
  //         background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%);
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //         position: relative;

  //         &::after {
  //           content: '🎁';
  //           font-size: 32px;
  //           opacity: 0.6;
  //         }
  //       }
  //     }

  //     .product-info {
  //       .product-title {
  //         font-size: 14px;
  //         line-height: 1.4;
  //         color: #333;
  //         margin: 0 0 8px 0;
  //         display: -webkit-box;
  //         -webkit-line-clamp: 2;
  //         line-clamp: 2;
  //         -webkit-box-orient: vertical;
  //         overflow: hidden;
  //       }

  //       .product-price {
  //         display: flex;
  //         align-items: center;
  //         gap: 8px;

  //         .current-price {
  //           color: #ee0a24;
  //           font-size: 16px;
  //           font-weight: bold;
  //         }

  //         .origin-price {
  //           color: #999;
  //           font-size: 12px;
  //           text-decoration: line-through;
  //         }
  //       }
  //     }
  //   }
  // }
}

// 品牌专区
.brand-section {
  .brand-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    .brand-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      border-radius: 12px;
      background: #f8f9fa;
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        background: #e9ecef;
        transform: scale(0.98);
      }

      .brand-logo {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        &::after {
          content: '🏷️';
          font-size: 20px;
        }
      }

      .brand-name {
        font-size: 12px;
        color: #333;
        font-weight: 500;
      }
    }
  }
}
</style>
