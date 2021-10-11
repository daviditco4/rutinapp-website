<template>
  <v-app-bar
      app
      color="#76EAAB"
      height="55"
      class="lg">

    <v-col cols="10">
      <v-col cols="1">
      <v-tab to="/home" >
        <v-img src="@/assets/logo.png" max-width="50" max-height="50" class="justify-center my-3"></v-img>
      </v-tab>
      </v-col>
    </v-col>

    
    <v-tabs >
      <v-tabs-slider color="#333C8E"></v-tabs-slider>
      <v-menu offset-y tile open-on-hover close-delay="3">
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" class="white--text text-center"> Crear
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-tab>
        </template>
        <v-tabs vertical>
          <v-tab to="/create-routine" style="background-color:#76EAAB">Rutina</v-tab>
          <v-tab to="/create-exercise" style="background-color:#76EAAB">Ejercicio</v-tab>

        </v-tabs>
      </v-menu>
      
      

      <v-menu offset-y tile open-on-hover close-delay="3" >
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" class="white--text text-center"> 
            <v-img src="@/assets/logo.png" max-width="50" max-height="50" class="justify-center my-3"></v-img>
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-tab>
        </template>
        <v-tabs vertical style="background-color:#76EAAB">
          <v-tab to="/profile" style="background-color:#76EAAB">Mi Perfil</v-tab>
          <v-tab to="/library" style="background-color:#76EAAB">Mi biblioteca</v-tab>
          <v-tab style="background-color:#76EAAB">Cerrar Sesion</v-tab>
        </v-tabs>
      </v-menu>

    </v-tabs>
  </v-app-bar>
</template>

<script>

export default {
  name: "AppBar",
  data() {
    return {
      createItems: [
        {title: 'Rutina', path: '/create-routine'},
        {title: 'Ejercicio', path: '/create-exercise'},
      ],
      profileItems: [
        {title: 'Mi Perfil', path: '/profile'},
        {title: 'Mi Biblioteca', path: '/library',},
      ],
    }
  },
}
</script>

<style scoped>

</style>