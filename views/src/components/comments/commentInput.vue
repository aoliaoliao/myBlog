<template>
  <transition name="move">
    <div class="comment-shadow comment-position" v-show="isShowInput" @click.self="toggle">
      <div class="comment-area">
        <mt-cell class="title-border">
          <mt-button type="default" size="small" @click.stop.prevent="submit">发表</mt-button>
        </mt-cell>
        <mt-field ref="textarea" placeholder="客观评论，理性交流" type="textarea" rows="4" v-model="text"></mt-field>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    isShowInput: {
      get() {
        return this.value
      },
      set( v ) {
        this.$emit( 'input', v )
      }
    }
  },
  watch: {
    isShowInput( nv ) {
      if ( nv ) {
        this.$nextTick().then( () => {
          let ref = this.$refs.textarea
          let textarea = ref.$el.querySelector( 'textarea' )
          textarea.focus()
        } )
      }
    }
  },
  methods: {
    submit() {
      this.$emit( 'submit', this.text )
    },
    toggle() {
      this.isShowInput = !this.isShowInput
    },
  }
}
</script>

<style lang="stylus" scoped>
.comment-position
  position fixed
  bottom 0
  left 0
  right 0
  z-index 10
.comment-shadow
  height 100%
  background-color rgba(0, 0, 0, 0.5)
.comment-area
  position absolute
  bottom 0
  width 100%
  .title-border
    border-bottom 1px solid #cccccc
</style>

