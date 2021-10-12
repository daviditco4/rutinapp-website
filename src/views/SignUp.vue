<template>
  <v-img src="@/assets/signup.jpg">
  <v-container fluid fill-height>
    <v-spacer/>
    <v-row class="fill-height" justify="center" align="center">
      <v-col cols="5">
        <v-sheet
            color="#76EAAB"
            rounded
            elevation="10"
            class="px-12 pt-12 pa-12 card-format text-center">
          <v-form>
            <v-text-field v-model="username"
              class="my-2 font-italic"
              label="Usuario"
              flat
              outlined
              light
              hide-details
              background-color="white">
            </v-text-field>
            <v-text-field v-model="email"
              class="my-2 font-italic"
              label="Email"
              flat
              outlined
              light
              hide-details
              background-color="white">
            </v-text-field>
            <v-text-field
                class="my-2 font-italic"
                label="Repetir Email"
                flat
                outlined
                light
                hide-details
                background-color="white">
            </v-text-field>
            <v-text-field v-model="password"
                class="my-2 font-italic"
                label="Contraseña"
                flat
                outlined
                light
                hide-details
                background-color="white">
            </v-text-field>
            <v-text-field
                class="my-2 font-italic"
                label="Repetir Contraseña"
                flat
                outlined
                light
                hide-details
                background-color="white">
            </v-text-field>
            <v-btn @click="register()"
                class="text-center my-2"
                color="secondary"
                elevation="2"
                raised
                rounded
            >Registrarse
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col cols="7">
        <div>
          <h1 class="text-right signup-message">¡Sé parte de la comunidad
          que entrena donde sea, cuando quiera!</h1>
        </div>
      </v-col>
    </v-row>
  </v-container>
  </v-img>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {Credentials, User} from "../../api/user";

export default {
  name: "SignUp",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      user: null,
      result: null
    }
  },
  computed: {
    ...mapGetters('security', {
      $isLoggedIn: 'isLoggedIn'
    }),
  },
  methods: {
    ...mapActions('security', {
      $createUser: 'create',
    }),
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    async register() {
      const index = Math.floor(Math.random() * (999 - 1) + 1)
      const credentials = new Credentials(this.username, this.password)
      const user = new User(credentials, index, this.email);
      try {
        this.user = await this.$createUser(user);
        this.setResult(this.user)
      } catch (e) {
        this.setResult(e)
      }
      // await this.$router.push('/home')
      }
    }
}
</script>

<style scoped>
  .signup-background {
    background: url("../assets/signup.jpg") no-repeat transparent;
    background-size: cover;
    height: 100%;
    opacity: 1;
  }
  .card-format {
    border: 4px #333C8E;
  }

  .signup-message {
    color: white;
    align-content: center;
    text-shadow: 2px 2px 4px #1C1C1C;
  }

  .textfield {
    color: white;
    background-color: white;
  }

</style>