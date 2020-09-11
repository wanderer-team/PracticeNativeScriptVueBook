<template>
  <stack-layout>
    <stack-layout
      orientation="horizontal"
    >
      <label
        class="label-title font-weight-bold"
        text="お届け先"
      />
      <label
        v-if="!readOnly"
        class="label-edit"
        text="編集"
      />
    </stack-layout>
    <label
      :text="user.name"
    />
    <label
      :text="`〒${user.zipCode}`"
    />
    <label
      :text="`${user.address} ${user.building}`"
    />
  </stack-layout>
</template>

<script>
export default {
  name: 'EditAddress',
  props: {
    user: {
      type: Object,
      default: () => {},
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
