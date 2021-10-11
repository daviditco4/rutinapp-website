<template>
  <div class="create-routine">
    <v-container>
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px">
        <v-row>
          <v-col>
            <span class="d-flex justify-center">Nueva rutina</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="justify-center">Nombre</span>
          </v-col>
        </v-row>
        <v-text-field value="10"></v-text-field>
        <v-row>
          <v-col>
            <span class="justify-center">Descripción</span>
          </v-col>
        </v-row>
        <v-text-field value="10"></v-text-field>
      </v-card>

<!--    <li v-for="(cycle, index) in cycles" :key="cycle.name">-->
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px">
        <v-row align="center">
          <v-col cols="12" md="3">
            <p class="mb-n1">Ciclo 1</p>
            <p>Calentamiento</p>
          </v-col>
          <v-col md="2" class="ml-auto">
            <v-text-field value="10">
              <v-icon slot="prepend">mdi-minus</v-icon>
              <v-icon slot="append">mdi-plus</v-icon>
            </v-text-field>
          </v-col>
          <v-col md="2">
            <p>Repeticiones del ciclo</p>
          </v-col>
        </v-row>

          <!--        <ul>-->
        <v-row align="center" style="margin-bottom: -20px">
          <v-col cols="12" md="8">
            <span>1. Ejercicio</span>
          </v-col>
            <v-col md="2">
                <v-text-field value="10">
                  <v-icon slot="prepend">mdi-minus</v-icon>
                  <v-icon slot="append">mdi-plus</v-icon>
                </v-text-field>
            </v-col>
            <v-col md="2">
              <v-text-field value="10">
                <v-icon slot="prepend">mdi-minus</v-icon>
                <v-icon slot="append">mdi-plus</v-icon>
              </v-text-field>
            </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-row style="margin-left: 10px; margin-bottom: 20px">
              <v-menu transition="scroll-x-transition" style="height: 20px;">
                <template v-slot:activator="{on, attrs}">
                  <v-btn v-on="on" v-bind="attrs" style="min-width: 10px;height: 50px;">
                  <v-icon>
                    mdi-plus
                  </v-icon>
                  </v-btn>
                </template>
                <v-btn-toggle style="margin-left: 60px; background-color: transparent">
                  <v-btn>
                    Ejercicio
                  </v-btn>
                    <v-btn>
                      Descanso
                    </v-btn>
                </v-btn-toggle>
              </v-menu>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-row style="position: relative" justify="center">
        <v-col cols="12" md="3">
          <v-expand-transition>
            <v-card class="rounded-xl">
              <v-row v-if="hover">
                <v-col class="justify-start">
                  <span style="margin-left: 20px">NUEVO</span>
                </v-col>
                <v-col class="justify-end">
                  <span style="margin-left: 50px">CICLO</span>
                </v-col>
              </v-row>
            </v-card>
          </v-expand-transition>
          <div class="text-center" @mouseenter="hover=!hover" @mouseleave="hover=!hover">
            <v-btn elevation="1" fab style="z-index: 2; margin-top: -50px;">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

<!--          <li v-for="(exercise, index) in exercises" :key="exercise.name">
            <span>{{ index }}. {{ exercise.name }}</span>
            <v-flex></v-flex>
            <v-flex xs6 sm4 md2>
              <v-layout row>
                <v-icon>mdi-minus</v-icon>
                <v-text-field :value="exercise.duration"></v-text-field>
                <v-icon>mdi-plus</v-icon>
              </v-layout>
            </v-flex>
          </li>-->
<!--        </ul>-->
<!--    </li>-->
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CreateRoutine",
  data() {
    return {
      hover: false,
      // routine fields
      name: '',
      description: '',
      kind: '',
      repetitions: null,
      exercises: [],
      // data to save
      cycles: [{
        warmup: {},
        training: [],
        cooldown: {}
      }]
    }
  },
  methods: {
    newCycle(){

    },
    newExercise(){

    },
    createRoutine(){
      const routine = {
        name: this.name,
        description: this.description,
        kind: this.kind,
        repetitions: this.repetitions,
        exercises: this.exercises,
        cycles: this.cycles
      }
      console.log(routine);
    }
  }
};
</script>

<style scoped></style>
