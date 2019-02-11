<template>
  <div class="article-page">
    <div class="title">
      搜索
    </div>
    <div class="article-list">

    </div>
    <article-list></article-list>
  </div>
</template>

<script>
import ArticleList from '@/components/articles/ArticleList'
export default {
  name: 'article-page',
  components: {
    ArticleList
  },
  data() {
    return {

    }
  },

}
</script>

<style lang="stylus" scoped>
.article-page
  height 100%
  position relative
  .title
    position fixed
    top 0
    left 0
    right 0
    height 45px
    z-index 9
    background #ffffff
  .article-list
    margin-top 45px
</style>
