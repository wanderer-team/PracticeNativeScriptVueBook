<template>
  <stack-layout>
    <stack-layout
      orientation="horizontal"
    >
      <label
        class="label-title font-weight-bold"
        text="お支払い方法"
      />
      <label
        v-if="!readOnly"
        class="label-edit"
        text="編集"
      />
    </stack-layout>
    <label
      :text="creditCardNumber"
    />
    <label
      text="一括払い"
    />
  </stack-layout>
</template>

<script>
export default {
  name: 'EditPayMethod',
  props: {
    creditCardNumber: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.label {
  &-title {
    font-size: 16px;
  }
  &-edit {
    font-size: 14px;
    color: $primary-color;
    margin-left: 10;
  }
}
</style>
