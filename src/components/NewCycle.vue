<template>
  <v-container>
  <template>
    <v-card class="pa-md-4 mx-lg-auto mt-16" width="800px" color="primary">
      <v-row align="center">
        <v-col justify="left" cols="12" md="5">
          <h3 class="text-left">Ciclo {{cycle.id}}: {{ translate(cycle.type) }}</h3>
        </v-col>
        <ModifyCounter :start-time="setStart(cycle)" :addValue="1" :field="'repetitions'" @setCounter="setRepetitions"></ModifyCounter>
        <v-col>
          <p justify="center">Repeticiones del ciclo</p>
        </v-col>
      </v-row>

          <span v-for="exercise in exercises" :key="exercise.id">
            <Exercise v-bind:exercise="exercise"></Exercise>
          </span>

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
                    <v-dialog  v-model="dialog"  width="500" >
                      <template v-slot:activator="{ on, attrs }"> 
                          <v-btn rounded v-bind="attrs"  v-on="on">
                            Ejercicio
                          </v-btn>
                      </template>
                      <AddExerciseInRoutine @addExercise="addExercise($event)"
                                            @closeAddExercise="dialog = false"
                      ></AddExerciseInRoutine>
                    </v-dialog>
                    <v-btn @click="addRest()">
                      Descanso
                    </v-btn>
                  </v-btn-toggle>
                </v-menu>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-row v-if="cycle.id == cycles.length-1" style="position: relative" justify="center">
          <v-col cols="12" md="3">
            <v-expand-transition>
              <v-card class="">
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
      </template>
      
    </v-container>

</template>

<script scoped>
import ModifyCounter from '@/components/modifyCounter'
import Exercise from "@/components/Exercise";
import {Cycle} from "../../api/routine";
import AddExerciseInRoutine from "@/components/AddExerciseInRoutine";
import {ExerciseApi} from "../../api/exercise";
export default {
  name: "NewCycle",
  components: {
    AddExerciseInRoutine,
    Exercise,
    ModifyCounter,
  },
  props: ['cycles', 'cycle', 'exercises'],
  data() {
    return {
      dialog: false,
      hover: false,
      newExercise: false,
      repetitions: 0,
      restExercise: {name: 'Descanso', type: 'rest', duration: 0}
    }
  },
  methods: {
    addCycle(){
      const index = this.cycles.length
      const newCycle = new Cycle(index, 'exercise', this.repetitions, this.exercises);
      this.$emit('addCycle', newCycle)
    },
    translate(type){
      if (type === "warmup")
        return "Calentamiento";
      if (type === "exercise")
        return "Entrenamiento";
      if (type === "cooldown")
        return "Estiramiento";
    },
    async addExercise(exerciseId) {
      const response = await ExerciseApi.get(exerciseId);
      this.$emit('addExercise', this.cycle.id, response)
    },
    addRest(){
      this.$emit('addExercise', this.cycle.id, this.restExercise)
    },
    setRepetitions(newValue){
      this.cycle.repetitions = newValue;
    },
    setStart(cycle){
      return cycle.repetitions || 0
    }
  }
};
</script>
