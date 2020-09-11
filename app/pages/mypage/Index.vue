<template>
  <page>
    <action-bar
      :title="title"
    >
      <navigation-button
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
    </action-bar>
    <scroll-view>
      <stack-layout>
        <list-button
          class="m-t-4 m-r-8"
          title="ユーザー情報"
          subTitle="名前、生年月日"
          icon="person_outline"
          @click="navToUserProfile()"
        />
        <list-button
          class="m-t-4 m-r-8"
          title="アカウント情報"
          subTitle="メールアドレス、パスワード"
          icon="vpn_key"
        />
        <list-button
          class="m-t-4 m-r-8"
          title="支払い方法"
          subTitle="クレジットカード"
          icon="credit_card"
        />
        <list-button
          class="m-t-4 m-r-8"
          title="お届け先"
          subTitle="配送先の情報"
          icon="home"
        />
      </stack-layout>
    </scroll-view>
  </page>
</template>
<script>
import ListButton from '@/components/ListButton'
import UserProfile from '@/pages/mypage/UserProfile'
import Test from '@/pages/mypage/Test'

export default {
  name: 'MyPageIndex',
  components: {
    ListButton,
  },
  data: () => ({
    title: 'マイページ',
    UserProfile,
  }),
  methods: {
    navToUserProfile() {
      this.$navigateTo(UserProfile, { frame: 'mypage-frame' })
    },
  }
}
</script>
