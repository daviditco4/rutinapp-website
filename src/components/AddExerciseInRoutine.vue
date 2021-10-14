<template>
<!--  <v-dialog persistent max-width="600px" v-model="dialog">-->
    <v-card flat style="padding-top:30px" width="500" class="pa-md-4 mx-lg-auto mt-16 rounded-xl">
      <v-row>
        <h3>Agregar ejercicio</h3>
        <v-btn color="secondary" dark @click="dialog = false">Salir</v-btn>
      </v-row>
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

    exercises: [],
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