<template>
  <div class="comments">
    <div v-if="list.length > 0 ">
      <span v-for="( item, index ) in list " :key="item.id" @click="selectCurrComment( index )">
        <comment-item :comment="item"></comment-item>
      </span>
      <div v-if="end" class="null-comments">
        暂时就这些了哦
      </div>
    </div>
    <div class="null-comments" v-else>
      暂无评论
    </div>
    <comment-input v-model="isShowInput" @submit="submit"></comment-input>
  </div>
</template>

<script>
import { getComments } from '@/API'     
import { createNamespacedHelpers } from 'vuex'
import CommentItem from './CommentItem'

import { createComments } from '@/API'
import { mapMutations, mapState, mapActions } from 'vuex'
import CommentInput from '@/components/comments/commentInput'

export default {
  name: 'article-comment',
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
    },
  },
  data() {
    return {
      // list: [],
      // end: false,
      num: 10,
      isShowInput: false,
      currComment: {}
    }
  },
  components: {
    CommentItem,
    CommentInput
  },
  mounted() {
    this.search()
  },
  computed: {
    ...mapState( 'comment', {
      end: state => state.isEnd,
      list: state => state.commentList
    } )
  },
  methods: {
    ...mapMutations( 'comment', [
      'setCommentEnd',
      'pushCommentList'
    ] ),
    ...mapActions( 'comment', [
      'getCommentList'
    ] ),
    ...mapActions( 'comment', [
      'createOneComment'
    ] ),
    search() {
      if ( this.end || !( this.articleId || this.momentId ) ) {
        return
      }
      this.getCommentList( this.foramtOption() )
    },

    foramtOption() {
      return {
        num: this.num,
        start: this.list.length,
        articleId: !!this.articleId ? this.articleId : null,
        momentId: !!this.momentId ? this.momentId : null
      }
    },

    selectCurrComment( index ) {
      console.log( 'aaaa' )
      this.currComment = this.list[ index ]
      this.isShowInput = true
    },


    formatCommentParam( text ) {
      const param = {}
      const { articleId, id } = this.currComment

      param.text = text
      this.articleId ? param.articleId = this.articleId : ''
      id ? param.parentCommentId = id : ''
      return param
    },
    submit( text ) {
      this.createOneComment( { param: this.formatCommentParam( text ), parentComment: this.currComment } ).then( cd => {
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
.null-comments
  text-align center
</style>

