<template>
   <v-card flat width="500" class="pa-md-4 mx-lg-auto mt-16 rounded-xl" color="primary">
    <v-row>
      <v-col md="12"><h3>Agregar Ejercicio</h3></v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-select  v-model="selectedExercise"
                   class="mx-2"
                   solo
                   flat
                   hide-details
                   light
                   outlined
                   background-color="white"
                   :items="items"
                   item-text="name"
                   item-value="id"
                   label="Seleccionar ejercicio"

        > </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-btn color="secondary" dark @click="addExercise()">Agregar</v-btn>
      </v-col>
      <v-col md="6">
        <v-btn  color="secondary" dark @click="closeDialog">Cancelar</v-btn>
      </v-col>
    </v-row>
          </v-card>


</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "AddExerciseInRoutine",
  props: ['show'],
  data: () =>({
    dialog: false,
    selectedExercise: {},
    page: 0,
    size: 50,
    exercises: []
  }),
  async beforeMount() {
    await this.$getAllExercises({page: 0, size: 10}).content;
  },
  computed: {
    ...mapState('exercise', {
      $currentExercises: state => state.items.content
    }),
    items() {
      return this.$currentExercises
    }
  },
  methods: {
    ...mapActions('exercise', {
      $getAllExercises: 'getAll',
    }),
    addExercise() {
      this.$emit('addExercise', this.selectedExercise)
    },
    closeDialog() {
        this.$emit('closeAddExercise');
    },
  }
}
</script>

<style scoped>

</style>