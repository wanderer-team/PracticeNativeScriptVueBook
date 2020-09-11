<template>
  <page :actionBarHidden="true">
    <frame id="auth-frame">
      <sign-in-page />
    </frame>
  </page>
</template>

<script>
import SignInPage from '@/pages/auth/SignIn'

export default {
  name: 'AuthFrame',
  components: {
    SignInPage
  }
}
</script>
