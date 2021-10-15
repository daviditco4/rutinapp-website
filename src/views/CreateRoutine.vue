<template>
  <div class="create-routine">
    <v-container>
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row no-gutters>
          <v-col>
            <h2 v-if="!$editValue" class="d-flex justify-center">Nueva Rutina</h2>
            <h2 v-if="$editValue" class="d-flex justify-center">Editar  Rutina</h2>
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
        <NewCycle v-bind:cycle="cycle" :cycles="cycles" v-bind:exercises="cycle.exercises" @addCycle="addCycle($event)" v-on:addExercise="addExercise" v-on:addRest="addExercise"></NewCycle>
      </li>


    <v-row class="justify-center">
        <v-col md="6">
            <v-btn v-if="!$editValue" color="secondary" elevation="2" rounded @click="createRoutine()">Crear Rutina</v-btn>         
            <v-btn v-if="$editValue" color="secondary" elevation="2" rounded @click="modifyRoutine()">Modificar Rutina</v-btn>
      </v-col>
        <v-col md="6">
         
          <v-dialog  v-model="dialog"  width="500" >
                      <template v-slot:activator="{ on, attrs }"> 
                             <v-btn v-bind="attrs"  v-on="on" color="secondary" elevation="2" rounded>Cancelar</v-btn>
                      </template>
                      <LeaveConfirm @closeDialog="dialog = false"></LeaveConfirm>
          </v-dialog>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-alert v-model="alert" close-text="Close Alert" color="secondary" dark dismissible v-if="emptyFields">
          <p class="error-message">Llenar todos los campos</p>
        </v-alert>
    </v-row>

    </v-container>
  </div>
</template>

<script>
import NewCycle from '@/components/NewCycle.vue'
import LeaveConfirm from '@/components/leaveConfirm.vue'
import {mapActions, mapState} from 'vuex'
import {Routine} from '../../api/routine'
import router from "@/router";

export default {
  name: "CreateRoutine",
  components: {
    NewCycle,
    LeaveConfirm,
  },
  data() {
    return {
      dialog:false,
      // routine fields
      id: null,
      routine: null,
      name: '',
      difficulty: '',
      detail: '',
      isPublic: false,

      //validations
      emptyFields: false,

      //cycle data
      cycle: null,
      cycles: [{
        "id": 1,
        "type": "warmup",
        "repetitions": 1,
        "exercises": []
        },
        {
          "id": 2,
          "type": "exercise",
          "repetitions": 1,
          "exercises": []
        },
        {
          "id": 3,
          "type": "cooldown",
          "repetitions": 1,
          "exercises": []
        }
      ],
      repetitions: null,
      //exercise data
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
  computed: {
    ...mapState('routine', {
      $editValue: state => state.edit,
      $oldRoutine: state => state.routine
    }),
  },
  created() {
    if(this.$editValue){
      this.id = this.$oldRoutine.id
      this.name = this.$oldRoutine.name;
      this.detail = this.$oldRoutine.detail;
      this.isPublic = this.$oldRoutine.isPublic;
      this.cycles = this.$oldRoutine.metadata.cycles;
      this.difficulty = this.$oldRoutine.difficulty;
    }
    await router.replace("/library");
  },
  methods: {
    ...mapActions('routine', {
      $createRoutine: 'create',
      $modifyRoutine: 'edit'
    }),
    async createRoutine() {
      this.cycles.exercises = this.exercises
      this.emptyFields = false;
      if(this.checkIfEmpty()){
        this.emptyFields = true;
        return;
      }
      const routineMetadata = {
        cycles: this.cycles,
        image: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg"
      }
      const routine = new Routine(this.name, this.detail, this.isPublic, this.difficulty, routineMetadata)
      try {
        this.routine = await this.$createRoutine(routine);
        this.setResult(this.routine)
      } catch (e) {
        this.setResult(e)
      }
    },
    async modifyRoutine(){
      this.emptyFields = false;
      if(this.checkIfEmpty()) {
        this.emptyFields = true;
        return;
      }
      const routineMetadata = {
        cycles: this.cycles,
        image: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg"
      }
      const routine = new Routine(this.name, this.detail, this.isPublic, this.difficulty, routineMetadata)
      try {
        this.routine = await this.$modifyRoutine({id:this.id, routine: routine});
        this.setResult(this.routine)
      } catch (e) {
        this.setResult(e)
      }
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    addCycle(cycle){
      let cooldownCopy = this.cycles.pop()
      cooldownCopy.id+=1
      this.cycles.push(cycle)
      this.cycles.push(cooldownCopy)
    },
    setCounter(newValue, field){
      this.exercise[field] = newValue;
    },
    async addExercise(cycleId, exercise) {
      this.cycles[cycleId - 1].exercises.push(exercise);
    },
    checkIfEmpty() {
      if(this.name != "" && this.detail != "" && this.difficulty != ""){
        return false;
      }
      return true;
    },
  }
};
</script>

<style scoped></style>