<template>
  <div class="article">
    <article-detail :id="articleId"></article-detail>
  </div>
</template>

<script>
import ArticleDetail from './articleDetail'

export default {
  name: 'article',
  components: {
    ArticleDetail
  },
  data() {
    return {
      articleId: ''
    }
  },
  computed: {
  },
  created() {
    this.articleId = this.$route.params.id || ''
    if ( !this.articleId ) {
      this.$router.back()
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
</style>
