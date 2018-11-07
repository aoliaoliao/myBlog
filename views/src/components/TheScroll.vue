<template>
  <div class="scroll-wrap" ref="theScroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script >
import BScroll from 'better-scroll'

export default {
  name: 'the-scroll',
  props: {
    propbeType: {
      type: Number,
      default: 1,
      descriptor: '1:滚动的时候会派发scroll事件，会截流; 2:滚动的时候实时派发scroll事件，不会截流; 3:除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件'
    },
    pullUp: {
      type: Boolean,
      default: true,
      descriptor: '上拉加载'
    },
    pullDown: {
      type: Boolean,
      default: true,
      descriptor: '下拉刷新'
    },
    beforeScroll: {
      type: Boolean,
      default: false,
      descriptor: '是否派发列表滚动开始的事件'
    },
    data: {
      type: Array,
      default: null,
      descriptor: '列表数据'
    },
    scrollX: {
      type: Boolean,
      default: false,
      descriptor: '是否开启横向滚动'
    },
    listenScroll: {
      type: Boolean,
      default: false,
      descriptor: '是否派发滚动事件'
    },
    click: {
      type: Boolean,
      default: true,
      descriptor: '是否派发Click事件'
    },
    refreshDelay: {
      type: Number,
      default: 20,
      descriptor: '当数据更新后，刷新scroll的延时'
    },
    topDistance: {
      type: Number,
      default: 70,
      descriptor: '触发下拉刷新的最小距离，单位px'
    },
    bottomDistance: {
      type: Number,
      default: 70,
      descriptor: '触发上拉加载的最小距离，单位px'
    }

  },
  data () {
    return {
      // scroll: null
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  methods: {
    _initScroll () {
      if (!this.$refs.theScroll) {
        return
      }
      const pullDownRefresh = {
        threshold: 50,
        stop: 0
      }
      let options = {
        propbeType: this.propbeType,
        pullDownRefresh,
        click: this.click,
        scrollX: this.scrollX
      }
      this.scroll = new BScroll(this.$refs.theScroll, options)
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 上拉加载事件
      if (this.pullUp) {
        this.scroll.on('pullingUp', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + this.bottomDistance)) {
            this.$emit('pullingUp')
          }
        })
      }

      // 下拉刷新事件
      if (this.pullDown) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown')
        })
      }

      // 列表滚动开始前的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable () {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable () {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll-wrap
  height 100%
  .content
    min-height 101%
</style>
