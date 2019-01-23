<template>
  <div class="comment-create">
    <div class="comment-btn">
      <div class="comment-input">
        how do you think , baby ?
      </div>
      <div class="comment-count">
        <mt-badge class="badge" size="small" type="error">{{comment}}</mt-badge>
        <svg class="icon social-icon" aria-hidden="true" @click.stop="changeItems">
          <use xlink:href="#icon-comment"></use>
        </svg>
      </div>
      <div class="comment-like">
        <mt-badge class="badge" size="small" type="error">{{like}}</mt-badge>
        <svg class="icon social-icon" aria-hidden="true" @click.stop="changeItems">
          <use xlink:href="#icon-like"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'comment-create',
  props: {
    articleId: {
      type: String,
      default: '',
      descipe: '评论所属的文章ID'
    },
    momentId: {
      type: String,
      default: '',
      descipe: '评论所属的动态ID'
    },
    comment: {
      type: Number,
      default: 0,
      descipe: '评论的数量',
    },
    like: {
      type: Number,
      default: 0,
      descipe: '点赞的数量',
    }
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    submit() {

    },

  }
}
</script>

<style lang="stylus" scoped>
.comment-create
  position fixed
  bottom 0
  left 0
  width 100%
  height 50px
  z-index 9
  border-top 1px solid #cccccc
  background-color #ffffff
.comment-btn
  display flex
  justify-content space-between
  margin 10px
  height 30px
  >div
    position relative
    margin-right 10px
    &:last-child
      margin-right 0
  .badge
    position absolute
    top 0
    right 0
    z-index 2
.comment-input
  background #dddddd
  border-radius 15px
  color #333
  flex 1
  text-align center
  line-height 30px
.comment-count
  background-color transparent
.comment-like
  background-color transparent
.social-icon
  width 25px
  height 25px

</style>

