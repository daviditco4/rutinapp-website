<template>
  <v-app-bar
      app
      color="primary"
      height="55"
      class="lg"
      >

    <v-col cols="8">
      <v-col cols="1">
      <v-tab to="/home" >
        <v-img src="@/assets/logo.png" max-width="50" max-height="50" class="justify-center my-3"></v-img>
      </v-tab>
      </v-col>
    </v-col>

    
    <v-tabs >
      <v-tabs-slider color="secondary"></v-tabs-slider>

      <v-menu offset-y tile open-on-hover close-delay="3">
        <template v-slot:activator="{ on, attrs }">
          <v-tab to="/search-routine" v-bind="attrs" v-on="on" class="white--text text-center"> Buscar Rutinas
          </v-tab>
        </template>
      </v-menu>

      <v-menu offset-y tile open-on-hover close-delay="3">
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" class="white--text text-center"> Crear
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-tab>
        </template>
        <v-tabs vertical>
          <v-tab to="/create-routine" style="background-color:#76EAAB" class="white--text">Rutina</v-tab>
          <v-tab to="/create-exercise" style="background-color:#76EAAB" class="white--text">Ejercicio</v-tab>

        </v-tabs>
      </v-menu>
            
      <v-menu offset-y tile open-on-hover close-delay="3" >
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" class="white--text text-center"> 
            <v-avatar color="blue" max-width="100" max-height="100" class=" align-center my-4">
                {{usernameFirstLetter}}
            </v-avatar>
            <!--<v-img src="@/assets/logo.png" max-width="50" max-height="50" class="justify-center my-3"></v-img>-->
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-tab>
        </template>
        <v-tabs vertical style="background-color:#76EAAB">
          <v-tab to="/profile" style="background-color:#76EAAB" class="white--text">Mi Perfil</v-tab>
          <v-tab to="/library" style="background-color:#76EAAB" class="white--text">Mi biblioteca</v-tab>
          <v-tab @click="logout()" style="background-color:#76EAAB" class="white--text">Cerrar Sesion</v-tab>
        </v-tabs>
      </v-menu>

    </v-tabs>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: "AppBar",
  data() {
    return {
      createItems: [
        {title: 'Rutina', path: '/create-routine'},
        {title: 'Ejercicio', path: '/create-exercise'},
      ],
      profileItems: [
        {title: 'Mi Perfil', path: '/profile'},
        {title: 'Mi Biblioteca', path: '/library',},
      ],
      result: null,
    }
  },
  async create() {
    if (this.$user == null) {
      await this.$router.replace('/');
    }
  },
  computed: {
    ...mapState("security", {
      $user: (state) => state.user,
    }),
    ...mapGetters('security', {
      $isLoggedIn: 'isLoggedIn'
    }),
    usernameFirstLetter() {
       return this.$user.username.charAt(0).toUpperCase()
    },
    isLoggedIn() {
      return this.$isLoggedIn
    }
  },
  methods: {
    ...mapActions('security', {
      $logout: 'logout',
    }),
    async logout() {
      await this.$logout()
      this.clearResult()
      if(!this.$isLoggedIn){
        await this.$router.push('/')
      }
    },
    clearResult() {
      this.result = null
    },
  }
}
</script>

<style scoped>

</style>