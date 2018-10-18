<template>
  <div class="user-wrap">
    <div class="avatar">
      <img v-lazy="avatar">
      <p>{{signature}}</p>
    </div>
    <div class="memu">
      <the-menu></the-menu>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import TheMenu from './TheMenu'

const { mapState, mapActions } = createNamespacedHelpers( "user" );

export default {
  name: "user-info",
  data() {
    return {}
  },
  components: {
    TheMenu
  },
  computed: {
    ...mapState( {
      avatar: state => state.avatar,
      signature: state => state.signature
    } )
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions( [ "getUserInfo" ] )
  }
};
</script>

<style lang="stylus" scoped>
.user-wrap
  height 300px
  text-align center
  background-color rgba(126,126,126,0.5)
.avatar
  padding 80px 0px
  margin 0 60px
  img
    width 60px
    height 60px
    border-radius 50%
    border 1px solid rgba(255,255,255,0.5)
    margin-bottom 10px
  p
    height 32px
    overflow hidden
.memu
  position absolute
  left 0
  top 0
  padding 20px

</style>
