<template>
  <div class="article-detail">
    <article class="markdown-body" v-html="articleContent"></article>
  </div>
</template>

<script>

import { getArticleDetail } from '@/API'
import myMarked from 'marked'
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css'
import javascript from 'highlight.js/lib/languages/javascript';
import 'github-markdown-css';


export default {
  props: {
    content: {
      type: String,
      default: '',
      descript: '文章内容'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    articleContent () {
      console.log('hljs', hljs)
      myMarked.setOptions({
        gfm: true,
        breaks: true,
        tables: true,
        sanitize: true,
        headerIds: true,
        highlight: function (code, lang, callback) {
          return hljs.highlightAuto(code).value;
        }
      });
      return myMarked(this.content)
    }
  },
  created () {
    hljs.registerLanguage('javascript', javascript);
  },
  methods: {
  }

}
</script>

<style lang="stylus" scoped>
.article-detail
  margin 0 12px
</style>
