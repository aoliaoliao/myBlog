<template>
  <div class="register">
    <el-form size="mimi" :model="this" :rules="rules" ref="register">
      <el-form-item class="input-text" prop="account">
        <el-input v-model="account" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item class="input-text" prop="password">
        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="input-text" prop="rePassword">
        <el-input v-model="rePassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item class="input-text">
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from '@/API'

export default {
  name: 'register',
  data () {
    return {
      account: '',
      password: '',
      rePassword: '',
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        rePassword: [
          { validator: this.validatePsd2, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    register () {
      this.$refs['register'].validate((valid) => {
        if (valid) {
          addUser({
            account: this.account,
            password: this.password
          }).then(({ rt }) => {
            this.$router.push('/home')
          }).catch(_ => {
            this.$notify({
              type: 'error',
              message: '注册失败'
            })
          })
        }
      })
    },
    validatePsd2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (this.password !== value) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
