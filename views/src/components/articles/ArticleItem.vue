<template>
  <div class="article-item">
    <div aspectratio w-335-200 class="img">
      <img aspectratio-content v-lazy="item.image" />
    </div>
    <div class="item" @click.stop="goDetail">
      <h1 class="title ellipsis">{{item.title}}</h1>
      <div class="date">{{item.updateDate}}</div>
      <p class="summary ellipsis">{{item.summary}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goDetail() {
      // this.$router.push()
    }
  }
}
</script>


<style lang="stylus" scoped>
[w-335-200]
  aspect-ratio '335:200'
.article-item
  padding 10px
  text-align left
  margin-bottom 10px
  // border-bottom 1px solid #999999
  background #ffffff
  .img
    margin-bottom 5px
    img
      width 100%
      height 100%
.item
  margin-bottom 15px
  h1
    font-size 20px
    margin-bottom 5px
    -webkit-line-clamp 2
  .date
    color #999999
    font-size 10px
    margin-bottom 5px
  .summary
    line-height 22px
    height 66px
    overflow hidden
    -webkit-line-clamp 3
</style>
