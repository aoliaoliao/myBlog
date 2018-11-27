<template>
  <div class="create-moment">
    <div class="moment-text">
      <mt-field type="textarea" rows="5" placeholder="For Your Moment" v-model="momentText"></mt-field>
    </div>
    <div class="moment-img">
      <img class="size" v-for="img in imgList" :key="img" :src="img">
      <the-file-btn class="size create-btn" @change="changeImageList" :type="fileTypes" :multiple="true" v-show="showImgBtn">
      </the-file-btn>
    </div>
  </div>
</template>

<script>

const maxImgCount = 9
const maxImgSize = 3 * 1024 * 1024

import TheFileBtn from '@/components/TheFileBtn'

export default {
  name: 'create-moment',
  components: {
    TheFileBtn
  },
  data() {
    return {
      momentText: '',
      imgList: [],
      fileTypes: [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
      ]
    }
  },
  computed: {
    showImgBtn() {
      return this.imgList.length < maxImgCount
    }
  },
  created() {

  },
  methods: {
    formatImg() {
      return ''
    },
    changeImageList() {

    },
    publish() {

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
  .size
    width imgSize
    height imgSize
    margin-right 5px
    margin-bottom 5px
    &:nth-child(3n)
      margin-right 0
  .create-btn
    background-color #999999
</style>

<style lang="stylus">
.create-moment
  .mint-field-core
    font-family -webkit-body
</style>

