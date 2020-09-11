<template>
  <stack-layout
    class="card"
    @tap="onClickCard"
  >
    <image
      :src="item.image"
      stretch="aspectFill"
    />
    <label
      class="item-title"
      :textWrap="true"
      :text="item.title"
    />
    <label
      class="price"
      :text="`¥${$utils.separatedComma(item.price)}(込)`"
    />
  </stack-layout>
</template>

<script>
export default {
  name: 'Card',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    }
  },
  methods: {
    onClickCard() {
      this.$emit('onClickCard')
    },
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 1;
}
.item-title {
  text-overflow: ellipsis;
}
.price {
  color: #EB5757;
  font-weight: bold;
}
</style>
