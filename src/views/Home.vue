<template>

  <div class="home" id = "home">
    <v-img src="@/assets/fondo1.jpeg" height="100%" >
    <div class="my-2">
    <v-row>
      <v-col cols="10" justify-self="center" class="text-center">
        <h1 style="color: white; font-weight:900;">Hola otra vez, Marcela!</h1>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="mx-2"
          fab
          small
        >
        <v-icon>
          <v-img src="@/assets/logo.jpeg" max-width="100" max-height="100" lass="justify-center"></v-img>
        </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </div>

      <v-card width="500" height="350" class="mx-auto mt-16 text-center" color="#76EAAB">
       
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
//cd cd import Creaciones from '@/components/Creaciones.vue'

  export default {
    name: 'Home',
    components: {
      Footer,
    },
    data: () => ({
      
    }),

    methods: {
      elegir(){
        //mostrarCreaciones : true
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
