<template>
  <div class="article-list">
    <the-scroll :pull-down="loadTop" :pull-up="loadBottom" :over="allLoaded" ref="theScroll">
      <article-item v-for="item in list " :key="item.id" :item="item"></article-item>
    </the-scroll>

    <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <article-item v-for="item in list " :key="item.id" :item="item"></article-item>
    </mt-loadmore> -->
  </div>
</template>

<script>
import { getArticleList } from '@/API'
import ArticleItem from './articles/articleItem'

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
    ArticleItem
  },
  created() {
    this.loadTop()
  },
  methods: {
    loadTop() {
      return this.getData( {
        num: 10,
        start: 0
      } ).then( data => {
        this.list = [ ...data ]
        // this.$refs.loadmore.onTopLoaded()
      } )
    },
    loadBottom() {
      if ( this.allLoaded ) {
        return
      }
      let { cur, num } = this.page
      return this.getData( {
        num,
        start: ( cur - 1 ) * num
      } ).then( data => {
        this.page.cur = cur + 1
        this.list = [ ...this.list, ...data ]
        // this.$refs.loadmore.onBottomLoaded()
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
  overflow-y auto
</style>
