<template>
  <v-app>
    <AppBar />
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
  name: 'BGLoginLayout',
  components: {
    Footer,
    AppBar
  },
}
</script>

<style>
#app {
  height: 100%;
  background-color: #E5E5E5;
  background-size: cover;
}
</style>