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
import { loginUser } from '@/API'
import { mapMutations, Store } from 'vuex'

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
    ...mapMutations( [
      'setUserId',
      'setToken'
    ] ),
    login() {
      loginUser( {
        account: this.account,
        password: encryptPwd
      } ).then( ( res = {} ) => {
        let { cd, rt } = res
        if ( cd == 1 ) {
          this.setToken( rt.accessToken )
          this.setUserId( rt.userId )
          localStorage.setItem( 'refresh_token', rt.refreshToken )
          this.$router.push( '/home' )
        } else {
          this.formatError( res.msg )
        }
      } ).catch( err => {
        this.formatError()
      } )
    },
    encryptPwd() {
      encryptPwd = encryptByMd5( this.password )
    },
    formatError( msg ) {
      this.$toast( {
        message: msg || '登录失败',
        duration: 2000
      } )
      this.setToken( undefined )
      this.setUserId( undefined )
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
