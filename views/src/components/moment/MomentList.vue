<template>
  <div class="moment-list">
    <template v-if="list.length > 0">
      <the-scroll v-if="list.length > 0" :propbe-type="3" :listen-scroll="true" :pull-up-load="!isOver" :data="list" @pullingUp="loadBottom" @pullingDown="loadTop">
        <template slot="pulldown"></template>
        <template slot="pullUp"></template>
        <moment-item v-for="item in list" :key="item.id" :moment="item"></moment-item>
        <div v-if=" isOver">
          到底了哦~
        </div>
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
      list: [],
      page: {
        num: 10,
        cur: 1
      }
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
      this.page.cur = this.page.cur + 1
      this.getData().then( res => {
        this.list = [ ...this.list, ...res ]
      } )
    },
    loadTop() {
      this.page.cur = 1
      this.getData().then( res => {
        this.list = [ ...res ]
      } )
    },
    getData() {
      return getMomentList( this.formatParam() ).then( ( { rt } ) => {
        this.isOver = rt.end
        return rt.list
      } ).catch( res => {
        this.isOver = true
        return []
      } )
    },
    formatParam() {
      let { cur, num } = this.page
      return {
        num,
        start: ( cur - 1 ) * num
      }
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
