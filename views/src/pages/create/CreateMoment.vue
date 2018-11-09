<template>
  <div class="create-article">
    <the-header>
      <a class="publish">发表</a>
    </the-header>
    <div class="content">
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  name: 'create-moment',
  components: {
    TheHeader
  },
  created() {

  },
  methods: {
    publish() {

    }
  }
}
</script>

<style lang="stylus" scoped>
.create-article
  .publish
    font-size 16px
    color #3BB048
</style>
