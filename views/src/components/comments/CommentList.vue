<template>
  <div class="comments">
    <div v-if="list.length > 0 ">
      <comment-item v-for="item in list " :key="item.id" :comment="item"></comment-item>
    </div>
    <div class="null-comments" v-else>
      暂无评论
    </div>
  </div>
</template>

<script>
import { getComments } from '@/API'
import CommentItem from './CommentItem'

export default {
  name: 'comment-list',
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
      list: [],
      end: false,
      num: 10,
    }
  },
  components: {
    CommentItem
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      if ( this.end || !( this.articleId || this.momentId ) ) {
        return
      }
      getComments( this.foramtOption() ).then( res => {
        if ( res.cd ) {
          const rt = res.rt
          this.end = rt.end
          this.list = [ ...this.list, ...rt.list ]
        }
      } )

    },
    foramtOption() {
      return {
        num: this.num,
        start: this.list.length,
        articleId: !!this.articleId ? this.articleId : null,
        momentId: !!this.momentId ? this.momentId : null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.null-comments
  text-align center
</style>

