<template>
  <page :actionBarHidden="true">
    <frame id="top-frame">
      <top-index-page />
    </frame>
  </page>
</template>

<script>
import TopIndexPage from '@/pages/top/Index'

export default {
  name: 'TopFrame',
  components: {
    TopIndexPage
  }
}
</script>
