<template>
  <div class="create-routine">
    <v-container>
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row no-gutters>
          <v-col>
            <h2 class="d-flex justify-center">Nueva Rutina</h2>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Nombre</h4>
          </v-col>
        </v-row>
        <v-text-field
            label="Ingrese un nombre para la rutina..." solo rounded flat outlined  light  hide-details background-color="white"
            v-model="name"
        ></v-text-field>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Descripción</h4>
          </v-col>
        </v-row>
        <v-text-field
            label="Ingrese una breve descripción sobre la rutina..." solo rounded flat outlined  light  hide-details background-color="white"
            v-model="detail"
        ></v-text-field>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Rutina Pública</h4>
          </v-col>
          <v-col md="2">
            <v-switch color="secondary" v-model="isPublic" inset></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start">Dificultad</h4>
          </v-col>
        </v-row>
        <v-select v-model="difficulty" :items="levels" item-text="name" item-value="code" label="Seleccione..." solo
                  rounded flat outlined light hide-details background-color="white"
        ></v-select>
      </v-card>

      <li v-for="cycle in cycles" :key="cycle.id">
        <NewCycle v-bind:cycle="cycle" :cycles="cycles"></NewCycle>
      </li>

    </v-container>

    <v-row class="justify-center">
        <v-col md="6">
            <v-btn  color="secondary" elevation="2" rounded @click="createRoutine()">Crear Rutina</v-btn>         
        </v-col>
        <v-col md="6">
          <v-btn  color="secondary" elevation="2" rounded @click="cancelRoutine()">Cancelar</v-btn>
        </v-col>
    </v-row>

  </div>
</template>

<script>
import NewCycle from '@/components/NewCycle.vue'
import {mapActions} from 'vuex'
import {Routine} from '../../api/routine'
export default {
  name: "CreateRoutine",
  components: {
    NewCycle,
  },
  data() {
    return {
      // routine fields
      routine: null,
      name: '',
      difficulty: '',
      detail: '',
      isPublic: false,
      //cycle data
      cycle: null,
      cycles: [{
        "id": 1,
        "type": "warmup",
        "repetitions": 1,
        "metadata": null
        },
        {
          "id": 2,
          "type": "exercise",
          "repetitions": 1,
          "metadata": null
        },
        {
          "id": 3,
          "type": "cooldown",
          "repetitions": 1,
          "metadata": null
        }
      ],
      repetitions: null,
      //exercise data
      exercise: {},
      exercises: [],
      newExercise: false,
      // preloaded data
      levels: [
        {code:'rookie', name: 'Novato'},
        {code:'beginner', name: 'Principiante'},
        {code:'intermediate', name: 'Intermedio'},
        {code:'advanced', name: 'Avanzado'},
        {code:'expert', name: 'Experto'}
      ],
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
      const routine = new Routine(this.name, this.detail, 'exercise', routineMetadata)
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
    addCycle(cycle){
      this.cycles.push(cycle)
    },
    setCounter(newValue, field){
      this.exercise[field] = newValue;
    },
  }
};
</script>

<style scoped></style>