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
        <component :is="item.name"></component>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import ArticleList from '@/components/ArticleList'
import StatusList from '@/components/StatusList'
import { tabPanes } from './const'

export default {
  name: 'home',
  data: () => ({
    userInfo: {}, // 作者信息
    tabPanes,
    selected: ''
  }),
  components: {
    StatusList,
    ArticleList,
    UserInfo
  },
  created () {
    this.selected = this.tabPanes[0].name
  },
  methods: {
    chanagePane (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
