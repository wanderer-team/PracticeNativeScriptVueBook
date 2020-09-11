<template>
  <stack-layout>
    <label
      text="名前"
      color="#4F4F4F"
    />
    <text-field
      v-model="value"
      class="input-area"
      width="100%"
      hint="名前"
    />
  </stack-layout>
</template>

<script>
export default {
  props: {
    textArgs: {
      type: String,
      default: '',
    }
  },
  computed: {
    value: {
      get () {
        return this.textArgs
      },
      set (newValue) {
        this.$emit('change', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-area {
  background: white;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.38);
  height: 44;
  padding-left: 15;
  border-radius: 4;
}
</style>
