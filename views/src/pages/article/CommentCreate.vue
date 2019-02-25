<template>
  <div class="comment-create">
    <transition name="fade">
      <div class="comment-btn comment-position" v-show="!isShowInput">
        <div class="comment-input" @click="showCommentInput">
          how do you think , baby ?
        </div>
        <div class="comment-count">
          <mt-badge v-if="commentCount > 0" class="badge" size="small" type="error">{{commentCount}}</mt-badge>
          <svg class="icon social-icon" aria-hidden="true" @click.stop="showCommentInput">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
        </div>
        <div class="comment-like">
          <mt-badge v-if="likeCount > 0" class="badge" size="small" type="error">{{likeCount}}</mt-badge>
          <svg class="icon social-icon" aria-hidden="true" @click.stop="addLikes">
            <use xlink:href="#icon-like"></use>
          </svg>
        </div>
      </div>
    </transition>
    <comment-input v-model="isShowInput" @submit="submit"></comment-input>

  </div>
</template>

<script>
import { createComments } from '@/API'
import CommentInput from '@/components/comments/commentInput'

export default {
  name: 'comment-create',
  props: {
    articleId: {
      type: String,
      default: '',
      descipe: '评论所属的文章ID'
    },
    parent: {
      type: Object,
      default: () => { },
      descipe: '评论的父级评论'
    },

  },
  data() {
    return {
      text: '',
      isShowInput: false,
      likeCount: 0,
      commentCount: 0
    }
  },
  created() {

  },
  components: {
    CommentInput
  },
  methods: {
    formatParam() {
      const param = {}
      param.text = this.text
      this.articleId ? param.articleId = this.articleId : ''
      this.parent && this.parent.id ? param.parentCommentId = this.parent.id : ''
      return param
    },
    submit( text ) {
      this.text = text
      if ( this.text === '' ) {
        return
      }
      let o = this.formatParam()

      createComments( o ).then( res => {
        if ( res.cd ) {
          this.showToast( '发表成功' )
          this.isShowInput = false
          this.$emit( 'submit', this.formatCurrentParam( this.text ) )
        } else {
          this.showToast( '发表失败' )
        }
      } ).catch( err => {
        this.showToast( '发表失败' )
      } )
    },

    formatCurrentParam( text ) {
      const comment = {
        text,
        userName: this.$store.state.userName,
        createdAt: Date.now()
      }
      if ( Object.keys( this.parent ).length > 0 ) {
        const { userId, userName } = this.parent
        Object.assign( comment, { parentCommentUserId: userId, parentCommentUserName: userName } )
      }
      return comment
    },

    showToast( message ) {
      this.$toast( {
        message,
        position: 'middle',
        duration: 1000
      } )
    },
    showCommentInput() {
      this.isShowInput = true
    },
    // 获取文章被点赞和评论的数量
    getSocialStatus() {
      if ( !this.articleId ) {
        return
      }
      // TODO:
    },
    // 对文章点赞
    addLikes() {

    },
  }
}
</script>

<style lang="stylus" scoped>
.comment-position
  position fixed
  bottom 0
  left 0
  right 0
  z-index 9
.comment-btn
  display flex
  justify-content space-between
  border-top 1px solid #cccccc
  background-color #ffffff
  padding 10px
  height 30px
  >div
    position relative
    margin-right 10px
    &:last-child
      margin-right 0
  .badge
    position absolute
    top -5px
    right -8px
    z-index 2
    border 1px solid #fff
.comment-input
  background #dddddd
  border-radius 15px
  color #333
  flex 1
  text-align center
  line-height 30px
.social-icon
  width 25px
  height 25px


</style>

