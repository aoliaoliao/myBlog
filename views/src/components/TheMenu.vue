<template>
  <div class="menu-wrap">
    <i>菜单</i>
    <div class="items">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheMenu',
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-wrap
  width w = 30px
  height w
  background-color #000
  position relative
.items
  display none
</style>
