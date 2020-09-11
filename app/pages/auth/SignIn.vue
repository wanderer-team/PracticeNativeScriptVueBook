<template>
  <page
    class="page"
    :actionBarHidden="true"
  >
    <stack-layout>
      <label
        class="title m-x-16"
        text="ログイン"
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
        text="ログイン"
        @tap="login()"
      />
      <divider
        class="m-x-16"
      />
      <button
        class="button outline -outline"
        text="新規登録はこちら"
        @tap="signUp()"
      />
    </stack-layout>
  </page>

</template>

<script>
import { signIn } from '@/modules/auth/index'
import TopFrame from '@/frames/Top'
import SignUp from '@/pages/auth/SignUp'

import Divider from '@/components/Divider'

export default {
  name: 'SignIn',
  components: {
    Divider
  },
  data: () => ({
    topFrame: TopFrame,
    isValid: true,
    email: 'test@example.com',
    password: 'Passw0rd!',
  }),
  methods: {
    async login() {
      this.validate()
      if (!this.isValid) {
        return
      }
      try {
        const user = await signIn(this.email, this.password)
        await this.$store.dispatch('user/setUserId', user.username)
        await this.$navigateTo(this.topFrame, { frame: 'app-frame' })
      } catch (err) {
        console.error(err)
      }
    },
    signUp() {
      this.$navigateTo(SignUp, { frame: 'auth-frame' })
    },
    validate() {
      this.isValid = !this.isEmpty(this.email) && !this.isEmpty(this.password)
    },
    isEmpty(val) {
      return val === ''
    }
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
