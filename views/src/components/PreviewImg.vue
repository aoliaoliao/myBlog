<template>
  <div class="preview-img" @click.stop="close">
    <!-- <img src="" /> -->
    <mt-swipe class="mt-swipe" :show-indicators="false" :stop-propagation="true" :auto="0" :default-index="index" :continuous="false">
      <mt-swipe-item class="mt-swipe-item" v-for="( item, index ) in imgs" :key="index" :id="index">
        <keep-alive>
          <div class="img">
            <img v-lazy="item"> </img>
          </div>
        </keep-alive>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: 'preview-img',
  props: {
    imgs: {
      type: Array,
      default: () => ( [] ),
      descript: '待预览的图片数组'
    },
    index: {
      type: Number,
      default: 0,
      descript: '默认显示数组中的第几个元素'
    }
  },
  data() {
    return {
      currIndex: this.index
    }
  },
  methods: {
    close() {
      this.$emit( 'close' )
    }
  }
}
</script>

<style lang="stylus" scoped>
.preview-img
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background rgba( 0,0,0,0.5)
  z-index 500
  .img
    width 100vw
    height 100vh
    display flex
    justify-content center
    align-items center
    img
      max-width 100%

</style>
