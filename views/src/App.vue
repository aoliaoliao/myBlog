<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import '@/assets/styles/github.css'
import { updateRefreshToken } from './utils/token'

export default {
  name: 'App',
  created () {
    const notUpdateRoute = [ '/', '/login' ]
    if (!notUpdateRoute.includes(this.$route.path)) {
      updateRefreshToken()
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff;
}
</style>
