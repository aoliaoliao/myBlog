<template>
  <div class="page-title">
    <span class="title-name">
      <slot></slot>
    </span>
    <span class="title-right">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'page-title'
}
</script>

<style lang="stylus" scoped>
.page-title
  position fixed
  top 0
  left 0
  right 0
  height 45px - 1
  z-index 9
  background #ffffff
  border-bottom 1px solid #cccccc
.page-title
  display flex
  padding  0 10px
  align-items center
  justify-content space-between
  .title-name
    font-weight bold
    font-size 18px
</style>
