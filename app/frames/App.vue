<template>
  <frame id="app-frame">
    <auth-frame />
  </frame>
</template>

<script>
import AuthFrame from '@/frames/Auth'

export default {
  name: 'AppFrame',
  components: {
    AuthFrame
  }
}
</script>
