<template>
  <stack-layout
    orientation="horizontal"
  >
    <image
      class="img"
      :src="item.image"
      horizontalAlignment="left"
    />
    <stack-layout
      class="attribute m-l-16"
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
          v-if="!readOnly"
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
          v-else
          class="count font-weight-bold"
          :text="item.count || item.itemCount"
        />
      </stack-layout>
    </stack-layout>
  </stack-layout>
</template>

<script>
export default {
  name: 'List',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    readOnly: {
      type: Boolean,
      default: false,
    }
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
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
.count {
  width: 60%;
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
</style>
