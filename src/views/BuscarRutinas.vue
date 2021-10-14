<template>
  <v-container>
    <v-card class="mt-5 mb-5 mr-15 ml-15 pa-2" color="#76eaab" elevation="8">
      <v-row>
          <v-col md="12"><h1>Buscar Rutinas</h1></v-col>
          
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
              outlined
              solo
              dense
              hide-details
              label="Buscar"              
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

      <div v-if="isEmpty">
        <h2 class="grey--text text-center">No hay rutinas disponibles.<br>Puedes hacerlo clickeando en
          el botón:</h2>
      </div>

        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="3">

                    <v-card color="transparent" outlined   >
                      <v-tab @click="overlay = !overlay">
                        <v-img :src="item.metadata.image_url" @click="openViewRoutine()"></v-img>                  
                      </v-tab>
                    </v-card>
            </v-col>
          </v-row>

                <v-list-item-content style="justify-content: center">{{
                  item.name
                }}</v-list-item-content>
        </template>
      </v-data-iterator>
    </v-card>

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
            <v-btn fab large elevation="2" color="secondary" to="/create-routine">
              <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
          </v-col>
        </v-row>

    <v-overlay :absolute="absolute" :value="overlay" >
           <v-btn   color="success" @click="overlay = false" >
          <ViewRoutine  v-if="viewroutine" @closeViewRoutine="viewroutins=false"
            :extern_name="routine.name" :extern_difficulty="routine.difficulty" :extern_routine_id="routine.id"
             :extern_creator="routine.creator.username" :extern_cycle_id="current_cycle">
          </ViewRoutine>
    </v-btn>

    </v-overlay>
  </v-container>
</template>

<script>
import ViewRoutine from '@/components/viewRoutine.vue'
import {mapState, mapActions} from 'vuex'

export default {
  inheritAttrs: false,
  components: {
      ViewRoutine,
  },
  data: () => ({
    viewroutine : false,
    absolute: true,
    overlay: false,

    search: "",
    showRoutines: true,
    page: 1,
    itemsPerPage: 8,
    // filterBy: "routine",    
  }),
  computed: {
//    isEmpty(){
//      
//    },
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
  },
  methods:{    
      openViewRoutine(){
        this.viewroutine = true;
      },
    ...mapActions('routines', {
      $getAllRoutines: 'getAll',
    }),
    ...mapActions('exercises', {
      $getAllExercises: 'getAll',
    }),

    retrieve() {
      if (this.showRoutines) {
        this.$getAllRoutines({page: this.page - 1, size: this.itemsPerPage})
      } else {
        this.$getAllExercises({page: this.page - 1, size: this.itemsPerPage})
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
  },
};

//    data: () => ({
      

//      search: '',
//      sortDesc: false,
//      page: 1,
//      itemsPerPage: 8,
//      sortBy: 'name',
//      items: [
//        {
//          name: 'Rutina 1',
//          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
//        },
//        {
//          name: 'Rutina 2',
//          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
//        },
//      ],
//    }),
//  }

</script>

<style scoped>

</style>