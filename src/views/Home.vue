<template>

  <div class="home">
    <!-- <v-img src="@/assets/fondo1.jpeg" > -->
      <v-row>
        <v-col offset-sm="1" cols="10" justify-self="center" class="text-center">
          <h1 style="color: white; font-weight:900;">¡Hola otra vez, {{ username }}!</h1>
        </v-col>
      </v-row>


     
      <v-card v-if="!mostrarCreaciones" width="500" height="370" class="mx-auto text-center" color="#76EAAB">

        <v-row>
          <v-col md="12"><h3 primary-title class="text-center" color="secondary" style="font-size:24px;">¿Qué tienes ganas de hacer?</h3></v-col>
        </v-row>

        <v-card-actions>
          <v-col>
            <div class="text-center">
              <v-btn rounded style="background-color: #333C8E; color: white;"
               x-large block @click="elegir()">Crear Rutina o Ejercicio</v-btn>
            </div>  
          </v-col>
        </v-card-actions>
        <v-card-actions>
          <v-col>    
            <div class="text-center">
              <v-btn rounded style="background-color: #333C8E; color: white;" x-large block to="/library">Ir a Mi Biblioteca</v-btn>
            </div>  
          </v-col> 
        </v-card-actions>
        <v-card-actions>
          <v-col> 
            <div class="text-center">
              <v-btn rounded style="background-color: #333C8E; color: white;" x-large block to="/search-routine">Buscar Rutinas</v-btn>
            </div>
          </v-col>  
        </v-card-actions> 
      </v-card>

      <Creaciones v-if="mostrarCreaciones" @closeCreaciones="mostrarCreaciones=false"/>

  </div>
</template>

<script>
// @ is an alias to /src

import Creaciones from '@/components/Creaciones.vue'
import { mapState} from "vuex";

export default {
    name: 'Home',
    components: {
      Creaciones,
    },
    data: () => ({
      mostrarCreaciones: false,
    }),
    computed: {
    ...mapState("security", {
      $user: (state) => state.user,
      }),
      username() {
      return this.$user.username
      },
    },
    methods: {
      elegir(){
        this.mostrarCreaciones = true
      },
      
    },
    
}
</script>

<style lang="scss">
.home-Background {
  background: url("../assets/home.jpeg") ;
  background-size: cover;
  height: 100%;
  opacity: 1;
}
</style>
