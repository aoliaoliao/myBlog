<template>
  <div class="home">
    <user-info></user-info>
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="item in tabPanes" :key="item.name" :id="item.name">
        {{item.label}}
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="item in tabPanes" :key="item.name" :id="item.name">
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

export default {
  name: 'home',
  data: () => ( {
    tabPanes,
    selected: ''
  } ),
  components: {
    MomentList,
    ArticleList,
    UserInfo
  },
  created() {
    this.selected = this.tabPanes[ 0 ].name
  },
  methods: {
    chanagePane( tab, event ) {
      console.log( tab, event )
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
