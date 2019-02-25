<template>
  <div class="home">
    <div class="content-tabbar">
      <div style="position:relative;height:100%;">
        <mt-tab-container v-model="selected" :swipeable="true">
          <!-- <keep-alive> -->
          <mt-tab-container-item v-for="item in tabPanes" :key="item.name" :id="item.id">

            <component :is="item.name" ref="homeComponent"></component>

          </mt-tab-container-item>
          <!-- </keep-alive> -->
        </mt-tab-container>
      </div>

    </div>
    <mt-tabbar class="menu-tabbar" v-model="selected">
      <mt-tab-item class="menu-tab-item" v-for="item in tabPanes" :key="item.name" :id="item.id">
        <svg class="icon menu" :class="item.icon" aria-hidden="true">
          <use :xlink:href="`#icon-${item.icon}`"></use>
        </svg>
        <span class="menu-name">{{item.label}}</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import ArticlePage from '@/pages/article/articlePage'
import MomentPage from '@/pages/moment/momentPage'
import My from '@/pages/my'
import { tabPanes } from './const'

export default {
  name: 'home',
  data: () => ( {
    tabPanes,
    selected: '',
  } ),
  components: {
    MomentPage,
    ArticlePage,
    My,
  },
  created() {
    this.selected = this.tabPanes[ 0 ].id
  },
  watch: {
    selected( newVal ) {
      debugger
      console.log( 'this', this )
      let curTab = this.$refs[ 'homeComponent' ] || {}
      console.log( 'curTab', curTab )

      let curList = {}

      curTab.forEach( tab => {
        if ( tab.name === 'ArticlePage' && newVal === 0 ) {
          curList = tab.refs[ 'articleList' ]
        } else if ( tab.name === 'MomentPage' && newVal === 0 ) {
          curList = tab.refs[ 'momentList' ]
        }
      } )

      let theScroll = curList.$refs[ 'theScroll' ]
      theScroll && theScroll.refresh()

    }
  },
  methods: {
    publish() {
      this.$router.push( '/publish/' + this.selected )
    },

  }
}
</script>

<style lang="stylus" scoped>
.home
  position relative
  overflow hidden
  height 100%
.content-tabbar
  position absolute
  top 0
  bottom 50px
  left 0
  right 0
  overflow-y auto
  overflow-x hidden
.menu-tabbar
  z-index 2
  background #ffffff
  height 49px
  bottom 0
  position absolute
  border-top 1px solid #ccc
  .menu-tab-item
    .menu
      width 20px
      height 20px
  .menu-name
    margin-top 5px
    font-size 12px


</style>

<style lang="stylus">
.home
  .mint-tab-item-label
    display: flex;
    flex-direction: column;
    align-items: center;
  .mint-tab-item
    color #999
  .mint-tab-item.is-selected
    background #ffffff
    color #000
</style>

