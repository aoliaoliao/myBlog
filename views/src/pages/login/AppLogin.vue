<template>
  <div class="login">
    <div class="input-text">
      <input type="text" placeholder="请输入用户账号" v-model="account" />
    </div>
    <div class="input-text">
      <input type="password" placeholder="请输入密码" v-model="password" @input="encryptPwd" />
    </div>
    <div>
      <mt-button size="large" @click="login">登陆</mt-button>
    </div>
  </div>
</template>

<script>
import { encryptByMd5 } from '@/utils/tool'

let encryptPwd = ''
export default {
  name: 'login-wrap',
  data() {
    return {
      account: '',
      password: '',
    }
  },
  methods: {
    login() {

    },
    encryptPwd() {
      encryptPwd = encryptByMd5( this.password )
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  display: flex;
  flex-direction: column;


.input-text
  height 35px
  margin-bottom: 20px;
  padding-bottom 2px
  border-bottom 1px solid #cccccc
  input
    width 100%
    height 100%
    border none
    outline none
    font-size 16px
    line-height 16px
</style>
