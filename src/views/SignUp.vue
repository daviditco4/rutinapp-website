<template>
  <v-img src="@/assets/signup.jpg">
  <v-container fluid fill-height>
    <v-spacer/>
    <v-row class="fill-height" justify="center" align="center">
      <v-col cols="5">
        <v-sheet
            color="primary"
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
            <v-text-field v-model="emailRepeat"
                class="my-2 font-italic"
                label="Repetir Email"
                flat
                outlined
                light
                hide-details
                background-color="white">
            </v-text-field>
            <p class="error-message" v-if="!emailCorrect">Los emails no coinciden</p>
            <v-text-field v-model="password"
                class="my-2 font-italic"
                label="Contraseña"
                flat
                outlined
                light
                hide-details
                background-color="white"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1">
            </v-text-field>
            <v-text-field v-model="passwordRepeat"
                class="my-2 font-italic"
                label="Repetir Contraseña"
                flat
                outlined
                light
                hide-details
                background-color="white"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2">
                >
            </v-text-field>
            <p class="error-message" v-if="!passwordCorrect">Las contraseñas no coinciden</p>
            <p class="error-message" v-if="isAnyEmpty">Llenar todos los campos de texto.</p>
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
      emailRepeat: '',
      password: '',
      passwordRepeat: '',
      user: null,
      result: null,
      emailCorrect: true,
      passwordCorrect: true,
      isAnyEmpty: false,
      registerSuccess: true,
      show1: false,
      show2: false,
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
      if(!this.checkFields()){
        return;
      }
      const index = Math.floor(Math.random() * (999 - 1) + 1)
      const credentials = new Credentials(this.username, this.password)
      const user = new User(credentials, index, this.email);
      try {
        this.user = await this.$createUser(user);
        this.setResult(this.user)
      } catch (e) {
        this.setResult(e)
        this.registerSuccess = false;
      }
      // if(this.registerSuccess) {
        await this.$router.push('/validateEmail')
      // }
      // await this.$router.push('/home')
    },
    checkFields() {
      if(!this.checkIfEmpty()){
        this.isAnyEmpty = true;
      } else {
        this.isAnyEmpty = false;
      }
      if(!this.checkEmail()) {
        this.emailCorrect = false;
      } else {
        this.emailCorrect = true;
      }
      if(!this.checkPassword()){
        this.passwordCorrect = false;
      } else {
        this.passwordCorrect = true;
      }
      return this.passwordCorrect && !this.isAnyEmpty;
    },
    checkPassword() {
      return  this.password === this.passwordRepeat;
    },
    checkEmail() {
      return this.email === this.emailRepeat;
    },
    checkIfEmpty() {
      if(this.username != "" && this.password != "" && this.email != "" &&
      this.passwordRepeat != "" && this.emailRepeat != "") {
        return true;
      }
      return false;
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
    border: 4px var(--v-secondary-base);
  }

  .signup-message {
    color: white;
    align-content: center;
    text-shadow: 2px 2px 4px #1C1C1C;
  }

  .error-message {
    color: var(--v-error-base);
  }

</style>