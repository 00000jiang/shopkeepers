<template>
  <div class="classification-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-nav-bar title="商品分类" left-arrow @click-left="goBack" />
    </div>

    <!-- 搜索框 -->
    <div class="search-section">
      <van-search
        v-model="searchValue"
        placeholder="搜索分类..."
        shape="round"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </div>

    <!-- 分类内容 -->
    <div class="classification-content">
      <!-- 左侧分类列表 -->
      <div class="category-sidebar">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          :class="['category-item', { active: activeCategory === index }]"
          @click="selectCategory(index)"
        >
          <div class="category-icon">
            <van-icon :name="category.icon" size="20" :color="activeCategory === index ? '#ee0a24' : '#666'" />
          </div>
          <div class="category-name">{{ category.name }}</div>
        </div>
      </div>

      <!-- 右侧子分类列表 -->
      <div class="subcategory-content">
        <div class="subcategory-grid">
          <div
            v-for="subcategory in currentSubcategories"
            :key="subcategory.id"
            class="subcategory-item"
            @click="goToSubcategory(subcategory)"
          >
            <div class="subcategory-name">{{ subcategory.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassificationIndex',
  data () {
    return {
      searchValue: '',
      activeCategory: 0,
      categories: [
        {
          id: 1,
          name: '电子产品',
          icon: 'phone-o',
          subcategories: [
            { id: 101, name: '智能手机' },
            { id: 102, name: '笔记本电脑' },
            { id: 103, name: '平板电脑' },
            { id: 104, name: '智能手表' },
            { id: 105, name: '耳机音响' },
            { id: 106, name: '相机摄影' }
          ]
        },
        {
          id: 2,
          name: '服装鞋帽',
          icon: 'user-o',
          subcategories: [
            { id: 201, name: '男装' },
            { id: 202, name: '女装' },
            { id: 203, name: '童装' },
            { id: 204, name: '运动装' },
            { id: 205, name: '鞋靴' },
            { id: 206, name: '箱包配饰' }
          ]
        },
        {
          id: 3,
          name: '家居用品',
          icon: 'home-o',
          subcategories: [
            { id: 301, name: '家具' },
            { id: 302, name: '家纺' },
            { id: 303, name: '厨具' },
            { id: 304, name: '家电' },
            { id: 305, name: '装饰用品' },
            { id: 306, name: '收纳整理' }
          ]
        },
        {
          id: 4,
          name: '美妆个护',
          icon: 'like-o',
          subcategories: [
            { id: 401, name: '护肤品' },
            { id: 402, name: '彩妆' },
            { id: 403, name: '香水' },
            { id: 404, name: '个人护理' },
            { id: 405, name: '美容工具' },
            { id: 406, name: '男士护理' }
          ]
        },
        {
          id: 5,
          name: '食品饮料',
          icon: 'shopping-cart-o',
          subcategories: [
            { id: 501, name: '休闲零食' },
            { id: 502, name: '饮料冲调' },
            { id: 503, name: '生鲜食品' },
            { id: 504, name: '酒类' },
            { id: 505, name: '保健品' },
            { id: 506, name: '茶叶' }
          ]
        },
        {
          id: 6,
          name: '运动户外',
          icon: 'fire-o',
          subcategories: [
            { id: 601, name: '运动服装' },
            { id: 602, name: '运动鞋' },
            { id: 603, name: '健身器材' },
            { id: 604, name: '户外装备' },
            { id: 605, name: '体育用品' },
            { id: 606, name: '运动配件' }
          ]
        },
        {
          id: 7,
          name: '图书音像',
          icon: 'records',
          subcategories: [
            { id: 701, name: '图书' },
            { id: 702, name: '电子书' },
            { id: 703, name: '音乐' },
            { id: 704, name: '影视' },
            { id: 705, name: '游戏' },
            { id: 706, name: '教育' }
          ]
        }
      ]
    }
  },
  computed: {
    currentSubcategories () {
      return this.categories[this.activeCategory]?.subcategories || []
    }
  },
  created () {
    console.log('user:' + this.$store.state.userStore.userInfo.id, this.$store.state.userStore.userInfo.token)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    selectCategory (index) {
      this.activeCategory = index
    },
    onSearch () {
      console.log('搜索:', this.searchValue)
      // 这里可以实现搜索功能
      this.$toast('搜索功能开发中...')
    },
    onSearchFocus () {
      console.log('搜索框获得焦点')
    },
    goToSubcategory (subcategory) {
      console.log('进入子分类:', subcategory.name)
      // 这里可以跳转到具体的商品列表页面
      this.$toast(`进入${subcategory.name}分类`)
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 顶部导航栏
.header {
  background: #fff;
  border-bottom: 1px solid #eee;

  :deep(.van-nav-bar) {
    background: #fff;

    .van-nav-bar__title {
      color: #333;
      font-weight: 600;
    }

    .van-nav-bar__left {
      color: #333;
    }
  }
}

// 搜索区域
.search-section {
  background: #fff;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;

  :deep(.van-search) {
    padding: 0;
    background: transparent;

    .van-search__content {
      background: #f7f8fa;
      border-radius: 20px;
    }

    .van-field__control {
      font-size: 14px;

      &::placeholder {
        color: #969799;
      }
    }
  }
}

// 分类内容区域
.classification-content {
  flex: 1;
  display: flex;
  background: #fff;
}

// 左侧分类列表
.category-sidebar {
  width: 100px;
  background: #f7f8fa;
  border-right: 1px solid #eee;

  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #eee;

    &.active {
      background: #fff;
      border-right: 2px solid #ee0a24;

      .category-name {
        color: #ee0a24;
        font-weight: 600;
      }
    }

    &:active {
      background: #f0f0f0;
    }

    .category-icon {
      margin-bottom: 6px;
    }

    .category-name {
      font-size: 12px;
      color: #666;
      text-align: center;
      line-height: 1.2;
    }
  }
}

// 右侧子分类内容
.subcategory-content {
  flex: 1;
  padding: 16px;
  background: #fff;
}

.subcategory-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.subcategory-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:active {
    transform: scale(0.98);
    background: #f0f0f0;
  }

  .subcategory-name {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
}

// 响应式调整
@media (max-width: 375px) {
  .category-sidebar {
    width: 80px;

    .category-item {
      padding: 12px 6px;

      .category-name {
        font-size: 11px;
      }
    }
  }

  .subcategory-content {
    padding: 12px;
  }

  .subcategory-item {
    padding: 16px 12px;

    .subcategory-name {
      font-size: 13px;
    }
  }
}
</style>
