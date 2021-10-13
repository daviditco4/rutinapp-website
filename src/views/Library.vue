<template>
  <v-container class="library">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col md="1"><!-- Aca va el boton para volver hacia atras --></v-col>
          <v-col md="10"><h1><b>My Library</b></h1></v-col>
          <v-col md="1">
            <v-btn
              v-if="!edit"
              fab
              color="secondary"
              elevation="2"
              @click="startEditing()"
            ><v-icon>mdi-pencil</v-icon></v-btn>
          </v-col>
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
            <v-toolbar flat elevation="1" style="margin: 30px 0px">
              <span style="width: 600px">
                <v-text-field
                  v-model="search"
                  outlined
                  dense
                  solo
                  hide-details
                  label="Buscar"
                ></v-text-field>
              </span>
              <v-btn
                fab
                elevation="2"
                color="secondary"
                style="margin: 0 0 0 -15px"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <!-- <v-select
                  v-model="filterBy"
                  class="mx-2"
                  flat
                  solo-inverted
                  hide-details
                  :items="keys"
                  prepend-inner-icon="mdi-magnify"
                  label="Sort by"
                ></v-select> -->
                <v-btn-toggle
                  mandatory
                  rounded
                  style="margin: 0 0 0 15px"
                >
                  <v-btn @click="selectRoutineFilter()" large depressed color="secondary">
                    Routines
                  </v-btn>
                  <v-btn @click="selectExerciseFilter()" large depressed color="secondary">
                    Exercises
                  </v-btn>
                </v-btn-toggle>
                <v-btn elevation="2" fab style="margin: 0 0 0 15px">
                  <v-icon>mdi-sort</v-icon>
                </v-btn>
              </template>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="3"
              >
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-card
                      color="transparent"
                      outlined
                      style="border: 2px solid #333c8e"
                    >
                      <v-img :src="item.metadata.image_url"></v-img>
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="#202020">
                          <v-btn v-if="!edit">
                            <v-icon>mdi-logout-variant</v-icon>
                          </v-btn>
                          <span v-else>
                            <v-btn>
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn @click="deleteItem(item.id)" style="margin: 0 0 0 10px">
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </span>
                        </v-overlay>
                      </v-fade-transition>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
    edit: false
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
  methods: {
    ...mapActions('routines', {
      $getAllRoutinesCreatedByCurrentUser: 'getAllCreatedByCurrentUser',
      $deleteRoutine: 'delete',
    }),
    ...mapActions('exercises', {
      $deleteExercise: 'delete',
    }),
    startEditing() {
      this.edit = true
    },
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
    deleteItem(id) {
      if (this.showRoutines) {
        this.$deleteRoutine(id)
      } else {
        this.$deleteExercise(id)
      }
    }
  },
};
</script>

<style scoped>

</style>
