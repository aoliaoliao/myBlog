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
      <p v-if="content.text.length > 0">{{content.text}}</p>
      <template v-if="content.imgs.length > 0">
        <img class="content-one-image" v-if="content.imgs.length === 1 " v-lazy="content.imgs[0]">
        <div class="content-four-image content-multi-image" v-else-if="content.imgs.length === 4 ">
          <div class="content-image-block" v-for="img in content.imgs" :key="img">
            <the-background-image :src="img"></the-background-image>
          </div>
        </div>
        <div class="content-multi-image" v-else>
          <div class="content-image-block" v-for="img in content.imgs" :key="img">
            <the-background-image :src="img"></the-background-image>
          </div>
        </div>
      </template>
      <template v-if="content.video && content.video.length > 0">
        <img :src="content.video" />
      </template>
    </div>
    <div class="footer">
      <span>{{createDate}}</span>
      <span class="social">
        <span class="social-like">
          <svg class="icon social-icon" :class="{ 'red-text': item.momentLikes.melike > 0 }" aria-hidden="true" @click.stop="toggleMomentLike">
            <use xlink:href="#icon-like"></use>
          </svg>
          <span v-if="likeCount > 0">{{likeCount}}</span>
        </span>
        <span class="social-comment">
          <svg class="icon social-icon" aria-hidden="true">
            <use xlink:href="#icon-comment"></use>
          </svg>
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
  </div>
</template>

<script>
import { likeMoment } from '@/API'
import { formatMyDate } from '@/utils/tool'
import TheBackgroundImage from '@/components/BackgroundImage'

export default {
  name: 'moment-item',
  props: {
    moment: {
      type: Object,
      default: () => ( {} )
    }
  },
  components: {
    TheBackgroundImage
  },
  data() {
    return {
      item: this.moment
    }
  },
  computed: {
    // item() {
    //   return this.moment
    // },
    user() {
      return this.item.momentAuthor || {}
    },
    content() {
      let { text = '', imgs = [], video = '' } = this.item
      return {
        text,
        imgs,
        video
      }
    },
    comments() {
      return this.item.momentComments || []
    },
    createDate() {
      let createDate = this.item.updatedAt
      let date = new Date( createDate ).getTime()
      let now = Date.now()
      const period = now - date

      if ( period < 1000 * 60 * 3 ) {
        return '刚刚'
      } else if ( period < 1000 * 60 * 60 ) {
        return Math.floor( period / 1000 / 60 ) + '分钟前'
      } else if ( period < 1000 * 60 * 60 * 24 ) {
        return Math.floor( period / 1000 / 60 / 60 ) + '小时前'
      } else if ( period < 1000 * 60 * 60 * 24 * 30 ) {
        return Math.floor( period / 1000 / 60 / 60 / 24 ) + '天前'
      } else {
        return formatMyDate( date )
      }
    },
    commentCount() {
      return this.comments.length || 0
    },
    likeCount() {
      return this.item.momentLikes.likes || 0
    }
  },
  created() {

  },
  methods: {
    toggleMomentLike() {
      this.likeOneMoment()
    },
    likeOneMoment() {
      likeMoment( {
        momentId: this.item.id
      } ).then( res => {

      } )
    },
    unlikeOneMoment() {

    }
  }
}
</script>

<style lang="stylus" scoped>
[w-35-35]
  aspect-ratio '35:35'
.moment-item
  margin-bottom 10px
  padding 10px
  background #ffffff
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
  p
    line-height 20px
    margin-bottom 10px
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

