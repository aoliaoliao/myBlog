<template>
  <div class="the-header">
    <svg @click.stop="back" class="icon menu" aria-hidden="true">
      <use xlink:href="#icon-backArrow"></use>
    </svg>
    <span class="title one-ellipsis">{{title}}</span>
    <span class="features">
      <slot></slot>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
@import '~styles/variable'
.the-header
  height 30px
  padding 10px
  display flex
  align-items center
  background $white
  border-bottom 1px solid #999999
  .title
    color #333333
    font-size 16px
    width 270px
    margin-left 10px
  .menu
    width w = 20px
    height w
    color #666666
  .features
    flex 1
    text-align right
    margin-right 5px
</style>

<script>
export default {
  name: 'the-header',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
