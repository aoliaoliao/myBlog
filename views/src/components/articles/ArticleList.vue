<template>
  <div class="article-list">
    <template v-if="list.length > 0">
      <the-scroll ref="theScroll" :propbe-type="3" :listen-scroll="true" :listen-scroll-end="true" :pull-up-load="!isOver" :data="list" @pullingUp="loadBottom" @pullingDown="loadTop">
        <template slot="pulldown"></template>
        <template slot="pullUp"></template>
        <article-item v-for="(item,index) in list " :key="index" :item="item"></article-item>
        <div class="list-bottom" v-if="isOver">
          到底了哦~
        </div>
      </the-scroll>
    </template>
    <div v-else class="article-null">暂无数据 </div>
  </div>
</template>

<script>
import { getArticleList } from '@/API'
import ArticleItem from './articleItem'
// import Scroll from './scroll'

export default {
  name: 'article-list',
  data() {
    return {
      list: [],
      isOver: false,
      page: {
        num: 10,
        cur: 1
      }
    }
  },
  components: {
    ArticleItem,
    // Scroll
  },
  created() {
    this.loadTop()
  },
  activated() {
  },
  methods: {
    loadTop() {
      this.page.cur = 1
      this.getData().then( data => {
        this.list = [ ...data ]
      } )
    },
    loadBottom() {
      if ( this.isOver ) {
        return
      }
      this.page.cur = this.page.cur + 1
      this.getData().then( data => {
        this.list = [ ...this.list, ...data ]
      } )
    },
    getData() {
      return getArticleList( this.formatParam() ).then( ( { rt } ) => {
        this.isOver = rt.end
        return rt.list
      } ).catch( err => {
        this.isOver = true
        return []
      } )
    },
    formatParam() {
      let { cur, num } = this.page
      return {
        num,
        start: ( cur - 1 ) * num
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-list
  // height 667px - 50 - 45
  // height 100%
  position fixed
  top 45px
  bottom 50px
  width 100%
  .list-bottom
    display flex
    justify-content center
    align-items center
    font-size 12px
    color #999999
.article-null
  text-align center
  padding-top 100px
  font-size 16px
  color #999
</style>
