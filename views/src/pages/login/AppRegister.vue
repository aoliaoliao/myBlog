<template>
  <div class="register">
    <div>
      <input type="text" placeholder="请输入用户账号" v-model="account" />
    </div>
    <div>
      <input type="text" placeholder="请输入密码" v-model="password" />
    </div>
    <div>
      <input type="text" placeholder="确认密码" v-model="rePassword" />
    </div>
    <div>
      <mt-button size="large" @click="register">登陆</mt-button>
    </div>
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
    register() {
      this.$refs[ 'register' ].validate( ( valid ) => {
        if ( valid ) {
          addUser( {
            account: this.account,
            password: this.password
          } ).then( ( { rt } ) => {
            this.$router.push( '/home' )
          } ).catch( _ => {
            this.$notify( {
              type: 'error',
              message: '注册失败'
            } )
          } )
        }
      } )
    },
    validatePsd2( rule, value, callback ) {
      if ( value === '' ) {
        callback( new Error( '请再次输入密码' ) )
      } else if ( this.password !== value ) {
        callback( new Error( '两次输入密码不一致' ) )
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
