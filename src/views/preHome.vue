<template>
    <div id="preHome">
        <v-row class="mb-6" no-gutters>
        <v-col cols="5" flex-start >
          <h1 >Entrená a tu ritmo.</h1>
          <h1 >
                Creá tu propia rutina o
                elegí de +1.000 creadas y 
                punteadas por otros usuarios.
          </h1>
        </v-col>

        <v-col offset-sm ="3" >
         <v-card-actions>
                <v-col>
                    <div class="text-center">
                    <v-btn style="background-color: #333C8E; color: white;" large block >Iniciar Sesion</v-btn>
                    </div>  
                </v-col>
                </v-card-actions>
                <v-card-actions>
                <v-col>
                    <div class="text-center">
                    <v-btn style="background-color: #333C8E; color: white;" large block>Registrarse</v-btn>
                    </div>  
                </v-col>
          </v-card-actions>
        </v-col>
        </v-row>
    </div>
    
</template>

<script>

export default {
    name: 'PreHome',
    components: {
     },
}
</script>

<style lang="scss">
.homeBackground {
  background: url("../assets/preHome.jpeg") ;
  background-size: cover;
  opacity: 1;
}
h1 {
  color: white;
}

#preHome{
  padding: 30px;
  padding-top: 190px;
}
</style>