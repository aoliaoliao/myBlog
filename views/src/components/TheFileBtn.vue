<template>
  <div class="the-file-btn">
    <slot></slot>
    <input
      @change="selectedFile"
      class="file-btn"
      name="fileBtn"
      type="file"
      :accept="accept"
      :multiple="multiple"
    />
  </div>
</template>

<script>
export default {
	name: 'the-file-btn',
	props: {
		accept: {
			type: String,
			default: '',
			descript: '上传文件的限制类型, 逗号分隔的 MIME 类型字符串'
		},
		multiple: {
			type: Boolean,
			default: false,
			descript: '是否允许多选'
		}
	},
	data() {
		return {}
	},
	created() {},
	methods: {
		selectedFile(ev) {
			this.$emit('change', ev)
			ev.target.value = ''
		}
	}
}
</script>

<style lang="stylus" scoped>
.the-file-btn {
	position: relative;

	.file-btn {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 2;
		top: 0;
		left: 0;
	}
}
</style>

