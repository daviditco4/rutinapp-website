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
            v-model="name"
        ></v-text-field>
        <v-row>
          <v-col>
            <h4 class="text-left">Descripción</h4>
          </v-col>
        </v-row>
        <v-text-field
            label="Descripción" solo rounded flat outlined  light  hide-details background-color="white"
            v-model="detail"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-switch color="secondary" v-model="isPublic" inset label="Pública"></v-switch>
          </v-col>
        </v-row>
        <v-select v-model="difficulty" :items="levels" item-text="name" item-value="code" label="Seleccione..." solo
                  rounded flat outlined light hide-details background-color="white"
        ></v-select>
      </v-card>

<!--    <li v-for="(cycle, index) in cycles" :key="cycle.name">-->
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row align="center">
          <v-col justify="left" cols="12" md="5">
            <h3 class="text-left"> Ciclo: Calentamiento</h3>
          </v-col>
          <ModifyCounter v-model="cycleCount" :start-time="0" :addValue="1" ></ModifyCounter>
          <v-col>
            <p justify="center">Repeticiones del ciclo</p>
          </v-col> 
        </v-row>
          <!--        <ul>-->
        <v-row align="center" style="margin-bottom: -20px">
          <v-col cols="12" md="5">
            <h4 class="text-left">Ejercicio</h4>
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
                  <v-btn rounded @click="addExercise()">
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

      <li v-for="cycle in cycles" :key="cycle.id">
        <NewCycle v-bind:cycle="cycle"></NewCycle>
      </li>
      

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
            <v-btn elevation="1" fab style="z-index: 2; margin-top: -50px;" @click="addCycle()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row align="center">
          <v-col justify="left" cols="12" md="5">
            <h3 class="text-left"> Ciclo: Descanso</h3>
          </v-col>
          <ModifyCounter v-model="cycleCount" :start-time="0" :addValue="1" ></ModifyCounter>
          <v-col>
            <p justify="center">Repeticiones del ciclo</p>
          </v-col>
        </v-row>
        <!--        <ul>-->
        <v-row align="center" style="margin-bottom: -20px">
          <v-col cols="12" md="5">
            <h4 class="text-left">Ejercicio</h4>
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
                  <v-btn rounded @click="addExercise()">
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
import {mapActions} from "vuex";
import {Routine} from '../../api/routine'
// import {Exercise} from "../../api/exercise";

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
      difficulty: '',
      detail: '',
      isPublic: false,

      //cycle data
      cycle: null,
      repetitions: null,

      //exercise data
      exercise: {},
      exercises: [],
      count : 1,

      // preloaded data
      levels: [
        {code:'rookie', name: 'Novato'},
        {code:'beginner', name: 'Principiante'},
        {code:'intermediate', name: 'Intermedio'},
        {code:'advanced', name: 'Avanzado'},
        {code:'expert', name: 'Experto'}
  ],
      routine: null,
      cycles: [{id: 1}]
    }
  },
  methods: {
    ...mapActions('routine', {
      $createRoutine: 'create',
    }),
    async createRoutine() {
      const routineMetadata = {
        cycles: this.cycles
      }
      const index = Math.floor(Math.random() * (999 - 1) + 1)
      const routine = new Routine(index, this.name, this.detail, 'exercise', routineMetadata)
      try {
        this.routine = await this.$createRoutine(routine);
        this.setResult(this.routine)
      } catch (e) {
        this.setResult(e)
      }
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    addCycle(){
      this.cycles.push({id: 4})
    },
    addExercise(){
      this.addExercise = true;
    },
  }
};
</script>

<style scoped></style>
