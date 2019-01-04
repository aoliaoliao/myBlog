<template>
  <div class="article-list">
    <template v-if="list.length > 0">
      <the-scroll :propbe-type="3" :listen-scroll="true" :pull-up-load="!isOver" :data="list" @pullingUp="loadBottom" @pullingDown="loadTop">
        <template slot="pulldown"></template>
        <template slot="pullUp"></template>
        <article-item v-for="item in list " :key="item.id" :item="item"></article-item>
        <div v-if=" isOver">
          到底了哦~
        </div>
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
  padding-top 10px
  height 667px
  // overflow scroll
</style>
