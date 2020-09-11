<template>
  <page>
    <action-bar title="ユーザー情報">
      <navigation-button
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
    </action-bar>
    <stack-layout>
      <name-input
        class="m-16"
        @change="changeName($event)"
        :textArgs="name"
      />
      <date-input
        class="m-16"
        @change="changeDate($event)"
        :dateText="birthday"
      />
      <button
        class="button-update"
        text="更新する"
        @tap="updateUser()"
      />
      <button
        class="button-cancel"
        text="キャンセル"
        @tap="$navigateBack()"
      />
    </stack-layout>
  </page>
</template>

<script>
import DateInput from '@/components/DateInput'
import NameInput from '@/components/NameInput'
import { showSnack } from 'nativescript-material-snackbar'

export default {
  name: 'UserProfile',
  components: {
    DateInput,
    NameInput,
  },
  data: () => ({
    defaultBirthday: '2020-01-01'
  }),
  async created() {
    await this.$store.dispatch('user/fetchUser')
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    name() {
      return this.user.name
    },
    birthday() {
      return this.user.birthday === undefined ? this.defaultBirthday : this.user.birthday
    }
  },
  methods: {
    changeName(val) {
      this.$store.dispatch('user/setUserInfo', { name: val })
    },
    changeDate(date) {
      this.$store.dispatch('user/setUserInfo', { birthday: date })
    },
    showMessage() {
      const delMessage = 'ユーザー情報変更しました'
      const doneMessage = '×'
      showSnack({
        message: delMessage,
        actionText: doneMessage,
        actionTextColor: 'white',
      })
    },
    async updateUser() {
      try {
        await this.$store.dispatch('user/updateUser')
        await this.showMessage()
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.input-area {
  background: white;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.38);
  height: 44;
  padding-left: 15;
  border-radius: 4;
}
.button-update {
  background: $primary-color;
  color: white;
  border-radius: $border-radius;
  &:active {
    color: white;
  }
}
.button-cancel {
  margin-top: 8;
  border-width: 2;
  font-weight: 500;
  border-color: $primary-color;
  color: $primary-color;
  border-radius: $border-radius;
  &:active {
    background-color: $primary-color;
    color: white;
  }
}
</style>
