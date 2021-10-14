<template>
  <v-container fluid>
    <v-spacer/>
    <v-row justify="center">
      <v-col cols="12">
          <h1 class="text-center welcome-message">¡Qué alegría volverte a ver!<br>
            Por favor, iniciá sesión para continuar</h1>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-sheet
          color="primary"
          rounded
          elevation="10"
          class="px-8 pt-4 pa-2 card-format text-center">
          <v-form>
            <v-text-field
              flat
              outlined
              light
              hide-details
              background-color="white"
              class="my-2 font-italic"
              label="Username"
              v-model="username">
            </v-text-field>
            <v-text-field
              flat
              outlined
              light
              hide-details
              background-color="white"
              class="my-2 font-italic"
              label="Contraseña"
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            >
            </v-text-field>
            <p class="error-message" v-if="!userAuthorized">Usuario y/o contraseña inválida</p>
            <v-btn @click="login()"
              class="text-center my-2"
              color="secondary"
              elevation="2"
              raised
              rounded
            >Iniciar Sesión
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import {Credentials} from "../../api/user";

export default {
  name: 'Login',
  data () {
    const spacers = Array.from({ length: 17 }, (val, i) => `${i}`)
    // const nspacers = Array.from({ length: 16 }, (val, i) => `n${i + 1}`)
    const defaults = ['auto', ...spacers]

    return {
      directions: ['t', 'b', 'l', 'r', 's', 'e', 'x', 'y', 'a'],
      paddingDirection: 'a',
      paddingSize: '6',
      paddingSizes: defaults,
      playgroundText: 'Use the controls above to try out the different spacing helpers.',
      username: null,
      password: null,
      result: null,
      show: false,
      userAuthorized: true,
    }
  },
  computed: {
    ...mapState('security', {
      $user: state => state.user,
    }),
    ...mapGetters('security', {
      $isLoggedIn: 'isLoggedIn'
    }),
    isLoggedIn() {
      return this.$isLoggedIn
    }
  },
  methods: {
    ...mapActions('security', {
      $login: 'login',
    }),
    async login() {
      this.correctInfo = true;
      this.userAuthorized = true;
      try {
        const credentials = new Credentials(this.username, this.password)
        await this.$login({credentials, rememberMe: true })
        this.clearResult()
      } catch (e) {
        this.setResult(e)
        //Invalid username or password
        if(e.code === 4 || e.code === 8) {
          this.userAuthorized = false;
        }
      }
      if(this.isLoggedIn && this.userAuthorized){
        await this.$router.push('/home')
      }
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult() {
      this.result = null
    },
  },
}
</script>

<style scoped>
.web-display {
  display: flex;
  flex-direction: column;
}
.welcome-message {
  color: white;
  align-content: center;
  text-shadow: 2px 2px 4px #1C1C1C;
}
.error-message {
  color: var(--v-error-base);
}
</style>