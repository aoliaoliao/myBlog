<template>
  <div class="article-item">
    <!-- <div aspectratio w-335-200 class="img">
      <img aspectratio-content v-lazy="item.summaryImage" />
    </div>-->
    <div class="item" @click.stop="goDetail">
      <h1 class="title ellipsis">{{item.name}}</h1>
      <div class="date">{{ updateTime }}</div>
      <div class="summary-wrap">
        <p class="summary ellipsis">{{item.summary}}</p>
        <div class="img">
          <img v-lazy="item.summaryImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatMyDate } from '@/utils/tool'

export default {
	props: {
		item: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {}
	},
	computed: {
		updateTime() {
			let { updatedAt } = this.item
			return formatMyDate(updatedAt)
		}
	},
	methods: {
		goDetail() {
			// this.$router.push()
			this.$router.push(`/article/${this.item.id}`)
		}
	}
}
</script>


<style lang="stylus" scoped>
@import '~styles/variable';

.article-item {
	padding: 10px;
	text-align: left;
	border-bottom: 10px solid #eee;
	background: $white;
}

.item {
	margin-bottom: 15px;

	h1 {
		font-size: 20px;
		margin-bottom: 5px;
		-webkit-line-clamp: 2;
	}

	.date {
		color: #999999;
		font-size: 10px;
		margin-bottom: 5px;
	}

	.summary-wrap {
		display: flex;
		align-items: center;

		.img {
			flex-basis: 66px;
			margin-left: 5px;
			height: 66px;
			width: 66px;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.summary {
		flex: 1;
		line-height: 22px;
		height: 66px;
		overflow: hidden;
		-webkit-line-clamp: 3;
	}
}
</style>
