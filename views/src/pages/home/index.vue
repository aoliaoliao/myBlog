<template>
  <div class="home">
    <user-info></user-info>
    <!-- <el-tabs v-model="currPanes" @tab-click="chanagePane">
      <el-tab-pane v-for="item in tabPanes" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.name"></component>
      </el-tab-pane>
    </el-tabs> -->
    <mt-navbar v-model="currPanes">
      <mt-tab-item v-for="item in tabPanes" :key="item.name" :id="item.name">
        {{item.label}}
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="currPanes">
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
    currPanes: ''
  }),
  components: {
    StatusList,
    ArticleList,
    UserInfo
  },
  created () {
    this.currPanes = this.tabPanes[ 0 ].name
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
