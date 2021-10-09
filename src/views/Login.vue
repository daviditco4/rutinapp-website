<template>
  <v-container fluid>
<!--    <v-img src="@/assets/login.png">-->
    <v-spacer/>
    <v-row justify="center">
<!--      <v-col cols="12">-->
          <h1 class="text-center welcome-message">¡Qué alegría volverte a ver!<br>
            Por favor, iniciá sesión para continuar</h1>
<!--      </v-col>-->
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-sheet
            color="#76EAAB"
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
                label="Email">
            </v-text-field>
            <v-text-field
                flat
                outlined
                light
                hide-details
                background-color="white"
                class="my-2 font-italic"
                label="Contraseña">
            </v-text-field>
            <v-btn
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
<!--    </v-img>-->
  </v-container>

</template>

<script>
export default {
  name: 'Login',
  data () {
    const spacers = Array.from({ length: 17 }, (val, i) => `${i}`)
    // const nspacers = Array.from({ length: 16 }, (val, i) => `n${i + 1}`)
    const defaults = ['auto', ...spacers]

    return {
      directions: ['t', 'b', 'l', 'r', 's', 'e', 'x', 'y', 'a'],
      // marginDirection: 'a',
      // marginSize: '2',
      // marginSizes: [...defaults, ...nspacers],
      paddingDirection: 'a',
      paddingSize: '6',
      paddingSizes: defaults,
      playgroundText: 'Use the controls above to try out the different spacing helpers.',
    }
  },

  computed: {
    computedPadding () {
      return `p${this.paddingDirection}-${this.paddingSize}`
    },

  },
}
</script>

<style scoped>
.web-display {
  display: flex;
  flex-direction: column;
}
.loginBackground {
  background: url("../assets/login.png") ;
  background-size: cover;
  /*height: 100%;*/
  opacity: 1;
}
.welcome-message {
  color: white;
  align-content: center;
  text-shadow: 2px 2px 4px #1C1C1C;
}
.user-login-info {
  border: 2px #333C8E;
  background-color: #76EAAB;
  color: #333C8E;
}
.user-text {
  font-size: smaller;

}
</style>