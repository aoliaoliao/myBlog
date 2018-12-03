<template>
  <div id="app">
    <div>{{a}}</div>
    <div>{{b}}</div>
    <!-- <div>{{c}}</div> -->
    <div>
      <button @click="a = 2">ceshi</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      a: 'a'
    }
  },
  computed: {
    b() {
      return this.a + 'b'
    },
    c() {
      console.log( 'c' )
      return this.b + 'c'
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eee;
}
</style>
