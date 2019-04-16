<template>
  <div class="login-index">
    <div class="title">For You</div>
    <app-login class="login-wrap"></app-login>
  </div>
</template>

<script>
import AppLogin from './AppLogin'

export default {
  name: 'login-index',
  components: {
    AppLogin
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable'

.login-index
  height 100%
  background $white
  .title
    margin 100px 0 20px
    font-size 24px
    text-align center
  .login-wrap
    width 80%
    margin-left 10%





</style>
