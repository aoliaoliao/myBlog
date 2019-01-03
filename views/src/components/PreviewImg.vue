<template>
  <div class="preview-img">
    <img src="" />
  </div>
</template>

<script>
export default {
  name: 'preview-img',
  props: {
    imgs: []
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.preview-img
  position fixed
  left 0
  top 0
  right 0
  bottom 0

</style>
