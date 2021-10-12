<template>
  <v-container fill-height fluid >
    <v-row justify="center" align="center">
      <v-col cols="11" md="8">
        <v-card color="primary" class="pa-7" elevation="4">
          <h1 class="text-center text-h5 text-md-h3 font-weight-bold">¡Ups! Error 404</h1>
          <h2 class="text-center text-h6 text-md-h4 font-weight-medium my-5">No podemos encontrar la página que estás solicitando.</h2>
          <v-icon>mdi-emoticon-sad</v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Page404"
}
</script>

<style scoped>

</style>