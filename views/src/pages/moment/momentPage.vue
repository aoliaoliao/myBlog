<template>
  <div class="moment-page">
    <the-page-title>
      <span>动态</span>
      <svg slot="right" class="icon title-search" aria-hidden="true" @click.stop="publish">
        <use xlink:href="#icon-add"></use>
      </svg>
    </the-page-title>
    <div class="moment-page-list">
      <moment-list></moment-list>
    </div>
  </div>
</template>

<script>
import MomentList from '@/components/moment/momentList'
import ThePageTitle from '@/components/ThePageTitle'

export default {
  name: 'moment-page',
  components: {
    MomentList,
    ThePageTitle
  },
  data() {
    return {

    }
  },
  methods: {
    publish() {
      this.$router.push( '/publish/moment' )
    }
  }

}
</script>

<style lang="stylus" scoped>
.moment-page
  height 100%
  position relative
  .moment-page-list
    margin-top 45px
  .title-search
    font-size 18px
    font-weight bolder
</style>
