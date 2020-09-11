<template>
  <grid-layout
    height="90"
    columns="90, *"
    marginTop="20"
  >
    <image
      :src="item.image"
      col="0"
    />
    <grid-layout
      columns="150, auto, *"
      marginLeft="10"
      rows="auto, *, *"
      col="1"
    >
      <label
        :text="item.title"
        :textWrap="true"
        col="0"
        row="0"
      />
      <label
        :text="`¥${separatedComma(item.price)}(込)/個`"
        class="price-text"
        col="0"
        row="1"
      />
      <label
        @tap="onDeleteBtn(item)"
        class="delete-button"
        text="削除"
        col="2"
        row="2"
      />
    </grid-layout>
  </grid-layout>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => []
    }
  },
  methods: {
    separatedComma(price) {
      return this.$utils.separatedComma(price)
    },
    onDeleteBtn (item) {
      this.$emit('onDeleteBtn', item)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

  .price-text {
    margin-top: 5;
    font-size: 14;
    font-weight: bold;
  }
  .delete-button {
    color: $primary-color;
    font-size: 14px;
  }
</style>
