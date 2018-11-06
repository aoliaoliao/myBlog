<template>
  <div aspectratio w-375-375>
    <div aspectratio-content class="user-wrap">
      <div class="avatar">
        <img v-lazy="avatar">
        <p>{{signature}}</p>
      </div>
      <div class="memu">
        <the-menu></the-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import TheMenu from './TheMenu'

const { mapState, mapActions } = createNamespacedHelpers('user')

export default {
  name: 'user-info',
  data () {
    return {}
  },
  components: {
    TheMenu
  },
  computed: {
    ...mapState({
      avatar: state => state.avatar,
      signature: state => state.signature
    })
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions([ 'getUserInfo' ])
  }
}
</script>

<style lang="stylus" scoped>
[w-375-375]
  aspect-ratio '375:375'
.user-wrap
  text-align center
  background-color rgba(126, 126, 126, 0.5)
  background-image url('../assets/images/bg_user_info.jpg')
  background-size cover
.avatar
  padding 80px 0px
  margin 0 60px
  img
    width 60px
    height 60px
    border-radius 50%
    border 1px solid rgba(255, 255, 255, 0.5)
    margin-bottom 10px
  p
    overflow hidden
    font-size 18px
    line-height 32px
    color #ffffff
.memu
  position absolute
  left 0
  top 0
  padding 20px
</style>
