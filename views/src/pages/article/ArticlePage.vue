<template>
  <div class="article-page">
    <the-page-title>
      <span>文章</span>
      <svg slot="right" class="icon title-search" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
    </the-page-title>
    <div class="article-page-list">
      <article-list ref="articleList"></article-list>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/articles/ArticleList'
import ThePageTitle from '@/components/ThePageTitle'

export default {
  name: 'article-page',
  components: {
    ArticleList,
    ThePageTitle
  },
  props: {
    name: {
      type: String,
      default: 'ArticlePage'
    }
  },
  data() {
    return {

    }
  },
  activated() {
  },
  methods: {
  },

}
</script>

<style lang="stylus" scoped>
.article-page
  height 100%
  position relative
  .article-page-list
    margin-top 45px
  .title-search
    font-size 18px
    font-weight bolder
</style>
