<template>
  <div class="mf-loading-container">
    <img :src="Loading" />
  </div>
</template>
<script type="text/ecmascript-6">
import Loading from '@/assets/images/loading.gif'
const COMPONENT_NAME = 'loading'

export default {
	name: COMPONENT_NAME,
	data() {
		return {
			Loading
		}
	}
}
</script>
<style lang="stylus" scoped >
.mf-loading-container {
	text-align: center;

	img {
		width: 20px;
		height: 20px;
		display: inline-block;
	}
}
</style>
