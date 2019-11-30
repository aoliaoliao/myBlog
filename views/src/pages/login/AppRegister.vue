<template>
  <div class="register">
    <div>
      <input type="text" placeholder="请输入用户账号" v-model="nickName" />
    </div>
    <div>
      <input type="text" placeholder="请输入密码" v-model="password" />
    </div>
    <div>
      <input type="text" placeholder="请输入邮箱" v-model="linkedEMail" />
    </div>
    <div>
      <mt-button size="large" @click="register">登陆</mt-button>
    </div>
  </div>
</template>

<script>
import { addUser } from '@/API'
import { encryptByMd5 } from '@/utils/tool'

export default {
  name: 'register',
  data() {
    return {
      nickName: '',
      password: '',
      linkedEMail: '',
      rules: {
        nickName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    register() {
      addUser( {
        nickName: this.nickName,
        linkedEMail: this.linkedEMail,
        password: encryptByMd5( this.password )
      } ).then( ( { rt } ) => {
        if ( rt.cd ) {
          this.$router.push( '/home' )
        }
      } ).catch( _ => {
        this.$notify( {
          type: 'error',
          message: '注册失败'
        } )
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
