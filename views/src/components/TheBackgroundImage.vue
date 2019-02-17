<template>
  <div class="the-background-image" :style="`backgroundImage:url(${img})`">

  </div>
</template>

<script>

export default {
  name: 'the-background-image',
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      img: null,
      defaultImg: './static/images/user_avatar.jpg'
    }
  },
  created() {
    const self = this
    const image = new Image()
    image.onload = function () {
      self.img = self.src
    }
    image.onerror = function () {
      self.img = self.defaultImg
    }
    image.src = this.src

  }
}
</script>

<style lang="stylus" scoped>
.the-background-image
  width 100%
  height 100%
  background-color #999
  background-size cover
</style>

