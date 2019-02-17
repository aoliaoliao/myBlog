<template>
  <div class="app-logout" @click.stop="logout">
    <slot>

    </slot>
  </div>
</template>

<script>
export default {
  name: 'app-logout',
  data() {
    return {

    }
  },
  methods: {
    logout() {
      localStorage.removeItem( 'token' )
      localStorage.removeItem( 'refresh_token' )
      this.$router.push( '/login' )
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

