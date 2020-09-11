<template>
  <stack-layout>
    <stack-layout
      orientation="horizontal"
    >
      <image
        class="img m-x-16"
        :src="item.image"
        horizontalAlignment="left"
      />
      <stack-layout
        class="attribute"
        horizontalAlignment="center"
      >
        <label
          class="title m-t-16"
          :text="item.title"
          :textWrap="true"
        />
        <label
          class="price font-weight-bold"
          :text="`¥${$utils.separatedComma(item.price)}(込)/個`"
        />
        <stack-layout
          class="m-y-20 quantity"
          orientation="horizontal"
        >
          <label
            class="quantity-label font-weight-bold"
            verticalAlignment="center"
            text="数量"
          />
          <stack-layout
            class="drop-down-wrapper"
          >
            <drop-down
              class="drop-down"
              horizontalAlignment="left"
              ref="dropDownList"
              :items="counts"
              itemsTextAlignment="left"
              :selectedIndex="selectedIndex"
              @selectedIndexChanged="selectCount"
            />
          </stack-layout>
          <label
            class="del-btn"
            horizontalAlignment="right"
            text="削除"
            @tap="onDelBtn(item)"
          />
        </stack-layout>
      </stack-layout>
    </stack-layout>
    <button
      class="go-to-register"
      text="レジへ進む"
      @tap="onGoToRegister(item)"
    />
  </stack-layout>
</template>

<script>
export default {
  name: 'CartCard',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    counts() {
      return [...Array(10)].map((_, i) => i + 1)
    },
    selectedIndex() {
      return this.item.count - 1
    }
  },
  methods: {
    selectCount() {
      this.item.count = this.$refs.dropDownList.nativeView.selectedIndex + 1
      this.$emit('selectedCount', this.item)
    },
    onDelBtn(item) {
      this.$emit('onDelBtn', item)
    },
    onGoToRegister(item) {
      this.$emit('onGoToRegister', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.go-to-register {
  background: $primary-color;
  color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: $border-radius;
  height: 48px;
  &:active {
    color: white;
  }
}

.img {
  width: 30%;
}

.attribute {
  width: 70%;
}

.title {
  font-size: 12px;
}

.price {
  font-size: 14px;
}

.quantity-label {
  width: 20%;
  font-size: 12px;
}

.drop-down-wrapper {
  width: 50%;
  .drop-down {
    width: 60%;
    border-width: 1;
    border-color: rgba(0, 0, 0, 0.38);
    border-radius: 4;
  }
}

.del-btn {
  width: 30%;
  font-size: 14px;
  color: $primary-color;
}
</style>
