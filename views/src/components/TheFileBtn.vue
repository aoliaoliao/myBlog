<template>
  <div class="the-file-btn">
    <slot>
    </slot>
    <input @change="selectedFile" class="file-btn" name="fileBtn" type="file" :accept="types" :multiple="multiple">
  </div>
</template>

<script>

const maxImgCount = 9
const maxImgSize = 3 * 1024 * 1024

export default {
  name: 'the-file-btn',
  props: {
    types: {
      type: Array,
      default: () => ([]),
      descript:'上传文件的限制类型'
    },
    multiple: {
      type: Boolean,
      default: false,
      descript: '是否允许多选'
    }

  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    selectedFile( ev ) {
      this.$emit('change',ev )
    },
  }
}
</script>

<style lang="stylus" scoped>
.the-file-btn
  position relative
  .file-btn
    width 100%
    height 100%
    opacity 0
    z-index 2
</style>

