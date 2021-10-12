<template >
    <v-card width="500" height="370" class="mx-auto text-center" color="primary">  
        <v-row>
          <v-btn rounded @click="closeCardCreaciones" color="#333C8E" dark >
                    <v-icon left>
                      mdi-arrow-left
                    </v-icon>
          </v-btn>
          <v-card-title primary-title class="text-center" style="color:#333C8E; font-size:24px;">
            ¿Qué vamos a crear hoy?
          </v-card-title>
        </v-row>
        
          <v-card-actions>
           <v-col >
              <v-row >
                <div offset-sm="2">  <v-hover close-delay="1000">  
                    <v-tab @click="overlay = !overlay" text>
                      <v-img src="@/assets/ejercicio.jpeg" height="200" width="200" @click="ejercicios()"></v-img>
                      <v-overlay :absolute="absolute" :value="overlay"></v-overlay>
                   </v-tab>
                   </v-hover>
                </div> 
                <v-spacer/>
                <div class="text-center">  
                  <v-tab @click="overlayR = !overlayR" text>
                    <v-img src="@/assets/rutina.jpeg" text height="200" width="200" @click="rutinas()"></v-img>
                    <v-overlay :absolute="absolute" :value="overlayR"></v-overlay>
                  </v-tab> 
                </div> 
              </v-row>
            </v-col>
        </v-card-actions>
        
        <v-card-actions>
          <v-col> 
            <div @click="overlay = false" class="text-center">
              <v-btn dark color="#333C8E" x-large block @click="crear()">Crear</v-btn>
            </div>
          </v-col>  
        </v-card-actions>  
        
    </v-card>

</template>

<script>
import router from "@/router";

export default {
  name: "Creaciones",
  data: () => ({
      ejercicio: false,
      rutina: false,
      absolute: true,
      overlay: false,
      overlayR: false,
  }),     
  components:{    
  },
  methods: {
    closeCardCreaciones() {
        this.$emit('closeCreaciones');
    },

    ejercicios() {
        this.ejercicio = true;
        this.rutina = false;
    },
    rutinas() {
        this.rutina = true;
        this.ejercicio = false;
    },
    async crear(){
      if(this.rutina == true)
        await this.$router.replace("/create-routine");
      if(this.ejercicio == true)
        await router.replace("/create-exercise");
    },
  },
  
}
</script>

<style lang="scss">

</style>
