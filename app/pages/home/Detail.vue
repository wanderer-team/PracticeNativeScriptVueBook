<template>
  <page>
    <action-bar
      :title="title"
    >
      <navigation-button
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
    </action-bar>
    <scroll-view>
      <stack-layout>
        <image
          :src="item.image"
        />
        <label
          class="m-x-20 bread-crumbs"
          :text="`${prePageName} >`"
          @tap="$navigateBack()"
        />
        <label
          class="m-x-20 title"
          :text="item.title"
        />
        <label
          class="m-x-20 price"
          :text="`¥${$utils.separatedComma(item.price)}(込)`"
        />
        <stack-layout
          class="m-x-20 m-y-20 quantity"
          orientation="horizontal"
        >
          <label
            class="quantity-label"
            verticalAlignment="center"
            text="数量"
          />
          <grid-layout
            class="select"
          >
            <drop-down
              class="drop-down"
              ref="dropDownList"
              :items="counts"
              itemsTextAlignment="left"
              selectedIndex="0"
              @selectedIndexChanged="selectCount"
            />
          </grid-layout>
          <label
            class="m-l-8 quantity-inventory"
            text="在庫あり"
          />
        </stack-layout>
        <button
          class="add-to-cart-btn"
          text="カートに入れる"
          @tap="onAddCart()"
        />
        <button
          class="add-to-favorites-btn"
          text="お気に入りに追加する"
          @tap="onAddFavorite()"
        />
        <stack-layout
          class="m-x-20 item-wrapper"
        >
          <label
            class="m-y-20 item-wrapper-heading font-weight-bold"
            text="商品説明"
          />
          <label-value
            class="m-y-4"
            label="原料米"
            :value="item.brand"
          />
          <label-value
            class="m-y-4"
            label="製造元"
            :value="item.maker"
          />
          <label-value
            class="m-y-4"
            label="原産地"
            :value="item.origin"
          />
          <label-value
            class="m-y-4"
            label="原材料名"
            :value="item.ingredient"
          />
          <label-value
            class="m-y-4"
            label="アルコール度"
            :value="item.alcohol"
          />
          <label-value
            class="m-y-4"
            label="内容量"
            :value="item.capacity"
          />
          <label-value
            class="m-y-4"
            label="日本酒度"
            :value="item.sakeDegree"
          />
          <label
            class="m-y-20"
            :text="item.descripttion"
            :textWrap="true"
          />
        </stack-layout>
      </stack-layout>
    </scroll-view>
  </page>
</template>

<script>
import FavoriteIndexPage from '@/pages/favorite/Index'
import LabelValue from '@/components/LabelValue'

export default {
  name: 'Detail',
  components: {
    LabelValue
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    prePageName: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    title: '詳細',
    FavoriteIndexPage,
  }),
  computed: {
    counts() {
      return [...Array(10)].map((_, i) => i + 1)
    },
  },
  methods: {
    selectCount() {
      this.count = this.$refs.dropDownList.nativeView.selectedIndex + 1
    },
    onAddFavorite() {
      const item = {
        id: this.item.id,
      }
      this.$store.dispatch('favorite/addItemToFavorite', item)
    },
    onAddCart() {
      const item = {
        id: this.item.id,
        count: this.count
      }
      this.$store.dispatch('cart/addItem', item)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.bread-crumbs {
  font-size: 13px;
  color: $gray3-color;
}

.title {
  color: $text-color;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

.price {
  color: $price-color;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
}

.quantity {
  height: 32px;
  &-label {
    width: 10%;
    line-height: 32px;
    height: 32px;
  }
  .select {
    width: 20%;
  }
  &-inventory {
    width: 70%;
    color: $gray3-color;
  }
}

.add-to-cart-btn {
  background: $primary-color;
  color: white;
  border-radius: $border-radius;
  &:active {
    color: white;
  }
}

.add-to-favorites-btn {
  border-width: 2;
  font-weight: 500;
  border-color: $primary-color;
  color: $primary-color;
  border-radius: $border-radius;
  &:active {
    background-color: $primary-color;
    color: white;
  }
}

.item-wrapper {
  &-heading {
    color: $gray1-color;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
