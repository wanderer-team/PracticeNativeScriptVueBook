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
    <dock-layout
      :stretchLastChild="true"
    >
      <!-- dock-layoutのstretchLastChildを効かせるためにbottomを先に書く -->
      <button
        class="on-back-home"
        dock="bottom"
        text="ホームに戻る"
        @tap="onBackHome()"
      />
      <scroll-view
        dock="center"
      >
        <stack-layout
          class="m-x-16"
        >
          <label
            class="title font-weight-bold m-y-16"
            :text="title"
          />
          <list
            :item="item"
            :readOnly="true"
          />
          <charge-breakdown
            :charge="charge"
          />
          <edit-address
            :readOnly="true"
            :user="user"
          />
          <edit-pay-method
            class="m-y-16"
            :readOnly="true"
            :creditCardNumber="user.creditCardNumber"
          />
        </stack-layout>
      </scroll-view>
    </dock-layout>
  </page>
</template>

<script>
import TopIndex from '@/pages/top/Index'

import ChargeBreakdown from '@/components/ChargeBreakdown'
import EditAddress from '@/components/EditAddress'
import EditPayMethod from '@/components/EditPayMethod'
import List from '@/components/List'

export default {
  name: 'BuyDone',
  components: {
    ChargeBreakdown,
    EditAddress,
    EditPayMethod,
    List,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    TopIndex,
    title: '注文を確定しました',
  }),
  computed: {
    charge() {
      return {
        price: this.item.price,
        deliveryFee: this.item.deliveryFee,
        count: this.item.count,
      }
    }
  },
  methods: {
    onBackHome() {
      this.$navigateTo(TopIndex, {
        frame: 'top-frame',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.title {
  font-size: 24px;
}
.on-back-home {
  background: $primary-color;
  color: white;
}
</style>
