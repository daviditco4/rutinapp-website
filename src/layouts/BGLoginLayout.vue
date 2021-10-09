<template>
  <v-app>
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

export default {
  name: 'LoginLayout',
  components: {
    Footer,
  },
}
</script>

<style>
#app {
  height: 100%;
  background: url("../assets/preHome.jpeg") no-repeat center;
  background-size: cover;
}
</style>