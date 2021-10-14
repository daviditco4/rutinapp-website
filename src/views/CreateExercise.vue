<template>
  <div class="create-exercise">
    <v-container>
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row>
          <v-col>
            <h2 class="d-flex justify-center">Nuevo ejercicio</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Nombre</h4>
          </v-col>
        </v-row>
        <v-text-field v-model="name"
            label="Escriba un nombre..." solo rounded flat outlined  light  hide-details background-color="white"
        ></v-text-field>
        <p class="error-message" v-if="nameRepeated">Nombre de ejercicio ya existente.</p>
        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Descripción</h4>
          </v-col>
        </v-row>
        <v-text-field v-model="detail"
            label="Detalle si es necesario el uso de equipos u otros comentarios..." solo rounded flat outlined  light  hide-details background-color="white"
        ></v-text-field>

        <v-row align="center">
          <v-col cols="12" md="7">
            <h4 class="d-flex justify-start pt-4">Series</h4>

          </v-col>
          <ModifyCounter v-model="series" style="padding-top:30px" :start-time="15" :addValue="1"></ModifyCounter>
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
          <ModifyCounter v-model="duration" :start-time="15" :addValue="5"></ModifyCounter>
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
                      rounded flat outlined light hide-details background-color="white"
        ></v-select>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start align-center pt-4">Archivos
              <v-btn class="ml-4 rounded-xl secondary">
                <v-file-input @mouseenter="hover=!hover" @mouseleave="hover=!hover" class="align-center" style="height: 100%; padding-top: 0; margin-top: 0" prepend-icon="mdi-plus" hide-input multiple></v-file-input>
                <span>Agregar</span>
              </v-btn>
            </h4>
          </v-col>
        </v-row>

        <v-row>
          <v-card class="rounded-lg" style="height: 100px; width: 100px; margin-left: 10px; margin-right: 10px">
            <v-img src="@/assets/logo.svg"></v-img>
          </v-card>
        </v-row>

        <v-row>
          <v-col>
            <h4 class="d-flex justify-start pt-4">Categoría</h4>
          </v-col>
        </v-row>
            <v-select v-model="category" :items="categories" label="Elija una categoría..." solo
                      rounded flat  outlined light hide-details background-color="white"
            ></v-select>

        <v-row style="padding-top:20px" align="center" justify="center" class="mb-4" >          
         <v-col md="6">
            <v-btn v-if="this.$editValue" color="secondary" elevation="2" rounded @click="modifyExercise()">Modificar</v-btn>
          <v-btn v-if="!this.$editValue" color="secondary" elevation="2" rounded @click="createExercise()">Crear</v-btn>     
         </v-col>
         <v-col md="6">
          <v-btn  color="secondary" elevation="2" rounded @click="cancelExercise()">Cancelar</v-btn>
         </v-col>
        </v-row>
        <v-row justify="center">
          <p class="error-message" v-if="emptyFields">Llenar todos los campos</p>
        </v-row>

      </v-card>

      <v-dialog>

      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import ModifyCounter from '@/components/modifyCounter.vue'
import {Exercise} from '../../api/exercise'
import {mapActions, mapState, mapGetters} from "vuex";

export default {
  name: "CreateExercise",
  components:{
    ModifyCounter
  },
  data() {
    return {
      // exercise fields
      name: '',
      detail: '',
      type: '',
      series: null,
      duration: null,
      difficulty: '',
      image: '',
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
      $editValue: state => state.edit
    }),
    ...mapGetters('exercise', {
      $getExerciseIndex: 'findIndex'
    })
  },
  methods: {
    ...mapActions('exercise', {
      $createExercise: 'create',
      $modifyExercise: 'edit'
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
        image: this.image,
        category: this.category
      }
      const index = this.$getExerciseIndex;
      const exercise = new Exercise(index, this.name, this.detail, 'exercise', exerciseMetadata)
      try {
        this.exercise = await this.$modifyExercise(index, exercise);
        this.setResult(this.exercise)
      } catch (e) {
        if(e == 2) {
          this.nameRepeated = true;
        }
      }
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
    }
  }
};
</script>

<style scoped>
  .error-message {
    color: var(--v-error-base);
  }
</style>
