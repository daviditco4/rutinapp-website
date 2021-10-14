<template>
<!--  <v-dialog persistent max-width="600px" v-model="dialog">-->
    <v-card flat width="500" class="pa-md-4 mx-lg-auto mt-16 rounded-xl" color="primary">
      <v-row>
        <v-col md="12"><h3>Agregar Ejercicio</h3></v-col>
      </v-row>
      <v-row>
      <v-col md="12">
                <v-select  v-model="exerciseValue"
                  class="mx-2"
                  solo
                  flat
                  hide-details
                  light
                  outlined
                  background-color="white"
                  :items="exercises"
                  item-text="name"
                  item-value="code"
                  label="Seleccionar ejercicio"
                  
                > </v-select>
              </v-col>
      </v-row>
      <v-row><v-col md="12">

          <v-btn color="secondary" dark @click="dialog = false">Salir</v-btn>
      </v-col></v-row>
<!--
      <v-expansion-panels v-for="exercise in this.exercises" :key="exercise.id">
        <v-expansion-panel rounded color="primary" height="50px">
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">
                {{exercise.name}}
              </v-col>
              <v-btn @click.stop="addExercise">Agregar</v-btn>
            </v-row>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>
-->
    </v-card>
<!--  </v-dialog>-->
</template>

<script>

import {mapActions} from "vuex";
// import {Exercise} from "../../api/exercise";

export default {
  name: "AddExerciseInRoutine",

  data: () =>({
    dialog: false,

    exercises: [
      {name: 'ejercicio1', code: 'e1'},
        {name: 'ejercicio2', code: 'e2'},
        {name: 'ejercicio3', code: 'e3'}
    ],
  }),

  methods: {
    ...mapActions('exercise', {
      $getAllExercises: 'getAll',
    }),

    async created() {
      this.exercises = (await this.$getAllExercises());
    },

    addExercise() {

    }
  }
}
</script>

<style scoped>

</style>