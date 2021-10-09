<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <v-fade-transition appear>
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from '../components/Footer'
import AppBar from '../components/AppBar'

export default {
  name: 'LayoutLogin',
  components: {
    Footer,
    AppBar
  },
}
</script>

<style>
#app {
  height: 100%;
  background: url("../assets/home.jpeg") no-repeat center;
  background-size: cover;
}
</style>