<template>
  <div aspectratio w-375-375>
    <div aspectratio-content class="user-wrap">
      <div class="avatar">
        <img v-lazy="userAvatar">
        <p>{{signature}}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>


<script>
import { createNamespacedHelpers } from 'vuex'

import TheHeader from './TheHeader'

const { mapState, mapActions } = createNamespacedHelpers('user')

export default {
  name: 'user-info',
  data () {
    return {}
  },
  components: {
    TheHeader
  },
  computed: {
    ...mapState({
      avatar: state => state.avatar,
      signature: state => state.signature
    }),
    userAvatar () {
      return this.avatar || '/static/images/user_avatar.jpg'
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions([ 'getUserInfo' ]),
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable'

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
    color $white

</style>
