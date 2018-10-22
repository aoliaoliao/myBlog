<template>
  <div class="menu-wrap">
    <!-- <i>菜单</i> -->
    <svg class="icon menu" aria-hidden="true" @click.stop="changeItems">
      <use xlink:href="#icon-menu"></use>
    </svg>
    <mt-cell title="标题文字"></mt-cell>
    <div v-show="isShowItems" class="items">
      <!-- <li></li> -->
      <mt-cell v-for="item in menus" :key="item.name">
        <slot>
          <router-link :to="item.path">{{item.name}}</router-link>
        </slot>
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheMenu',
  data () {
    return {
      isShowItems: false,
      menus: [
        { name: '主页', path: '' },
        { name: '关于', path: '' },
        { name: '标签', path: '' },
        { name: '设置', path: '' }
      ]
    }
  },
  methods: {
    changeItems () {
      this.isShowItems = !this.isShowItems
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-wrap
  position relative
  text-align left
  .menu
    width w = 25px
    height w
    color #ffffff
.items
  width 100px
  height 150px
  background #ffffff
  box-shadow 0px 0px 1px #ffffff
</style>
