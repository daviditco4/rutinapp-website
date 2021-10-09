<template >
    <v-card width="500" height="370" class="mx-auto text-center" color="#76EAAB">  
        <v-card-title primary-title class="text-center" style="color:#333C8E; font-size:24px;">
          ¿Qué vamos a crear hoy?
        </v-card-title>
        
          <v-card-actions>
           <v-col >
              <v-row >
                <div offset-sm="2">    
                    <v-tab text>
                      <v-img src="@/assets/ejercicio.jpeg" height="200" width="200" @click="ejercicio()"></v-img>
                    </v-tab>
                </div> 
                <v-spacer/>
                <div class="text-center">  
                  <v-tab text>
                    <v-img src="@/assets/rutina.jpeg" text height="200" width="200" @click="rutina()"></v-img>
                  </v-tab> 
                </div> 
              </v-row>
            </v-col>
        </v-card-actions>
        
        <v-card-actions>
          <v-col> 
            <div class="text-center">
              <v-btn color="#333C8E" x-large block @click="crear()">Crear</v-btn>
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
  }),     
  components:{    
  },
  methods: {
    ejercicio() {
        this.ejercicio = true;
        this.rutina = false;
    },
    rutina() {
        this.rutina = true;
        this.ejercicio = false;
    },
    crear(){
      if(this.rutina == true)
        return router.replace("/buscar-rutinas");
      if(this.ejercicio == true)
        return router.replace("/buscar-rutinas");
    },
  }
}
</script>

<style lang="scss">

</style>
