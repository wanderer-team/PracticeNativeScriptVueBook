<template >
  <stack-layout
    orientation="horizontal"
  >
    <label
      class="label font-weight-bold"
      :text="label"
      horizontalAlignment="left"
    />
    <label
      class="value"
      :text="value"
      horizontalAlignment="center"
    />
  </stack-layout>
</template>

<script>
export default {
  name: 'LabelValue',
  props: {
    label: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: [String, Number],
      default: '',
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>
.label {
  width: 30%;
}

.value {
  width: 70%;
}
</style>
