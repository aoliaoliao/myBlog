<template>
  <div class="article-list">
    <template v-if="list.length > 0">
      <the-scroll :probe-type="3" :listen-scroll="true" :data="list" @pullingUp="loadBottom" @pullingDown="loadTop">
        <template slot="pulldown"></template>
        <template slot="pullUp"></template>
        <article-item v-for="item in list " :key="item.id" :item="item"></article-item>
      </the-scroll>
    </template>
    <div v-else>
      暂无数据
    </div>
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
      if ( this.isOver ) {
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
        this.isOver = rt.end
        return rt.list
      } ).catch( err => {
        this.isOver = true
        return []
      } )
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-list
  padding-top 10px
  height 667px
  // overflow scroll
</style>
