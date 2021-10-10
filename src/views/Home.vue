<template>

  <div class="home">
    <!-- <v-img src="@/assets/fondo1.jpeg" > -->
      <v-row>
        <v-col offset-sm="1" cols="10" justify-self="center" class="text-center">
          <h1 style="color: white; font-weight:900;">Hola otra vez, Marcela!</h1>
        </v-col>
        <!-- <v-col cols="1">
          <v-tab to="/miPerfil" >
          <v-img src="@/assets/logo.png" max-width="50" max-height="50" class="justify-center my-3"></v-img>
          </v-tab>
        </v-col> -->
      </v-row>


     
      <v-card v-if="!mostrarCreaciones" width="500" height="370" class="mx-auto text-center" color="#76EAAB">
        
         <v-card-title primary-title class="text-center" style="color:#333C8E; font-size:24px;">
          ¿Qué tienes ganas de hacer?
        </v-card-title>

        <v-card-actions>
          <v-col>
            <div class="text-center">
              <v-btn style="background-color: #333C8E; color: white;"
               x-large block @click="elegir()">Crear Rutina o Ejercicio</v-btn>
            </div>  
          </v-col>
        </v-card-actions>
        <v-card-actions>
          <v-col>    
            <div class="text-center">
              <v-btn style="background-color: #333C8E; color: white;" x-large block >Ir a Mi Biblioteca</v-btn>
            </div>  
          </v-col> 
        </v-card-actions>
        <v-card-actions>
          <v-col> 
            <div class="text-center">
              <v-btn style="background-color: #333C8E; color: white;" x-large block to="/buscar-rutinas">Buscar Rutinas</v-btn>
            </div>
          </v-col>  
        </v-card-actions> 
      </v-card>

      <Creaciones v-if="mostrarCreaciones"/>

  </div>
</template>

<script>
// @ is an alias to /src

import Creaciones from '@/components/Creaciones.vue'

export default {
    name: 'Home',
    components: {
      Creaciones,
    },
    data: () => ({
      mostrarCreaciones: false
    }),

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
