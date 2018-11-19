<template>
  <div class="create">
    <the-header>
      <a class="publish">发表</a>
    </the-header>
    <div class="content">
      <mt-swipe class="mt-swipe" :show-indicators="false" :auto="0" @change="changeType">
        <mt-swipe-item class="moment">
          <create-moment></create-moment>
        </mt-swipe-item>
        <mt-swipe-item class="article">
          <create-article></create-article>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import CreateArticle from './CreateArticle'
import CreateMoment from './CreateMoment'

export default {
  name: 'create',
  components: {
    TheHeader,
    CreateMoment,
    CreateArticle
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    changeType( index ) {
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  position static
  .publish
    font-size 16px
    color #3BB048
  .content
    position absolute
    top 51px
    left 0
    right 0
    bottom 0
    overflow auto
    background #ffffff
    .mt-swipe
      height 100%
</style>
