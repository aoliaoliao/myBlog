<template>
  <the-tab-page-frame :has-header="false">
    <div class="my">
      <user-info></user-info>
      <div>
        <mt-cell v-for="menu in menus " :key="menu.title" :title="menu.title" :is-link="!!menu.to" :to="menu.to">
          <span v-if="menu.explain">{{menu.explain}}</span>
          <b-icon class="icon" slot="icon" :icon="menu.icon"></b-icon>
        </mt-cell>
        <div class="app-logout">
          <app-logout>
            <mt-button type="danger" size="large">退出</mt-button>
          </app-logout>
        </div>
      </div>
    </div>
  </the-tab-page-frame>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import AppLogout from '@/pages/login/AppLogout'
import TheTabPageFrame from '@/components/TheTabPageFrame'

export default {
  name: 'my',
  components: {
    UserInfo,
    AppLogout,
    TheTabPageFrame
  },
  data () {
    return {
      menus: [
        {
          title: '创建文章',
          icon: 'xiewenzhang',
          to: '/publish/article'
        },
        {
          title: '我的文章',
          explain: '投稿',
          icon: 'xiewenzhang'
        },
        {
          title: '我的动态',
          icon: 'xiewenzhang'
        },
        {
          title: '我的评论',
          icon: 'xiewenzhang'
        },
        {
          title: '我的点赞',
          icon: 'xiewenzhang'
        },
        {
          title: '我的动态1',
          icon: 'xiewenzhang'
        },
        {
          title: '我的动态2',
          icon: 'xiewenzhang'
        },
        {
          title: '我的动态3',
          icon: 'xiewenzhang'
        },
        {
          title: '我的动态4',
          icon: 'xiewenzhang'
        },
        {
          title: '我的动态5',
          icon: 'xiewenzhang'
        },

      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable'

.my
  overflow auto
  background $white
  .app-logout
    margin 10px 5px
    border-top 1px solid #cccccc
  .icon
    width w = 14px
    height w

</style>

