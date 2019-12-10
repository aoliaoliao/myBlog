<template>
  <div class="article-detail">
    <div class="markdown-body" v-html="articleContent"></div>
    <div v-transfer-dom>
      <vux-previewer ref="previewer" :list="previewImages"></vux-previewer>
    </div>
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
	data() {
		return {
			allImages: []
		}
	},
	computed: {
		articleContent() {
			//
			const options = {
				gfm: true,
				breaks: true,
				tables: true,
				sanitize: true,
				headerIds: true,
				renderer: this.createRenderer(),
				highlight(code, lang, callback) {
					return hljs.highlightAuto(code).value
				}
			}
			myMarked.setOptions(options)
			return myMarked(this.content)
		},
		previewImages() {
			return this.allImages.map(item => {
				return {
					src: item
				}
			})
		}
	},
	created() {
		// this.createRenderer()
		hljs.registerLanguage('javascript', javascript)
	},
	mounted() {
		this.addImageListener()
	},
	methods: {
		createRenderer() {
			const renderer = new myMarked.Renderer()
			this.allImages.length = 0

			renderer.image = this.reRenderImage()
			return renderer
		},

		reRenderImage() {
			let index = 0
			const imageRender = (href, title, text) => {
				this.allImages.push(href)
				const img = `
        <img src="${href}" alt="${text}" class="__blog-customer-image__" data-index="${index}"/>
        `
				index++

				return img
			}
			return imageRender
		},

		addImageListener() {
			this.$nextTick(() => {
				const doms = document.querySelectorAll('.__blog-customer-image__')
				doms.forEach(dom => {
					dom.addEventListener('click', this.previewImage)
				})
			})
		},

		previewImage(ev) {
			const { target } = ev
			if (target) {
				const index = target.dataset.index
				this.$refs.previewer.show(+index)
			}
		}
	}
}
</script>

<style lang="stylus" scoped></style>
