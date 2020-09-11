<template>
  <stack-layout>
    <stack-layout
      class="label-wrapper"
      orientation="horizontal"
    >
      <label
        class="label font-weight-bold"
        text="商品単価"
        horizontalAlignment="left"
      />
      <label
        class="value text-right"
        :text="price"
        horizontalAlignment="right"
      />
    </stack-layout>
    <stack-layout
      class="label-wrapper"
      orientation="horizontal"
    >
      <label
        class="label font-weight-bold"
        text="数量"
        horizontalAlignment="left"
      />
      <label
        class="value text-right"
        :text="charge.count"
        horizontalAlignment="right"
      />
    </stack-layout>
    <stack-layout
      class="label-wrapper"
      orientation="horizontal"
    >
      <label
        class="label font-weight-bold"
        text="送料"
        horizontalAlignment="left"
      />
      <label
        class="value text-right"
        :text="deliveryFee"
        horizontalAlignment="right"
      />
    </stack-layout>
    <divider />
    <stack-layout
      orientation="horizontal"
    >
      <label
        class="sum text-right"
        :text="totalPrice"
      />
    </stack-layout>
  </stack-layout>
</template>

<script>
import Divider from '@/components/Divider'

export default {
  name: 'ChargeBreakdown',
  components: {
    Divider,
  },
  props: {
    charge: {
      type: Object,
      default: () => ({
        price: 0,
        count: 1,
        deliveryFee: 0,
      }),
    }
  },
  computed: {
    price() {
      return `¥${this.$utils.separatedComma(this.charge.price)}(込)`
    },
    deliveryFee() {
      return `¥${this.$utils.separatedComma(this.charge.deliveryFee)}`
    },
    totalPrice() {
      const calcedPrice = this.sum(this.charge.price, this.charge.count, this.charge.deliveryFee)
      return `¥${this.$utils.separatedComma(calcedPrice)}`
    }
  },
  methods: {
    sum(price, count, deliveryFee) {
      return price * count + deliveryFee
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.label {
  width: 50%;
}
.value {
  width: 50%;
}
.sum {
  width: 100%;
}
</style>
