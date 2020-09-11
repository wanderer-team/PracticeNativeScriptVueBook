<template>
  <page>
    <action-bar title="カート">
      <navigation-button android.systemIcon="ic_menu_back"/>
    </action-bar>
    <scroll-view>
      <stack-layout
        v-if="items.length === 0"
        row="0"
      >
        <label
          class="m-x-20 m-t-40 align-center"
          horizontalAlignment="stretch"
          text="カートに追加してください"
        />
      </stack-layout>
      <stack-layout
        v-else
      >
        <template
          v-for="(item, i) in items"
        >
          <cart-card
            :key="i"
            :item="item"
            @selectedCount="selectedCount($event)"
            @onDelBtn="onDelBtn($event)"
            @onGoToRegister="onGoToRegister($event)"
          />
        </template>
      </stack-layout>
    </scroll-view>
  </page>
</template>

<script>
import Confirmation from '@/pages/top/Confirmation'
import CartCard from '@/components/CartCard'

export default {
  name: 'CartIndex',
  components: {
    CartCard,
  },
  data: () => ({
    Confirmation,
  }),
  async created() {
    try {
      await this.$store.dispatch('cart/fetchCartItem')
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    items() {
      return this.$store.getters['cart/items']
    },
  },
  methods: {
    selectedCount(item) {
      console.log('selectedCount', item)
    },
    onDelBtn(item) {
      this.$store.dispatch('cart/delCartItem', { cartId: item.id })
    },
    onGoToRegister(item) {
      this.$navigateTo(Confirmation, {
        frame: 'top-frame',
        props: {
          item,
        }
      })
    }
  }
}
</script>
