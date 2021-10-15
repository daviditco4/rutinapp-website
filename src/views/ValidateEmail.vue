<template>
  <v-container fluid fill-height>
    <v-row class="fill-height" justify="center" align="center">
      <v-card style="width: 600px" align="center" color="primary" rounded>
        <h2>Por favor confirme su cuenta</h2>
        <form align = "center">
          <v-row wrap>
            <v-text-field
                rounded
                class="field-style"
                v-model="email"
                outlined
                background-color="white"
                label ="Email"
                placeholder="usuario@ejemplo.com"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                rounded
                class="field-style"
                v-model="code"
                outlined
                background-color="white"
                label ="Código"
            ></v-text-field>
          </v-row>
          <v-row >
            <v-col md="12" class="pa-4">
              <v-btn
                  @click="this.submit"
                  rounded large color="secondary">Confirmar
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" class="pa-4">
            <v-alert type="error" v-if="cannotVerify" align="center">¡Ups! Hubo un error al validar el email. Revise el email y el código.</v-alert>
            </v-col>
          </v-row>
        </form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import SignUp from "@/views/SignUp";
import {EmailVerifier, UserApi} from "../../api/user";

export default {
  name: "ValidateEmail",

  data () {
    return {
      email: SignUp.data().email,
      username: SignUp.data().username,
      password: SignUp.data().password,
      code: '',
      cannotVerify: false,
    }
  },
  computed: {
    ...mapState('security', {
      $credentials: state => state.tempUser.credentials,
    })
  },
  methods: {
    ...mapActions('security', {
      $login: 'login',
      $verifyEmail: 'emailVerified'
    }),
    async submit() {
      this.cannotVerify = false;

      try{
        const emailVerif = new EmailVerifier(this.email, this.code);
        await UserApi.verifyEmail(emailVerif);
        // await this.$login({credentials: this.$credentials, rememberMe: true})
      } catch (e) {
        this.cannotVerify = true;
        return;
      }
      await this.$verifyEmail(true)
      await this.$router.push('/');
    },

    async resend() {
      await UserApi.resendEmail(this.email);
      this.email = '';
      this.code = '';
    },

  }
}
</script>

<style scoped>
  .field-style {
    padding-top: 25px;
    padding-right: 30px;
    padding-left: 30px;
    border-radius: 5px;
  }

  .error-warning {
    color: var(--v-error-base);
  }
</style>