<template>
  <v-container class="library">
    <v-card class="mt-5 mb-5 mr-15 ml-15 pa-2" color="#76eaab" elevation="8">
    <v-row>
        <v-row>
          <!-- <v-col md="1">Aca va el boton para volver hacia atras</v-col> -->
          <v-col md="12"><h1>
            <v-dialog v-if="showRoutines" v-model="dialog"  width="500" >
                  <template v-slot:activator="{ on, attrs }">
                  <v-btn style="justify-content: center" v-bind="attrs" v-on="on" text>
                    Mi Biblioteca
                    </v-btn>
                   </template>
                  <ViewRoutine v-bind:routine="item" @closeCreaciones="dialog = false">
                  </ViewRoutine>

                </v-dialog>
           
       </h1></v-col>
        </v-row>
          <!-- <v-col md="1">
            <v-btn
              v-if="!edit"
              fab
              color="secondary"
              elevation="2"
              @click="startEditing()"
            ><v-icon>mdi-pencil</v-icon></v-btn>
          </v-col> -->
          </v-row>
          <v-data-iterator
            :items="items"
            :items-per-page="itemsPerPage"
            :page="page"
            :search="search"
            v-bind="$attrs"
            hide-default-footer
            no-data-text="Tu biblioteca esta vacia. ¡Creá tu primer rutina o ejercicio!"
          >
            <template v-slot:header>
              <v-toolbar flat light  color="transparent">
                  <v-text-field
                    v-model="search"
                    outlined
                    dense
                    solo
                    hide-details
                    label="Buscar"
                  ></v-text-field>
                <v-btn
                  fab
                  elevation="2"
                  color="secondary"
                  style="margin: 0 0 0 -15px"
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn-toggle mandatory rounded style="margin: 0 0 0 15px">
                  <v-btn
                    @click="selectRoutineFilter()"
                    large
                    depressed
                    color="secondary"
                  >
                    Rutinas
                  </v-btn>
                  <v-btn
                    @click="selectExerciseFilter()"
                    large
                    depressed
                    color="secondary"
                  >
                    Ejercicios
                  </v-btn>
                </v-btn-toggle>
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
                        <v-img :src="item.metadata.image"></v-img>
                        <v-fade-transition>
                          <v-overlay v-if="hover" absolute color="#202020">
                            <!-- <v-btn v-if="!edit">
                            <v-icon>mdi-logout-variant</v-icon>
                          </v-btn>
                          <span v-else> -->
                            <span>
                              <v-btn @click="editItem(item)">
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn
                                @click="deleteConfirm(item.id)"
                                style="margin: 0 0 0 10px"
                              >
                              <!--@click="deleteItem(item.id)"-->
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </span>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>

                <v-list-item-content style="justify-content: center">
                 <v-dialog v-if="showRoutines" v-model="dialogs[item.id]"  width="500" >
                  <template v-slot:activator="{ on, attrs }">
                  <v-btn style="justify-content: center" v-bind="attrs" v-on="on" text>
                   {{
                    item.name
                  }}
                    </v-btn>
                   </template>
                  <ViewRoutine v-bind:routine="item" @closeCreaciones="dialog[item.id] = false">
                  </ViewRoutine>

                </v-dialog> 

                  </v-list-item-content>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card>

          <v-row style="margin: 15px">
            <v-col md="1"></v-col>
            <v-col md="10">
              <v-row style="justify-content: center">
                <v-btn :disabled="page === 1" @click="goToPreviousPage()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-btn
                  :disabled="isTheLastPage"
                  style="margin: 0 0 0 20px"
                  @click="goToNextPage()"
                >
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-row>
            </v-col>
            <v-col md="1">
              <v-btn fab large elevation="2" color="secondary" @click="create()">
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
            </v-col>
          </v-row>
    
    <v-dialog v-model="deleting" persistent>
      <v-card flat width="300" class="pa-md-4 mx-lg-auto mt-16 rounded-xl" color="primary">
        <v-row>
          <v-col md="12">
              <h3>¿Deseas eliminar la rutina?</h3>
              <p> No podrás volver a recuperarla.</p>
              </v-col>  
        </v-row>
        <v-row>
        </v-row>
        <v-row>
            <v-col md="6">
            <v-btn color="secondary" dark @click="deleting = false">Cancelar</v-btn>
          </v-col>
          <v-col md="6">
            <v-btn color="error" dark @click="deleteItem()">Eliminar</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import { GET_EXERCISES, GET_ROUTINES } from '../store/actions'
import ViewRoutine from '@/components/viewRoutine.vue'

export default {
  inheritAttrs: false,
  components:{
    ViewRoutine,
  },
  data: () => ({
    dialog: false,
    dialogs: [],

    search: "",
    showRoutines: true,
    page: 1,
    itemsPerPage: 8,
    // filterBy: "routine",
    // edit: false
    itemIdForDeletion: null,
    deleting: false,
  }),
  computed: {
    ...mapState('routine', {
      $routinesPage: state => state.items.page + 1,
      $currentRoutines: state => state.items.content,
      $isLastRoutinesPage: state => state.items.isLastPage,
      $editValue: state => state.edit
    }),
    ...mapState('exercise', {
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
    let i = 0
    while( i < this.$routinesCount){
      this.dialogs[i] = false
      i++
    }
  },
  methods: {
    ...mapActions('routine', {
      $getAllRoutinesCreatedByCurrentUser: 'getAllCreatedByCurrentUser',
      $deleteRoutine: 'delete',
      $modifyEditValueRoutine: 'changeEditValue',
      $addRoutineToEdit: 'routineToEdit'
    }),
    ...mapActions('exercise', {
      $getAllExercisesCreatedByCurrentUser: 'getAllCreatedByCurrentUser',
      $deleteExercise: 'delete',
      $modifyEditValue: 'changeEditValue',
      $addExerciseToEdit: 'exerciseToEdit'
    }),
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
    editItem(toEdit) {
      if(this.showRoutines) {
        this.$addRoutineToEdit(toEdit)
        this.$modifyEditValueRoutine(true)
        this.$router.push('/create-routine')
      } else {
        console.log(toEdit)
        this.$addExerciseToEdit(toEdit)
        this.$modifyEditValue(true)
        this.$router.push('/create-exercise')
      }
    },
    async deleteItem() {
      if (this.showRoutines) {
        await this.$deleteRoutine(this.itemIdForDeletion)
      } else {
        await this.$deleteExercise(this.itemIdForDeletion)
      }
      this.retrieve()
      this.deleting = false
    },
    async create(){
      if(this.showRoutines)
        await this.$router.replace("/create-routine");
      else
        await this.$router.replace("/create-exercise");
    },
    deleteConfirm(id) {
      this.deleting = true
      this.itemIdForDeletion = id
    },
  },
};
</script>

<style scoped>
</style>
