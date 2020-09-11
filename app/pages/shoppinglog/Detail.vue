<template>
  <page>
    <action-bar title="購入履歴">
      <navigation-button
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
    </action-bar>
    <scroll-view>
      <stack-layout
        class="m-x-16"
      >
        <list
          :item="item"
        />
        <charge-breakdown
          :charge="item"
        />
        <edit-address
          :user="user"
          :readOnly="true"
        />
        <edit-pay-method
          class="m-y-16"
          :creditCardNumber="user.creditCardNumber"
          :readOnly="true"
        />
      </stack-layout>
    </scroll-view>
  </page>
</template>

<script>
import ChargeBreakdown from '@/components/ChargeBreakdown'
import EditAddress from '@/components/EditAddress'
import EditPayMethod from '@/components/EditPayMethod'
import List from '@/components/List'

export default {
  name: 'Detail',
  components: {
    ChargeBreakdown,
    EditAddress,
    EditPayMethod,
    List,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    }
  },
  data () {
    return {
      user: {
        name: '遠藤リョウ',
        zipCode: '123-1234',
        address: '東京都板橋区1-1',
        building: 'apart201',
        creditCardNumber: '*************1234'
      }
    }
  }
}
</script>
