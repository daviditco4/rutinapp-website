<template>
  <v-container fluid fill-height>
    <v-row class="fill-height" justify="center" align="center">
      <v-card style="width: 600px" align="center" color="primary">
        <h2>Por favor confirme su cuenta</h2>
        <form align = "center">
          <v-row wrap>
            <v-text-field
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
                class="field-style"
                v-model="code"
                outlined
                background-color="white"
                label ="Código"
            ></v-text-field>
          </v-row>
          <h4 class="error-warning" style=" align-self: center" v-if="codeIncorrect">Permiso denegado</h4>
          <v-row >
            <v-flex xs12 sm6 class="pa-1">
              <v-btn
                  @click="this.submit"
                  rounded large color="secondary">Confirmar
              </v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="pa-1">
              <v-btn
                  rounded large color="secondary"
                  @click="this.resend">Reenviar código</v-btn>
            </v-flex>
          </v-row>
        </form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import SignUp from "@/views/SignUp";
import {EmailVerifier, UserApi} from "../../api/user";

export default {
  name: "ValidateEmail",

  data () {
    return {
      email: SignUp.data().email,
      code: '',
      cannotVerify: false,
    }
  },

  methods: {
    async submit() {
      this.cannotVerify = false;

      try{
        const emailVerif = new EmailVerifier(this.email, this.code);
        await UserApi.verifyEmail(emailVerif);
      } catch (e) {
        this.cannotVerify = true;
      }
      await this.$router.push('/home');
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