<template>
  <div class="article-list">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
      <article-item v-for="item in list " :key="item.id" :item="item"></article-item>
    </mt-loadmore>
  </div>
</template>

<script>
import { getArticleList } from '@/API'
import ArticleItem from './articleItem'

export default {
  name: 'article-list',
  data () {
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
  created () {
    console.log('getArticleList', getArticleList)
    this.getData({
      num: 10,
      start: 0
    })
  },
  methods: {
    loadTop (id) {
      console.log(id)
      this.getData({
        num: 10,
        start: 0
      }).then(_ => this.$broadcast('onTopLoaded', id))
    },
    loadBottom (id) {
      let { cur, num } = this.page
      this.getData({
        num,
        start: (cur - 1) * num
      }).then(_ => this.$broadcast('onBottomLoaded', id))

    },
    getData (param) {
      return getArticleList(param).then(({ rt }) => {
        this.list = [...this.list, ...rt.list]
        this.allLoaded = rt.end
        return Promise.resolve()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
