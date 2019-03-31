<template>
  <div class="create-article">
    <vux-group>
      <vux-cell title="标题">
        <!-- <vux-textarea :show-counter="true" :rows="1" :autosize="true" placeholder="请输入标题"></vux-textarea> -->
        <!-- <vux-input :show-counter="true" placeholder="请输入标题"></vux-input> -->
      </vux-cell>
      <vux-input :show-counter="true" placeholder="请输入标题"></vux-input>
    </vux-group>
  </div>
</template>

<script>
export default {
  name: '新建文章',
  data() {
    return {
      formData: {
        name: '',
        summary: '',
        isPrivate: true,
        isComment: true
      }
    }
  },

}
</script>

<style lang="stylus" scoped>

</style>
