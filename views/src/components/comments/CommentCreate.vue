<template>
  <div class="comment-create">

  </div>
</template>

<script>

export default {
  name: 'comment-create',
  props: {
    articleId: {
      type: String,
      default: '',
      descipe: '评论所属的文章ID'
    },
    momentId: {
      type: String,
      default: '',
      descipe: '评论所属的动态ID'
    }
  },
  data(){
    return {
      text: '',
    }
  },
  methods: {
    submit(){

    },

  }
}
</script>

<style lang="stylus" scoped>

</style>

