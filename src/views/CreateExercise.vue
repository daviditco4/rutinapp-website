<template>
  <div class="create-exercise">
    <v-container>
      <v-card class="pa-md-4 mx-lg-auto mt-16 " width="800px" color="primary">
        <v-row>
          <v-col>
            <h2 v-if="!$editValue" class="d-flex justify-center">Nuevo ejercicio</h2>
            <h2 v-if="$editValue" class="d-flex justify-center">Editar ejercicio</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Nombre</h4>
          </v-col>
        </v-row>
        <v-text-field v-model="name"
            label="Escriba un nombre..." solo flat outlined  light  hide-details background-color="white"
        ></v-text-field>
        <p class="error-message" v-if="nameRepeated">Nombre de ejercicio ya existente.</p>
        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Descripción</h4>
          </v-col>
        </v-row>
        <v-text-field v-model="detail"
            label="Detalle si es necesario el uso de equipos u otros comentarios..." solo flat outlined  light  hide-details background-color="white"
        ></v-text-field>

        <v-row align="center">
          <v-col cols="12" md="7">
            <h4 class="d-flex justify-start pt-4">Series</h4>

          </v-col>
          <ModifyCounter v-model="series" style="padding-top:30px" :start-time="15" :addValue="1" :field="'series'" @setCounter="setSeries"></ModifyCounter>
          <!-- <v-btn class="black--text" style="font-size:27px" icon @click="subTimes(series)">-</v-btn>
          <v-col cols="2">            
              <v-text-field rounded background-color="white" value="10"> {{ series }}</v-text-field>
          </v-col>
          <v-btn class=" black--text" style="font-size:25px" icon @click="addTimes(series)">+</v-btn> -->
          <v-col>
            <p style="padding-top:35px">series</p>
          </v-col>

        </v-row>

        <v-row align="center">
          <v-col cols="12" md="7">
            <h4 class="d-flex justify-start">Duración</h4>
          </v-col>
          <ModifyCounter v-model="duration" :start-time="15" :addValue="5" :field="'duration'" @setCounter="setDuration"></ModifyCounter>
          <v-col>
            <p >segundos</p>
          </v-col>      
        </v-row>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start">Dificultad</h4>
          </v-col>
        </v-row>
        <v-select v-model="difficulty" :items="levels" label="Seleccione..." solo
                       flat outlined light hide-details background-color="white"
        ></v-select>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Categoría</h4>
          </v-col>
        </v-row>
            <v-select v-model="category" :items="categories" label="Elija una categoría..." solo
                       flat  outlined light hide-details background-color="white"
            ></v-select>

        <v-row style="padding-top:20px" align="center" justify="center" class="mb-4" >          
         <v-col md="6">
            <v-btn v-if="this.$editValue" color="secondary" elevation="2" rounded @click="modifyExercise()">Modificar</v-btn>
          <v-btn v-if="!this.$editValue" color="secondary" elevation="2" rounded @click="createExercise()">Crear</v-btn>     
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
          <v-alert v-model="alert" close-text="Close Alert" type="error" v-if="emptyFields" dismissible
          >Es necesario completar todos los campos</v-alert>
<!--          <v-alert v-model="alert" color="secondary" dark dismissible v-if="emptyFields">
          <p >Llenar todos los campos</p>
        </v-alert>-->
        </v-row>

      </v-card>
    </v-container>
  </div>
</template>

<script>
import ModifyCounter from '@/components/modifyCounter.vue'
import {Exercise} from '../../api/exercise'
import {mapActions, mapState, mapGetters} from "vuex";
import router from "@/router";

export default {
  name: "CreateExercise",
  components:{
    ModifyCounter
  },
  data() {
    return {
      dialog: false,
      // exercise fields
      id: null,
      name: '',
      detail: '',
      type: '',
      series: null,
      duration: null,
      difficulty: '',
      category: '',

      // preloaded data
      categories: ['Aeróbico', 'Resistencia', 'Fuerza'],
      levels: ['Baja', 'Media', 'Alta'],
      types: ['exercise', 'rest'],

      // payload data
      exercise: null,

      //validations
      missingDifficulty: false,
      emptyFields: false,
      nameRepeated: false,
    }
  },
  computed: {
    ...mapState('exercise', {
      $editValue: state => state.edit,
      $oldExercise: state => state.exercise,
      $ExIdToEdit: state => state.exerciseIdToEdit
    }),
    ...mapGetters('exercise', {
      $getExerciseIndex: 'findIndex',
      $getExerciseId: 'getExerciseId'
    })
  },
  created() {
      if(this.$editValue){
        this.id = this.$oldExercise.id;
        this.name = this.$oldExercise.name;
        this.detail = this.$oldExercise.detail;
        this.type = this.$oldExercise.type;
        this.series = this.$oldExercise.metadata.series;
        this.difficulty = this.$oldExercise.metadata.difficulty;
        this.category = this.$oldExercise.metadata.category;
        this.duration = this.$oldExercise.metadata.duration;
        this.image = this.$oldExercise.metadata.image;
      }
      
  },
  methods: {
    ...mapActions('exercise', {
      $createExercise: 'create',
      $modifyExercise: 'edit',
      $findId: 'findExerciseId'
    }),
    async createExercise() {
      this.nameRepeated = false;
      this.emptyFields = false;
      if(this.checkIfEmpty()){
        this.emptyFields = true;
        return;
      }
      const exerciseMetadata = {
        series: this.series,
        duration: this.duration,
        difficulty: this.difficulty,
        image: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        category: this.category
      }

      const exercise = new Exercise( this.name, this.detail, 'exercise', exerciseMetadata)
      try {
        this.exercise = await this.$createExercise(exercise);
        this.setResult(this.exercise)
      } catch (e) {
        this.setResult(e)
        if(e.code == 2) {
          this.nameRepeated = true;
        }
      }
      await router.replace("/library");
    },
    async modifyExercise() {
      this.nameRepeated = false;
      this.emptyFields = false;
      if(this.checkIfEmpty()) {
        this.emptyFields = true;
        return;
      }
      const exerciseMetadata = {
        series: this.series,
        duration: this.duration,
        difficulty: this.difficulty,
        image: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        category: this.category
      }
      // await this.$findId(this.name);
      // const index = this.id
      console.log(this.id)
      // if(index == -1) {
      //   return;
      // }
      // console.log(index)
      const exercise = new Exercise(this.name, this.detail, 'exercise', exerciseMetadata)
      // const exercise = {
      //   name: this.name,
      //   detail: this. detail,
      //   type: 'exercise',
      //   metadata: exerciseMetadata
      // }
      const idEx = this.id
      console.log(idEx)
      console.log(exercise)
      try {
        this.exercise = await this.$modifyExercise({id: idEx, exercise: exercise});
        this.setResult(this.exercise)
      } catch (e) {
        if(e == 2) {
          this.nameRepeated = true;
        }
      }
      await router.replace("/library");
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult() {
      this.result = null
    },
    newCategory(category){
      this.categories.push(category);
    },
    addFile(file){
      this.image = file
    },
    checkIfEmpty() {
      if(this.name != "" && this.detail != "" && this.difficulty != ""
      && this.series != "" && this.duration != "" && this.category != ""){
        return false;
      }
      return true;
    },
    setSeries(newValue){
      this.series = newValue;
    },
    setDuration(newValue){
      this.duration = newValue;
    },
  }
};
</script>

<style scoped>
  .error-message {
    color: var(--v-error-base);
  }
</style>
