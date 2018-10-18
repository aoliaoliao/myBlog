<template>
  <div class="home">
    <user-info></user-info>
    <el-tabs v-model="currPanes" @tab-click="chanagePane">
      <el-tab-pane v-for="item in tabPanes" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import ArticleList from '@/components/ArticleList'
import StatusList from '@/components/StatusList'
import { tabPanes } from './const'

export default {
  name: 'home',
  data: () => {
    return {
      userInfo: {},  // 作者信息
      tabPanes: tabPanes,
      currPanes: ''
    }
  },
  components: {
    StatusList,
    ArticleList,
    UserInfo
  },
  created() {
    this.currPanes = this.tabPanes[ 0 ].name
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
