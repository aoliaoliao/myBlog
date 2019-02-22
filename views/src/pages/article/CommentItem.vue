<template>
  <div class="comments-item">
    <span class="comment-name">{{ comment.userName }}</span>
    <template v-if="comment.parentCommentUserId">
      <span class="comment-reply">回复</span>
      <span class="comment-name">{{ comment.parentCommentUserName }}</span>
    </template>
    <span class="comment-content">{{comment.text }}</span>
  </div>
</template>

<script>
import CommentInput from '@/components/comments/commentInput'
import { createComments } from '@/API'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'comment-item',
  props: {
    comment: {
      type: Object,
      descript: '评论的内容'
    }
  },
  data() {
    return {
    }
  },
  components: {
    CommentInput
  },
  methods: {
    ...mapActions( 'comment', [
      'createOneComment'
    ] ),
    formatParam() {
      const param = {}
      const { articleId, id } = this.comment

      param.text = this.text
      articleId ? param.articleId = articleId : ''
      id ? param.parentCommentId = id : ''
      return param
    },
    submit( text ) {
      this.createOneComment( { param: this.formatParam(), parentComment: this.comment } ).then( cd => {
        if ( cd ) {
          this.showToast( '发表成功' )
          this.isShowInput = false
        } else {
          this.showToast( '发表失败' )
        }
      } ).catch( err => {
        this.showToast( '发表失败' )
      } )
    },
    showToast( message ) {
      this.$toast( {
        message,
        position: 'middle',
        duration: 1000
      } )
    },
  }
}
</script>

<style lang="stylus" scoped>
.comments-item
  background #f0f0f0
  margin-bottom 10px
  border-radius 10px
  padding 10px
  .comment-name
    color #111
    margin-right 10px
  .comment-content
    color #666
    word-break break-all
  .comment-reply
    color #333
    margin-right #333
</style>

