<template>
  <div class="moment-item">
    <div class="header">
      <div aspectratio w-35-35 class="img">
        <img aspectratio-content v-lazy="user.avatar" />
      </div>
      <div class="user">
        <p class="name one-ellipsis">{{user.nickName}}</p>
        <p class="sign one-ellipsis">{{user.signature}}</p>
      </div>
    </div>
    <div class="content">
      <p class="content-text" v-if="content.text.length > 0">{{content.text}}</p>
      <div v-if="content.imgs.length > 0" @click="showPreviewImg">
        <img class="content-one-image" :data-index="0" v-if="content.imgs.length === 1 " v-lazy="content.imgs[0]" />
        <div class="content-four-image content-multi-image" v-else-if="content.imgs.length === 4 ">
          <div class="content-image-block" v-for="(img, index) in content.imgs" :key="img">
            <img v-lazy="img" :data-index="index" />
          </div>
        </div>
        <div class="content-multi-image" v-else>
          <div class="content-image-block" v-for="(img, index) in content.imgs" :key="img">
            <img v-lazy="img" :data-index="index" />
          </div>
        </div>
      </div>
      <template v-if="content.video && content.video.length > 0">
        <img :src="content.video" />
      </template>
    </div>
    <div class="footer">
      <span>{{createDate}}</span>
      <span class="social">
        <span class="social-like">
          <b-icon icon="like" :class="{ 'red-text': isMyLike }" @click.stop="toggleMomentLike"></b-icon>
          <span v-if="likeCount > 0">{{likeCount}}</span>
        </span>
        <span class="social-comment">
          <b-icon icon="comment"></b-icon>
          <span v-if="commentCount > 0">{{commentCount}}</span>
        </span>
      </span>
    </div>
    <div class="comments" v-if="comments.length">
      <p class="comments-item" v-for="( item, index ) in comments" :key="index">
        <span class="comment-name">{{ item.userName }}</span>
        <span class="comment-content">{{item.text }}</span>
      </p>
    </div>
    <div v-transfer-dom>
      <vux-previewer ref="previewer" :list="previewImages" @on-close="closePreivewer"></vux-previewer>
    </div>
  </div>
</template>

<script>
import { likeMoment } from '@/API'
import { formatMyDate } from '@/utils/tool'

export default {
  name: 'moment-item',
  props: {
    moment: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
  },
  data () {
    return {
      item: this.moment,
      previewImages: []
    }
  },
  computed: {
    user () {
      return this.item.momentAuthor || {}
    },
    content () {
      let { text = '', imgs = [], video = '' } = this.item
      return {
        text,
        imgs,
        video
      }
    },

    comments () {
      return this.item.momentComments || []
    },
    createDate () {
      let createDate = this.item.updatedAt
      let date = new Date(createDate).getTime()
      let now = Date.now()
      const period = now - date

      if (period < 1000 * 60 * 3) {
        return '刚刚'
      } else if (period < 1000 * 60 * 60) {
        return Math.floor(period / 1000 / 60) + '分钟前'
      } else if (period < 1000 * 60 * 60 * 24) {
        return Math.floor(period / 1000 / 60 / 60) + '小时前'
      } else if (period < 1000 * 60 * 60 * 24 * 30) {
        return Math.floor(period / 1000 / 60 / 60 / 24) + '天前'
      } else {
        return formatMyDate(date)
      }
    },
    commentCount () {
      return this.comments.length || 0
    },
    likeCount () {
      const { momentLikes = {} } = this.item
      return momentLikes.likes || 0
    },
    isMyLike(){
      const { momentLikes = {} } = this.item
      return !!momentLikes.myLike
    }

  },
  created () {

  },
  methods: {
    toggleMomentLike () {
      this.likeOneMoment()
    },
    likeOneMoment () {
      likeMoment({
        momentId: this.item.id
      }).then(res => {

      })
    },
    unlikeOneMoment () {

    },
    showPreviewImg (ev) {
      let imgs = []
      let index = 0
      const { target = {} } = ev
      const lazy = target.getAttribute('lazy')

      if (lazy === 'error') {
        imgs = [ target.src ]
      } else {
        imgs = this.content.imgs
        index = parseInt(target.dataset.index)
      }

      this.previewImages = imgs.map(item => {
        return {
          src: item
        }
      })
      this.$nextTick().then(res => {
        this.$refs.previewer.show(index)
      })
    },
    closePreivewer () {
      this.previewImages = []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable'

[w-35-35]
  aspect-ratio '35:35'
.moment-item
  border-bottom 10px solid #eee
  padding 10px
  background $white
  text-align left
.header
  margin-bottom 10px
  display flex
  align-items center
  .img
    width 35px
    margin-right 10px
    img
      border-radius 50%
  .user
    width 300px
    .name
      font-size 14px
      color #000000
      margin-bottom 5px
    .sign
      font-size 12px
      color #999999
.content
  margin-bottom 10px
  img
    object-fit cover
    width 100%
    height 100%
  .content-text
    line-height 20px
    margin-bottom 10px
    word-break break-word
  .content-one-image
    max-width 100%
    max-height 150px
  .content-four-image
    .content-image-block
      &:nth-child(2n)
        margin-right 20px !important
      &:nth-child(3n)
        margin-right 5px !important
  .content-multi-image
    display flex
    flex-wrap wrap
    .content-image-block
      margin-right 5px
      margin-bottom 5px
      width w = 115px
      height w
      background-color #cccccc
      &:nth-child(3n)
        margin-right 0
.comments
  margin-top 5px
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
.footer
  color #999
  font-size 12px
  display flex
  justify-content space-between
  .social
    >span
      margin-right 20px
    .social-icon
      margin-left 5px
    .red-text
      color red
</style>

