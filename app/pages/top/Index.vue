<template>
  <page :actionBarHidden="true">
    <bottom-navigation>
      <tab-strip
        selectedIndex="0"
      >
        <tab-strip-item>
          <label
            text="ホーム"
          />
          <image
            class="mdi icon"
            src="font://home"
          />
        </tab-strip-item>
        <tab-strip-item>
          <label
            text="お気に入り"
          />
          <image
            class="mdi icon"
            src="font://favorite_border"
          />
        </tab-strip-item>
        <tab-strip-item>
          <label
            text="カート"
          />
          <image
            class="mdi icon"
            src="font://shopping_cart"
          />
        </tab-strip-item>
        <tab-strip-item>
          <label
            text="購入履歴"
          />
          <image
            class="mdi icon"
            src="font://list"
          />
        </tab-strip-item>
        <tab-strip-item>
          <label
            text="マイページ"
          />
          <image
            class="mdi icon"
            src="font://person_outline"
          />
        </tab-strip-item>
      </tab-strip>
      <tab-content-item>
        <frame
          id="home-frame"
        >
          <home-index-page />
        </frame>
      </tab-content-item>
      <tab-content-item>
        <frame
          id="favorite-frame"
        >
          <favorite-index-page />
        </frame>
      </tab-content-item>
      <tab-content-item>
        <frame
          id="cart-frame"
        >
          <cart-index-page />
        </frame>
      </tab-content-item>
      <tab-content-item>
        <frame
          id="history-frame"
        >
          <shopping-log-index-page />
        </frame>
      </tab-content-item>
      <tab-content-item>
        <frame
          id="mypage-frame"
        >
          <mypage-index-page />
        </frame>
      </tab-content-item>
    </bottom-navigation>
  </page>
</template>

<script>
import HomeIndexPage from '@/pages/home/Index'
import CartIndexPage from '@/pages/cart/Index'
import FavoriteIndexPage from '@/pages/favorite/Index'
import MypageIndexPage from '@/pages/mypage/Index'
import ShoppingLogIndexPage from '@/pages/shoppinglog/Index'

export default {
  name: 'TopIndex',
  components: {
    HomeIndexPage,
    CartIndexPage,
    FavoriteIndexPage,
    MypageIndexPage,
    ShoppingLogIndexPage,
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 10
}
</style>
