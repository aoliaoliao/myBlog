<template>
  <div class="the-tab-page-frame">
    <vux-viewbox :body-padding-top="hasHeader ? `45px` : ``" body-padding-bottom="50px">
      <div class="header" slot="header" v-if="hasHeader">
        <the-page-title>
          <span>文章</span>
          <b-icon slot="right" class="title-search" icon="search"></b-icon>
        </the-page-title>
      </div>
      <slot></slot>
      <div class="footer" slot="bottom">
        <vux-tabbar>
          <vux-tabbaritem
            class="menu-tab-item"
            v-for="item in tabPanes"
            :key="item.label"
            :link="item.link"
          >
            <b-icon
              slot="icon"
              class="menu"
              :class="{'item-select': routerPath == item.link }"
              :icon="item.icon"
            ></b-icon>
            <span
              slot="label"
              class="menu-name"
              :class="{'item-select': routerPath == item.link }"
            >{{item.label}}</span>
          </vux-tabbaritem>
        </vux-tabbar>
      </div>
    </vux-viewbox>
  </div>
</template>

<script>
import ThePageTitle from '@/components/ThePageTitle'

export default {
	name: 'the-tab-page-frame',
	props: {
		hasHeader: {
			type: Boolean,
			default: true
		}
	},
	components: {
		ThePageTitle
	},
	computed: {
		routerPath() {
			return this.$route.path
		}
	},
	data() {
		return {
			tabPanes: [
				{
					icon: 'article',
					label: '文章',
					link: '/articles'
				},
				{
					icon: 'moment',
					label: '动态',
					link: '/moments'
				},
				{
					icon: 'my',
					label: '我的',
					link: '/my'
				}
			]
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable';

.the-tab-page-frame {
	height: 100%;

	.header {
		top: 0;
		height: 45px;
		position: absolute;
	}

	.footer {
		height: 50px;
		bottom: 0;
		width: 100%;
		position: absolute;
	}
}

.menu-tab-item {
	.menu {
		width: 20px;
		height: 20px;
	}
}

.menu-name {
	margin-top: 5px;
	font-size: 12px;
}

.item-select {
	color: $success;
}
</style>
