<template>
  <div class="register">
    <div class="login">
      <el-row class="input-text">
        <el-col :sm="6" :sx="24">
          <el-input v-model="account" placeholder="请输入用户账号"></el-input>
        </el-col>
      </el-row>
      <el-row class="input-text">
        <el-col :sm="6" :sx="24">
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
        </el-col>
      </el-row>
      <el-row class="input-text">
        <el-col :sm="6" :sx="24">
          <el-input v-model="rePassword" type="password" placeholder="确认密码"></el-input>
        </el-col>
      </el-row>
      <el-row class="input-text">
        <el-col :sm="6" :sx="24">
          <el-button @click="register">注册</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import API from '@/API'
export default {
  name: 'register',
  data () {
    return {
      account: '',
      password: '',
      rePassword: ''
    }
  },
  methods: {
    register () {
      return this.$http.post('', {
        get: (url, params) => {
          this.get(url, {
            params: params
          }).then(res => { })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
