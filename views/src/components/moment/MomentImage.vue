<template>
  <div class="moment-img">
    <div class="size moment-selected-img">
      <img v-for="img in imgList" :key="img" :src="img" />
    </div>
    <the-file-btn
      class="size create-btn"
      :types="fileTypes"
      @change="changeImageList"
      v-show="showImgBtn"
    ></the-file-btn>
  </div>
</template>

<script>
import TheFileBtn from '@/components/TheFileBtn'

const maxImgCount = 9
// const maxImgSize = 3 * 1024 * 1024

export default {
  name: 'create-moment',
  components: {
    TheFileBtn
  },
  data() {
    return {
      momentText: '',
      imgList: [],
      fileTypes: ['image/jpeg', 'image/pjpeg', 'image/png']
    }
  },
  computed: {
    showImgBtn() {
      return this.imgList.length < maxImgCount
    }
  },
  created() {},
  methods: {
    formatImg(img) {
      return ''
    },
    validateFile(type) {
      return this.fileTypes.includes(type)
    },
    changeImageList(ev) {
      let inValidate = []
      let files = ev.target.files
      files.forEach(file => {
        if (this.validateFile(file.type)) {
          this.formatImg(file)
        } else {
          inValidate.push(file.name)
        }
      })
      if (this.inValidate.length > 0) {
        this.$toast({
          message: `${this.inValidate.join(',')}不符合格式`,
          position: 'bottom',
          duration: 5000
        })
      }
    },
    publish() {}
  }
}
</script>

<style lang="stylus" scoped>
imgSize = 115px;

.moment-img {
	display: flex;
	flex-wrap: wrap;
	padding: 0 10px;

	.size {
		width: imgSize;
		height: imgSize;
		margin-right: 5px;
		margin-bottom: 5px;

		&:nth-child(3n) {
			margin-right: 0;
		}
	}

	.create-btn {
		background-color: #999999;
	}
}

.moment-selected-img {
	position: relative;

	img {
		width: 100%;
		height: 100%;
	}
}
</style>
