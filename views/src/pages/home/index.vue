<template>
  <div class="home">
    <user-info>
      <div class="memu">
        <the-menu></the-menu>
      </div>
      <svg @click="publish" class="icon publish" aria-hidden="true">
        <use xlink:href="#icon-add"></use>
      </svg>
    </user-info>
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="item in tabPanes" :key="item.name" :id="item.id">
        {{item.label}}
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="item in tabPanes" :key="item.name" :id="item.id">
        <keep-alive>
          <component :is="item.name"></component>
        </keep-alive>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import ArticleList from '@/components/articles/ArticleList'
import MomentList from '@/components/moment/MomentList'
import { tabPanes } from './const'
import TheMenu from '@/components/TheMenu'

export default {
  name: 'home',
  data: () => ( {
    tabPanes,
    selected: '',
  } ),
  components: {
    MomentList,
    ArticleList,
    UserInfo,
    TheMenu
  },
  created() {
    this.selected = this.tabPanes[ 0 ].id
  },
  methods: {
    publish() {
      this.$router.push( '/publish/' + this.selected )
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  .memu
    position absolute
    left 0
    top 0
    padding 20px
  .publish
    position absolute
    right 0
    top 0
    padding 20px
    color #3BB048
    width w = 25px
    height w
</style>
