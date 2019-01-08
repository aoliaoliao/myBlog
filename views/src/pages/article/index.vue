<template>
  <div class="index-article">
    <div class="article-error" v-if="reqStatus === -1">
      暂无内容
    </div>
    <div class="article-loading" v-else-if="reqStatus === 0">
      加载中。。。
    </div>
    <div class="article-success " v-else>
      <article-title :title='articleMsg'></article-title>
      <article-detail :content="articleContent"></article-detail>
      <article-comments :article-id="articleId"></article-comments>
    </div>
  </div>
</template>

<script>
import { formatMyDate } from '@/utils/tool'
import { getArticleDetail } from '@/API'
import ArticleDetail from './articleDetail'
import ArticleTitle from './articleTitle'
import ArticleComments from '@/components/comments/CommentList'

export default {
  name: 'article-index',
  components: {
    ArticleDetail,
    ArticleTitle,
    ArticleComments
  },
  data() {
    return {
      articleId: '',
      reqStatus: 0,
      articleMsg: {},
      articleContent: ''
    }
  },
  computed: {
  },
  created() {
    this.articleId = this.$route.params.id || ''
    if ( !this.articleId ) {
      this.$router.back()
    } else {
      this.getArticle( this.articleId )
    }
  },
  methods: {
    getArticle( id ) {
      getArticleDetail( {
        id
      } ).then( res => {
        if ( res.cd === 1 ) {
          this.reqStatus = 1
          this.formatContent( res.rt )
          this.formatArticle( res.rt.article )
        } else {
          this.reqStatus = -1
        }
      } )
    },
    formatContent( result ) {
      this.articleMsg.articleTitle = result.name
      this.articleMsg.articleAuthor = result.articleAuthor.nickName
      this.articleMsg.articleDate = formatMyDate( result.updatedAt, 'yyyy-MM-dd' )
    },
    formatArticle( content ) {
      this.articleContent = content
    }
  }
}
</script>

<style lang="stylus" scoped>
.index-article
  background #ffffff
.article-success
  margin 0 12px
</style>
