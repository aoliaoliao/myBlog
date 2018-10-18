<template>
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
        <el-button @click="login">登陆</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () { }
  }
}
</script>

<style lang="stylus" scoped>
.login {
  display: flex;
  flex-direction: column;
}

.input-text {
  margin-bottom: 20px;
}
</style>
