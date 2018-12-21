<template>
  <div class="moment-list">
    <template v-if="list.length > 0">
      <the-scroll v-if="list.length > 0" :probe-type="3" :listen-scroll="true" :data="list" @pullingUp="loadBottom" @pullingDown="loadTop">
        <template slot="pulldown"></template>
        <template slot="pullUp"></template>
        <moment-item v-for="item in list" :key="item.id" :moment="item"></moment-item>
      </the-scroll>
    </template>
    <div v-else>
      暂无数据
    </div>
    <!-- <moment-item v-for="item in list" :key="item.id" :moment="item"></moment-item> -->
  </div>
</template>

<script>
import { getMomentList } from '@/API'
import MomentItem from './MomentItem'

export default {
  name: 'moment-list',
  components: {
    MomentItem
  },
  data() {
    return {
      isOver: false,
      list: []
    }
  },
  created() {
    this.loadTop()
  },
  activated() {
    // this.getData().then( res => {
    //   this.list = [ ...res ]
    // } )
  },
  methods: {
    loadBottom() {
      if ( this.isOver ) {
        return
      }
      this.getData().then( res => {
        this.list = [ ...this.list, ...res ]
      } )
    },
    loadTop() {
      this.getData().then( res => {
        this.list = [ ...res ]
      } )
    },
    getData() {
      return getMomentList().then( ( { rt } ) => {
        this.isOver = rt.end
        return rt.list
      } ).catch( res => {
        this.isOver = true
        return []
      } )
    }
  }

}
</script>

<style lang="stylus" scoped>
.moment-list
  padding-top 10px
  height 667px
  overflow scroll
</style>
