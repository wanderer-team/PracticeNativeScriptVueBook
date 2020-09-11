<template>
  <page>
    <action-bar title="注文を確定する">
      <navigation-button
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
    </action-bar>
    <scroll-view>
      <stack-layout>
        <button
          class="button-area"
          text="注文を確定する"
          row="1"
          @tap="onConfirmOrder()"
        />
        <stack-layout
          class="m-x-16"
        >
          <list
            :item="item"
            @selectedCount="selectedCount"
          />
          <charge-breakdown
            :charge="item"
          />
          <edit-address
            :user="user"
          />
          <edit-pay-method
            class="m-y-16"
            :creditCardNumber="user.creditCardNumber"
          />
        </stack-layout>
      </stack-layout>
    </scroll-view>
  </page>
</template>

<script>
import BuyDone from '@/pages/top/BuyDone'

import ChargeBreakdown from '@/components/ChargeBreakdown'
import EditAddress from '@/components/EditAddress'
import EditPayMethod from '@/components/EditPayMethod'
import List from '@/components/List'

export default {
  name: 'Confirmation',
  components: {
    List,
    ChargeBreakdown,
    EditAddress,
    EditPayMethod,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  async created() {
    await this.$store.dispatch('user/fetchUser')
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
  },
  data () {
    return {
      BuyDone,
    }
  },
  methods: {
    async onConfirmOrder() {
      try {
        const payload =  {
          item: this.item,
          user: this.user,
        }
        await this.$store.dispatch('history/addHistoryItem', payload)
        await this.$store.dispatch('cart/delCartItem', { cartId: this.item.id })
        await this.$navigateTo(BuyDone, {
          frame: 'top-frame',
          props: payload
        })
      } catch (err) {
        console.error(err)
      }
    },
    selectedCount(item) {
      console.log(item)
      this.item = item
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.button-area {
  background: $primary-color;
  color: white;
}
</style>
