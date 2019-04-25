<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <!-- <div ref="listWrapper"></div> -->
      <slot></slot>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullingUp="isPullingUp">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullingUp">
            上拉加载
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :isPullingDown="isPullingDown" :bubbleY="bubbleY">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
          <!-- 下拉更新 -->
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
            <!-- 加载中。。。 -->
          </div>
          <div v-else>
            <span>加载完毕</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script >
import BScroll from 'better-scroll'
import Bubble from './Bubble'
import Loading from './Loading'

const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  name: 'the-scroll',
  components: {
    Bubble,
    Loading
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      },
      descriptor: '列表数据'
    },
    propbeType: {
      type: Number,
      default: 1,
      descriptor: '1:滚动的时候会派发scroll事件，会截流; 2:滚动的时候实时派发scroll事件，不会截流; 3:除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件'
    },
    click: {
      type: Boolean,
      default: true,
      descriptor: '是否派发Click事件'
    },
    listenScroll: {
      type: Boolean,
      default: false,
      descriptor: '是否派发滚动事件'
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false,
      descriptor: '是否监听滚动开始之前事件'
    },
    listenScrollEnd: {
      type: Boolean,
      default: false,
      descriptor: '滚动结束事件'
    },
    direction: {
      type: String,
      default: DIRECTION_V,
      descriptor: '指定滚动方向'
    },
    scrollbar: {
      type: null,
      default: false,
      descriptor: '是否开启滚动条, 类型为Boolean值或对象'
    },
    pullDownRefresh: {
      type: null,
      default: true,
      descriptor: '是否开启下拉刷新, 类型为Boolean值或对象'
    },
    pullUpLoad: {
      type: null,
      default: true,
      descriptor: '是否开启上拉加载, 类型为Boolean值或对象'
    },
    startY: {
      type: Number,
      default: 0,
      descriptor: '纵轴方向初始化位置'
    },
    refreshDelay: {
      type: Number,
      default: 20,
      descriptor: '当数据更新后，刷新scroll的延时'
    },
    freeScroll: {
      type: Boolean,
      default: false,
      descriptor: '是否支持横向和纵向同时滚动'
    },
    mouseWheel: {
      type: Boolean,
      default: false,
      descriptor: '开启鼠标滚轮'
    },
    bounce: {
      default: true,
      descriptor: '是否开启回弹动画'
    },
    zoom: {
      default: false,
      descriptor: '对滚动内容的缩放'
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
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullingUp: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0
    }
  },
  created () {
    this.pullDownInitTop = -50
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  activated () {
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.forceUpdate(true)
      }, this.refreshDelay)
    }
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }

      let options = {
        propbeType: this.propbeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scroll-end', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })

        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    _initPullDownRefresh () {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        // 此处应该计算 hasVerticalScroll
        //
        this.$emit('pullingDown')
      })
      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        this.isPullingUp = true
        this.$emit('pullingUp')
      })

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
    },
    clickItem (e, item) {
      console.log(e)
      this.$emit('click', item)
    },
    destroy () {
      this.scroll.destroy()
    },
    autoPullDownRefresh () {
      // 手动刷新
      this.scroll.autoPullDownRefresh()
    },
    forceUpdate (dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullingUp) {
        this.isPullingUp = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    _reboundPullDown () {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown () {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  position relative
  height 100%
  overflow hidden
  .scroll-content
    position relative
    z-index 1
  .list-content
    position relative
    z-index 10
  .pulldown-wrapper
    position absolute
    width 100%
    left 0
    display flex
    justify-content center
    align-items center
    transition all
  .after-trigger, .before-trigger
    margin-top 10px
    color #999
    text-align center
</style>
