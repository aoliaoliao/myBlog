<template>
  <div class="create-moment">
    <div class="moment-text">
      <mt-field type="textarea" rows="5" placeholder="For Your Moment" v-model="moment.text"></mt-field>
    </div>
    <div class="moment-img">
      <img class="size" v-for="( img, index) in moment.imgList" @click="showImg(index)" :key="img" :src="img">
      <the-file-btn class="size create-btn" @change="changeImageList" :accept="fileTypes" :multiple="true" v-show="showImgBtn">
        <svg class="icon addIcon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
      </the-file-btn>
    </div>
    <div class="config">
      <div class="item">
        <div class="title">
          <svg class="icon private" aria-hidden="true">
            <use xlink:href="#icon-yinsi"></use>
          </svg>
          <span>仅自己可见</span>
        </div>
        <mt-switch v-model="moment.isPrivate"></mt-switch>
      </div>

    </div>
    <component :is="componentName" :imgs="moment.imgList" :index="imgIndex" @close="hideImg"></component>
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
  data() {
    return {
      moment: {
        text: '',
        imgList: [],
        isPrivate: false
      },
      imgIndex: 0,
      componentName: '',
      fileTypes: 'image/jpeg,image/pjpeg,image/png',
    }
  },
  computed: {
    showImgBtn() {
      return this.moment.imgList.length < maxImgCount
    }
  },
  created() {

  },
  methods: {
    formatImg( img ) {
      // if ( img.size > maxImgSize ) return

      return new Promise( function ( resolve, reject ) {
        var reader = new FileReader();
        reader.readAsDataURL( img );
        reader.onloadend = ( e ) => {
          resolve( e.target.result )
        }
      } )

    },
    changeImageList( ev ) {
      const files = Array.from( ev.target.files )
      if ( files.length > maxImgCount ) {
        return
      }
      for ( let i = 0, len = files.length; i < len; i++ ) {
        let v = files[ i ]
        if ( this.fileTypes.split( ',' ).indexOf( v.type ) === -1 ) {
          let name = v.name
          alert( `${name}图片的格式不符合，已忽略` )
          continue
        }
        this.formatImg( v ).then( img => {
          this.moment.imgList.push( img )
        } )
      }
    },
    showImg( index ) {
      this.imgIndex = index || 0
      this.componentName = 'PreviewImg'
    },
    hideImg() {
      this.componentName = ''
    },
    publish() {
      createMoment( this.moment ).then( res => {
        console.log( res )
      } ).catch( err => {
        console.log( err )
      } )
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

