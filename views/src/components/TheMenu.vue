<template>
  <div class="menu-wrap">
    <!-- <i>菜单</i> -->
    <svg class="icon menu" aria-hidden="true" @click.stop="changeItems">
      <use xlink:href="#icon-menu" />
    </svg>
    <div v-show="isShowItems" class="items" @click.stop="showItems">
      <li v-for="item in menus" :key="item.name">
        <router-link class="hrefClass" :to="item.path">{{item.name}}</router-link>
      </li>
    </div>
  </div>
</template>

<script>
export default {
	name: 'TheMenu',
	data() {
		return {
			isShowItems: false,
			menus: [{ name: '主页', path: '' }, { name: '关于', path: '' }, { name: '标签', path: '' }, { name: '登录', path: '/login' }]
		}
	},
	created() {
		document.removeEventListener('click', this.hideItems)
		document.addEventListener('click', this.hideItems)
	},
	methods: {
		changeItems() {
			this.isShowItems = !this.isShowItems
		},
		showItems() {
			this.isShowItems = true
		},
		hideItems() {
			this.isShowItems = false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable';

.menu-wrap {
	position: relative;
	text-align: left;

	.menu {
		width: w = 25px;
		height: w;
		color: $white;
	}
}

.items {
	background: $white;
	box-shadow: 0px 0px 2px $white;
	border-radius: 5px;

	li {
		list-style-type: none;
		font-size: 16px;
		padding: 5px 20px;
	}

	.hrefClass {
		font-size: 16px;
		color: #666666;
	}
}
</style>
