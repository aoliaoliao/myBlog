<template>
  <div class="article-detail">
    <div class="markdown-body" v-html="articleContent"></div>
  </div>
</template>

<script>
import myMarked from 'marked'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'
import { getArticleDetail } from '@/API'


export default {
  name: 'article-detail-content',
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
      myMarked.setOptions({
        gfm: true,
        breaks: true,
        tables: true,
        sanitize: true,
        headerIds: true,
        highlight (code, lang, callback) {
          return hljs.highlightAuto(code).value;
        }
      })
      return myMarked(this.content)
    }
  },
  created () {
    hljs.registerLanguage('javascript', javascript)
  },
  methods: {
  }

}
</script>

<style lang="stylus" scoped>
</style>
