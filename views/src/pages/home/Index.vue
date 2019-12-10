<template>
  <div class="home-index">
    <vux-viewbox :body-padding-top="hasHeader ? `45px` : ``" body-padding-bottom="50px">
      <div class="header" slot="header" v-if="hasHeader">
        <the-page-title>
          <span>{{title}}</span>
          <span slot="right">
            <b-icon
              v-if="hasCreateMoment"
              @click="goCreateMoment"
              class="title-right-icon"
              icon="add"
            ></b-icon>
            <b-icon class="title-right-icon" icon="search"></b-icon>
          </span>
        </the-page-title>
      </div>
      <div class="content">
        <transition :name="transtionName">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
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
	name: 'home',
	components: {
		ThePageTitle
	},
	computed: {
		routerPath() {
			return this.$route.path
		},
		hasHeader() {
			if (['/home/my'].includes(this.routerPath)) {
				return false
			}
			return true
		},
		hasCreateMoment() {
			if (['/home/moments'].includes(this.routerPath)) {
				return true
			}
			return false
		},
		title() {
			let title = ''
			this.tabPanes.some(v => {
				let equire = v.link === this.routerPath
				equire ? (title = v.label) : ''
				return equire
			})
			return title
		}
	},
	data() {
		return {
			transtionName: 'slide-left',
			tabPanes: [
				{
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
	},
	beforeRouteUpdate(to, from, next) {
		let paths = this.tabPanes.map(v => v.link)
		let toIndex = paths.indexOf(to.path)
		let fromIndex = paths.indexOf(from.path)
		if (toIndex < fromIndex) {
			this.transtionName = 'slide-right'
		} else if (toIndex > fromIndex) {
			this.transtionName = 'slide-left'
		} else {
			this.transtionName = ''
		}
		next()
	},
	methods: {
		goCreateMoment() {
			this.$router.push('/publish/moment')
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable';

.home-index {
	height: 100%;
	background: $white;

	.header {
		top: 0;
		height: 45px;
		position: absolute;
	}

	.content {
		height: 100%;
	}

	.footer {
		height: 50px;
		bottom: 0;
		width: 100%;
		position: absolute;
	}

	.title-right-icon {
		font-size: 16px;
		color: #333;
		margin-left: 10px;
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

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
	// transition-duration: 0.5s;
	// transition-property: height, opacity, transform;
	// transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
	transition: all 0.3s ease-in;
	overflow: hidden;
}

.slide-left-enter, .slide-right-leave-active {
	opacity: 0;
	transform: translate(1em, 0);
}

.slide-left-leave-active, .slide-right-enter {
	opacity: 0;
	transform: translate(-1em, 0);
}
</style>
