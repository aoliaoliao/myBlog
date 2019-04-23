<template>
  <transition name="zoom">
    <div class="index-article">
      <div class="article-error" v-if="reqStatus === -1">
        暂无内容
      </div>
      <div class="article-loading" v-else-if="reqStatus === 0">
        加载中。。。
      </div>
      <div class="article-success " ref="article-success" v-else>
        <article-detail-title :title='articleMsg'></article-detail-title>
        <article-detail-content :content="articleContent"></article-detail-content>
        <vux-divider> the end </vux-divider>
        <article-detail-comments :article-id="articleId" class="comment-margin"></article-detail-comments>
        <!-- <comment-create :article-id="articleId"></comment-create> -->
      </div>
    </div>
  </transition>
</template>

<script>
import { formatMyDate } from '@/utils/tool'
import { getArticleDetail } from '@/API'
import ArticleDetailContent from './ArticleDetailContent'
import ArticleDetailTitle from './ArticleDetailTitle'
import ArticleDetailComments from './ArticleDetailComments'
import CommentCreate from './CommentCreate'

export default {
  name: 'article-detail',
  components: {
    ArticleDetailTitle,
    ArticleDetailContent,
    ArticleDetailComments,
    CommentCreate
  },
  data () {
    return {
      articleId: '',
      reqStatus: 0,
      articleMsg: {},
      articleContent: ''
    }
  },
  computed: {
  },
  activated () {
    this.articleId = this.$route.params.id || ''
  },
  beforeRouteEnter (to, from, next) {
    // ...
    next(vm => {
      const path = vm.$route.path
      let top = sessionStorage.getItem(path)
      if (top && +top > 0) {
        window.scrollTo({
          top,
          behavior: "smooth"
        })
        sessionStorage.removeItem(path)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // ...
    let dom = this.$refs[ 'article-success' ]
    if (dom) {
      const rect = dom.getClientRects()[ 0 ]
      if (+rect.top < 0) {
        sessionStorage.setItem(this.$route.path, Math.abs(rect.top))
      }
    }
    next()
  },
  watch: {
    articleId (newVal, oldVal) {
      if (!newVal) {
        this.reqStatus = -1
        return
      }
      this.getArticle(newVal)
    }
  },
  methods: {
    getArticle (id) {
      getArticleDetail({
        id
      }).then(res => {
        if (res.cd === 1) {
          this.reqStatus = 1
          this.formatContent(res.rt)
          this.formatArticle(res.rt.article)
        } else {
          this.reqStatus = -1
        }
      })
    },
    formatContent (result = {}) {
      this.$set(this.articleMsg, 'articleTitle', result.name)
      this.$set(this.articleMsg, 'articleAuthor', result.articleAuthor.nickName)
      this.$set(this.articleMsg, 'articleDate', formatMyDate(result.updatedAt, 'yyyy-MM-dd'))
    },
    formatArticle (content) {
      this.articleContent = content
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable'

.index-article
  background $white
.article-success
  margin 0 12px
.comment-margin
  margin-bottom 60px

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}

</style>
