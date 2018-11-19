<template>
  <div class="the-file-btn">
    <slot>
    </slot>
    <input @change="selectedFile" class="file-btn" name="fileBtn" type="file" :accept="types" multiple>
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
      default: () => ([])
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

