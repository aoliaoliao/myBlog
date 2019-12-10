<template>
  <div class="article-list">
    <template v-if="list.length > 0">
      <the-scroll
        ref="theScroll"
        :propbe-type="3"
        :listen-scroll="true"
        :listen-scroll-end="true"
        :pull-up-load="!isOver"
        :data="list"
        @pullingUp="loadBottom"
        @pullingDown="loadTop"
      >
        <template slot="pulldown"></template>
        <template slot="pullUp"></template>
        <article-item v-for="(item,index) in list " :key="index" :item="item"></article-item>
        <div class="list-bottom" v-if="isOver">到底了哦~</div>
      </the-scroll>
    </template>
    <div v-else class="article-null">暂无数据</div>
  </div>
</template>

<script>
import { getArticleList } from '@/API'
import ArticleItem from './ArticleItem'

const refreshRouter = ['createArticle']

export default {
	name: 'article-list',
	components: {
		ArticleItem
	},
	data() {
		return {
			list: [],
			isOver: false,
			page: {
				num: 10,
				cur: 1
			}
		}
	},
	created() {
		this.loadTop()
	},
	activated() {},
	beforeRouteEnter(to, from, next) {
		// 上一个路由如果是指定路由，则刷新滚动列表
		next(vm => {
			if (refreshRouter.includes(from.name)) {
				vm.autoPullDownRefresh()
			}
		})
	},
	methods: {
		autoPullDownRefresh() {
			const theScroll = this.$refs.theScroll
			theScroll.autoPullDownRefresh()
		},
		loadTop() {
			this.page.cur = 1
			this.getData().then(data => {
				this.list = [...data]
			})
		},
		loadBottom() {
			if (this.isOver) {
				return
			}
			this.page.cur = this.page.cur + 1
			this.getData().then(data => {
				this.list = [...this.list, ...data]
			})
		},
		getData() {
			return getArticleList(this.formatParam())
				.then(({ rt }) => {
					this.isOver = rt.end
					return rt.list
				})
				.catch(err => {
					this.isOver = true
					return []
				})
		},
		formatParam() {
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
.article-list {
	height: 100%;
}

.article-null {
	text-align: center;
	padding-top: 100px;
	font-size: 16px;
	color: #999;
}
</style>

<style lang="stylus">
.article-list .list-bottom {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	color: #999999;
	padding: 20px 0;
}
</style>
