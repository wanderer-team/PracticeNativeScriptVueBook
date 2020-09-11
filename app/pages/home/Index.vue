<template>
  <page :actionBarHidden="true">
    <grid-layout rows="64, 56, 120, *">
      <search-bar
        row="0"
        :hint="hint"
        ref="searchBar"
        @clear="onClear($event)"
        @submit="onSubmit($event)"
      />
      <segmented-bar
        row="1"
        v-model="selectedItem"
      >
        <segmented-bar-item
          title="おすすめ"
        />
        <segmented-bar-item
          title="ホーム"
        />
        <segmented-bar-item
          title="ランキング"
        />
      </segmented-bar>
      <stack-layout
        class="banner-area"
        row="2"
      >
        <banner-carousel />
      </stack-layout>
      <scroll-view
        row="3"
      >
        <grid-layout
          class="card-layout"
          :rows="calcRowCount()"
          columns="*, *"
        >
          <template
            v-for="(item, i) in _items"
          >
            <card
              :key="i"
              :row="rowNum(i)"
              :col="colNum(i)"
              :item="item"
              @onClickCard="onClickCard(item)"
            />
          </template>
        </grid-layout>
      </scroll-view>
    </grid-layout>
  </page>
</template>

<script>
import Detail from '@/pages/home/Detail'

import Card from '@/components/Card'
import BannerCarousel from '@/components/BannerCarousel'

export default {
  name: 'HomeIndex',
  components: {
    Card,
    BannerCarousel,
  },
  data: () => ({
    Detail,
    hint: '商品名、キーワードで検索',
    selectedItem: 1,
    searchText: '',
    _items: [],
  }),
  async created() {
    await this.$store.dispatch('item/fetchItemListApi')
  },
  computed: {
    items() {
      // 検索時などに書き換えるため、itemsをコピーして使用している
      this._items = this.$store.getters['item/itemList']
      return this._items
    },
  },
  methods: {
    calcRowCount() {
      const count = Math.ceil(this.items.length / 2)
      return String([...Array(count)].map((_, i) => '*'))
    },
    rowNum(index) {
      // 2つずつ連番にする
      return Math.floor(index / 2)
    },
    colNum(index) {
      // 偶数ならrow=0, 奇数ならrow=1
      return this.isEven(index) ? 0 : 1
    },
    isEven(value) {
      return value % 2 === 0
    },
    onClickCard(item) {
      this.$navigateTo(Detail, {
        frame: 'home-frame',
        props: {
          item,
          prePageName: 'ホーム',
        }
      })
    },
    hideKeyboard() {
      /**
       * キーボードを閉じる
      **/
      this.$refs.searchBar.nativeView.dismissSoftInput()
    },
    backOriginItems() {
      this._items = this.items
    },
    onClear() {
      this.searchText = ''
      this.backOriginItems()
      this.hideKeyboard()
    },
    onSubmit(args) {
      this.searchText = args.object.text
      this.backOriginItems()
      if (!this.searchText) {
        const pattern = new RegExp(`/^(?=.*${this.searchText}).*$/`)
        const copiedItems = this._items.slice()
        this._items = copiedItems.filter(item => pattern.test(item.title))
      }
      this.hideKeyboard()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.card-layout {
  margin: 12;
  .card {
    padding: 1;
  }

  .item-title {
    text-overflow: ellipsis;
  }

  .price {
    color: $price-color;
    font-weight: bold;
  }
}
</style>
