<template>
  <grid-layout
    height="90"
    columns="80, 5*, *"
    @tap="onClickList"
  >
    <grid-layout
      class="button-icon-background-area"
      col="0"
    >
      <label
        class="mdi icon"
        :text="icon"
      />
    </grid-layout>
    <stack-layout
      class="button-text-area"
      col="1"
    >
      <label
        class="button-title"
        :text="title"
        row="0"
      />
      <label
        class="button-subtitle"
        :text="subTitle"
        row="1"
      />
    </stack-layout>
    <label
      class="mdi icon arrow"
      text="navigate_next"
      col="2"
    />
  </grid-layout>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    subTitle: {
      type: String,
      default: '',
      required: true
    },
    icon: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    onClickList() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.icon {
  font-size: 20;
  color: $primary-color;
  padding: 10 0 0 10;
}
.button-icon-background-area {
  width: 40;
  height: 40;
  border-radius: 50%;
  background: #DCEFFC;
}
.button-text-area {
  margin-top: 24;
}
.button-title {
  font-size: 16;
}
.button-subtitle {
  font-size: 14;
  color: rgba(0, 0, 0, 0.543846);
}
.arrow {
  margin-top: 25;
  color: black;
}
</style>
