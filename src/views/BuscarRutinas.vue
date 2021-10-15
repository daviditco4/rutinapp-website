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
          no-data-text="No hay rutinas disponibles. ¡Creá una rutina!"
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

<!--      <div v-if="isEmpty">-->
<!--        <h2 class="grey&#45;&#45;text text-center">No hay rutinas disponibles.<br>Puedes hacerlo clickeando en-->
<!--          el botón:</h2>-->
<!--      </div>-->

        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="3">
              <v-card color="transparent" outlined  >

                <v-dialog  v-model="dialog"  width="500" >
                  <template v-slot:activator="{ on, attrs }">

                    <v-tab @click="overlay = !overlay"  v-bind="attrs" v-on="on">
                      <v-img :src="item.metadata.image"></v-img>
                    </v-tab>
                  </template>

                  <ViewRoutine v-bind:routine="item" @closeViewRoutine="dialog = false">
                  </ViewRoutine>

                </v-dialog>
<!--
                <v-tab @click="overlay = !overlay">
                  <v-img :src="item.metadata.image" @click="openViewRoutine()"></v-img>
                </v-tab>
-->
              </v-card>

              <v-list-item-content style="justify-content: center">{{
                  item.name
                }}</v-list-item-content>
              
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
<!--      
         <v-overlay :absolute="absolute" :value="overlay">

                <ViewRoutine v-if="viewroutine" v-bind:routine="item"  @closeViewRoutine="viewroutine=false">
                  <v-btn   color="success" @click="overlay = false" ></v-btn>
                </ViewRoutine>
        </v-overlay>
-->
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
    dialog: false,

    search: "",
    showRoutines: true,
    page: 1,
    itemsPerPage: 8,
    // filterBy: "routine",
    routine: {},
  }),
  computed: {
    ...mapState('routine', {
      $routinesPage: state => state.items.page + 1,
      $currentRoutines: state => state.items.content,
      $isLastRoutinesPage: state => state.items.isLastPage,
      $routinesCount: state => state.items.length,
    }),
    // ...mapState('exercise', {
    //   $exercisesPage: state => state.items.page + 1,
    //   $currentExercises: state => state.items.content,
    //   $isLastExercisesPage: state => state.items.isLastPage,
    // }),
    isEmpty(){
      return this.$routinesCount === 0;
    },
    items() {
      
      // if (this.showRoutines) {
        return this.$currentRoutines
      // } else {
      //   return this.$currentExercises
      // }
    },
    isTheLastPage() {
      // if (this.showRoutines) {
        return this.$isLastRoutinesPage
      // } else {
      //   return this.$isLastExercisesPage
      // }
    }
  },
  created() {
    this.retrieve()
  },
  methods:{    
      openViewRoutine(){
        this.viewroutine = true;
      },
    ...mapActions('routine', {
      $getAllRoutines: 'getAll',
    }),
    ...mapActions('exercise', {
      $getAllExercises: 'getAll',
    }),

    retrieve() {
      // if (this.showRoutines) {
        this.$getAllRoutines({page: this.page - 1, size: this.itemsPerPage})
      // } else {
      //   this.$getAllExercises({page: this.page - 1, size: this.itemsPerPage})
      // }
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