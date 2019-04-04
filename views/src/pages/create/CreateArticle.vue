<template>
  <div class="create-article">
    <vux-group>
      <vux-input class="title" :min="1" :max="50" :required="true" :show-counter="true" placeholder="请输入标题"></vux-input>
      <vux-textarea class="summary" :required="true" :show-counter="true" :max="300" :autosize="true" placeholder="文章简介"></vux-textarea>
    </vux-group>
    <div class="summaryImage" v-if="formData.summaryImage != null">
      <img :src="summaryImages[0].src" @click="$refs.previewer.show(0)" />
      <b-icon class="image-close" icon="close" @click.prevent.stop="removeImg"></b-icon>
      <vux-previewer ref="previewer" :list="summaryImages"></vux-previewer>
    </div>

    <div class="bottom flex-center">
      <span class="bottom-item" :class="{'success-item': formData.articleAddress != null }">
        <the-file-btn class="icon-position" @change="selectedArticle" :accept="articleMIME" :multiple="false">
          <b-icon icon="article" class="icon-shape"></b-icon>
          <span>文件</span>
        </the-file-btn>
      </span>
      <span class="bottom-item" :class="{'success-item': formData.summaryImage != null }">
        <the-file-btn class="icon-position" @change="selectedImage" :accept="imageMIME" :multiple="false">
          <b-icon icon="tupian" class="icon-shape"></b-icon>
          <span>缩略图</span>
        </the-file-btn>
      </span>
      <span @click.stop="togglePrivate" class="bottom-item icon-position success-item">
        <b-icon :icon="formData.isPrivate ? 'right' : 'close'" class="icon-shape"></b-icon>
        <span>私有</span>
      </span>
      <span @click.stop="toggleComment" class="bottom-item icon-position success-item">
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
      },
      articleMIME: '*',
      imageMIME: 'image/jpeg,image/pjpeg,image/png'
    }
  },
  computed: {
    summaryImages () {
      let img = this.formData.summaryImage
      if (!img) return [ { src: '' } ]
      return [ {
        src: URL.createObjectURL(img),
        h: '100%',
        w: '100%'
      } ]
    }
  },
  methods: {
    togglePrivate () {
      this.formData.isPrivate = !this.formData.isPrivate
    },
    toggleComment () {
      this.formData.isComment = !this.formData.isComment
    },
    selectedArticle (ev) {
      const file = Array.from(ev.target.files)[ 0 ]
      if (!this.validateArticle(file)) {
        this.formData.articleAddress = null
        return
      }
      this.formData.articleAddress = file
    },
    selectedImage (ev) {
      const file = Array.from(ev.target.files)[ 0 ]
      if (!this.validateImage(file)) {
        this.formData.summaryImage = null
        return
      }
      this.formData.summaryImage = file
    },
    validateArticle (file) {
      let msg = ''

      let name = file.name
      if (!('text/html'.includes(file.type || 'none') || /\.*\.md$/gi.test(name))) {
        msg = '仅支持HTML和MD文件'
      } else {

      }
      if (msg.length) {
        this.$toast({
          message: msg,
          position: 'center',
          duration: 2000
        })
      }

      return !msg.length
    },
    validateImage (file) {
      let msg = ''
      if (!this.imageMIME.includes(file.type)) {
        msg = '请上传PNG，JPG或JPEG格式的图片'
      } else if (file.size > 1000000) {
        msg = '图片最大为10000'
      } else { }
      if (msg.length > 0) {
        this.$toast({
          message: msg,
          position: 'center',
          duration: 2000
        })
      }
      return !msg.length
    }
  }

}
</script>


<style lang="stylus" scoped>
@import '~styles/variable'
.create-article
  position relative
  height 100%
  .title input[type="text"]
    font-size 24px
  .summary textarea
    font-size 14px
    line-height 20px
    color blue
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
  color $success
.summaryImage
  padding 15px
  position relative
  >img
    width 100px
  .image-close
    position absolute
    right 10px
    top 10px
    color $error
    width 20px
    height 20px
    z-index 10

</style>

<style lang="stylus">
.create-article
  .weui-cells
    margin-top 0
  .title input[type="text"]
    font-size 24px
  .summary textarea
    font-size 14px
    line-height 20px
</style>

