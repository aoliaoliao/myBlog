<template>
  <div class="create-article">
    <vux-group>
      <vux-input :min="10" :max="50" :required="true" :show-counter="true" placeholder="请输入标题"></vux-input>
      <vux-textarea :required="true" placeholder="文章简介"></vux-textarea>
    </vux-group>
    <div class="bottom flex-center">
      <span class="bottom-item success-item">
        <the-file-btn class="icon-position">
          <b-icon icon="article" class="icon-shape"></b-icon>
          <span>文件</span>
        </the-file-btn>
      </span>
      <span class="bottom-item ">
        <the-file-btn class="icon-position">
          <b-icon icon="tupian" class="icon-shape"></b-icon>
          <span>缩略图</span>
        </the-file-btn>
      </span>
      <span @click.stop="togglePrivate" class="bottom-item icon-position" :class="{'success-item':formData.isPrivate}">
        <b-icon :icon="formData.isPrivate ? 'right' : 'close'" class="icon-shape"></b-icon>
        <span>私有</span>
      </span>
      <span @click.stop="toggleComment" class="bottom-item icon-position" :class="{'success-item':formData.isComment}">
        <b-icon :icon="formData.isComment ? 'right' : 'close'" class="icon-shape"></b-icon>
        <span>可评论</span>
      </span>
    </div>
  </div>
</template>

<script>
import TheFileBtn from '@/components/TheFileBtn'
import TheHeader from '@/components/TheHeader'

export default {
  name: 'create-article',
  components: {
    TheFileBtn,
    TheHeader
  },
  data () {
    return {
      formData: {
        name: '',
        summary: '',
        isPrivate: true,
        isComment: true,
        articleAddress: null,
        summaryImage: null
      }
    }
  },
  methods: {
    togglePrivate () {
      this.formData.isPrivate = !this.formData.isPrivate
    },
    toggleComment () {
      this.formData.isComment = !this.formData.isComment
    }
  }

}
</script>

<style lang="stylus" scoped>
.create-article
  position relative
  height 100%
.bottom
  background #eee
  position absolute
  left 0
  bottom 0
  width 100%
  height 50px
.bottom-item
  flex 1
  border-right 1px solid #bbb
  &:last-child
    border-right none
  .icon-shape
    width w = 20px
    height w
.flex-center
  display flex
  align-items center
  justify-content center
.icon-position
  @extend .flex-center
  flex-direction column
.success-item
  color #09bb07
</style>

<style lang="stylus">
.create-article
  .weui-cells
    margin-top 0
</style>

