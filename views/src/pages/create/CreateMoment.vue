<template>
  <div class="create-moment">
    <div class="moment-text">
      <mt-field type="textarea" rows="5" placeholder="For Your Moment" v-model="moment.text"></mt-field>
    </div>
    <div class="moment-img">
      <img class="size" v-for="( img, index) in showImgs" @click="showImg(index)" :key="img" :src="img">
      <the-file-btn class="size create-btn" @change="changeImageList" :accept="fileTypes" :multiple="true" v-show="showImgBtn">
        <b-icon class="addIcon" icon="jiahao"></b-icon>
      </the-file-btn>
    </div>
    <div class="config">
      <div class="item">
        <div class="title">
          <b-icon class="private" icon="yinsi"></b-icon>
          <span>仅自己可见</span>
        </div>
        <mt-switch v-model="moment.isPrivate"></mt-switch>
      </div>

    </div>
    <component :is="componentName" :imgs="showImgs" :index="imgIndex" @close="hideImg"></component>
  </div>
</template>

<script>

const maxImgCount = 9
import { createMoment } from '@/API'
import TheFileBtn from '@/components/TheFileBtn'
import PreviewImg from '@/components/PreviewImg'

export default {
  name: 'create-moment',
  components: {
    TheFileBtn,
    PreviewImg
  },
  data () {
    return {
      moment: {
        text: '',
        imgs: [],
        isPrivate: false
      },
      showImgs: [],
      imgIndex: 0,
      componentName: '',
      fileTypes: 'image/jpeg,image/pjpeg,image/png',
    }
  },
  computed: {
    showImgBtn () {
      return this.moment.imgs.length < maxImgCount
    }
  },
  created () {

  },
  methods: {
    formatImg (img) {
      // if ( img.size > maxImgSize ) return

      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        // reader.readAsDataURL( img )
        reader.readAsBinaryString(img)
        reader.onloadend = (e) => {
          resolve(e.target.result)
        }
      })

    },
    changeImageList (ev) {
      const files = Array.from(ev.target.files)
      if (files.length > maxImgCount) {
        this.$toast({
          message: `最多允许上传${maxImgCount}张图片`,
          position: 'bottom',
          duration: 2000
        })
        return
      }
      let inValidate = []
      for (let i = 0, len = files.length; i < len; i++) {
        let v = files[ i ]
        if (this.fileTypes.split(',').indexOf(v.type) === -1) {
          let name = v.name
          inValidate.push(name)
          continue
        }
        this.moment.imgs.push(v)
        this.showImgs.push(URL.createObjectURL(v))

        // this.formatImg( v ).then( img => {
        //   // this.moment.imgs.push( img )
        //   // this.showImgs.push( URL.createObjectURL( img ) )
        // } )
      }
      if (inValidate.length > 0) {
        this.$toast({
          message: `${inValidate.join(' ')}不符合格式`,
          position: 'bottom',
          duration: 5000
        })
      }
    },
    showImg (index) {
      this.imgIndex = index || 0
      this.componentName = 'PreviewImg'
    },
    hideImg () {
      this.componentName = ''
    },
    publish () {
      let param = new FormData()
      for (const [ key, value ] of Object.entries(this.moment)) {
        if (Array.isArray(value)) {
          value.forEach(v => {
            param.append(key, v)
          })
        } else {
          param.append(key, value)
        }
      }
      createMoment(param).then(res => {
        this.$router.back()
      }).catch(err => {
        this.$toast({
          message: `发表失败，请重试`,
          position: 'bottom',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
imgSize = 115px
.create-moment
  .moment-text
    margin 10px 0
.moment-img
  display flex
  flex-wrap wrap
  padding 0 10px
  img
    object-fit cover
  .size
    width imgSize
    height imgSize
    margin-right 5px
    margin-bottom 5px
    &:nth-child(3n)
      margin-right 0
  .create-btn
    background-color #cccccc
    margin 0
    display flex
    align-items center
    justify-content center
    .addIcon
      font-size 36px
      color #666
.config
  margin 100px 10px 50px
  border-top 1px solid #eeeeee
  >div
    display flex
    align-items center
    padding 10px 0
    border-bottom 1px solid #ccc
    .title
      flex 1
      text-align left
</style>

