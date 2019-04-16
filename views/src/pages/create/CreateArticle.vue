<template>
  <div class="create-article">
    <vux-group>
      <vux-input class="title" v-model="formData.name" :min="1" :max="50" :required="true" :show-counter="true" placeholder="请输入标题"></vux-input>
      <vux-textarea class="summary" v-model="formData.summary" :required="true" :show-counter="true" :max="300" :autosize="true" placeholder="文章简介"></vux-textarea>
    </vux-group>

    <vux-table class="file-table" :cell-bordered="false" :content-bordered="false" v-show="hasShowTable">
      <tr>
        <td width="60%">
          <div class="article-file file-block" v-if="formData.articleAddress != null">
            <div class="file-bg">{{fileName}}</div>
            <b-icon class="close-btn" icon="close" @click.stop="removeArticle"></b-icon>
          </div>
        </td>
        <td width="30%">
          <div class="summary-image file-block" v-if="formData.summaryImage != null">
            <div class="image-block" :style="`background-image: url(${summaryImages[0].src})`" @click.stop="$refs.previewer.show(0)"></div>
            <!-- <div></div> -->
            <b-icon class="close-btn" icon="close" @click="removeImg"></b-icon>
            <div v-transfer-dom>
              <vux-previewer ref="previewer" :list="summaryImages"></vux-previewer>
            </div>
          </div>
        </td>
      </tr>
    </vux-table>
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
import { createNewArticle } from '@/API'
import { mapState } from 'vuex'

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
        summaryImage: null,
      },
      articleMIME: '*',
      imageMIME: 'image/jpeg,image/pjpeg,image/png',
      fileName: ''
    }
  },
  computed: {
    ...mapState({
      author: state => state.userId,
    }),
    summaryImages () {
      let img = this.formData.summaryImage
      if (!img) {

        return [ { src: '' } ]
      }
      return [ {
        src: URL.createObjectURL(img),
      } ]
    },
    hasShowTable () {
      return this.formData.summaryImage || this.formData.articleAddress
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
      this.fileName = file.name
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
      const maxImage = 3 * 1024 * 1024
      if (!this.imageMIME.includes(file.type)) {
        msg = '请上传PNG，JPG或JPEG格式的图片'
      } else if (file.size > maxImage) {
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
    },
    validateName (name) {
      let msg = ''
      const maxName = 50
      if (!name) {
        msg = '文章标题不可为空'
      } else if (name.length > 50) {
        msg = `文章标题最多为${maxName}字`
      }
      if (msg.length > 0) {
        this.$toast({
          message: msg,
          position: 'center',
          duration: 2000
        })
      }
      return !msg.length
    },
    removeArticle () {
      this.formData.articleAddress = null
    },
    removeImg () {
      this.formData.summaryImage = null
    },
    publish () {
      const { name, articleAddress, summaryImage } = this.formData
      if (!(this.validateName(name) && this.validateArticle(articleAddress) && this.validateImage(summaryImage))) {
        return
      }
      let param = new FormData()
      param.append('author', this.author)
      for (let [ key, value ] of Object.entries(this.formData)) {
        if ([ 'isPrivate', 'isComment' ].includes(key)) {
          value = +value
        }
        param.append(key, value)
      }

      createNewArticle(param).then(res => {
        let msg = res.rt
        res.cd && !msg ? msg = '新建成功' : '发表失败'
        this.$vux.toast.show({
          text: msg,
          time: 1000
        })
        if (res.cd) {
          this.$router.replace('/home')
        }
      }).catch(err => {
        this.$vux.toast.show({
          text: '发表失败，请重试',
          time: 1000
        })
      })

    }
  }

}
</script>


<style lang="stylus" scoped>
@import '~styles/variable'

.create-article
  position relative
  height 100%
  background $white
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
.file-table
  margin-top 20px
.file-block
  position relative
  height 80px
  margin-right 10px
  .close-btn
    position absolute
    right -10px
    top -10px
    color $error
    width 20px
    height 20px
    z-index 10
.summary-image
  .image-block
    width 100%
    height 100%
    background-size cover

.article-file
  .file-bg
    height 100%
    background linear-gradient(to right, #4BFF1F, #09bb07)
    color $white
    font-size 16px
    display flex
    align-items center
    justify-content center

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

