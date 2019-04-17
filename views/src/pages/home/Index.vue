<template>
  <div class="the-tab-page-frame">
    <vux-viewbox :body-padding-top="hasHeader ? `45px` : ``" body-padding-bottom="50px">
      <div class="header" slot="header" v-if="hasHeader">
        <the-page-title>
          <span>{{title}}</span>
          <b-icon slot="right" class="title-search" icon="search"></b-icon>
        </the-page-title>
      </div>
      <router-view></router-view>
      <div class="footer" slot="bottom">
        <vux-tabbar>
          <vux-tabbaritem class="menu-tab-item" v-for="item in tabPanes" :key="item.label" :link="item.link">
            <b-icon slot="icon" class="menu" :class="{'item-select': routerPath == item.link }" :icon="item.icon"></b-icon>
            <span slot="label" class="menu-name" :class="{'item-select': routerPath == item.link }">{{item.label}}</span>
          </vux-tabbaritem>
        </vux-tabbar>
      </div>
    </vux-viewbox>
  </div>
</template>

<script>
import ThePageTitle from '@/components/ThePageTitle'

export default {
  name: 'home',
  components: {
    ThePageTitle
  },
  computed: {
    routerPath () {
      return this.$route.path
    },
    hasHeader () {
      if ([ '/home/my' ].includes(this.routerPath)) {
        return false
      }
      return true
    },
    title () {
      let title = ''
      switch (this.routerPath) {
        case '/home/articles':
          title = '文章'
          break
        case '/home/moments':
          title = '动态'
          break
        default:
          break
      }
      return title
    }
  },
  data () {
    return {
      tabPanes: [ {
        icon: 'article',
        label: '文章',
        link: '/home/articles'
      },
      {
        icon: 'moment',
        label: '动态',
        link: '/home/moments'
      },
      {
        icon: 'my',
        label: '我的',
        link: '/home/my'
      }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable'

.the-tab-page-frame
  height 100%
  .header
    top 0
    height 45px
    position absolute
  .footer
    height 50px
    bottom 0
    width 100%
    position absolute
.menu-tab-item
  .menu
    width 20px
    height 20px
.menu-name
  margin-top 5px
  font-size 12px
.item-select
  color $success
</style>
