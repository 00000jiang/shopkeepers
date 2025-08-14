<template>
  <div class="search-page">
    <!-- 搜索头部 -->
    <div class="search-header">
      <div class="search-bar">
        <van-icon name="arrow-left" size="18" color="#333" @click="goBack" />
        <van-search
          v-model="searchKeyword"
          placeholder="搜索商品、品牌、店铺"
          shape="round"
          show-action
          @search="handleSearch"
          @focus="onSearchFocus"
          @clear="onSearchClear"
          ref="searchInput"
        >
          <template #action>
            <div @click="handleSearch" class="search-action">搜索</div>
          </template>
        </van-search>
      </div>
    </div>

    <!-- 搜索建议/历史 -->
    <div class="search-content" v-if="!showResults">
      <!-- 搜索历史 -->
      <div class="search-history" v-if="searchHistory.length > 0">
        <div class="section-header">
          <span class="section-title">搜索历史</span>
          <van-icon name="delete-o" size="16" color="#999" @click="clearHistory" />
        </div>
        <div class="history-tags">
          <div
            v-for="(item, index) in searchHistory"
            :key="index"
            class="history-tag"
            @click="searchHistoryItem(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <!-- 热门搜索 -->
      <div class="hot-search">
        <div class="section-header">
          <span class="section-title">热门搜索</span>
        </div>
        <div class="hot-tags">
          <div
            v-for="(item, index) in hotSearchList"
            :key="index"
            class="hot-tag"
            @click="searchHotItem(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-results" v-if="showResults">
      <!-- <div class="results-header">
        <span class="results-count">找到 {{ searchResults.length }} 个相关商品</span>
      </div> -->
      <div class="results-list">
        <commodityCard
          v-for="(product, index) in searchResults"
          :key="index"
          :product="product"
        />
      </div>
      <!-- 加载更多 -->
      <div class="load-more" v-if="searchResults.length > 0" @click="loadMore">
        加载更多
      </div>
    </div>

    <!-- 无搜索结果 -->
    <div class="no-results" v-if="showResults && searchResults.length === 0">
      <van-empty description="没有找到相关商品" />
    </div>
  </div>
</template>

<script>
import commodityCard from '@/views/common/commodity/card.vue'

export default {
  name: 'SearchIndex',
  components: {
    commodityCard
  },
  data () {
    return {
      searchKeyword: '',
      showResults: false,
      searchHistory: [],
      hotSearchList: [
        '手机',
        '耳机',
        '电脑',
        '相机',
        '手表',
        '服饰',
        '家居',
        '数码'
      ],
      searchResults: [],
      mockProducts: [
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
      ]
    }
  },
  mounted () {
    // 获取路由参数中的搜索关键词
    const keyword = this.$route.query.keyword
    if (keyword) {
      this.searchKeyword = keyword
      this.handleSearch()
    }

    // 加载搜索历史
    this.loadSearchHistory()

    // 自动聚焦搜索框
    this.$nextTick(() => {
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus()
      }
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    handleSearch () {
      if (!this.searchKeyword.trim()) {
        this.$toast('请输入搜索关键词')
        return
      }

      // 添加到搜索历史
      this.addToHistory(this.searchKeyword)

      // 模拟搜索结果
      this.searchResults = this.mockProducts.filter(product =>
        product.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      )

      this.showResults = true

      console.log('搜索关键词:', this.searchKeyword)
    },
    onSearchFocus () {
      this.showResults = false
    },
    onSearchClear () {
      this.showResults = false
      this.searchResults = []
    },
    searchHistoryItem (keyword) {
      this.searchKeyword = keyword
      this.handleSearch()
    },
    searchHotItem (keyword) {
      this.searchKeyword = keyword
      this.handleSearch()
    },
    addToHistory (keyword) {
      // 避免重复添加
      const index = this.searchHistory.indexOf(keyword)
      if (index > -1) {
        this.searchHistory.splice(index, 1)
      }

      // 添加到开头
      this.searchHistory.unshift(keyword)

      // 限制历史记录数量
      if (this.searchHistory.length > 10) {
        this.searchHistory = this.searchHistory.slice(0, 10)
      }

      // 保存到本地存储
      this.saveSearchHistory()
    },
    loadSearchHistory () {
      const history = localStorage.getItem('searchHistory')
      if (history) {
        this.searchHistory = JSON.parse(history)
      }
    },
    saveSearchHistory () {
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    },
    clearHistory () {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要清空搜索历史吗？'
      }).then(() => {
        this.searchHistory = []
        localStorage.removeItem('searchHistory')
        this.$toast('已清空搜索历史')
      }).catch(() => {
        // 取消操作
      })
    },
    loadMore () {
      this.$toast('加载更多商品')
      // 这里可以实现加载更多的逻辑
    }
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.search-header {
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;

  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;

    :deep(.van-search) {
      flex: 1;
      background: transparent;
      padding: 0;

      .van-search__content {
        background: #f5f5f5;
        border-radius: 20px;
        border: none;
      }

      .van-field__control {
        font-size: 14px;
        color: #333;

        &::placeholder {
          color: #999;
        }
      }
    }

    .search-action {
      color: #ee0a24;
      font-size: 14px;
      cursor: pointer;
      padding: 0 8px;
    }
  }
}

.search-content {
  padding: 16px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }

  .search-history {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;

    .history-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .history-tag {
        background: #f5f5f5;
        color: #666;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:active {
          background: #e9ecef;
          transform: scale(0.98);
        }
      }
    }
  }

  .hot-search {
    background: #fff;
    border-radius: 12px;
    padding: 16px;

    .hot-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .hot-tag {
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        color: #fff;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }
}

.search-results {
  padding: 16px;

  .results-header {
    margin-bottom: 16px;

    .results-count {
      font-size: 14px;
      color: #666;
    }
  }

  .results-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .load-more {
    text-align: center;
    padding: 12px 0;
    color: #ee0a24;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #ee0a24;
    border-radius: 25px;
    background: #fff;

    &:active {
      background: #fee;
      transform: scale(0.98);
    }
  }
}

.no-results {
  padding: 60px 16px;
  text-align: center;
}
</style>
