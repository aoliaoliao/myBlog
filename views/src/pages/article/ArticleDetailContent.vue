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
      allImages: []
    }
  },
  computed: {
    articleContent () {
      //
      const options = {
        gfm: true,
        breaks: true,
        tables: true,
        sanitize: true,
        headerIds: true,
        renderer: this.createRenderer(),
        highlight (code, lang, callback) {
          return hljs.highlightAuto(code).value;
        }
      }
      myMarked.setOptions(options)
      return myMarked(this.content, () => {
        console.log(arguments)
        console.log( 'this.content', this)
      })
    }
  },
  created () {
    // this.createRenderer()
    hljs.registerLanguage('javascript', javascript)

  },
  methods: {
    createRenderer () {
      let index = 0
      const renderer = new myMarked.Renderer()
      this.allImages.length = 0

      renderer.image = (href, title, text) => {
        this.allImages.push(href)
        const img = `
        <img src="${href}" alt="${text}" class="$blog-customer-image$" data-index="${index}"/>
        `
        index++

        return img
      }
      return renderer
    },

    addImageListener () {
      this.$nextTick(() => {
        // const doms = document.querySelectorAll('.$blog-customer-image$')
        // doms.forEach( dom => {
        //   dom.addEventListener('click', this.previewImage)

        // })
      })

    },

    previewImage (ev) {
      console.log(ev)
    }
  }

}
</script>

<style lang="stylus" scoped>
</style>
