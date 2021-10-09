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
            class="px-8 pt-4 pa-2 card-format text-center">
          <v-form>
            <v-text-field
              class="my-2 font-italic"
              label="Usuario">
            </v-text-field>
            <v-text-field
              class="my-2 font-italic"
              label="Email">
            </v-text-field>
            <v-text-field
                class="my-2 font-italic"
                label="Email">
            </v-text-field>
            <v-text-field
                class="my-2 font-italic"
                label="Contraseña">
            </v-text-field>
            <v-text-field
                class="my-2 font-italic"
                label="Contraseña">
            </v-text-field>
            <v-btn
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
export default {
  name: "SignUp",
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

  /*.input-bg-color {*/
  /*  background-color: white;*/
  /*}*/

</style>