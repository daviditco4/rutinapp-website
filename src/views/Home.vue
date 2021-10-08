<template>

  <div class="home">
    <AppBar />
    <v-img src="@/assets/fondo1.jpeg" >
      <v-row>
        <v-col cols="10" justify-self="center" class="text-center">
          <h1 style="color: white; font-weight:900;">Hola otra vez, Marcela!</h1>
        </v-col>
        <v-col cols="1">
          <v-tab to="/miPerfil" >
          <v-img src="@/assets/logo.png" max-width="50" max-height="50" class="justify-center my-3"></v-img>
          </v-tab>
        </v-col>
      </v-row>

      <Creaciones v-if="mostrarCreaciones"/>
     
      <v-card v-if="!mostrarCreaciones" width="500" height="370" class="mx-auto mt-16 text-center" color="#76EAAB">
        
         <v-card-title primary-title class="text-center" style="color:#333C8E; font-size:24px;">
          ¿Qué tienes ganas de hacer?
        </v-card-title>

        <v-card-actions>
          <v-col>
            <div class="text-center">
              <v-btn color="#333C8E" x-large block @click="elegir()">Crear Rutina o Ejercicio</v-btn>
            </div>  
          </v-col>
        </v-card-actions>
        <v-card-actions>
          <v-col>    
            <div class="text-center">
              <v-btn color="#333C8E" x-large block >Ir a Mi Biblioteca</v-btn>
            </div>  
          </v-col> 
        </v-card-actions>
        <v-card-actions>
          <v-col> 
            <div class="text-center">
              <v-btn color="#333C8E" x-large block to="/buscar-rutinas">Buscar Rutinas</v-btn>
            </div>
          </v-col>  
        </v-card-actions> 
      </v-card>

    </v-img>
  <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import AppBar from '@/components/AppBar.vue'
import Creaciones from '@/components/Creaciones.vue'

  export default {
    name: 'Home',
    components: {
      Footer,
      AppBar,
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
#textcenter{
    color:white;
    width: 250px;
    height: 250px;
    line-height: 200px;
}
</style>
