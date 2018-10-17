<template>
  <div class="user-wrap">
    <img v-lazy="avatar">
    <p>{{signature}}</p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers( "user" );

export default {
  name: "user-info",
  data() {
    return {}
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
  text-align center
  padding 30px 0
  background-color rgba(126,126,126,0.5)
  img
    width 60px
    height 60px
    border-radius 50%
    margin-bottom 10px
  p

</style>
