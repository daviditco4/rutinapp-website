<template >
    <v-card width="500" height="370" class="mx-auto mt-16 text-center" color="#76EAAB">  
        <v-card-title primary-title class="text-center" style="color:#333C8E; font-size:24px;">
          ¿Qué vamos a crear hoy?
        </v-card-title>
        
          <v-card-actions>
           <v-row >
            <div offset-sm="2" class="text-center">    
                <v-tab text>
                  <v-img src="@/assets/foto1.jpeg" height="200" width="200"></v-img>
                </v-tab>
            </div> 
            <div class="text-center">  
              <v-tab text>
                <v-img src="@/assets/foto2.jpeg" text height="200" width="200"></v-img>
              </v-tab> 
            </div> 
           </v-row>
        </v-card-actions>
        
        <v-card-actions>
          <v-col> 
            <div class="text-center">
              <v-btn color="#333C8E" x-large block>Crear</v-btn>
            </div>
          </v-col>  
        </v-card-actions>  
        
    </v-card>

</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
    data: () => ({
    }),
})
</script>

<style lang="scss">
#textcenter{
    color:white;
    width: 250px;
    height: 250px;
    line-height: 200px;
}
</style>
