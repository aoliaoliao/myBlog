<template>
  <div class="comments">
    <div v-if="list.length > 0 ">
      <span v-for="( item, index ) in list " :key="index" @click="selectCurrComment( index )">
        <comment-item :comment="item"></comment-item>
      </span>
      <div v-if="end" class="null-comments">暂时就这些了哦</div>
    </div>
    <div class="null-comments" v-else>暂无评论</div>
    <comment-create
      ref="commentCreate"
      :article-id="articleId"
      :parent="currComment"
      @submit="submit"
    ></comment-create>
  </div>
</template>

<script>
import { getComments, createComments } from '@/API'
import { createNamespacedHelpers } from 'vuex'
import CommentItem from './CommentItem'
import CommentCreate from './CommentCreate'

export default {
	name: 'article-detail-comments',
	props: {
		articleId: {
			type: String,
			default: null,
			descripe: '文章ID'
		},
		momentId: {
			type: String,
			default: null,
			descripe: '动态ID'
		}
	},
	data() {
		return {
			num: 10,
			isShowInput: false,
			currComment: {},
			end: false,
			list: []
		}
	},
	components: {
		CommentCreate,
		CommentItem
	},
	mounted() {
		this.search()
	},
	methods: {
		search() {
			if (this.end || !(this.articleId || this.momentId)) {
				return
			}
			this.getArticleComments(this.foramtOption())
		},

		foramtOption() {
			return {
				num: this.num,
				start: this.list.length,
				articleId: !!this.articleId ? this.articleId : null,
				momentId: !!this.momentId ? this.momentId : null
			}
		},

		getArticleComments() {
			let param = this.foramtOption()
			getComments(param)
				.then(res => {
					if (res.cd) {
						const { rt } = res
						this.end = rt.end
						this.list = [...this.list, ...rt.list]
					}
				})
				.catch(() => {})
		},

		selectCurrComment(index) {
			this.currComment = this.list[index]
			// this.isShowInput = true
			this.$refs['commentCreate'].showCommentInput()
		},
		submit(comment) {
			this.list.unshift(comment)
		}
	}
}
</script>

<style lang="stylus" scoped>
.null-comments {
	text-align: center;
}
</style>

