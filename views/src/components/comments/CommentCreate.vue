<template>
  <div class="comment-create">
    <transition name="fade">
      <div class="comment-btn comment-position" v-show="!isShowInput">
        <div class="comment-input" @click="toggle">
          how do you think , baby ?
        </div>
        <div class="comment-count">
          <mt-badge class="badge" size="small" type="error">{{comment}}</mt-badge>
          <svg class="icon social-icon" aria-hidden="true" @click.stop="changeItems">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
        </div>
        <div class="comment-like">
          <mt-badge class="badge" size="small" type="error">{{like}}</mt-badge>
          <svg class="icon social-icon" aria-hidden="true" @click.stop="changeItems">
            <use xlink:href="#icon-like"></use>
          </svg>
        </div>
      </div>
    </transition>
    <transition name="move">
      <div class="comment-shadow comment-position" v-show="isShowInput" @click.self="toggle">
        <div class="comment-area">
          <mt-cell class="title-border">
            <mt-button type="default" size="small" @click.stop.prevent="submit">发表</mt-button>
          </mt-cell>
          <mt-field ref="textarea" placeholder="客观评论，理性交流" type="textarea" rows="4" v-model="text"></mt-field>
        </div>
      </div>
    </transition>

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
    },

  },
  data() {
    return {
      text: '',
      isShowInput: false
    }
  },
  watch: {
    isShowInput( nv, ov ) {
      if ( nv ) {
        this.$nextTick().then( () => {
          let ref = this.$refs[ 'textarea' ]
          let textarea = ref.$el.querySelector( 'textarea' )
          textarea.focus()
        } )

      }
    }
  },
  methods: {
    submit() {

    },
    toggle() {
      this.isShowInput = !this.isShowInput
    }

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
.comment-shadow
  height 100%
  background-color rgba(0,0,0,0.5)
.comment-area
  position absolute
  bottom 0
  width 100%
  .title-border
    border-bottom 1px solid #cccccc

// .move-enter



</style>


<style lang="stylus">
.comment-create
  .is-size-small
    padding 1px 3px
    line-height 12px

</style>

