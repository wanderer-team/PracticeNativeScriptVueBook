<template>
  <page
    class="page"
    :actionBarHidden="true"
  >
    <stack-layout>
      <label
        class="title m-x-16"
        text="新規登録"
        textAlignment="center"
      />
      <label
        class="label m-x-16"
        text="メールアドレス"
      />
      <text-field
        class="text-field m-x-16"
        keyboardType="email"
        v-model="email"
        hint="メールアドレス"
      />
      <label
        class="label m-x-16"
        text="パスワード(英数字8文字以上)"
      />
      <text-field
        class="text-field m-x-16"
        keyboardType="password"
        marginBottom="20"
        v-model="password"
        :secure="true"
        hint="パスワード"
      />
      <button
        class="button primary"
        text="ユーザー情報の登録へ進む"
        @tap="signUp()"
      />
    </stack-layout>
  </page>

</template>

<script>
import { signUp } from '@/modules/auth/index'
import UserProfile from '@/pages/auth/UserProfile'

export default {
  name: 'SignUp',
  data: () => ({
    isValid: true,
    email: '',
    password: '',
  }),
  methods: {
    async signUp() {
      try {
        const user = await signUp(this.email, this.password)
        await this.$store.dispatch('user/setUserId', user.userSub)
        await this.$store.dispatch('user/setUserAuth', { email: this.email, password: this.password })
        await this.$navigateTo(
          UserProfile,
          {
            frame: 'auth-frame',
          },
        )
      } catch (err) {
        console.error(err)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.page {
  .title {
    margin-top: 40;
    margin-bottom: 43;
    font-weight: bold;
    font-size: 24;
  }
  .label {
    font-weight: 500;
    font-size: 14;
    color: $gray2-color;
  }
  .text-field {
    background: white;
    border-width: 1;
    border-color: rgba(0, 0, 0, 0.38);
    height: 44;
    border-radius: 4;
  }
  .text-field .button {
    width: 320;
    height: 48;
  }
  .primary {
    color: #FFFFFF;
    background-color: $primary-color;
  }
  .outline {
    color: $primary-color;
    border: 2 solid $primary-color;
    border-radius: 4;
  }
}
</style>
