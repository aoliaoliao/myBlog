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
      <!-- <template v-if="content.imgs.length > 0">
        <img :src="content.imgs[0]" />
      </template>
      <template v-if="content.video.length > 0">
        <img :src="content.video" />
      </template> -->
    </div>
    <div class="footer">
      <span>{{createDate}}</span>
    </div>
    <div class="comments">
      <p class="comments-item" v-for="( item, index ) in comments" :key="index">
        <span class="comment-name">{{ item.commentAuthor.nickName }}</span>
        <span class="comment-content">{{item.text }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { formatMyDate } from '@/utils/tool'

export default {
  name: 'moment-item',
  props: {
    moment: {
      type: Object,
      default: () => ( {} )
    }
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
      let createDate = this.item.createDate
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
    }
  },
  created() {

  },
  methods: {

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
.comments
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

