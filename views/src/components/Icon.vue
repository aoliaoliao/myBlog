<template>
  <div class="b-icon" @click="handleClick">
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
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="stylus" scoped>
.b-icon
  width 1em
  height 1em
  display inline-flex
  .icon
    width 100%
    height 100%
    vertical-align -0.15em
    fill currentColor
    overflow hidden
</style>
