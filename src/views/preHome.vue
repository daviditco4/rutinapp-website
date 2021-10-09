<template>
    <div id="preHome">
        <v-row class="mb-6"
      no-gutters>
        <v-col cols="5" flex-start >
          <h1 style="color:white; font-weight:900;">Entrená a tu ritmo.</h1>
          <h1 style="color:white; font-weight:900;">
                Creá tu propia rutina o
                elegí de +1.000 creadas y 
                punteadas por otros usuarios.
          </h1>
        </v-col>

        <v-col offset-sm ="3" >
         <v-card-actions>
                <v-col>
                    <div class="text-center">
                    <v-btn color="#333C8E" large block >Iniciar Sesion</v-btn>
                    </div>  
                </v-col>
                </v-card-actions>
                <v-card-actions>
                <v-col>
                    <div class="text-center">
                    <v-btn color="#333C8E" large block>Registrarse</v-btn>
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
  background: url("../assets/home.jpeg") ;
  background-size: cover;
  opacity: 1;
}
#preHome{
  padding: 30px;
  padding-top: 190px;
}
</style>