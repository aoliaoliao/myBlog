<template>
  <div class="comments-item">
    <span class="comment-name">{{ comment.userName }}</span>
    <span class="comment-content">{{comment.text }}</span>
  </div>
</template>

<script>

export default {
  name: 'comment-item',
  props: {
    comment: {
      type: Object,
      descript: '评论的内容'
    }
  },
  data() {
    return {}
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
    color #666666
    margin-right 10px
  .comment-content
    color #999999
    word-break break-all
</style>

