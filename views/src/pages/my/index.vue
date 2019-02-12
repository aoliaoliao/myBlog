<template>
  <div class="my">
    <user-info>
    </user-info>
    <div>
      <mt-cell v-for="menu in menus " :key="menu.title" :title="menu.title">
        <span v-if="menu.explain">{{menu.explain}}</span>
        <svg class="icon" slot="icon">
          <use :xlink:href="`#icon-${menu.icon}`"></use>
        </svg>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo'

export default {
  name: 'my',
  components: {
    UserInfo
  },
  data() {
    return {
      menus: [
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

