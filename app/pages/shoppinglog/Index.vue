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
    <stack-layout
      v-if="items.length === 0"
      row="0"
    >
      <label
        class="m-x-20 m-t-40 align-center"
        horizontalAlignment="stretch"
        text="購入されていません"
      />
    </stack-layout>
    <scroll-view
      v-else
    >
      <stack-layout
        class="m-t-10"
      >
        <template
          v-for="(date, i) in purchaseDateList"
        >
          <label
            :key="i"
            class="title"
            :text="$utils.getDateFormat(date)"
          />
          <template v-for="(item, key) in itemfilteredByDate(date)">
            <list
              class="m-x-16"
              :key="`${date}-${key}`"
              :item="item"
              :readOnly="true"
              @tap="onClickList(item)"
            />
          </template>
        </template>
      </stack-layout>
    </scroll-view>
  </page>
</template>

<script>
import List from '@/components/List'

import Detail from '@/pages/shoppinglog/Detail'

export default {
  name: 'ShoppingLogIndex',
  components: {
    List,
  },
  data () {
    return {
      title: '購入履歴',
      Detail,
    }
  },
  async created() {
    await this.$store.dispatch('history/fetchItemList')
  },
  computed: {
    items() {
      return this.$store.getters['history/histories']
    },
    purchaseDateList() {
      return this.getDateList()
    },
  },
  methods: {
    getDateList() {
      // 日付だけのリストを取得する
      let buyDateList = this.items.map((val) => this.dateSubString(val.createdAt))
      // 日付の重複排除
      buyDateList = [...new Set(buyDateList)]
      return buyDateList
    },
    itemfilteredByDate(date) {
      const result = this.items.filter((item) => {
        return this.dateSubString(item.createdAt) === date
      })
      return result
    },
    onClickList(item) {
      this.$navigateTo(Detail, {
        frame: 'history-frame',
        props: {
          item,
        }
      })
    },
    dateSubString(date) {
      // 2020-08-09T08:22:08.359Z　→ 2020-08-09
      return date.substring(0, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 16;
    font-weight: bold;
    margin-top: 20;
    margin-left: 20;
  }
</style>
