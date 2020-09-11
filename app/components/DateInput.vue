<template>
  <stack-layout>
    <label
      text="生年月日"
      color="#4F4F4F"
    />
    <stack-layout
      orientation="horizontal"
    >
      <button
        class="input-area m-0 text-left"
        @tap="onPickDateTap"
        :text="year"
      />
      <label
        class="slash-text"
        text="/"
      />
      <button
        class="input-area m-0 text-left"
        @tap="onPickDateTap"
        :text="month"
      />
      <label
        class="slash-text"
        text="/"
      />
      <button
        class="input-area m-0 text-left"
        @tap="onPickDateTap"
        :text="date"
      />
    </stack-layout>
  </stack-layout>
</template>

<script>
import { DateTimePicker } from 'nativescript-datetimepicker'

import moment from 'moment'
moment.locale('ja')

export default {
  name: 'DateInput',
  data: () => ({
    separateMark: '-',
  }),
  props: {
    dateText: {
      type: String,
      default: '',
    }
  },
  computed: {
    year() {
      return this.separatedDate('year')
    },
    month() {
      return this.separatedDate('month')
    },
    date() {
      return this.separatedDate('date')
    }
  },
  methods: {
    separatedDate(part) {
      // 2020-01-01を年,月,日に分けて取得する
      const index = {
        year: 0,
        month: 1,
        date: 2
      }
      const empty = ''
      return !this.dateText ? empty : this.dateText.split(this.separateMark)[index[part]]
    },
    async onPickDateTap(args) {
      try {
        const selectedDate = await DateTimePicker.pickDate({
          context: args.object._context,
          date: new Date(this.dateText),
          okButtonText: 'OK',
          dateFormat: 'yyyy-MM-dd',
          cancelButtonText: 'キャンセル',
          title: '日付を選択してください',
          locale: 'ja_JP'
        })
        if (selectedDate) {
          const dateText = this.getFormattedDate(selectedDate)
          this.$emit('change', dateText)
        }
      } catch(err) {
        console.error(err)
      }
    },
    getFormattedDate(date) {
      const dd = this.filledZero(date.getDate())
      const month = this.filledZero(date.getMonth() + 1)
      const year = date.getFullYear()
      return `${year}${this.separateMark}${month}${this.separateMark}${dd}`
    },
    filledZero(val) {
      // 先頭を0埋め
      // padStartが効かない
      // return val.toString.padStart(2, '0')
      return (val < 10 ? '0' : '') + val
    }
  }
}
</script>

<style lang="scss" scoped>
.input-area {
  background: white;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.38);
  height: 44;
  border-radius: 4;
  color: black;
}
.slash-text {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.38);
  height: 44px;
}
</style>
