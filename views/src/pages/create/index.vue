<template>
  <div class="create">
    <the-header :title="componentObj.title || ''">
      <a @click="publish" class="publish">发表</a>
    </the-header>
    <div class="content">
      <keep-alive>
        <component ref="curComponent" :is="componentObj.name || ''"></component>
      </keep-alive>
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
      publishType: ''
    }
  },
  computed: {
    componentObj() {
      const id = this.publishType
      let comp = {}
      switch ( id ) {
        case 0:
          comp = {
            name: 'CreateArticle',
            title: '文章'
          }
          break
        case 'moment':
          comp = {
            name: 'CreateMoment',
            title: '动态'
          }
          break
      }
      return comp
    }
  },
  created() {
    // id 发布内容的类型： 0: 发布文章，1：发布动态
    this.publishType = this.$route.params.id || 0

  },
  methods: {
    publish() {
      this.$refs.curComponent.publish()
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
