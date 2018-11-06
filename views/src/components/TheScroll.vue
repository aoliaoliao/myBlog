<template>
  <div class="scroll">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="over" ref="mtLoadmore">
      <slot></slot>
    </mt-loadmore>
  </div>
</template>

<script >
export default {
  name: 'the-scroll',
  props: {
    pullUp: {
      type: Function,
      descriptor: '上拉加载'
    },
    pullDown: {
      type: Function,
      descriptor: '下拉刷新'
    },
    over: {
      type: Boolean,
      default: false,
      descriptor: '数据是否加载完毕'
    },
    options: {
      type: Object,
      default: () => {
        return {
          // autoFill: true,
          // distanceIndex: 2,
          // maxDistance: 0,
          // topPullText: '下拉刷新',
          // ... 还有很多，需要的时候再加
        }
      },
      descriptor: '其他的个性配置'
    }
  },
  methods: {
    loadTop() {
      // new Promise( (resolve,reject) => {
      //   return this.pullDown()
      // })
      Promise.resolve( this.pullDown() ).then( res => {
        this.$refs.mtLoadmore.onTopLoaded()
      } )
    },
    loadBottom() {
      if ( this.over ) {
        return
      }
      Promise.resolve( this.pullDown() ).then( res => {
        this.$refs.mtLoadmore.onBottomLoaded()
      } )
    }
  }
}
</script>
