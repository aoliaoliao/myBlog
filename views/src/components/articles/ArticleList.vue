<template>
  <div class="article-list">
    <the-scroll :probe-type="3" :listen-scroll="true" :data="list" @pullingUp="loadBottom" @pullingDown="loadTop">
      <template slot="pulldown"></template>
      <template slot="pullUp"></template>
      <article-item v-for="item in list " :key="item.id" :item="item"></article-item>
    </the-scroll>
    <!-- <scroll :data="list" @pulling-up="loadBottom" @pulling-down="loadTop" ref="theScroll">
      <article-item v-for="item in list " :key="item.id" :item="item"></article-item>
    </scroll> -->
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
      allLoaded: false,
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
  methods: {
    loadTop() {
      this.getData( {
        num: 10,
        start: 0
      } ).then( data => {
        this.list = [ ...data ]
      } )
    },
    loadBottom() {
      if ( this.allLoaded ) {
        return
      }
      let { cur, num } = this.page
      this.getData( {
        num,
        start: ( cur - 1 ) * num
      } ).then( data => {
        this.page.cur = cur + 1
        this.list = [ ...this.list, ...data ]
      } )
    },
    getData( param ) {
      return getArticleList( param ).then( ( { rt } ) => {
        this.allLoaded = rt.end
        return rt.list
      } )
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-list
  padding-top 10px
  height 667px
  overflow scroll
</style>
