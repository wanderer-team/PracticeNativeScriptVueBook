<template>
  <page
    class="page"
    :actionBarHidden="true"
  >
    <stack-layout>
      <label
        class="title m-x-16"
        text="プロフィールを入力してください"
        :textWrap="true"
      />
       <stack-layout>
        <label
          class="m-x-16"
          text="名前"
          color="#4F4F4F"
        />
        <text-field
          class="input-area m-x-16"
          hint="名前"
          v-model="name"
          :borderColor="borderColor()"
        />
        <label
          v-show="isInvalid"
          class="m-x-16"
          color="#F44336"
          text="名前を入力して下さい"
        />
      </stack-layout>
      <date-input
        class="m-x-16"
        :dateText="birthday"
        @change="changeDate($event)"
      />
      <button
        class="button-area"
        text="登録"
        @tap="onClickButton()"
      />
    </stack-layout>
  </page>
</template>

<script>
import { signIn } from '@/modules/auth/index'
import DateInput from '@/components/DateInput'

import TopFrame from '@/frames/Top'

export default {
  name: 'UserProfile',
  components: {
    DateInput,
  },
  data: () => ({
    TopFrame,
    name: '',
    isInvalid: false,
    birthday: '2000-01-01',
  }),
  methods: {
    changeDate(date) {
      console.log(date)
      this.birthday = date
    },
    borderColor() {
      const errorColor = '#DB4E42'
      const commonColor = '#BDBDBD'
      return this.isInvalid ? errorColor : commonColor
    },
    async onClickButton() {
      this.validate()
      try {
        if (!this.isInvalid) {
          const auth = await this.$store.getters['user/auth']
          const user = await signIn(auth.email, auth.password)
          await this.$store.dispatch('user/createUser', { name: this.name, birthday: this.birthday })
          this.$navigateTo(TopFrame, {
            frame: 'app-frame',
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    validate() {
      const isEmptyName = this.name === ''
      this.isInvalid = isEmptyName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.page {
  .title {
    margin-top: 40;
    margin-bottom: 43;
    font-weight: bold;
    font-size: 24;
  }
}
.input-area {
  background: white;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.38);
  height: 44;
  padding-left: 15;
  border-radius: 4;
}
.button-area {
  background: $primary-color;
  margin-top: 10;
  color: white;
}
</style>
