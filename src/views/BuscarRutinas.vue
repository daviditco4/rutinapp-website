<template>
  <v-container>
    <v-card class="mt-5 mb-5 mr-15 ml-15 pa-2" color="#76eaab" elevation="8">
      <v-row>
          <v-col md="1"><!-- Aca va el boton para volver hacia atras --></v-col>
          <v-col md="10"><h1><b>Buscar Rutinas</b></h1></v-col>
          
        </v-row>


      <v-data-iterator
          :items="items"
          :items-per-page="itemsPerPage"
          :page="page"
          :search="search"
          v-bind="$attrs"
          hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            light
            flat
            color="transparent"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              outlined
              dense
              solo-inverted
              hide-details
              label="Buscar"
              dark
            ></v-text-field>
            <v-btn
              elevation="2"
              fab
              style="margin: 0 0 0 -15px"
              color="secondary"
              dark
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            
          </v-toolbar>
        </template>
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="3">
              <v-row>
              <v-col v-for="item in props.items" :key="item.name"  cols="12"  sm="3" >
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-card color="transparent" outlined   >
                      <v-tab @click="overlay = !overlay">
                        <v-img :src="item.metadata.image_url" @click="openViewRoutine()"></v-img>                  
                      </v-tab>
                          
                        <v-row rows="auto">
                          <v-list-item-content>{{ item.name }}</v-list-item-content>
                        </v-row>
                      </v-col>
                              
                    </v-card>
                   </template>
                </v-hover>  
                <v-list-item-content style="justify-content: center">{{
                  item.name
                }}</v-list-item-content>
                </v-col>
            </v-row>
        </template>
      </v-data-iterator>

      <v-row style="margin: 15px">
          <v-col md="1"></v-col>
          <v-col md="10">
            <v-row style="justify-content: center">
              <v-btn :disabled="page===1" @click="goToPreviousPage()">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn :disabled="isTheLastPage" style="margin: 0 0 0 20px" @click="goToNextPage()">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col md="1">
            <v-btn fab large elevation="2" color="secondary">
              <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
          </v-col>
        </v-row>

    </v-card>
    <v-overlay :absolute="absolute" :value="overlay" >
           <v-btn   color="success" @click="overlay = false" >
          <ViewRoutine  v-if="viewroutine" @closeViewRoutine="viewroutins=false">
          
          </ViewRoutine>
           </v-btn>

    </v-overlay>
  </v-container>
</template>

<script>
import ViewRoutine from '@/components/viewRoutine.vue'
import {mapState, mapActions} from 'vuex'
// import { GET_EXERCISES, GET_ROUTINES } from '../store/actions'
export default {
  inheritAttrs: false,
  data: () => ({
    search: "",
    showRoutines: true,
    page: 1,
    itemsPerPage: 8,
    // filterBy: "routine",
    // edit: false
  }),
  computed: {
    ...mapState('routines', {
      $routinesPage: state => state.items.page + 1,
      $currentRoutines: state => state.items.content,
      $isLastRoutinesPage: state => state.items.isLastPage,
    }),
    ...mapState('exercises', {
      $exercisesPage: state => state.items.page + 1,
      $currentExercises: state => state.items.content,
      $isLastExercisesPage: state => state.items.isLastPage,
    }),
    items() {
      if (this.showRoutines) {
        return this.$currentRoutines
      } else {
        return this.$currentExercises
      }
    },
    isTheLastPage() {
      if (this.showRoutines) {
        return this.$isLastRoutinesPage
      } else {
        return this.$isLastExercisesPage
      }
    }
  },
  created() {
    this.retrieve()
    console.log("hola")
  },
  methods:{
      openViewRoutine(){
        this.viewroutine = true;
      },
    ...mapActions('routines', {
      $getAllRoutinesCreatedByCurrentUser: 'getAllCreatedByCurrentUser',
      $deleteRoutine: 'delete',
    }),
    ...mapActions('exercises', {
      $getAllExercisesCreatedByCurrentUser: 'getAllCreatedByCurrentUser',
      $deleteExercise: 'delete',
    }),
    // startEditing() {
    //   this.edit = true
    // },
    retrieve() {
      if (this.showRoutines) {
        this.$getAllRoutinesCreatedByCurrentUser({page: this.page - 1, size: this.itemsPerPage})
      } else {
        this.$getAllExercisesCreatedByCurrentUser({page: this.page - 1, size: this.itemsPerPage})
      }
    },
    goToNextPage() {
      this.page++
      this.retrieve()
    },
    goToPreviousPage() {
      this.page--
      this.retrieve()
    },
    selectRoutineFilter() {
      if (!this.showRoutines) {
        this.showRoutines = true
        this.page = 1
        if (this.$routinesPage)
          this.page = this.$routinesPage
        this.retrieve()
      }
    },
    selectExerciseFilter() {
      if (this.showRoutines) {
        this.showRoutines = false
        this.page = 1
        if (this.$exercisesPage)
          this.page = this.$exercisesPage
        
        this.retrieve()
      }
    },
    async deleteItem(id) {
      if (this.showRoutines) {
        await this.$deleteRoutine(id)
      } else {
        await this.$deleteExercise(id)
      }
      this.retrieve()
    }
  },
};
</script>

<style scoped>
</style>

  export default {
    inheritAttrs: false,
    
    
    data: () => ({
      viewroutine : false,
      absolute: true,
      overlay: false,

      search: '',
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'name',
      items: [
        {
          name: 'Rutina 1',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 2',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 3',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 4',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 5',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 6',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 7',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 8',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
      ],
    }),
  }
</script>
