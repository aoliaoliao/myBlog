<template>
  <div class="home">
    <div class="user-wrap">
      <user-info></user-info>
    </div>
    <el-tabs v-model="currPanes" @tab-click="chanagePane">
      <el-tab-pane v-for="item in tabPanes" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userInfo from '@/components/userInfo'
import articleList from '@/components/articleList'
import statusList from '@/components/articleList'
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
    statusList,
    articleList,
    userInfo
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
