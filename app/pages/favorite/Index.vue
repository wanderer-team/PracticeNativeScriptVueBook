<template>
  <page>
    <action-bar title="お気に入り">
      <navigation-button android.systemIcon="ic_menu_back" />
    </action-bar>
    <scroll-view>
      <stack-layout
        v-if="items.length === 0"
      >
        <label
          class="m-x-20 m-t-40 align-center"
          horizontalAlignment="stretch"
          text="お気に入りを登録してください"
        />
      </stack-layout>
      <stack-layout
        v-else
      >
        <template v-for="(item, i) in items">
          <favorite
            :key="i"
            :item="item"
            @onDeleteBtn="onDeleteBtn($event)"
          />
        </template>
      </stack-layout>
    </scroll-view>
  </page>
</template>

<script>
import Favorite from '@/components/Favorite'
import { showSnack } from 'nativescript-material-snackbar'

export default {
  name: 'FavoriteIndex',
  components: {
    Favorite,
  },
  async created() {
    await this.$store.dispatch('favorite/fetchItems')
  },
  computed: {
    items() {
      return this.$store.getters['favorite/items']
    },
  },
  methods: {
    async onDeleteBtn(favoriteItem) {
      try {
        await this.$store.dispatch('favorite/deleteItem', { favoriteId: favoriteItem.id })
        const delMessage = 'お気に入りを一点削除しました'
        const doneMessage = '×'
        showSnack({
          message: delMessage,
          actionText: doneMessage,
          actionTextColor: 'white',
        })
      } catch (err) {
        console.error(err)
      }
    },
  }
}
</script>

