<template>
  <div class="b-icon">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="theIcon"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'icon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    theIcon () {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.b-icon
  width 1em
  height 1em
  .icon
    width 100%
    height 100%
    vertical-align -0.15em
    fill currentColor
    overflow hidden
</style>
