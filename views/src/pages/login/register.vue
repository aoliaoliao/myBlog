<template>
  <div class="register">
    <el-form>
      <el-form-item class="input-text">
        <el-col :sm="6" :sx="24">
          <el-input v-model="account" placeholder="请输入用户账号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="input-text">
        <el-col :sm="6" :sx="24">
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="input-text">
        <el-col :sm="6" :sx="24">
          <el-input v-model="rePassword" type="password" placeholder="确认密码"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="input-text">
        <el-col :sm="6" :sx="24">
          <el-button @click="register">注册</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from '@/API'

export default {
  name: 'register',
  data() {
    return {
      account: '',
      password: '',
      rePassword: ''
    }
  },
  methods: {
    register() {
      addUser( {
        account: this.account,
        password: this.password
      } ).then( ( { rt } ) => {
        console.log( 'this', this )
        this.$notify( {
          type: 'success',
          message: '注册成功'
        } )
      } )
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
