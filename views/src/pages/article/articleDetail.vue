<template>
  <div class="article-detail">
    <div class="article-error" v-if="reqStatus === -1">
      暂无内容
    </div>
    <div class="article-loading" v-else-if="reqStatus === 0">
      加载中。。。
    </div>
    <div class="article-success" v-else>
      <span v-html="articleContent"></span>
    </div>
  </div>
</template>

<script>

import { getArticleDetail } from '@/API'
import myMarked from 'marked'

export default {
  props: {
    id: {
      type: String,
      default: '',
      descript: '文章ID'
    }
  },
  data() {
    return {
      reqStatus: 0, // 请求状态。-1：请求失败， 0：正在请求中， 1： 请求成功
      articleContent: ''
    }
  },
  created() {
    const id = this.id
    if ( id ) {
      this.reqStatus = 0
      getArticleDetail( {
        id
      } ).then( res => {
        if ( res.cd === 1 ) {
          this.reqStatus = 1
          this.formatAuthor( res.rt.articleAuthor )
          this.formatArticle( res.rt.article )
        } else {
          this.reqStatus = -1
        }
      } )
    }
  },
  methods: {
    formatAuthor( author ) {

    },
    formatArticle( article ) {
      myMarked.setOptions( {
        highlight: function ( code, lang, callback ) {

        }
      } );
      this.articleContent = myMarked( article )
    }
  }

}
</script>

<style lang="stylus" scoped>
.article-error
.article-loading
  padding-top 100px
  color #999
  font-size 14px
</style>
