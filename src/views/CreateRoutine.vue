<template>
  <div class="create-routine">
    <v-container>
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row no-gutters>
          <v-col>
            <h2 class="d-flex justify-center">Nueva rutina</h2>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <h4 class="text-left">Nombre</h4>
          </v-col>
        </v-row>
        <v-text-field
            label="Nombre" solo rounded flat outlined  light  hide-details background-color="white"
        ></v-text-field>
        <v-row>
          <v-col>
            <h4 class="text-left">Descripción</h4>
          </v-col>
        </v-row>
        <v-text-field
            label="Descripción" solo rounded flat outlined  light  hide-details background-color="white"
        ></v-text-field>
      </v-card>

<!--    <li v-for="(cycle, index) in cycles" :key="cycle.name">-->
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row align="center">
          <v-col justify="left" cols="12" md="5">
            <h3>Ciclo 1: Calentamiento</h3>
          </v-col>
          <ModifyCounter  :start-time="10" :addValue="1" ></ModifyCounter> 
          <v-col>
            <p justify="center">Repeticiones del ciclo</p>
          </v-col> 
        </v-row>

          <!--        <ul>-->
        <v-row align="center" style="margin-bottom: -20px">
          <v-col cols="12" md="5">
            <h4 class="text-left">1. Ejercicio</h4>
          </v-col>
            <v-col md="5">
                <ModifyCounter  :start-time="10" :addValue="1" ></ModifyCounter> 
                <ModifyCounter  :start-time="10" :addValue="1" ></ModifyCounter> 
            </v-col>
            <v-col>
                <p justify="center">series</p>
                <p justify="center">segundos</p>
            </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-row style="margin-left: 10px; margin-bottom: 20px">
              <v-menu transition="scroll-x-transition" style="height: 20px;">
                <template v-slot:activator="{on, attrs}">
                  <v-btn rounded v-on="on" v-bind="attrs" style="min-width: 10px;height: 50px;">
                  <v-icon>
                    mdi-plus
                  </v-icon>
                  </v-btn>
                </template>
                <v-btn-toggle rounded style="margin-left: 60px; background-color: transparent">
                  <v-btn rounded>
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

      <div v-if="newcycle">
        <li v-for="count in 3" :key="count">
        <NewCycle>
              {{count}}
        </NewCycle>    
        </li>    
      </div>
      

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
            <v-btn elevation="1" fab style="z-index: 2; margin-top: -50px;" @click="newCycle()">
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

import NewCycle from '@/components/newCycle.vue'
import ModifyCounter from '@/components/modifyCounter.vue'

export default {
  name: "CreateRoutine",
  components: {
    NewCycle,
    ModifyCounter,
  },
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
      }],
      newcycle: false,
      count : 1,
    }
  },
  methods: {
    newCycle(){
      this.newcycle = true;
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
