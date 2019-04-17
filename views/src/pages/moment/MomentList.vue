<template>
  <div>
    <template v-if="list.length > 0">
      <the-scroll :propbe-type="3" :listen-scroll="true" :pull-up-load="!isOver" :data="list" @pullingUp="loadBottom" @pullingDown="loadTop">
        <template slot="pulldown"></template>
        <template slot="pullUp"></template>
        <moment-item v-for="item in list" :key="item.id" :moment="item"></moment-item>
        <div class="list-bottom" v-if="isOver">
          到底了哦~
        </div>
      </the-scroll>
    </template>
    <div class="moment-null" v-else @click="loadTop">
      暂无数据, 点击刷新
    </div>
  </div>
</template>

<script>
import { getMomentList } from '@/API'
import MomentItem from './MomentItem'
import TheTabPageFrame from '@/components/TheTabPageFrame'

export default {
  name: 'moment-list',
  components: {
    MomentItem,
    TheTabPageFrame
  },
  data () {
    return {
      isOver: false,
      list: [],
      page: {
        num: 10,
        cur: 1
      }
    }
  },
  created () {
    this.loadTop()
  },
  activated () {
    // this.getData().then( res => {
    //   this.list = [ ...res ]
    // } )
  },
  methods: {
    loadBottom () {
      if (this.isOver) {
        return
      }
      this.page.cur = this.page.cur + 1
      this.getData().then(res => {
        this.list = [ ...this.list, ...res ]
      })
    },
    loadTop () {
      this.page.cur = 1
      this.getData().then(res => {
        this.list = [ ...res ]
      })
    },
    getData () {
      return getMomentList(this.formatParam()).then(res => {
        if (res.cd === 1) {
          const { rt } = res
          this.isOver = rt.end
          return rt.list
        } else {
          this.isOver = true
          return []
        }
      }).catch(res => {
        this.isOver = true
        return []
      })
    },
    formatParam () {
      let { cur, num } = this.page
      return {
        num,
        start: (cur - 1) * num
      }
    }
  }

}
</script>

<style lang="stylus" scoped>
.moment-list
  // height 667px - 50 - 45
  // height 100%
  position fixed
  top 45px
  bottom 50px
  width 100%
.moment-null
  text-align center
  padding-top 100px
  font-size 16px
  color #999
</style>

<style lang="stylus">
.moment-list .list-bottom
    display flex
    justify-content center
    align-items center
    font-size 12px
    color #999999
</style>
