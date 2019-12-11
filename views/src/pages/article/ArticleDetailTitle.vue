<template>
  <div class="article-title">
    <h2 class="title">{{title.articleTitle}}</h2>
    <div class="message">
      <span>{{title.articleAuthor}}</span>
      <span>{{title.articleDate}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-detail-title',
  props: {
    title: {
      type: Object,
      default: () => ({
        articleTitle: '',
        articleAuthor: '',
        articleDate: ''
      }),
      descript: '文章标题的各种信息'
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.article-title {
	position: relative;
	padding: 24px 16px 27px;
}

.title {
	font-size: 22px;
	font-weight: 700;
	line-height: 32px;
}

.message {
	margin-top: 10px;

	span {
		font-size: 12px;
		color: #999;
		margin-right: 10px;
	}
}

h2 {
	margin: 0;
}
</style>
