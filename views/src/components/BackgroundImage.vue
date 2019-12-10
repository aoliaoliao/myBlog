<template>
  <!-- <vux-img></vux-img> -->
  <img v-lazy="src" class="the-image" :style="{'width': imgWidth, 'height': imgHeight}" />
</template>

<script>
import defaultImg from '@/assets/images/blog_default.jpg'

export default {
	name: 'background-image',
	props: {
		src: {
			type: String,
			required: true,
			default: ''
		},
		container: {
			type: String
		},
		width: {
			type: Number | String
		},
		height: {
			type: Number | String
		}
	},
	data() {
		return {
			img: null,
			defaultImg: defaultImg
		}
	},
	computed: {
		imgWidth() {
			if (typeof this.width === 'number') {
				return `${this.width}px`
			} else if (typeof this.width === 'string') {
				return `${this.width}`
			} else {
				return ''
			}
		},
		imgHeight() {
			if (typeof this.height === 'number') {
				return `${this.height}px`
			} else if (typeof this.height === 'string') {
				return `${this.height}`
			} else {
				return ''
			}
		}
	},
	created() {}
}
</script>

<style lang="stylus" scoped>
.the-image {
	width: 100%;
	height: 100%;
	background-color: #ccc;
	// background-size cover
	object-fit: cover;
}
</style>

