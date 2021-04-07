<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <ul id="users">
    <li v-for="user in users" v-bind:key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
      return {
        users: [],
      }
    },

    created() {
      fetch("/api/users")
        .then((res) => res.json())
        .then((json) => {
          this.users = json.users
        })
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
