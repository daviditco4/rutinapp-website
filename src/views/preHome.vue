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
                    <v-btn style="background-color: #333C8E; color: white;" large block 
                      to="/login">
                      Iniciar Sesion
                    </v-btn>
                    </div>  
                </v-col>
                </v-card-actions>
                <v-card-actions>
                <v-col>
                    <div class="text-center">
                    <v-btn style="background-color: #333C8E; color: white;" large block                    
                      to="/signUp">
                      Registrarse
                    </v-btn>
                    </div>  
                </v-col>
          </v-card-actions>
        </v-col>
        </v-row>
      <v-alert align="center" type="success" v-if="this.$isEmailVerified">¡Email verificado!</v-alert>
    </div>
    
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'PreHome',
    components: {
     },
  computed: {
      ...mapState('security', {
        $isEmailVerified: 'emailVerified'
      })
  },
  methods: {
      ...mapActions('security', {
        $verifiedEmail: 'emailVerified'
      })
  },
}
</script>

<style lang="scss">
.preHome-background {
    background: url("../assets/preHome.jpeg") no-repeat transparent;
    background-size: cover;
    //height: 100%;
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